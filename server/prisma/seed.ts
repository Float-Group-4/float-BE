// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const task1 = await prisma.task.upsert({
    where: { title: 'Design Database Schema' },
    update: {},
    create: {
      title: 'Design Database Schema',
      estimatedHours: 4,
      assigneeId: 1,
      assigneeName: 'HuyGia',
      status: 'In Progress',
    },
  });

  const task2 = await prisma.task.upsert({
    where: { title: 'Create API for demo' },
    update: {},
    create: {
      title: 'Create API for demo',
      estimatedHours: 4,
      assigneeId: 1,
      assigneeName: 'HuyGia',
      status: 'In Progress',
    },
  });

  console.log({ task1, task2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
