const fs = require('fs');
const inv = fs.readFileSync('src/lib/inventory.ts', 'utf8');
const mass = fs.readFileSync('generated_massive.js', 'utf8');
const top = inv.split('export const mockInventory')[0];
fs.writeFileSync('src/lib/inventory.ts', top + mass);
console.log('Replaced mockInventory successfully!');
