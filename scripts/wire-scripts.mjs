import fs from 'fs';
const root = 'D:/Tasks/October/Thomas-ultimatepetanque/Ultimate-Petanque';
const block = `  <script src="js/dict.js"></script>
  <script src="js/dict-legal.js"></script>
  <script src="js/dict-legal-b.js"></script>
  <script src="js/dict-legal-c.js"></script>
  <script src="js/dict-legal-d.js"></script>
  <script src="js/dict-legal-e.js"></script>
  <script src="js/dict-legal-f.js"></script>
  <script src="js/dict-legal-g.js"></script>
  <script src="js/dict-legal-h.js"></script>
  <script src="js/dict-legal-i.js"></script>
  <script src="js/site.js"></script>
  <script src="js/analytics.js"></script>`;
for (const file of ['index.html', 'privacy-policy.html', 'terms-of-service.html']) {
  const path = `${root}/${file}`;
  let html = fs.readFileSync(path, 'utf8');
  html = html.replace(/\s*<script src="js\/dict\.js"><\/script>\s*<script src="js\/site\.js"><\/script>\s*<script src="js\/analytics\.js"><\/script>/, '\n' + block);
  if (!html.includes('dict-legal-i.js')) throw new Error('wire failed ' + file);
  fs.writeFileSync(path, html);
  console.log('wired', file);
}
