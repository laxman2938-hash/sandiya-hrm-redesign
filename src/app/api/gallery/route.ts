import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('🔄 API: Fetching gallery images...');
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    console.log('✅ API: Gallery images fetched:', images.length);
    return NextResponse.json(images);
  } catch (error) {
    console.error('❌ API: Failed to fetch gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}