import { PrismaClient } from '@prisma/client';

// This prevents multiple instances of Prisma Client in development
// See: https://www.prisma.io/docs/guides/other/prisma-client-header-mapped-typescript-postgres/query-engine-opens-too-many-connections

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
