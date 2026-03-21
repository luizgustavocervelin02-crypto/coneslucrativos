const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf16le');
const cheerio = require('cheerio');
const $ = cheerio.load(html, { decodeEntities: false });

let found = false;
$('*').each((i, el) => {
    const classes = $(el).attr('class') || '';
    if (classes.includes('fixed') && classes.includes('bottom') && $(el).text().includes('restam')) {
        console.log("Found Scarcity Text:", $(el).text());
        console.log("HTML:", $(el).html());
        found = true;
    }
});
if (!found) console.log("Not found.");
