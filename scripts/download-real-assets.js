const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const productsDir = path.join(__dirname, '..', 'public', 'products');
const logosDir = path.join(__dirname, '..', 'public', 'logos');

if (!fs.existsSync(productsDir)) fs.mkdirSync(productsDir, { recursive: true });
if (!fs.existsSync(logosDir)) fs.mkdirSync(logosDir, { recursive: true });

async function downloadImage(url, dest) {
  if (!url || url.trim() === '') return;
  
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
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
  console.log('1. Downloading Official Brand Logos from Clearbit...');
  const brands = [
    { name: 'Deux par Deux', url: 'https://logo.clearbit.com/deuxpardeux.com' },
    { name: 'Paisley & Gray', url: 'https://logo.clearbit.com/paisleyandgray.com' },
    { name: 'Ally Fashion', url: 'https://logo.clearbit.com/allyfashion.com' },
    { name: 'Nike', url: 'https://logo.clearbit.com/nike.com' },
    { name: 'Adidas', url: 'https://logo.clearbit.com/adidas.com' },
    { name: 'Jordan', url: 'https://logo.clearbit.com/jordan.com' },
    { name: 'Puma', url: 'https://logo.clearbit.com/puma.com' },
    { name: 'Under Armour', url: 'https://logo.clearbit.com/underarmour.com' },
    { name: 'New Balance', url: 'https://logo.clearbit.com/newbalance.com' },
    { name: 'ASICS', url: 'https://logo.clearbit.com/asics.com' }
  ];

  for (let b of brands) {
    const slug = b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const dest = path.join(logosDir, `${slug}.jpg`);
    try {
      await downloadImage(b.url, dest);
      console.log(`[OK] Downloaded logo: ${b.name}`);
    } catch(e) {
      console.log(`[FAIL] Could not fetch logo for ${b.name}: ${e.message}`);
    }
  }

  console.log('\n2. Downloading User-Provided Product Images...');
  const templatePath = path.join(__dirname, '..', 'product-image-urls.json');
  if (!fs.existsSync(templatePath)) {
    console.log('Error: product-image-urls.json not found!');
    return;
  }

  const urlsMap = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
  let count = 0;
  
  for (const [filename, url] of Object.entries(urlsMap)) {
    if (!url || url.trim() === '') {
      continue;
    }
    
    const dest = path.join(productsDir, filename);
    try {
      await downloadImage(url, dest);
      console.log(`[OK] Downloaded: ${filename}`);
      count++;
    } catch(e) {
      console.log(`[FAIL] Failed to download ${filename}: ${e.message}`);
    }
  }
  
  console.log(`\nFinished! Successfully downloaded ${count} product images.`);
}

run().catch(console.error);
