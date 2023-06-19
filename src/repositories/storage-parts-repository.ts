import { StoragePart } from '@prisma/client';
import { TransactionClient, prisma } from '@/config';

function create(data: Omit<StoragePart, 'id'>, tx?: TransactionClient) {
  const client = tx || prisma;

  return client.storagePart.create({ data });
}

export default { create };
