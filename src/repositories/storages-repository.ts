import { Storage } from '@prisma/client';
import { TransactionClient, prisma } from '@/config';

function create(data: Omit<Storage, 'id'>, tx?: TransactionClient) {
  const client = tx || prisma;

  return client.storage.create({ data });
}

function fetchStorageByNameAndUser(name: string, userId: string) {
  return prisma.storage.findFirst({
    where: { name, userId },
    include: { storageParts: { orderBy: { partPosition: 'asc' } } },
  });
}

export default { create, fetchStorageByNameAndUser };
