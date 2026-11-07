import fs from 'fs';
import vm from 'vm';

const root = 'D:/Tasks/October/Thomas-ultimatepetanque/Ultimate-Petanque';
function norm(s) { return s.replace(/\s+/g, ' ').trim(); }
function decode(s) {
  return s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
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
}
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const name of ['dict.js', 'dict-legal.js', 'dict-legal-b.js', 'dict-legal-c.js', 'dict-legal-d.js', 'dict-legal-e.js', 'dict-legal-f.js', 'dict-legal-g.js', 'dict-legal-h.js', 'dict-legal-i.js']) {
  const path = `${root}/js/${name}`;
  if (fs.existsSync(path)) vm.runInContext(fs.readFileSync(path, 'utf8'), sandbox);
}
const dict = sandbox.window.UP_DICT.es;
const missing = keys.filter((key) => !dict[key]);
fs.writeFileSync(`${root}/scripts/missing-keys.json`, JSON.stringify(missing, null, 2));
console.log(missing.length);
