import fs from 'fs';
const keys = JSON.parse(fs.readFileSync('D:/Tasks/October/Thomas-ultimatepetanque/Ultimate-Petanque/scripts/missing-keys.json', 'utf8'));
keys.forEach((key, i) => console.log(String(i + 1).padStart(2, '0'), key.slice(0, 78)));
