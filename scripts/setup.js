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
  console.log('\n🚀 Setting up EmpTrack...\n');

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
    
    const runMigration = await prompt('\nRun database migrations? This will reset your database. (y/N): ');
    if (runMigration.toLowerCase() === 'y') {
      execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
      console.log('✅ Database migrations completed.');
      
      const seedDb = await prompt('\nSeed the database with sample data? (Y/n): ');
      if (seedDb.toLowerCase() !== 'n') {
        execSync('npm run db:seed', { stdio: 'inherit' });
        console.log('✅ Database seeded with sample data.');
      }
    }
    
    console.log('\n🎉 Setup complete! You can now run the application with:');
    console.log('\nnpm run dev\n');
  } catch (error) {
    console.error('❌ Error during database setup:', error.message);
    console.log('\nPlease check your database connection and try again.');
  }
  
  rl.close();
}

async function setupEnv() {
  console.log('Setting up environment variables...');
  
  // Get database details
  const dbUser = await prompt('Database username (default: postgres): ') || 'postgres';
  const dbPass = await prompt('Database password: ');
  const dbHost = await prompt('Database host (default: localhost): ') || 'localhost';
  const dbPort = await prompt('Database port (default: 5432): ') || '5432';
  const dbName = await prompt('Database name (default: emptracker): ') || 'emptracker';
  
  // Generate NEXTAUTH_SECRET
  const secret = crypto.randomBytes(32).toString('hex');
  
  // Create .env file
  const envContent = `# Database connection
DATABASE_URL="postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=public"

# NextAuth
NEXTAUTH_SECRET="${secret}"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth (for GitHub integration)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
`;

  fs.writeFileSync('.env', envContent);
  console.log('✅ .env file created with your database settings and a secure random secret.');
}

main().catch(err => {
  console.error('❌ Error during setup:', err);
  process.exit(1);
}); 