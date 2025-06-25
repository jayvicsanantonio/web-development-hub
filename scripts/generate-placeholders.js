const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');
const missingImages = [
  'react',
  'nextjs',
  'tailwindcss',
  'nodejs',
  'vuejs',
  'expressjs',
  'stackoverflow',
  'devto',
  'reddit',
  'discord',
  'frontendmentor',
  'hashnode',
  'overreacted',
  'joshwcomeau',
  'csstricks',
  'kentcdodds',
  'smashing',
  'logrocket',
];
const width = 300;
const height = 200;
const outputDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
missingImages.forEach(imageName => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f5f5f5';
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 2;
  ctx.strokeRect(5, 5, width - 10, height - 10);
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(imageName, width / 2, height / 2);
  const outputPath = path.join(outputDir, `${imageName}.png`);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated placeholder for ${imageName}.png`);
});
console.log('All placeholder images generated successfully!');
