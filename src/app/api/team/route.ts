import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('🔄 API: Fetching team members...');
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { createdAt: 'desc' }
    });
    console.log('✅ API: Team members fetched:', teamMembers.length);
    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error('❌ API: Failed to fetch team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}