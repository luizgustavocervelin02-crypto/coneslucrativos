const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf16le');
const cheerio = require('cheerio');
const $ = cheerio.load(html, { decodeEntities: false });

$('a').each((i, el) => {
    if ($(el).text().includes('BÁSICO') || $(el).text().includes('QUERO O')) {
        console.log("Text:", $(el).text().trim().substring(0, 50));
        console.log("Href:", $(el).attr('href'));
        console.log("Class:", $(el).attr('class'));
        console.log("Onclick:", $(el).attr('onclick'));
    }
});
