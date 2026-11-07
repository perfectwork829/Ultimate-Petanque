import fs from 'fs';
const root = 'D:/Tasks/October/Thomas-ultimatepetanque/Ultimate-Petanque';
const files = ['index.html', 'privacy-policy.html', 'terms-of-service.html'];
for (const file of files) {
  const html = fs.readFileSync(`${root}/${file}`, 'utf8');
  const bad = [];
  if (html.includes('gmail')) bad.push('gmail');
  if (html.includes('French law') || html.includes('droit français')) bad.push('french-law');
  if (html.includes('Matches &')) bad.push('old-cards');
  if (!html.includes('dict-legal-i.js')) bad.push('scripts');
  if (!html.includes('thomas@ultimatepetanque.app')) bad.push('email');
  if ((html.match(/data-lang="/g) || []).length !== 8) bad.push('langs ' + (html.match(/data-lang="/g) || []).length);
  console.log(file, bad.length ? bad.join(',') : 'ok');
}
const privacy = fs.readFileSync(`${root}/privacy-policy.html`, 'utf8');
const terms = fs.readFileSync(`${root}/terms-of-service.html`, 'utf8');
console.log('law25', privacy.includes('Loi 25'));
console.log('quebec terms', terms.includes('district judiciaire de Montréal'));
console.log('audiences', fs.readFileSync(`${root}/index.html`, 'utf8').includes('id="sponsors"'));
const dict = fs.readFileSync(`${root}/js/dict.js`, 'utf8');
console.log('bad arabic mix', dict.includes('البetanque'));
