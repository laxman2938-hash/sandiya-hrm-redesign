const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function addAchievementsToDatabase() {
  try {
    console.log('🏆 Adding uploaded achievement images to database...\n');
    
    // Read the upload results
    const resultsPath = path.join(__dirname, 'achievement-upload-results.json');
    const uploadedAchievements = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
    
    console.log(`📄 Found ${uploadedAchievements.length} achievement images to add\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < uploadedAchievements.length; i++) {
      const achievementData = uploadedAchievements[i];
      
      try {
        console.log(`💾 [${i + 1}/${uploadedAchievements.length}] Adding: ${achievementData.title}`);
        
        await prisma.achievement.create({
          data: {
            title: achievementData.title,
            image: achievementData.image
          }
        });

        console.log(`   ✅ Added to database`);
        console.log(`   🔗 URL: ${achievementData.image}\n`);
        successCount++;

      } catch (error) {
        console.error(`   ❌ Failed to add ${achievementData.title}:`, error.message);
        errorCount++;
      }
    }

    console.log('🎉 Achievements Database Import Complete!');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📊 Total processed: ${uploadedAchievements.length}`);
    
    console.log(`\n🌐 View your achievements at:`);
    console.log(`   Admin: http://localhost:3000/admin/achievements`);
    console.log(`   Public: http://localhost:3000/achievements`);

    console.log(`\n🏆 Achievements Added:`);
    uploadedAchievements.forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.title}`);
    });

  } catch (error) {
    console.error('💥 Database script failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the database import
addAchievementsToDatabase();