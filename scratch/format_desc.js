const fs = require('fs');

const fileIds = ['src/locales/id.json', 'src/locales/en.json'];

const splitRules = [
  {
    key: "wisata.description.liang-molopo",
    splits: ["Dahulu, kawasan ini", "Seketika, kabut tebal", "Peti ini dijaga", "In the past, this area", "Instantly, a thick fog", "This chest is guarded"]
  },
  {
    key: "wisata.description.paisu-batango",
    splits: ["Pada suatu waktu", "Sebelum melakukannya", "Maka sejak saat itu", "Salah satu narasumber", "Penamaan Paisu Batango", "Hal ini sejalan", "Air dari Batango ini", "Once, her child", "Before doing so", "So since then", "One trusted local source", "The naming of Paisu Batango", "This is in line", "Water from this Batango"]
  },
  {
    key: "wisata.description.danau-bundala-alani",
    splits: ["Suatu hari, ketika Lemelu", "Di hari pernikahan", "Kemudian, Anggabule lari", "Kelelawar itu terbang", "One day, when Lemelu", "On the wedding day", "Then, Anggabule ran", "The bat flew far"]
  },
  {
    key: "wisata.description.paisu-pok",
    splits: ["Pada masa itu", "Saking meriahnya", "Namun, tawa tersebut", "Bencana tersebut meninggalkan", "Secara etimologis", "At that time", "The atmosphere was so lively", "However, the laughter", "The disaster left a large hole", "Etymologically"]
  },
  {
    key: "wisata.description.sumur-oang",
    splits: ["Saat ditemukan", "When discovered"]
  },
  {
    key: "wisata.description.bubung-babasal",
    splits: ["Di bawah permukaan", "Kawasan ini juga", "Below the water surface", "This area has also"]
  }
];

for (const file of fileIds) {
  let content = fs.readFileSync(file, 'utf8');
  let data = JSON.parse(content);

  for (const rule of splitRules) {
    if (data[rule.key]) {
      let text = data[rule.key].replace(/\n/g, ' '); // remove existing newlines
      for (const split of rule.splits) {
        text = text.replace(new RegExp(`\\s+${split}`, 'g'), `\\n\\n${split}`);
      }
      data[rule.key] = text;
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

console.log("Locales updated!");

const dataDir = 'data/wisata';
const wisataFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

for (const file of wisataFiles) {
  const filePath = `${dataDir}/${file}`;
  let content = fs.readFileSync(filePath, 'utf8');
  let data = JSON.parse(content);
  
  const slug = file.replace('.json', '');
  const rule = splitRules.find(r => r.key === `wisata.description.${slug}`);
  
  if (rule && data.description) {
    let text = data.description.replace(/\n/g, ' ');
    for (const split of rule.splits) {
      text = text.replace(new RegExp(`\\s+${split}`, 'g'), `\\n\\n${split}`);
    }
    data.description = text;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  }
}

console.log("Data wisata updated!");

