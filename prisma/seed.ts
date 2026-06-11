import 'dotenv/config';
import { PrismaClient } from '../app/generated/client/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  const coach1 = await prisma.user.upsert({ // ✅ Fixed: was prisma.users
    where: { id: "C00001" },
    update: {},
    create: {
      id: "C00001",
      name: 'Coach One',
      role: 'COACH',
    },
  });

  const coach2 = await prisma.user.upsert({ // ✅ Fixed: was prisma.users
    where: { id: "C00002" },
    update: {},
    create: {
      id: "C00002",
      name: 'Coach Two',
      role: 'COACH',
    },
  });

  const client1 = await prisma.user.upsert({ // ✅ Fixed: was prisma.users
    where: { id: "U00001" },
    update: {},
    create: {
      id: "U00001",
      name: 'Client One',
      role: 'CLIENT',
      coachId: coach1.id, // ✅ Fixed: was coach_id
    },
  });

  const client2 = await prisma.user.upsert({ // ✅ Fixed: was prisma.users
    where: { id: "U00002" },
    update: {},
    create: {
      id: "U00002",
      name: 'Client Two',
      role: 'CLIENT',
      coachId: coach1.id, // ✅ Fixed: was coach_id
    },
  });

  const client3 = await prisma.user.upsert({ // ✅ Fixed: was prisma.users
    where: { id: "U00003" },
    update: {},
    create: {
      id: "U00003",
      name: 'Client Three',
      role: 'CLIENT',
      coachId: coach2.id, // ✅ Fixed: was coach_id
    },
  });

  console.log({ coach1, coach2, client1, client2, client3 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });