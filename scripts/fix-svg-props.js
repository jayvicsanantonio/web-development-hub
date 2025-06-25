#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const iconsDir = path.join(__dirname, '../components/icons');
const attributeMap = {
  strokeWidth: 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'fill-opacity': 'fillOpacity',
  'stroke-opacity': 'strokeOpacity',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'clip-path': 'clipPath',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'color-interpolation-filters': 'colorInterpolationFilters',
  'flood-opacity': 'floodOpacity',
  'flood-color': 'floodColor',
};
const iconFiles = fs
  .readdirSync(iconsDir)
  .filter((file) => file.endsWith('.tsx'));
let fixedFiles = 0;
let totalAttributes = 0;
iconFiles.forEach((file) => {
  const filePath = path.join(iconsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let fileModified = false;
  Object.entries(attributeMap).forEach(([kebab, camel]) => {
    const regex = new RegExp(`${kebab}=`, 'g');
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, `${camel}=`);
      fileModified = true;
      totalAttributes += matches.length;
    }
  });
  if (fileModified) {
    fs.writeFileSync(filePath, content);
    fixedFiles++;
    console.log(`Fixed SVG attributes in ${file}`);
  }
});
console.log(
  `\nFixed ${totalAttributes} SVG attributes in ${fixedFiles}/${iconFiles.length} icon files.`
);
