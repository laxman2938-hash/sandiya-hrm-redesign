#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const FormData = require('form-data');

async function uploadToCloudinary(filePath, filename) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    
    // Cloudinary upload parameters
    const timestamp = Math.round(Date.now() / 1000);
    const publicId = `gallery_${timestamp}_${Math.random().toString(36).substring(7)}`;
    
    form.append('file', fs.createReadStream(filePath));
    form.append('upload_preset', 'ml_default'); // You may need to create this in Cloudinary
    form.append('folder', 'sandiya-hr/gallery');
    form.append('public_id', publicId);

    const options = {
      hostname: 'api.cloudinary.com',
      port: 443,
      path: `/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      method: 'POST',
      headers: form.getHeaders()
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.secure_url) {
            resolve(result.secure_url);
          } else {
            reject(new Error('No secure_url in response'));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    form.pipe(req);
  });
}

async function main() {
  console.log('🚀 Bulk uploading gallery images to Cloudinary...\n');
  
  const galleryPath = path.join(__dirname, 'src/gallery');
  const files = fs.readdirSync(galleryPath);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );

  console.log(`📁 Found ${imageFiles.length} images\n`);

  const uploadedUrls = [];

  for (let i = 0; i < imageFiles.length; i++) {
    const filename = imageFiles[i];
    const filePath = path.join(galleryPath, filename);
    
    try {
      console.log(`📸 [${i + 1}/${imageFiles.length}] Uploading: ${filename}`);
      const url = await uploadToCloudinary(filePath, filename);
      console.log(`   ✅ Success: ${url}\n`);
      uploadedUrls.push({ title: `Gallery Image ${i + 1}`, url });
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}\n`);
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Save URLs to a file for manual import
  fs.writeFileSync(
    path.join(__dirname, 'uploaded-gallery-urls.json'), 
    JSON.stringify(uploadedUrls, null, 2)
  );

  console.log('🎉 Done! Check uploaded-gallery-urls.json for results');
}

main().catch(console.error);