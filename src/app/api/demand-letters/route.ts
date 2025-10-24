import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('🔄 API: Fetching demand letters...');
    const demandLetters = await prisma.demandLetter.findMany({
      orderBy: { createdAt: 'desc' }
    });
    console.log('✅ API: Demand letters fetched:', demandLetters.length);
    return NextResponse.json(demandLetters);
  } catch (error) {
    console.error('❌ API: Failed to fetch demand letters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch demand letters', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}