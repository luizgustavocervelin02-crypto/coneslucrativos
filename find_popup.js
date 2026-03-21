const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf16le');
const cheerio = require('cheerio');
const $ = cheerio.load(html, { decodeEntities: false });

console.log("-> Buscando menção de '19,90' ou popups");
const items = [];
$('*').each((i, el) => {
    if ($(el).text().includes('19,90')) {
        const classes = $(el).attr('class');
        const id = $(el).attr('id');
        items.push({ text: $(el).text().substring(0, 50), class: classes, id: id });
    }
});
console.log(items);
