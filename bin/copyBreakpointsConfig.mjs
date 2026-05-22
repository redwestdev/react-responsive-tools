#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageRoot = path.resolve(__dirname, '..');
const templatePath = path.resolve(packageRoot, 'templates/breakpoints.config.ts');

// INIT_CWD is set by npm/yarn to the directory where the install was invoked
// (i.e. the consumer's project root). Fall back to cwd when run manually.
const projectRoot = process.env.INIT_CWD || process.cwd();

// When running inside the package itself (local dev / publish), don't overwrite
// the source config.
if (path.resolve(projectRoot) === packageRoot) {
  console.log('[react-responsive-tools] Skipping config copy (running inside the package).');
  process.exit(0);
}

const destinationPath = path.resolve(projectRoot, 'breakpoints.config.ts');

if (!fs.existsSync(templatePath)) {
  console.warn(`[react-responsive-tools] Template not found at ${templatePath}, skipping copy.`);
  process.exit(0);
}

if (fs.existsSync(destinationPath)) {
  console.log(`[react-responsive-tools] breakpoints.config.ts already exists at ${destinationPath}, skipping copy.`);
  process.exit(0);
}

try {
  fs.copyFileSync(templatePath, destinationPath);
  console.log(`[react-responsive-tools] Copied breakpoints.config.ts to ${destinationPath}`);
} catch (error) {
  console.warn(`[react-responsive-tools] Failed to copy breakpoints.config.ts: ${error.message}`);
  // Don't break the install if the copy fails.
  process.exit(0);
}
