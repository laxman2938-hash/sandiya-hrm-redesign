import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(achievements);
  } catch (error) {
    console.error('Failed to fetch achievements:', error);
    return NextResponse.json([], { status: 500 });
  }
}