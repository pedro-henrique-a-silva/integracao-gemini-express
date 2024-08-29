import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function measureSeed() {
  await prisma.measures.createMany({
    data: [
      {
        id: 'da500959-00cc-4c5f-8fc8-b82242fee018',
        customerId: 'da500959-00cc-4c5f-8fc8-b82242fee018',
        measureType: 'GAS',
        measureValue: 46,
        confirmedValue: 40,
        measureDate: new Date('2021-10-10'),
        imageUrl: 'http://localhost:3000/image.jpg',
        createdAt: new Date('2021-10-10'),
        updatedAt: new Date('2021-10-10'),
      }
    ],
  });
}
