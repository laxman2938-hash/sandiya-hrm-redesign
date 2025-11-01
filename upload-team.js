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

async function uploadTeamMemberImages() {
  try {
    console.log('👥 Starting team member images upload to Cloudinary...\n');
    
    const teamPath = path.join(__dirname, 'src/team');
    const files = fs.readdirSync(teamPath);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    console.log(`📁 Found ${imageFiles.length} team member images to upload\n`);

    let successCount = 0;
    let errorCount = 0;
    const uploadedImages = [];

    // Dummy team member names and designations
    const teamMembers = [
      { name: 'Rajesh Sharma', designation: 'Managing Director' },
      { name: 'Poonam Shrestha', designation: 'HR Manager' },
      { name: 'Amit Kumar', designation: 'Operations Manager' },
      { name: 'Sunita Adhikari', designation: 'Finance Manager' }
    ];

    for (let i = 0; i < imageFiles.length; i++) {
      const filename = imageFiles[i];
      const filePath = path.join(teamPath, filename);
      
      try {
        console.log(`👥 [${i + 1}/${imageFiles.length}] Uploading: ${filename}`);
        
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'sandiya-hr/team',
          public_id: `team_member_${Date.now()}_${i}`,
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' },
            { gravity: 'face', crop: 'fill', aspect_ratio: '1:1' } // Square crop focusing on face
          ]
        });

        console.log(`   ✅ Uploaded to: ${result.secure_url}`);

        const memberData = teamMembers[i] || { 
          name: `Team Member ${i + 1}`, 
          designation: 'Staff Member' 
        };

        uploadedImages.push({
          name: memberData.name,
          designation: memberData.designation,
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

    // Save results to JSON file for manual database import
    fs.writeFileSync(
      path.join(__dirname, 'team-upload-results.json'),
      JSON.stringify(uploadedImages, null, 2)
    );

    console.log('\n🎉 Team Member Images Upload Complete!');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📊 Total processed: ${imageFiles.length}`);
    console.log(`\n📄 Results saved to: team-upload-results.json`);
    console.log(`\n🔗 Now you can add these to your database via admin panel:`);
    console.log(`   http://localhost:3000/admin/team`);

    console.log(`\n👥 Team Members Ready to Add:`);
    uploadedImages.forEach((member, index) => {
      console.log(`   ${index + 1}. ${member.name} - ${member.designation}`);
    });

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
uploadTeamMemberImages();