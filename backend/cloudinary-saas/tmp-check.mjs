import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

try {
  const video = await prisma.video.create({
    data: {
      title: 'test',
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
