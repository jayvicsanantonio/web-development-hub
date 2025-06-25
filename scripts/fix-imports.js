#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, '../components'),
  path.join(__dirname, '../app')
];

let fixedDuplicateImports = 0;
let fixedClientDirectives = 0;

// Process each directory
directories.forEach(dirPath => {
  processDirectory(dirPath);
});

console.log(`\nFixed ${fixedDuplicateImports} files with duplicate React imports`);
console.log(`Fixed ${fixedClientDirectives} files with misplaced "use client" directives`);

// Recursively process directories
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      processDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      // Process JSX files
      fixReactImports(filePath);
    }
  });
}

function fixReactImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let fileModified = false;
  
  // Fix 1: Deduplicate React imports
  // Check for duplicate React imports
  const duplicateReactImport = content.match(/import React from ['"]react['"];.*?\n.*?import React,/s);
  
  if (duplicateReactImport) {
    // Remove the first import React and keep the one with additional imports
    content = content.replace(/import React from ['"]react['"];(\r?\n|\r)/, '');
    fileModified = true;
    fixedDuplicateImports++;
  }
  
  // Fix 2: Move "use client" directive to the top
  const hasClientDirective = content.includes('"use client"');
  
  if (hasClientDirective && !content.startsWith('"use client"')) {
    // Remove the directive from its current position
    content = content.replace(/"use client";(\r?\n|\r)/, '');
    // Add it to the top
    content = '"use client";\n\n' + content;
    fileModified = true;
    fixedClientDirectives++;
  }
  
  // Write changes back to file
  if (fileModified) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${path.basename(filePath)}`);
  }
}
