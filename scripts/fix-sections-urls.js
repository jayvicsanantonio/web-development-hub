#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sectionsFile = path.join(__dirname, '../constants/sections.ts');

let content = fs.readFileSync(sectionsFile, 'utf8');
let fixedCount = 0;

// Regular expression to find truncated URLs (href: "https:)
const truncatedUrlRegex = /href: "https:/g;

// Replace with proper URL syntax
content = content.replace(truncatedUrlRegex, (match) => {
  fixedCount++;
  return 'href: "https://';
});

// Write back the fixed file
if (fixedCount > 0) {
  fs.writeFileSync(sectionsFile, content);
  console.log(`Fixed ${fixedCount} truncated URLs in sections.ts`);
} else {
  console.log('No truncated URLs found in sections.ts');
}
