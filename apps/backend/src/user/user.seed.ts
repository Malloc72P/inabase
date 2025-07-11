import { PrismaClient, UserRole } from '@prisma/client';
import * as argon2 from 'argon2';

const p = async (pw: string) => await argon2.hash(pw);

export async function seedUsers(prisma: PrismaClient) {
  const data = [
    { email: 'walter@inabase.com', name: 'walter', password: await p('test'), role: UserRole.USER },
    { email: 'saul@inabase.com', name: 'saul', password: await p('test'), role: UserRole.USER },
    { email: 'comet@inabase.com', name: 'comet', password: await p('test'), role: UserRole.USER },
    { email: 'admin@inabase.com', name: 'admin', password: await p('test'), role: UserRole.ADMIN },
    { email: 'test@inabase.com', name: 'test', password: await p('test'), role: UserRole.ADMIN },
  ];

  await prisma.user.deleteMany();

  const result = await prisma.user.createMany({
    data,
  });

  console.log('Users seeded:', result.count, 'items created');
}
