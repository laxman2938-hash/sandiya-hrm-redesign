"use server";

import { prisma } from "@/lib/prisma";

// Gallery functions
export async function getGalleryImages() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return images;
  } catch (error) {
    console.error('Failed to fetch gallery images:', error);
    throw new Error('Failed to load gallery images');
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