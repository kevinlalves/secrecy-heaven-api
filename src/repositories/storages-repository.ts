import { Storage } from '@prisma/client';
import { TransactionClient, prisma } from '@/config';

function create(data: Omit<Storage, 'id'>, tx?: TransactionClient) {
  const client = tx || prisma;

  return client.storage.create({ data });
}

function fetchStorageById(id: string) {
  return prisma.storage.findUnique({
    where: { id },
    include: { storageParts: { orderBy: { partPosition: 'asc' } } },
  });
}

function fetchStoragesByUser(userId: string) {
  return prisma.storage.findMany({
    where: { userId },
  });
}

export default { create, fetchStorageById, fetchStoragesByUser };
