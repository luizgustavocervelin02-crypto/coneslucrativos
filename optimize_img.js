const fs = require('fs');

async function optimizeImage() {
    try {
        const sharp = require('sharp');
        const imgPath = 'assets/hero-mockup-200-Cbt4LmTE.webp';

        const metadata = await sharp(imgPath).metadata();
        console.log(`Original dimensions: ${metadata.width}x${metadata.height}`);

        await sharp(imgPath)
            .resize({ width: 600 }) // Resize to a max reasonable width for mobile (600px is more than enough for max-w-sm)
            .webp({ quality: 60, effort: 6 }) // Aggressive compression
            .toFile('assets/hero-mockup-optimized.webp');

        const stats = fs.statSync('assets/hero-mockup-optimized.webp');
        const newMeta = await sharp('assets/hero-mockup-optimized.webp').metadata();
        console.log(`Optimized size: ${(stats.size / 1024).toFixed(2)} KB`);
        console.log(`New dimensions: ${newMeta.width}x${newMeta.height}`);
    } catch (e) {
        console.log("Error or sharp not installed:", e.message);
    }
}
optimizeImage();
