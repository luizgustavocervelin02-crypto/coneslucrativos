const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf16le');
const cheerio = require('cheerio');
const $ = cheerio.load(html, { decodeEntities: false });

console.log("---- ROCKET POPUP ----");
console.log($('.rocket-popup-root').html());

console.log("---- WA LEADS ----");
console.log($('.wa-leads-root').first().html());
