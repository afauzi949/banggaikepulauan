const fs = require('fs');

const filesToFix = [
  'src/locales/id.json',
  'src/locales/en.json'
];

const dataDir = 'data/wisata';
const wisataFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json')).map(f => `${dataDir}/${f}`);

filesToFix.push(...wisataFiles);

for (const file of filesToFix) {
  let content = fs.readFileSync(file, 'utf8');
  let data = JSON.parse(content);

  for (const key in data) {
    if (typeof data[key] === 'string') {
      // replace literal '\n\n' (which is 4 characters) with actual newlines
      data[key] = data[key].replace(/\\n\\n/g, '\n\n');
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

console.log("Fixed newlines!");

