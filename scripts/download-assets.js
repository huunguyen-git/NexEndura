const fs = require('fs');
const path = require('path');
const https = require('https');

const productsDir = path.join(__dirname, '..', 'public', 'products');
const logosDir = path.join(__dirname, '..', 'public', 'logos');

if (!fs.existsSync(productsDir)) fs.mkdirSync(productsDir, { recursive: true });
if (!fs.existsSync(logosDir)) fs.mkdirSync(logosDir, { recursive: true });

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  console.log('Downloading 10 brand logos...');
  const brands = ['Deux par Deux', 'Paisley & Gray', 'Ally Fashion', 'Nike', 'Adidas', 'Jordan', 'Puma', 'Under Armour', 'New Balance', 'ASICS'];
  for (let i = 0; i < brands.length; i++) {
    const slug = brands[i].toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const url = `https://placehold.co/200x200/111111/EEEEEE/png?text=${encodeURIComponent(brands[i])}`;
    const dest = path.join(logosDir, `${slug}.jpg`);
    try {
      await downloadImage(url, dest);
      console.log(`Downloaded ${slug}.jpg`);
    } catch(e) {
      console.log(`Failed logo ${slug}:`, e.message);
    }
  }

  console.log('Downloading 40 product images...');
  for (let i = 1; i <= 40; i++) {
    const url = `https://loremflickr.com/800/800/shoes,sneakers?lock=${i+200}`;
    const dest = path.join(productsDir, `shoe-${i}.jpg`);
    try {
      await downloadImage(url, dest);
      console.log(`Downloaded shoe-${i}.jpg`);
    } catch(e) {
      console.log(`Failed shoe-${i}, using fallback`);
      await downloadImage(`https://placehold.co/800x800/EEEEEE/999999/png?text=Shoe+${i}`, dest);
    }
  }
  
  console.log('Finished downloading all assets!');
}

run().catch(console.error);
