"use server";

import { prisma } from "@/lib/prisma";

// Health check function
export async function testDatabaseConnection() {
  try {
    console.log('🔄 Testing database connection...');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database connection successful:', result);
    return { success: true, message: 'Database connected successfully' };
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return { 
      success: false, 
      message: `Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Gallery functions
export async function getGalleryImages() {
  try {
    console.log('🔄 Fetching gallery images...');
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    console.log('✅ Gallery images fetched:', images.length);
    return images;
  } catch (error) {
    console.error('❌ Failed to fetch gallery images:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any)?.code,
      meta: (error as any)?.meta
    });
    throw new Error(`Failed to load gallery images: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Achievement functions
export async function getAchievements() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return achievements;
  } catch (error) {
    console.error('Failed to fetch achievements:', error);
    throw new Error('Failed to load achievements');
  }
}

// Client functions
export async function getClients() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return clients;
  } catch (error) {
    console.error('Failed to fetch clients:', error);
    throw new Error('Failed to load clients');
  }
}

// Legal document functions
export async function getLegalDocuments() {
  try {
    const documents = await prisma.legalDocument.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return documents;
  } catch (error) {
    console.error('Failed to fetch legal documents:', error);
    throw new Error('Failed to load legal documents');
  }
}

// Demand letter functions
export async function getDemandLetters() {
  try {
    const letters = await prisma.demandLetter.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return letters;
  } catch (error) {
    console.error('Failed to fetch demand letters:', error);
    throw new Error('Failed to load demand letters');
  }
}

// Team member functions
export async function getTeamMembers() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return members;
  } catch (error) {
    console.error('Failed to fetch team members:', error);
    throw new Error('Failed to load team members');
  }
}

// Testimonial functions
export async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return testimonials;
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    throw new Error('Failed to load testimonials');
  }
}

// Contact message functions (for admin)
export async function getContactMessages() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return messages;
  } catch (error) {
    console.error('Failed to fetch contact messages:', error);
    throw new Error('Failed to load contact messages');
  }
}