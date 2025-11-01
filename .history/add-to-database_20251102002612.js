const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function addImagesToDatabase() {
  try {
    console.log('🗃️ Adding uploaded images to database...\n');
    
    // Read the upload results
    const resultsPath = path.join(__dirname, 'gallery-upload-results.json');
    const uploadedImages = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
    
    console.log(`📄 Found ${uploadedImages.length} images to add\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < uploadedImages.length; i++) {
      const imageData = uploadedImages[i];
      
      try {
        console.log(`💾 [${i + 1}/${uploadedImages.length}] Adding: ${imageData.title}`);
        
        await prisma.galleryImage.create({
          data: {
            title: imageData.title,
            image: imageData.image
          }
        });

        console.log(`   ✅ Added to database\n`);
        successCount++;

      } catch (error) {
        console.error(`   ❌ Failed to add ${imageData.title}:`, error.message);
        errorCount++;
      }
    }

    console.log('🎉 Database Import Complete!');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📊 Total processed: ${uploadedImages.length}`);
    
    console.log(`\n🌐 View your gallery at:`);
    console.log(`   Admin: http://localhost:3000/admin/gallery`);
    console.log(`   Public: http://localhost:3000/gallery`);

  } catch (error) {
    console.error('💥 Database script failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the database import
addImagesToDatabase();