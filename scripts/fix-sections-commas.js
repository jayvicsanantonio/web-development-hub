#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sectionsFile = path.join(__dirname, '../constants/sections.ts');

let content = fs.readFileSync(sectionsFile, 'utf8');
let fixedCount = 0;

// Fix missing commas between properties (particularly between href and description)
// This regex looks for href:"https://..." followed directly by description: without a comma
const missingCommaRegex = /(href: "https:\/\/[^"]*")\s+(\w+:)/g;

// Replace with proper comma separation
content = content.replace(missingCommaRegex, (match, p1, p2) => {
  fixedCount++;
  return `${p1},\n        ${p2}`;
});

// Write back the fixed file
if (fixedCount > 0) {
  fs.writeFileSync(sectionsFile, content);
  console.log(`Fixed ${fixedCount} missing commas in sections.ts`);
} else {
  console.log('No missing commas found in sections.ts');
}
