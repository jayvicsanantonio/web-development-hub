const fs = require('fs');
const path = require('path');
const iconsDir = path.join(__dirname, '../components/icons');

// Function to read all icon files
const readIconFiles = () => {
  return fs.readdirSync(iconsDir)
    .filter(file => file.endsWith('.tsx'))
    .map(file => path.join(iconsDir, file));
};

// Function to process each file
const processFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Pattern to match "import React, { ComponentProps } from "react";" and similar variations
  const reactImportPattern = /import React,?\s*{\s*ComponentProps\s*}\s*from\s*["']react["'];/;
  
  // Replace with just ComponentProps import
  const updatedContent = content.replace(
    reactImportPattern, 
    'import { ComponentProps } from "react";'
  );
  
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    return filePath;
  }
  
  return null;
};

// Main function
const main = () => {
  const files = readIconFiles();
  console.log(`Found ${files.length} icon files to process`);
  
  let modifiedCount = 0;
  const modifiedFiles = [];
  
  files.forEach(file => {
    const result = processFile(file);
    if (result) {
      modifiedCount++;
      modifiedFiles.push(path.basename(file));
    }
  });
  
  console.log(`Modified ${modifiedCount} files:`);
  console.log(modifiedFiles.join('\n'));
};

main();
