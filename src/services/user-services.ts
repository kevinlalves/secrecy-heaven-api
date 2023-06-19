import bcrypt from 'bcrypt';
import { z } from 'zod';
import { createUserSchema } from '@/schemas';
import { saltRounds } from '@/utils/constants/bcrypt';
import { usersRepository } from '@/repositories';
import { conflictError } from '@/errors';

async function createUser(params: z.infer<typeof createUserSchema>) {
  const { name, email, password } = params;

  const user = await usersRepository.findByEmail(email);
  if (user) throw conflictError('A user with the same email already exists');

  const passwordDigest = await bcrypt.hash(password, saltRounds);
  return usersRepository.create({
    name,
    email,
    passwordDigest,
  });
}

export default {
  createUser,
};
