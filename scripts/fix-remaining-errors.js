#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const iconsDir = path.join(__dirname, '../components/icons');
const sectionsFile = path.join(__dirname, '../constants/sections.ts');

// Function to fix SVG components
function fixSvgComponents() {
  const iconFiles = fs.readdirSync(iconsDir).filter(file => file.endsWith('.tsx'));
  let fixedFiles = 0;

  iconFiles.forEach(file => {
    const filePath = path.join(iconsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let fileModified = false;
    
    // Fix issue #1: Missing closing bracket after xmlns attribute
    if (content.includes('<svg xmlns="http://www.w3.org/2000/svg"') && 
        !content.includes('<svg xmlns="http://www.w3.org/2000/svg">') && 
        !content.includes('<svg xmlns="http://www.w3.org/2000/svg" ')) {
      content = content.replace(
        '<svg xmlns="http://www.w3.org/2000/svg"', 
        '<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24"'
      );
      fileModified = true;
    }

    // Fix issue #2: Malformed xmlnsXlink attribute
    if (content.includes('xmlnsXlink="http:')) {
      content = content.replace(
        'xmlnsXlink="http:', 
        'xmlnsXlink="http://www.w3.org/1999/xlink"'
      );
      fileModified = true;
    }
    
    // Write back the file if modifications were made
    if (fileModified) {
      fs.writeFileSync(filePath, content);
      fixedFiles++;
      console.log(`Fixed SVG in ${file}`);
    }
  });
  
  return fixedFiles;
}

// Function to fix sections.ts URLs
function fixSectionsUrls() {
  let content = fs.readFileSync(sectionsFile, 'utf8');
  let fixedCount = 0;
  let modified = false;

  // Fix unterminated URLs in sections.ts
  if (content.includes('href: "https://')) {
    // Find patterns like: href: "https:// that are missing the closing quote
    content = content.replace(/href: "https:\/\/([^"]*?)(?=\s+\w+:|\s*}|\s*\])/g, (match, url) => {
      fixedCount++;
      // Add proper closing quote to URL
      return `href: "https://${url}"`;
    });
    modified = true;
  }

  // Write back the fixed file
  if (modified) {
    fs.writeFileSync(sectionsFile, content);
    console.log(`Fixed ${fixedCount} unterminated URLs in sections.ts`);
  }

  return fixedCount;
}

// Run both fixes
const fixedSvgs = fixSvgComponents();
const fixedUrls = fixSectionsUrls();

console.log(`\nFinal results:\n- Fixed ${fixedSvgs} SVG components\n- Fixed ${fixedUrls} URLs in sections.ts`);
