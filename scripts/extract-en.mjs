import fs from 'fs';

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

const set = [];
const seen = new Set();
for (const file of ['index.html', 'privacy-policy.html', 'terms-of-service.html']) {
  const html = fs.readFileSync(`${root}/${file}`, 'utf8');
  const re = /lang="en"[^>]*>([\s\S]*?)<\//g;
  let match;
  while ((match = re.exec(html))) {
    const text = norm(decode(match[1].replace(/<[^>]+>/g, '')));
    if (!text || seen.has(text)) continue;
    seen.add(text);
    set.push(text);
  }
}
fs.writeFileSync(`${root}/scripts/en-keys.json`, JSON.stringify(set, null, 2));
console.log('keys', set.length);
