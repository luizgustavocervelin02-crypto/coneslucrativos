const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('C:\\Users\\luizg\\Desktop\\OFERTAS CONE\\index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

$('img').each((i, el) => {
    console.log($(el).attr('src'));
});
