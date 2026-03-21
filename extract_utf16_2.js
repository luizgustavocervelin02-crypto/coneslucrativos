const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf16le');
const cheerio = require('cheerio');
const $ = cheerio.load(html, { decodeEntities: false });

const links = [];
$('a').each((i, el) => {
    const text = $(el).text().trim().replace(/\s+/g, ' ').substring(0, 50);
    const href = $(el).attr('href');
    if (href && href !== '#' && href !== '#checkout' && (href.includes('hotmart') || href.includes('ggcheckout') || href.includes('pay') || href.includes('whatsapp'))) {
        links.push({ text, href: href.split('?')[0] }); // simplify href for log
    }
});
console.log(JSON.stringify(links, null, 2));
