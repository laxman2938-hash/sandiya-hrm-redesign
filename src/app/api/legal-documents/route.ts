import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('🔄 API: Fetching legal documents...');
    const legalDocuments = await prisma.legalDocument.findMany({
      orderBy: { createdAt: 'desc' }
    });
    console.log('✅ API: Legal documents fetched:', legalDocuments.length);
    return NextResponse.json(legalDocuments);
  } catch (error) {
    console.error('❌ API: Failed to fetch legal documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch legal documents', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}