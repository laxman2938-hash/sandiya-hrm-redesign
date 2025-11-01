const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function addTeamMembersToDatabase() {
  try {
    console.log('👥 Adding team members to database...\n');

    // Read the uploaded images data
    const resultsPath = path.join(__dirname, 'team-upload-results.json');
    
    if (!fs.existsSync(resultsPath)) {
      console.error('❌ team-upload-results.json not found. Run upload-team.js first.');
      return;
    }

    const teamMembers = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

    console.log(`📊 Found ${teamMembers.length} team members to add to database\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const member of teamMembers) {
      try {
        console.log(`👤 Adding: ${member.name} - ${member.designation}`);

        const teamMember = await prisma.teamMember.create({
          data: {
            name: member.name,
            designation: member.designation,
            image: member.image,
            bio: `Experienced professional with expertise in ${member.designation.toLowerCase()} operations. Committed to excellence and team collaboration.`,
            isActive: true
          }
        });

        console.log(`   ✅ Added with ID: ${teamMember.id}`);
        successCount++;

      } catch (error) {
        console.error(`   ❌ Failed to add ${member.name}:`, error.message);
        errorCount++;
      }
    }

    console.log('\n🎉 Team Members Database Addition Complete!');
    console.log(`✅ Successfully added: ${successCount} members`);
    console.log(`❌ Failed: ${errorCount} members`);
    console.log(`📊 Total processed: ${teamMembers.length}`);

    if (successCount > 0) {
      console.log('\n🌟 You can now view the team members at:');
      console.log('   • Admin Panel: http://localhost:3000/admin/team');
      console.log('   • Public Page: http://localhost:3000/who-we-are');
    }

    // Show current team members in database
    const allTeamMembers = await prisma.teamMember.findMany({
      orderBy: { createdAt: 'desc' }
    });

    console.log(`\n👥 Current Team Members in Database (${allTeamMembers.length} total):`);
    allTeamMembers.forEach((member, index) => {
      console.log(`   ${index + 1}. ${member.name} - ${member.designation}`);
    });

  } catch (error) {
    console.error('💥 Database operation failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Check database connection
async function checkConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully\n');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

// Run the script
async function main() {
  const connected = await checkConnection();
  if (connected) {
    await addTeamMembersToDatabase();
  }
}

main();