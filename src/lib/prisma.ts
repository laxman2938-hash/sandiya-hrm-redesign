import { PrismaClient } from '@prisma/client';

// This prevents multiple instances of Prisma Client in development
// See: https://www.prisma.io/docs/guides/other/prisma-client-header-mapped-typescript-postgres/query-engine-opens-too-many-connections

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Validate environment variables
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is missing!');
  throw new Error('DATABASE_URL environment variable is not set. Please add it to your environment variables.');
}

console.log('✅ DATABASE_URL is set:', process.env.DATABASE_URL ? 'Yes' : 'No');

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? ['error'] : ['query', 'info', 'warn', 'error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
