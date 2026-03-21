const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf16le');
const cheerio = require('cheerio');
const $ = cheerio.load(html, { decodeEntities: false });

const links = [];
$('a').each((i, el) => {
    const text = $(el).text().trim().replace(/\s+/g, ' ').substring(0, 50);
    if (text.includes('Básico') || $(el).attr('href') === '#') {
        links.push({ text, href: $(el).attr('href'), class: $(el).attr('class') });
    }
});
console.log(JSON.stringify(links, null, 2));
