const fs = require('fs');
const cheerio = require('cheerio');
const sharp = require('sharp');
const path = require('path');

const htmlPath = 'C:\\Users\\luizg\\Desktop\\OFERTAS CONE\\index.html';

async function optimizeImages() {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });

    const images = $('img').toArray();
    let totalOptimized = 0;

    for (let i = 0; i < images.length; i++) {
        const el = images[i];
        const src = $(el).attr('src');

        if (!src || src.startsWith('http') || src.startsWith('data:')) continue;

        // Skip the main hero image (it's already optimized and eagerly loaded)
        if (src.includes('hero-mockup')) {
            // Ensure properties are strictly applied for LCP
            $(el).removeAttr('loading'); // no lazy
            $(el).attr('fetchpriority', 'high');
            $(el).attr('decoding', 'sync'); // render immediately
            $(el).attr('width', '600');
            $(el).attr('height', '437');
            continue;
        }

        // Processing remaining images
        // Add loading="lazy" to all others. Remove fetchpriority
        $(el).attr('loading', 'lazy');
        $(el).removeAttr('fetchpriority');

        const originalImgPath = path.join('C:\\Users\\luizg\\Desktop\\OFERTAS CONE', src);
        if (!fs.existsSync(originalImgPath)) continue;

        const stat = fs.statSync(originalImgPath);

        let targetSrc = src;

        // If > 50KB, we compress it
        if (stat.size > 50 * 1024) {
            const parsed = path.parse(src);
            const optimizedFilename = `${parsed.name}-opt.webp`;
            const optimizedPath = path.join('C:\\Users\\luizg\\Desktop\\OFERTAS CONE\\assets', optimizedFilename);

            try {
                // Compress to webp, resize slightly if it's too big to ensure it fits 50KB
                const metadata = await sharp(originalImgPath).metadata();
                const targetWidth = metadata.width > 800 ? 800 : metadata.width;

                await sharp(originalImgPath)
                    .resize({ width: targetWidth })
                    .webp({ quality: 60, effort: 6 })
                    .toFile(optimizedPath);

                const optStat = fs.statSync(optimizedPath);
                console.log(`Optimized ${src}: ${(stat.size / 1024).toFixed(1)}KB -> ${(optStat.size / 1024).toFixed(1)}KB`);

                targetSrc = `assets/${optimizedFilename}`;
                $(el).attr('src', targetSrc);
                totalOptimized++;
            } catch (err) {
                console.error(`Failed to compress ${src}:`, err);
            }
        } else {
            console.log(`Skipping compression for ${src}, size is ${(stat.size / 1024).toFixed(1)}KB (<= 50KB)`);
        }

        // Add width and height dimensions to all
        try {
            const finalImgPath = path.join('C:\\Users\\luizg\\Desktop\\OFERTAS CONE', targetSrc);
            const metadata = await sharp(finalImgPath).metadata();
            if (!$(el).attr('width')) $(el).attr('width', metadata.width);
            if (!$(el).attr('height')) $(el).attr('height', metadata.height);
        } catch (e) {
            console.error(`Failed to get dimensions for ${targetSrc}:`, e);
        }
    }

    // Save final HTML
    fs.writeFileSync(htmlPath, $.html(), 'utf8');
    console.log(`\nFinished! Total images optimized: ${totalOptimized}`);
    console.log(`HTML updated with dynamic width/height and lazy loading attributes.`);
}

optimizeImages();
