const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function addClientsToDatabase() {
  try {
    console.log('🏢 Adding uploaded client images to database...\n');
    
    // Read the upload results
    const resultsPath = path.join(__dirname, 'client-upload-results.json');
    const uploadedClients = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
    
    console.log(`📄 Found ${uploadedClients.length} client images to add\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < uploadedClients.length; i++) {
      const clientData = uploadedClients[i];
      
      try {
        console.log(`💾 [${i + 1}/${uploadedClients.length}] Adding: ${clientData.name}`);
        
        await prisma.client.create({
          data: {
            name: clientData.name,
            logo: clientData.logo
          }
        });

        console.log(`   ✅ Added to database\n`);
        successCount++;

      } catch (error) {
        console.error(`   ❌ Failed to add ${clientData.name}:`, error.message);
        errorCount++;
      }
    }

    console.log('🎉 Client Database Import Complete!');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📊 Total processed: ${uploadedClients.length}`);
    
    console.log(`\n🌐 View your clients at:`);
    console.log(`   Admin: http://localhost:3000/admin/clients`);
    console.log(`   Public: http://localhost:3000/clients`);

  } catch (error) {
    console.error('💥 Database script failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the database import
addClientsToDatabase();