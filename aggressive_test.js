const fs = require('fs');
const cheerio = require('cheerio');
const sharp = require('sharp');
const path = require('path');

async function processHtml() {
    const htmlPath = 'C:\\Users\\luizg\\Desktop\\OFERTAS CONE\\index.html';
    const html = fs.readFileSync(htmlPath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });

    // 1. Remove all links, buttons for instagram and whatsapp
    $('a[href*="instagram.com"], a[href*="wa.me"], a[href*="api.whatsapp.com"]').each((i, el) => {
        console.log("Removing social link: " + $(el).attr('href'));
        $(el).remove();
    });

    // Remove the clock popup. Let's look for "relogio" or "clock" in the document or typical popup divs.
    $('[id*="popup"]').remove();
    $('.popup').remove();
    // Search for images that might be the alarm clock and remove its container
    $('img').each((i, el) => {
        const src = $(el).attr('src') || '';
        if (src.toLowerCase().includes('clock') || src.toLowerCase().includes('relogio') || src.toLowerCase().includes('timer') || src.toLowerCase().includes('alarm')) {
            console.log("Removing clock image container: " + src);
            $(el).closest('div').remove(); // remove parent container
        }
    });

    // 2. Apply temporarily to ALL images
    const images = $('img').toArray();
    for (let i = 0; i < images.length; i++) {
        const el = images[i];

        // fetchpriority="high"
        $(el).attr('fetchpriority', 'high');

        // remover lazy loading, garantir que carreguem imediatamente
        $(el).removeAttr('loading');
        $(el).attr('loading', 'eager');
        $(el).attr('decoding', 'sync'); // render immediately

        // definir width e height
        const src = $(el).attr('src');
        if (src && !src.startsWith('http') && !src.startsWith('data:')) {
            const imgPath = path.join('C:\\Users\\luizg\\Desktop\\OFERTAS CONE', src);
            if (fs.existsSync(imgPath)) {
                try {
                    const metadata = await sharp(imgPath).metadata();
                    if (!$(el).attr('width')) {
                        $(el).attr('width', metadata.width);
                    }
                    if (!$(el).attr('height')) {
                        $(el).attr('height', metadata.height);
                    }
                } catch (e) {
                    console.error("Error reading dimensions for " + src + ": " + e.message);
                }
            }
        }
    }

    fs.writeFileSync('C:\\Users\\luizg\\Desktop\\OFERTAS CONE\\index-aggressiveteste.html', $.html(), 'utf8');

    // Backup original then overwrite
    fs.copyFileSync(htmlPath, 'C:\\Users\\luizg\\Desktop\\OFERTAS CONE\\index.html.bak');
    fs.writeFileSync(htmlPath, $.html(), 'utf8');

    console.log("Process completed. Replaced original index.html. Backup saved as index.html.bak");
}

processHtml();
