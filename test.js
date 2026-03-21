const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('old_index.html', 'utf16le');
const $ = cheerio.load(html, { decodeEntities: false });

const pricingTable = $('div').filter((i, el) => $(el).text().includes('PACK') && $(el).text().includes('10'));
console.log(pricingTable.first().html());
