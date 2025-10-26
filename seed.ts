import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with test data...\n');

  // 1. Clear existing data (optional)
  // await prisma.candidateSubmission.deleteMany();
  // await prisma.feedback.deleteMany();
  // await prisma.contactMessage.deleteMany();

  // 1. Add Gallery Images
  console.log('📷 Adding gallery images...');
  const galleries = await prisma.galleryImage.createMany({
    data: [
      {
        title: 'Office Tour',
        description: 'Our modern office space',
        imageUrl: 'https://sandiya-hr.supabase.co/storage/v1/object/public/sandiya-hr/gallery/office.jpg',
        category: 'Office',
      },
      {
        title: 'Team Meeting',
        description: 'Team collaboration session',
        imageUrl: 'https://sandiya-hr.supabase.co/storage/v1/object/public/sandiya-hr/gallery/team.jpg',
        category: 'Team',
      },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ Added ${galleries.count} gallery images\n`);

  // 2. Add Team Members
  console.log('👥 Adding team members...');
  const team = await prisma.teamMember.createMany({
    data: [
      {
        name: 'Raj Kumar',
        position: 'HR Manager',
        imageUrl: 'https://sandiya-hr.supabase.co/storage/v1/object/public/sandiya-hr/team/raj.jpg',
        bio: 'Experienced HR professional with 10+ years in recruitment',
      },
      {
        name: 'Priya Sharma',
        position: 'Operations Lead',
        imageUrl: 'https://sandiya-hr.supabase.co/storage/v1/object/public/sandiya-hr/team/priya.jpg',
        bio: 'Expert in process optimization and team management',
      },
      {
        name: 'Amit Patel',
        position: 'Technical Recruiter',
        imageUrl: 'https://sandiya-hr.supabase.co/storage/v1/object/public/sandiya-hr/team/amit.jpg',
        bio: 'Specialized in tech talent acquisition',
      },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ Added ${team.count} team members\n`);

  // 3. Add Achievements
  console.log('🏆 Adding achievements...');
  const achievements = await prisma.achievement.createMany({
    data: [
      {
        title: 'ISO 9001 Certified',
        description: 'Quality Management System Certification',
        icon: '📜',
      },
      {
        title: '5000+ Placements',
        description: 'Successfully placed 5000+ candidates',
        icon: '🎯',
      },
      {
        title: 'Industry Leader',
        description: 'Recognized as top HR recruitment agency',
        icon: '⭐',
      },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ Added ${achievements.count} achievements\n`);

  // 4. Add Clients
  console.log('🏢 Adding clients...');
  const clients = await prisma.client.createMany({
    data: [
      {
        name: 'Tech Corp Nepal',
        industry: 'IT',
        logoUrl: 'https://sandiya-hr.supabase.co/storage/v1/object/public/sandiya-hr/clients/tech-corp.png',
      },
      {
        name: 'Finance Solutions Ltd',
        industry: 'Finance',
        logoUrl: 'https://sandiya-hr.supabase.co/storage/v1/object/public/sandiya-hr/clients/finance.png',
      },
      {
        name: 'Healthcare Nepal',
        industry: 'Healthcare',
        logoUrl: 'https://sandiya-hr.supabase.co/storage/v1/object/public/sandiya-hr/clients/healthcare.png',
      },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ Added ${clients.count} clients\n`);

  // 5. Add Testimonials
  console.log('💬 Adding testimonials...');
  const testimonials = await prisma.testimonial.createMany({
    data: [
      {
        name: 'Rajesh Sharma',
        position: 'CEO, Tech Corp Nepal',
        content: 'Sandiya HRM helped us find the perfect team. Outstanding service!',
        rating: 5,
      },
      {
        name: 'Priya Gupta',
        position: 'HR Director, Finance Solutions',
        content: 'Professional, efficient, and results-driven. Highly recommended!',
        rating: 5,
      },
      {
        name: 'Amit Mishra',
        position: 'Operations Manager, Healthcare Nepal',
        content: 'Great experience working with their recruitment specialists.',
        rating: 4,
      },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ Added ${testimonials.count} testimonials\n`);

  // 6. Add Legal Documents
  console.log('📋 Adding legal documents...');
  const legalDocs = await prisma.legalDocument.createMany({
    data: [
      {
        title: 'Privacy Policy',
        description: 'Our commitment to data privacy',
        fileUrl: 'https://sandiya-hr.supabase.co/storage/v1/object/public/sandiya-hr/legal/privacy.pdf',
        type: 'Privacy Policy',
      },
      {
        title: 'Terms of Service',
        description: 'Terms and conditions for using our services',
        fileUrl: 'https://sandiya-hr.supabase.co/storage/v1/object/public/sandiya-hr/legal/terms.pdf',
        type: 'Terms',
      },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ Added ${legalDocs.count} legal documents\n`);

  // 7. Add Demand Letters
  console.log('📄 Adding demand letters...');
  const demandLetters = await prisma.demandLetter.createMany({
    data: [
      {
        clientName: 'Tech Corp Nepal',
        position: 'Senior Developer',
        quantity: 3,
        requirements: 'Node.js, React, TypeScript, 3+ years experience',
        status: 'Active',
      },
      {
        clientName: 'Finance Solutions Ltd',
        position: 'Financial Analyst',
        quantity: 2,
        requirements: 'CFA Level 1+, Excel Expert, Finance knowledge',
        status: 'Active',
      },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ Added ${demandLetters.count} demand letters\n`);

  // 8. Add Contact Messages
  console.log('📧 Adding contact messages...');
  const messages = await prisma.contactMessage.createMany({
    data: [
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+977 9841234567',
        message: 'Interested in your services for our company recruitment',
        subject: 'Service Inquiry',
        status: 'New',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+977 9847654321',
        message: 'Looking for job opportunities in your organization',
        subject: 'Job Application',
        status: 'New',
      },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ Added ${messages.count} contact messages\n`);

  // 9. Add Candidate Submissions
  console.log('👤 Adding candidate submissions...');
  const candidates = await prisma.candidateSubmission.createMany({
    data: [
      {
        fullName: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '+977 9841111111',
        position: 'Senior Developer',
        experience: '5 years',
        resumeUrl: 'https://sandiya-hr.supabase.co/storage/v1/object/public/sandiya-hr/candidates/rajesh_resume.pdf',
        status: 'Received',
      },
      {
        fullName: 'Priya Nepal',
        email: 'priya@example.com',
        phone: '+977 9842222222',
        position: 'Marketing Manager',
        experience: '3 years',
        resumeUrl: 'https://sandiya-hr.supabase.co/storage/v1/object/public/sandiya-hr/candidates/priya_resume.pdf',
        status: 'Received',
      },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ Added ${candidates.count} candidate submissions\n`);

  // 10. Add Feedback
  console.log('⭐ Adding feedback...');
  const feedbacks = await prisma.feedback.createMany({
    data: [
      {
        name: 'Anuj Singh',
        email: 'anuj@example.com',
        phone: '+977 9843333333',
        feedbackType: 'Suggestion',
        message: 'Great service! Would love to see more job categories.',
        rating: 4,
        status: 'New',
      },
      {
        name: 'Kavya Sharma',
        email: 'kavya@example.com',
        phone: '+977 9844444444',
        feedbackType: 'Complaint',
        message: 'Application portal needs better UX improvements',
        rating: 3,
        status: 'New',
      },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ Added ${feedbacks.count} feedback entries\n`);

  console.log('✨ Database seeding completed successfully!\n');

  // Print summary
  console.log('📊 Summary:');
  console.log(`   Gallery Images: ${galleries.count}`);
  console.log(`   Team Members: ${team.count}`);
  console.log(`   Achievements: ${achievements.count}`);
  console.log(`   Clients: ${clients.count}`);
  console.log(`   Testimonials: ${testimonials.count}`);
  console.log(`   Legal Documents: ${legalDocs.count}`);
  console.log(`   Demand Letters: ${demandLetters.count}`);
  console.log(`   Contact Messages: ${messages.count}`);
  console.log(`   Candidate Submissions: ${candidates.count}`);
  console.log(`   Feedback Entries: ${feedbacks.count}\n`);
}

main()
  .then(async () => {
    console.log('✅ Seeding completed!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
