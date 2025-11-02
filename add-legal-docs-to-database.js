const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function addLegalDocsToDatabase() {
  try {
    console.log('📄 Adding legal documents to database...\n');

    // Read the uploaded images data
    const resultsPath = path.join(__dirname, 'legal-docs-upload-results.json');
    
    if (!fs.existsSync(resultsPath)) {
      console.error('❌ legal-docs-upload-results.json not found. Run upload-legal-docs.js first.');
      return;
    }

    const legalDocs = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

    console.log(`📊 Found ${legalDocs.length} legal documents to add to database\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const doc of legalDocs) {
      try {
        console.log(`📄 Adding: ${doc.title}`);

        const legalDoc = await prisma.legalDocument.create({
          data: {
            title: doc.title,
            image: doc.image
          }
        });

        console.log(`   ✅ Added with ID: ${legalDoc.id}`);
        successCount++;

      } catch (error) {
        console.error(`   ❌ Failed to add ${doc.title}:`, error.message);
        errorCount++;
      }
    }

    console.log('\n🎉 Legal Documents Database Addition Complete!');
    console.log(`✅ Successfully added: ${successCount} documents`);
    console.log(`❌ Failed: ${errorCount} documents`);
    console.log(`📊 Total processed: ${legalDocs.length}`);

    if (successCount > 0) {
      console.log('\n🌟 You can now view the legal documents at:');
      console.log('   • Admin Panel: http://localhost:3000/admin/legal-documents');
      console.log('   • Public Page: http://localhost:3000/legal-documents');
    }

    // Show current legal documents in database
    const allDocs = await prisma.legalDocument.findMany({
      orderBy: { createdAt: 'desc' }
    });

    console.log(`\n📄 Current Legal Documents in Database (${allDocs.length} total):`);
    allDocs.forEach((doc, index) => {
      console.log(`   ${index + 1}. ${doc.title}`);
    });

  } catch (error) {
    console.error('💥 Database operation failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Check database connection
async function checkConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully\n');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

// Run the script
async function main() {
  const connected = await checkConnection();
  if (connected) {
    await addLegalDocsToDatabase();
  }
}

main();
