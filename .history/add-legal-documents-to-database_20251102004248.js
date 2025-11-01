const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function addLegalDocumentsToDatabase() {
  try {
    console.log('⚖️ Adding uploaded legal document images to database...\n');
    
    // Read the upload results
    const resultsPath = path.join(__dirname, 'legal-document-upload-results.json');
    const uploadedLegalDocs = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
    
    console.log(`📄 Found ${uploadedLegalDocs.length} legal document images to add\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < uploadedLegalDocs.length; i++) {
      const docData = uploadedLegalDocs[i];
      
      try {
        console.log(`💾 [${i + 1}/${uploadedLegalDocs.length}] Adding: ${docData.title}`);
        
        await prisma.legalDocument.create({
          data: {
            title: docData.title,
            image: docData.image
          }
        });

        console.log(`   ✅ Added to database`);
        console.log(`   🔗 URL: ${docData.image}\n`);
        successCount++;

      } catch (error) {
        console.error(`   ❌ Failed to add ${docData.title}:`, error.message);
        errorCount++;
      }
    }

    console.log('🎉 Legal Documents Database Import Complete!');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📊 Total processed: ${uploadedLegalDocs.length}`);
    
    console.log(`\n🌐 View your legal documents at:`);
    console.log(`   Admin: http://localhost:3000/admin/legal-documents`);
    console.log(`   Public: http://localhost:3000/legal-documents`);

    console.log(`\n📋 Legal Documents Added:`);
    uploadedLegalDocs.forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.title}`);
    });

  } catch (error) {
    console.error('💥 Database script failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the database import
addLegalDocumentsToDatabase();