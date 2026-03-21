const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf16le');
const cheerio = require('cheerio');
const $ = cheerio.load(html, { decodeEntities: false });

console.log("---- EXTERNAL SCRIPTS ----");
$('script[src]').each((i, el) => {
    console.log("SRC:", $(el).attr('src'));
});
