import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('🔄 API: Fetching clients...');
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' }
    });
    console.log('✅ API: Clients fetched:', clients.length);
    return NextResponse.json(clients);
  } catch (error) {
    console.error('❌ API: Failed to fetch clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}