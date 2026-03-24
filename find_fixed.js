const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log("--- FIXED ELEMENTS ---");
const fixed = html.match(/<[^>]+class="[^"]*fixed[^"]*"[^>]*>[\s\S]{0,1000}<\/[a-zA-Z]+>/g);
if (fixed) fixed.forEach((el, i) => console.log('\n[MATCH ' + i + ']\n' + el.substring(0, 300) + '...\n===\n' + el.substring(el.length - 100)));

console.log("\n--- OTHER WHATSAPP TEXTS ---");
// Find tags with text that has WhatsApp logic/numbers
const allTextTags = html.match(/<[^>]+>[^<]*whatsapp[^<]*<\/[^>]+>/gi);
if (allTextTags) allTextTags.forEach((el, i) => console.log('\n[WA TEXT ' + i + ']', el));

// Links to WA and Instagram are already known from get_links.js
