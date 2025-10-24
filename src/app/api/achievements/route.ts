import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('🔄 API: Fetching achievements...');
    const achievements = await prisma.achievement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    console.log('✅ API: Achievements fetched:', achievements.length);
    return NextResponse.json(achievements);
  } catch (error) {
    console.error('❌ API: Failed to fetch achievements:', error);
    return NextResponse.json(
      { error: 'Failed to fetch achievements', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}