import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { prisma } from '../src/lib/prisma';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadGalleryImages() {
  try {
    console.log('🚀 Starting gallery images upload...\n');
    
    const galleryPath = path.join(process.cwd(), 'src/gallery');
    const files = fs.readdirSync(galleryPath);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    console.log(`📁 Found ${imageFiles.length} images to upload\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < imageFiles.length; i++) {
      const filename = imageFiles[i];
      const filePath = path.join(galleryPath, filename);
      
      try {
        console.log(`📸 [${i + 1}/${imageFiles.length}] Uploading: ${filename}`);
        
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'sandiya-hr/gallery',
          public_id: `gallery_${Date.now()}_${i}`,
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ]
        });

        console.log(`   ✅ Uploaded to: ${result.secure_url}`);

        // Save to database
        await prisma.galleryImage.create({
          data: {
            title: `Gallery Image ${i + 1}`,
            image: result.secure_url
          }
        });

        console.log(`   💾 Saved to database\n`);
        successCount++;

      } catch (error) {
        console.error(`   ❌ Failed to upload ${filename}:`, error.message);
        errorCount++;
      }

      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('🎉 Upload Summary:');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📊 Total processed: ${imageFiles.length}`);

  } catch (error) {
    console.error('💥 Script failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the upload
uploadGalleryImages();