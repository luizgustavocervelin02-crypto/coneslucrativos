const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf16le');
const cheerio = require('cheerio');
const $ = cheerio.load(html, { decodeEntities: false });

console.log("---- SCRIPTS ENCONTRADOS ----");
$('script').each((i, el) => {
    console.log("1. SRC:", $(el).attr('src'));
    const content = $(el).html().trim();
    if (content) console.log("   CONTENT:", content.substring(0, 50));
});
