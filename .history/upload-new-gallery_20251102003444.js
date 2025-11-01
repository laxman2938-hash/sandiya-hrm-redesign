const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadNewGalleryImages() {
  try {
    console.log('🔍 Checking for new gallery images to upload...\n');
    
    const galleryPath = path.join(__dirname, 'src/gallery');
    const files = fs.readdirSync(galleryPath);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    // Read previously uploaded images to avoid duplicates
    let previouslyUploaded = [];
    const resultsPath = path.join(__dirname, 'gallery-upload-results.json');
    
    if (fs.existsSync(resultsPath)) {
      const previousResults = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
      previouslyUploaded = previousResults.map(item => item.originalFilename);
    }

    // Find new images (not previously uploaded)
    const newImages = imageFiles.filter(filename => 
      !previouslyUploaded.includes(filename)
    );

    if (newImages.length === 0) {
      console.log('✅ No new images found. All images are already uploaded!');
      return;
    }

    console.log(`📁 Found ${newImages.length} NEW images to upload:`);
    newImages.forEach((img, i) => console.log(`   ${i + 1}. ${img}`));
    console.log('');

    let successCount = 0;
    let errorCount = 0;
    const uploadedImages = [];

    // Get the next image number for titles
    const startNumber = previouslyUploaded.length + 1;

    for (let i = 0; i < newImages.length; i++) {
      const filename = newImages[i];
      const filePath = path.join(galleryPath, filename);
      
      try {
        console.log(`📸 [${i + 1}/${newImages.length}] Uploading: ${filename}`);
        
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'sandiya-hr/gallery',
          public_id: `gallery_${Date.now()}_${startNumber + i}`,
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ]
        });

        console.log(`   ✅ Uploaded to: ${result.secure_url}`);

        uploadedImages.push({
          title: `Gallery Image ${startNumber + i}`,
          image: result.secure_url,
          originalFilename: filename
        });

        successCount++;

      } catch (error) {
        console.error(`   ❌ Failed to upload ${filename}:`, error.message);
        errorCount++;
      }

      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    if (uploadedImages.length > 0) {
      // Update the results file with new uploads
      const allResults = [...(fs.existsSync(resultsPath) ? JSON.parse(fs.readFileSync(resultsPath, 'utf8')) : []), ...uploadedImages];
      fs.writeFileSync(resultsPath, JSON.stringify(allResults, null, 2));

      // Create separate file for just the new uploads
      fs.writeFileSync(
        path.join(__dirname, 'new-gallery-uploads.json'),
        JSON.stringify(uploadedImages, null, 2)
      );
    }

    console.log('\n🎉 New Gallery Images Upload Complete!');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📊 Total processed: ${newImages.length}`);
    
    if (uploadedImages.length > 0) {
      console.log(`\n📄 New uploads saved to: new-gallery-uploads.json`);
      console.log(`📄 Updated complete list: gallery-upload-results.json`);
    }

  } catch (error) {
    console.error('💥 Script failed:', error);
  }
}

// Check if Cloudinary is configured
if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.error('❌ Cloudinary not configured. Make sure .env.local has CLOUDINARY_* variables');
  process.exit(1);
}

// Run the upload
uploadNewGalleryImages();