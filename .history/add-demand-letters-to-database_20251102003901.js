const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function addDemandLettersToDatabase() {
  try {
    console.log('📄 Adding uploaded demand letter images to database...\n');
    
    // Read the upload results
    const resultsPath = path.join(__dirname, 'demand-letter-upload-results.json');
    const uploadedDemandLetters = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
    
    console.log(`📄 Found ${uploadedDemandLetters.length} demand letter images to add\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < uploadedDemandLetters.length; i++) {
      const demandData = uploadedDemandLetters[i];
      
      try {
        console.log(`💾 [${i + 1}/${uploadedDemandLetters.length}] Adding: ${demandData.title}`);
        
        await prisma.demandLetter.create({
          data: {
            title: demandData.title,
            image: demandData.image
          }
        });

        console.log(`   ✅ Added to database`);
        console.log(`   🔗 URL: ${demandData.image}\n`);
        successCount++;

      } catch (error) {
        console.error(`   ❌ Failed to add ${demandData.title}:`, error.message);
        errorCount++;
      }
    }

    console.log('🎉 Demand Letters Database Import Complete!');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📊 Total processed: ${uploadedDemandLetters.length}`);
    
    console.log(`\n🌐 View your demand letters at:`);
    console.log(`   Admin: http://localhost:3000/admin/demand-letters`);
    console.log(`   Public: http://localhost:3000/active-demand-letter`);

    console.log(`\n📋 Demand Letter Positions Added:`);
    uploadedDemandLetters.forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.title}`);
    });

  } catch (error) {
    console.error('💥 Database script failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the database import
addDemandLettersToDatabase();