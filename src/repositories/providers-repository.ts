import { prisma } from '@/config';

function fetchByName(name: string) {
  return prisma.provider.findUnique({
    where: { name },
  });
}

export default { fetchByName };
