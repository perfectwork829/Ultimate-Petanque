const res = await fetch('http://127.0.0.1:4173/');
const text = await res.text();
console.log(res.status, text.includes('id="sponsors"'), text.includes('dict-legal-i.js'), text.slice(0, 80));
