#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const crypto = require('crypto');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log('\n🚀 Setting up EmpTrack with MongoDB...\n');

  // Check if .env file exists
  const envExists = fs.existsSync('.env');
  if (envExists) {
    const overwrite = await prompt('An .env file already exists. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Keeping existing .env file.');
    } else {
      await setupEnv();
    }
  } else {
    await setupEnv();
  }

  // Run Prisma commands
  try {
    console.log('\n📊 Setting up database...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ Prisma client generated.');
    
    const runDbPush = await prompt('\nPush schema to MongoDB? (y/N): ');
    if (runDbPush.toLowerCase() === 'y') {
      execSync('npx prisma db push', { stdio: 'inherit' });
      console.log('✅ Database schema pushed to MongoDB.');
      
      const seedDb = await prompt('\nSeed the database with sample data? (Y/n): ');
      if (seedDb.toLowerCase() !== 'n') {
        execSync('npm run seed', { stdio: 'inherit' });
        console.log('✅ Database seeded with sample data.');
      }
    }
    
    console.log('\n🎉 Setup complete! You can now run the application with:');
    console.log('\nnpm run dev\n');
  } catch (error) {
    console.error('❌ Error during database setup:', error.message);
    console.log('\nPlease check your MongoDB connection and try again.');
  }
  
  rl.close();
}

async function setupEnv() {
  console.log('Setting up environment variables for MongoDB...');
  
  // Get MongoDB details
  console.log('\n📝 MongoDB Connection Details:');
  const useAtlas = await prompt('Are you using MongoDB Atlas? (y/N): ');
  
  let dbUrl = '';
  
  if (useAtlas.toLowerCase() === 'y') {
    console.log('\n📌 For MongoDB Atlas, you need the connection string from your Atlas dashboard');
    dbUrl = await prompt('MongoDB Atlas connection string (mongodb+srv://...): ');
  } else {
    const dbUser = await prompt('MongoDB username (leave empty for none): ');
    const dbPass = dbUser ? await prompt('MongoDB password: ') : '';
    const dbHost = await prompt('MongoDB host (default: localhost): ') || 'localhost';
    const dbPort = await prompt('MongoDB port (default: 27017): ') || '27017';
    const dbName = await prompt('Database name (default: emptrack): ') || 'emptrack';
    
    if (dbUser && dbPass) {
      dbUrl = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;
    } else {
      dbUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`;
    }
  }
  
  // Generate NEXTAUTH_SECRET
  const secret = crypto.randomBytes(32).toString('hex');
  
  // Create .env file
  const envContent = `# Database connection
DATABASE_URL="${dbUrl}"

# NextAuth
NEXTAUTH_SECRET="${secret}"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth (for GitHub integration)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
`;

  fs.writeFileSync('.env', envContent);
  console.log('✅ .env file created with your MongoDB settings and a secure random secret.');
}

main().catch(err => {
  console.error('❌ Error during setup:', err);
  process.exit(1);
}); 