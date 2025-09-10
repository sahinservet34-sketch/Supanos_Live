#!/usr/bin/env node

// SSL sorununu çözen db:push script (ES Module)
import { execSync } from 'child_process';

// SSL bypass
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

console.log('🔧 SSL bypass ile db:push çalıştırılıyor...');

try {
  execSync('npx drizzle-kit push', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_TLS_REJECT_UNAUTHORIZED: "0"
    }
  });
  console.log('✅ Database migration başarılı!');
} catch (error) {
  console.error('❌ Migration hatası:', error.message);
  process.exit(1);
}