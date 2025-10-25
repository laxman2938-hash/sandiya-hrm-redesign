const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://twsrrrejfpdqrptspgyh.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3c3JycmVqZnBkcXJwdHNwZ3loIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTIyMjYwNSwiZXhwIjoyMDc2Nzk4NjA1fQ.F9t5pPL4x-R0Zu2T2jPc90nHegykyiVjEODHMVC_elA';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function setupBucket() {
  try {
    console.log('📦 Checking existing buckets...');
    
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Error listing buckets:', listError);
      return;
    }

    console.log('Existing buckets:');
    buckets.forEach(b => console.log(`  - ${b.name}`));

    // Check if sandiya-hr bucket exists
    const bucketExists = buckets.some(b => b.name === 'sandiya-hr');

    if (bucketExists) {
      console.log('\n✅ Bucket "sandiya-hr" already exists');
    } else {
      console.log('\n📝 Creating bucket "sandiya-hr"...');
      
      const { data, error } = await supabase.storage.createBucket('sandiya-hr', {
        public: true,
      });

      if (error) {
        console.error('❌ Error creating bucket:', error);
      } else {
        console.log('✅ Bucket created successfully:', data);
      }
    }
  } catch (err) {
    console.error('❌ Setup failed:', err);
  }
}

setupBucket();
