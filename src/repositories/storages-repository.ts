import { Storage } from '@prisma/client';
import { TransactionClient, prisma } from '@/config';

function create(data: Omit<Storage, 'id'>, tx?: TransactionClient) {
  const client = tx || prisma;

  return client.storage.create({ data });
}

export default { create };
