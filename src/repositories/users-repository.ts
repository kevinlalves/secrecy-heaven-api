import { z } from 'zod';
import { prisma } from '@/config';
import { createUserSchema } from '@/schemas';

async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

async function create(userData: UserDataType) {
  return prisma.user.create({
    data: userData,
  });
}

async function findById(id: string) {
  return prisma.user.findUniqueOrThrow({
    where: { id },
  });
}

export default {
  findByEmail,
  findById,
  create,
};

type UserDataType = Omit<z.infer<typeof createUserSchema>, 'password'> & { passwordDigest: string };
