import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function userSeed() {
  await prisma.customer.createMany({
    data: [
      {
        id: 'da500959-00cc-4c5f-8fc8-b82242fee018',
        name: 'user01',
        email: 'email@email.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });
}
