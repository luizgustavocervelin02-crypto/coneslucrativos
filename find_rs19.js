const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf16le');
const cheerio = require('cheerio');
const $ = cheerio.load(html, { decodeEntities: false });

let found = false;
$('*').each((i, el) => {
    if ($(el).text() === 'R$ 19') {
        console.log("Found R$ 19 exactly!");
        console.log("Parent HTML:", $(el).parent().parent().html());
        found = true;
    }
});
if (!found) console.log("Not found.");
