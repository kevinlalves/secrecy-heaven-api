import { PutObjectCommand } from '@aws-sdk/client-s3';
import { TransactionClient, prisma, s3 } from '@/config';
import storagesRepository from '@/repositories/storages-repository';
import storagePartsRepository from '@/repositories/storage-parts-repository';

function storeFileAws(rawBytes: Buffer, storageId: string, partPosition: number) {
  const uploadParams = {
    Bucket: 'secrecy-heaven-storage',
    Key: `${storageId}/${partPosition}`,
    Body: rawBytes,
  };

  return s3.send(new PutObjectCommand(uploadParams));
}

async function createStorage(file: Express.Multer.File, userId: string) {
  const partSize = file.size / 3;

  return await prisma.$transaction(async (tx) => {
    const newStorage = await storagesRepository.create({ name: file.filename, userId }, tx);
    createStoragePart(file.buffer.slice(0, partSize), 1, newStorage.id, tx);
    createStoragePart(file.buffer.slice(partSize, 2 * partSize), 2, newStorage.id, tx);
    createStoragePart(file.buffer.slice(2 * partSize), 3, newStorage.id, tx);

    return newStorage;
  });
}

async function createStoragePart(
  filePartBytes: Buffer,
  partPosition: number,
  storageId: string,
  tx?: TransactionClient,
) {
  const response = await storeFileAws(filePartBytes, storageId, partPosition);
  // const { id } = await storagePartsRepository.create({ partPosition, storageId }, tx);
}

export default {
  createStorage,
  createStoragePart,
  storeFileAws,
};
