import 'dotenv/config';
import { PrismaClient } from '../app/generated/client/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany(); // ✅ Fixed: was prisma.users
  console.log("--- All Users ---");
  users.forEach(u => console.log(`${u.name} (${u.role}): ID=${u.id}, CoachID=${u.coachId}`)); // ✅ Fixed: was u.coach_id
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });