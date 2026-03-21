const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf16le');
const cheerio = require('cheerio');
const $ = cheerio.load(html, { decodeEntities: false });

let found = false;
$('*').each((i, el) => {
    const classes = $(el).attr('class');
    if (classes && (classes.includes('rocket') || classes.includes('wa-') || classes.includes('pop'))) {
        console.log("Found class:", classes);
        found = true;
    }
    const id = $(el).attr('id');
    if (id && (id.includes('rocket') || id.includes('wa-') || id.includes('pop'))) {
        console.log("Found ID:", id);
        found = true;
    }
});
if (!found) console.log("Nothing found.");
