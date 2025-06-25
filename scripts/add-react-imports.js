#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, '../components'),
  path.join(__dirname, '../app')
];

let fixedFiles = 0;

// Process each directory
directories.forEach(dirPath => {
  processDirectory(dirPath);
});

console.log(`\nFixed React imports in ${fixedFiles} files`);

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
  
  // Check if file has JSX (contains < followed by a tag name)
  if (content.match(/<[a-zA-Z]/)) {
    // Check if React is already imported
    const hasReactImport = 
      content.includes("import React") || 
      content.includes("import * as React");
    
    // If React isn't imported but file uses JSX
    if (!hasReactImport) {
      // Add React import at the beginning
      content = `import React from 'react';\n${content}`;
      fileModified = true;
    }
    
    // Fix ComponentProps import if it exists without React
    if (content.includes("import { ComponentProps } from \"react\"")) {
      content = content.replace(
        "import { ComponentProps } from \"react\";",
        "import React, { ComponentProps } from \"react\";"
      );
      fileModified = true;
    }
  }
  
  // Write changes back to file
  if (fileModified) {
    fs.writeFileSync(filePath, content);
    fixedFiles++;
    console.log(`Added React import to: ${path.basename(filePath)}`);
  }
}
