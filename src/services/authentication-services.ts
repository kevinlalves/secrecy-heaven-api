import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { signInSchema } from '@/schemas';
import { usersRepository } from '@/repositories';
import { jwtSecret, jwtTokenDuration } from '@/utils/constants';
import { notFoundError } from '@/errors';

async function signIn(params: z.infer<typeof signInSchema>) {
  const { email, password } = params;

  const user = await usersRepository.findByEmail(email);
  if (!user) throw notFoundError('No user found for the given email/password pair');

  const isCorrectPassword = await bcrypt.compare(password, user.passwordDigest);
  if (!isCorrectPassword) throw notFoundError('No user found for the given email/password pair');

  return jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: jwtTokenDuration });
}

export default {
  signIn,
};
