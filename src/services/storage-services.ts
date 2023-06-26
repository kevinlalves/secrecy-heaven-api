import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Provider } from '@prisma/client';
import { TransactionClient, prisma, s3 } from '@/config';
import storagesRepository from '@/repositories/storages-repository';
import storagePartsRepository from '@/repositories/storage-parts-repository';
import { providersRepository } from '@/repositories';
import { notFoundError } from '@/errors';

function storeFileAws(rawBytes: Buffer, storageId: string, partPosition: number) {
  const uploadParams = {
    Bucket: 'secrecy-heaven-storage',
    Key: `${storageId}/${partPosition}`,
    Body: rawBytes,
  };

  return s3.send(new PutObjectCommand(uploadParams));
}

async function fetchFileAws(storageId: string, partPosition: number) {
  const downloadParams = {
    Bucket: 'secrecy-heaven-storage',
    Key: `${storageId}/${partPosition}`,
  };

  const fileObject = await s3.send(new GetObjectCommand(downloadParams));
  return fileObject.Body?.transformToByteArray();
}

async function downloadFile(name: string, userId: string) {
  const storage = await storagesRepository.fetchStorageByNameAndUser(name, userId);
  if (!storage) throw notFoundError('There is no file with the given name');

  const fileDataParts = (await Promise.all(
    storage.storageParts.map((storagePart) => fetchFileAws(storage.id, storagePart.partPosition)),
  )) as Uint8Array[];

  const fileSizeInBytes = fileDataParts.reduce<number>((partSize, part) => partSize + part.length, 0);
  const fileData = new Uint8Array(fileSizeInBytes);

  let offset = 0;
  fileDataParts.forEach((part) => {
    fileData.set(part, offset);
    offset += part.length;
  });

  return { fileData: Buffer.from(fileData), fileName: storage.name };
}

async function createStorage(file: Express.Multer.File, userId: string) {
  const partSize = file.size / 3;

  return await prisma.$transaction(async (tx) => {
    const newStorage = await storagesRepository.create({ name: file.originalname, userId }, tx);

    await Promise.all([
      createStoragePart(file.buffer.slice(0, partSize), 1, newStorage.id, tx),
      createStoragePart(file.buffer.slice(partSize, 2 * partSize), 2, newStorage.id, tx),
      createStoragePart(file.buffer.slice(2 * partSize), 3, newStorage.id, tx),
    ]);

    return newStorage;
  });
}

async function createStoragePart(
  filePartBytes: Buffer,
  partPosition: number,
  storageId: string,
  tx?: TransactionClient,
) {
  const providerFile = await storeFileAws(filePartBytes, storageId, partPosition);
  console.log(providerFile);
  const provider = (await providersRepository.fetchByName('aws')) as Provider;
  await storagePartsRepository.create(
    { partPosition, storageId, providerId: provider.id, externalId: providerFile.ETag as string },
    tx,
  );
}

export default {
  createStorage,
  createStoragePart,
  storeFileAws,
  fetchFileAws,
  downloadFile,
};
