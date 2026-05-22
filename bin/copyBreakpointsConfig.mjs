#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageRoot = path.resolve(__dirname, '..');
const templatesDir = path.resolve(packageRoot, 'templates');

// INIT_CWD is set by npm/yarn to the directory where the install was invoked
// (i.e. the consumer's project root). Fall back to cwd when run manually.
const projectRoot = process.env.INIT_CWD || process.cwd();

// When running inside the package itself (local dev / publish), don't overwrite
// the source config.
if (path.resolve(projectRoot) === packageRoot) {
  console.log('[react-responsive-tools] Skipping config copy (running inside the package).');
  process.exit(0);
}

const filesToCopy = [
  'breakpoints.config.js',
];

for (const fileName of filesToCopy) {
  const templatePath = path.resolve(templatesDir, fileName);
  const destinationPath = path.resolve(projectRoot, fileName);

  if (!fs.existsSync(templatePath)) {
    console.warn(`[react-responsive-tools] Template not found at ${templatePath}, skipping.`);
    continue;
  }

  if (fs.existsSync(destinationPath)) {
    console.log(`[react-responsive-tools] ${fileName} already exists at ${destinationPath}, skipping.`);
    continue;
  }

  try {
    fs.copyFileSync(templatePath, destinationPath);
    console.log(`[react-responsive-tools] Copied ${fileName} to ${destinationPath}`);
  } catch (error) {
    console.warn(`[react-responsive-tools] Failed to copy ${fileName}: ${error.message}`);
    // Don't break the install if the copy fails.
  }
}
