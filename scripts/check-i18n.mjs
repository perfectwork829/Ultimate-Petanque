import fs from 'fs';
import vm from 'vm';

const root = 'D:/Tasks/October/Thomas-ultimatepetanque/Ultimate-Petanque';

function norm(s) {
  return s.replace(/\s+/g, ' ').trim();
}
function decode(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

const keys = [];
const seen = new Set();
for (const file of ['index.html', 'privacy-policy.html', 'terms-of-service.html']) {
  const html = fs.readFileSync(`${root}/${file}`, 'utf8');
  const re = /(?:^|[\s])lang="en"[^>]*>([\s\S]*?)<\//g;
  let match;
  while ((match = re.exec(html))) {
    const text = norm(decode(match[1].replace(/<[^>]+>/g, '')));
    if (!text || seen.has(text)) continue;
    seen.add(text);
    keys.push(text);
  }
  const title = html.match(/data-title-en="([^"]+)"/);
  if (title && !seen.has(title[1])) {
    seen.add(title[1]);
    keys.push(title[1]);
  }
}

const sandbox = { window: {} };
vm.createContext(sandbox);
for (const name of ['dict.js', 'dict-legal.js', 'dict-legal-b.js', 'dict-legal-c.js', 'dict-legal-d.js', 'dict-legal-e.js', 'dict-legal-f.js', 'dict-legal-g.js', 'dict-legal-h.js', 'dict-legal-i.js']) {
  const path = `${root}/js/${name}`;
  if (fs.existsSync(path)) vm.runInContext(fs.readFileSync(path, 'utf8'), sandbox);
}
const dict = sandbox.window.UP_DICT;
const langs = ['es', 'de', 'th', 'ar', 'it', 'nl'];
const missing = [];
for (const key of keys) {
  for (const lang of langs) {
    if (!dict[lang] || !dict[lang][key]) missing.push(`${lang}\t${key.slice(0, 90)}`);
  }
}
console.log('keys', keys.length, 'missing', missing.length);
fs.writeFileSync(`${root}/scripts/missing-i18n.txt`, missing.map((line) => line).join('\n'));
const uniq = [...new Set(missing.map((line) => line.split('\t')[1]))];
console.log('unique english missing', uniq.length);
uniq.slice(0, 15).forEach((line) => console.log('-', line));
