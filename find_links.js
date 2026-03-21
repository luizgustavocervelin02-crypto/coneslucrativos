const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const oldPath = path.join(__dirname, 'old_index.html');
const oldHtml = fs.readFileSync(oldPath, 'utf8');
const $old = cheerio.load(oldHtml, { decodeEntities: false });

console.log("-> Todos os links <a> no old_index.html:");
const links = [];
$old('a').each((i, el) => {
    links.push({ id: $old(el).attr('id'), class: $old(el).attr('class'), href: $old(el).attr('href'), text: $old(el).text().trim().substring(0, 30) });
});
console.log(links);
