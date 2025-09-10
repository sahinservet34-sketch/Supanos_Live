#!/usr/bin/env node

// Non-interactive db:push script
import { execSync } from 'child_process';

console.log('🚀 Non-interactive db:push çalıştırılıyor...');

try {
  execSync('npx drizzle-kit push --force', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_TLS_REJECT_UNAUTHORIZED: "0"
    }
  });
  console.log('✅ Database migration tamamlandı!');
} catch (error) {
  console.error('❌ Migration hatası:', error.message);
  process.exit(1);
}