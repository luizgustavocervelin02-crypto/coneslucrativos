const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf16le');
const cheerio = require('cheerio');
const $ = cheerio.load(html, { decodeEntities: false });

console.log("-> Buscando preços");
$('*').each((i, el) => {
    const text = $(el).text();
    if (text.includes('19') || text.includes('10')) {
        const classes = $(el).attr('class');
        if (text.length < 50 && classes && classes.includes('text-')) {
            console.log("Found:", text.trim().substring(0, 50), "Classes:", classes);
        }
    }
});
