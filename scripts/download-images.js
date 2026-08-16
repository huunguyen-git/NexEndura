const fs = require('fs');
const path = require('path');
const https = require('https');

const images = [
  { name: 'nike-shoe-red.jpg', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop' },
  { name: 'nike-shoe-blue.jpg', url: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800&auto=format&fit=crop' },
  { name: 'nike-shoe-black.jpg', url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop' },
  { name: 'nike-shoe-white.jpg', url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop' },
  { name: 'basketball-orange.jpg', url: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=800&auto=format&fit=crop' },
  { name: 'basketball-black.jpg', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop' },
  { name: 'football-white.jpg', url: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?q=80&w=800&auto=format&fit=crop' },
  { name: 'football-yellow.jpg', url: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=800&auto=format&fit=crop' },
  { name: 'tennis-racket.jpg', url: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=800&auto=format&fit=crop' },
  { name: 'gym-shirt-black.jpg', url: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=800&auto=format&fit=crop' },
  { name: 'gym-mat-purple.jpg', url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=800&auto=format&fit=crop' },
];

const dir = path.join(__dirname, '..', 'scratch', 'product-images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      // Handle redirects if needed, but these unsplash urls usually work directly or redirect once.
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => { file.close(resolve); });
        }).on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
      } else {
        response.pipe(file);
        file.on('finish', () => { file.close(resolve); });
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading images to scratch/product-images...');
  for (const img of images) {
    const dest = path.join(dir, img.name);
    if (!fs.existsSync(dest)) {
      try {
        await download(img.url, dest);
        console.log(`Downloaded ${img.name}`);
      } catch (e) {
        console.error(`Failed to download ${img.name}`, e);
      }
    } else {
      console.log(`Skipped ${img.name} (already exists)`);
    }
  }
  console.log('Done downloading images!');
}

main();
