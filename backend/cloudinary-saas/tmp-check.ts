import { PrismaClient } from './src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg(connectionString),
});

try {
  const video = await prisma.video.create({
    data: {
      title: 'tsx-check',
      description: 'x',
      publicId: 'x',
      originalSize: '1',
      compressedSize: '1',
      duration: 22.8,
    },
  });
  console.log(JSON.stringify(video));
} finally {
  await prisma.$disconnect();
}
