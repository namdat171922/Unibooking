const { MongoClient } = require('mongodb');

const urls = [
  'mongodb://localhost:27017',
  'mongodb://127.0.0.1:27017',
  'mongodb://localhost:27017?serverSelectionTimeoutMS=5000',
];

async function testConnections() {
  for (const url of urls) {
    try {
      console.log(`\nTesting: ${url}`);
      const client = new MongoClient(url, { 
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000
      });
      
      await client.connect();
      const admin = client.db('admin');
      await admin.command({ ping: 1 });
      
      const databases = await client.db('admin').admin().listDatabases();
      console.log('✅ Connection SUCCESS');
      console.log('📊 Databases:', databases.databases.map(d => d.name));
      
      await client.close();
    } catch (err) {
      console.log(`❌ Connection FAILED: ${err.message}`);
    }
  }
}

testConnections();
