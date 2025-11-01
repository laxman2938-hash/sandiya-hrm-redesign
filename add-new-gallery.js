const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function addNewGalleryImages() {
  try {
    console.log('🗃️ Adding new gallery images to database...\n');
    
    // Read the new upload results
    const resultsPath = path.join(__dirname, 'new-gallery-uploads.json');
    
    if (!fs.existsSync(resultsPath)) {
      console.log('❌ No new-gallery-uploads.json found. Please run upload-new-gallery.js first.');
      return;
    }
    
    const uploadedImages = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
    
    console.log(`📄 Found ${uploadedImages.length} new images to add\n`);

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

        console.log(`   ✅ Added to database`);
        console.log(`   🔗 URL: ${imageData.image}\n`);
        successCount++;

      } catch (error) {
        console.error(`   ❌ Failed to add ${imageData.title}:`, error.message);
        errorCount++;
      }
    }

    console.log('🎉 New Gallery Database Import Complete!');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📊 Total processed: ${uploadedImages.length}`);
    
    console.log(`\n🌐 View your updated gallery at:`);
    console.log(`   Admin: http://localhost:3000/admin/gallery`);
    console.log(`   Public: http://localhost:3000/gallery`);
    console.log(`\n📊 Total gallery images now: ${29 + successCount}`);

  } catch (error) {
    console.error('💥 Database script failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the database import
addNewGalleryImages();