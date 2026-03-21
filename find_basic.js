const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf16le');
const cheerio = require('cheerio');
const $ = cheerio.load(html, { decodeEntities: false });

const basicBox = $('h3:contains("Básico")').closest('.bg-foreground\\/5').html();
console.log(basicBox);
