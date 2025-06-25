#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const iconsDir = path.join(__dirname, '../components/icons');

// Get all .tsx files in the icons directory
const iconFiles = fs.readdirSync(iconsDir).filter(file => file.endsWith('.tsx'));

let fixedFiles = 0;

iconFiles.forEach(file => {
  const filePath = path.join(iconsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let fileModified = false;
  
  // Fix truncated xmlns="http: to xmlns="http://www.w3.org/2000/svg"
  if (content.includes('xmlns="http:') || content.includes("xmlns='http:")) {
    content = content.replace(/xmlns=["']http:/g, 'xmlns="http://www.w3.org/2000/svg"');
    fileModified = true;
  }
  
  // Write back the file if modifications were made
  if (fileModified) {
    fs.writeFileSync(filePath, content);
    fixedFiles++;
    console.log(`Fixed SVG xmlns in ${file}`);
  }
});

console.log(`\nFixed SVG xmlns in ${fixedFiles}/${iconFiles.length} icon files.`);
