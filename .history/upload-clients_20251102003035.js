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

async function uploadClientImages() {
  try {
    console.log('🏢 Starting client images upload to Cloudinary...\n');
    
    const clientPath = path.join(__dirname, 'src/client');
    const files = fs.readdirSync(clientPath);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    console.log(`📁 Found ${imageFiles.length} client images to upload\n`);

    let successCount = 0;
    let errorCount = 0;
    const uploadedImages = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const filename = imageFiles[i];
      const filePath = path.join(clientPath, filename);
      
      try {
        console.log(`🏢 [${i + 1}/${imageFiles.length}] Uploading: ${filename}`);
        
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'sandiya-hr/clients',
          public_id: `client_${Date.now()}_${i}`,
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ]
        });

        console.log(`   ✅ Uploaded to: ${result.secure_url}`);

        uploadedImages.push({
          name: `Client ${i + 1}`,
          logo: result.secure_url,
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

    // Save results to JSON file for manual database import
    fs.writeFileSync(
      path.join(__dirname, 'client-upload-results.json'),
      JSON.stringify(uploadedImages, null, 2)
    );

    console.log('\n🎉 Client Images Upload Complete!');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📊 Total processed: ${imageFiles.length}`);
    console.log(`\n📄 Results saved to: client-upload-results.json`);
    console.log(`\n🔗 Now you can add these to your database via admin panel:`);
    console.log(`   http://localhost:3000/admin/clients`);

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
uploadClientImages();