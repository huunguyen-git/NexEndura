const fs = require('fs');
const path = require('path');
const https = require('https');

async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function searchBingForImage(query) {
  try {
    const url = `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&form=HDRSC2`;
    const html = await fetchHtml(url);
    
    // Bing embeds image data in a 'm' attribute on 'a.iusc' tags.
    // We can use a regex to extract the first murl
    const murlRegex = /"murl":"([^"]+)"/;
    const match = html.match(murlRegex);
    
    if (match && match[1]) {
      return match[1]; // The direct image URL
    }
    return null;
  } catch (error) {
    console.error(`Error searching for ${query}:`, error.message);
    return null;
  }
}

async function run() {
  const jsonPath = path.join(__dirname, '..', 'product-image-urls.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  let crawledCount = 0;
  
  for (const [filename, url] of Object.entries(data)) {
    if (!url || url.trim() === '') {
      // Create a search query from the filename (e.g. "nike-air-zoom-pegasus-40-black.jpg" -> "nike air zoom pegasus 40 black shoe")
      const query = filename.replace('.jpg', '').replace(/-/g, ' ') + ' shoe';
      console.log(`Crawling for: ${query}...`);
      
      const imageUrl = await searchBingForImage(query);
      if (imageUrl) {
        console.log(`Found: ${imageUrl}`);
        data[filename] = imageUrl;
        crawledCount++;
      } else {
        console.log(`No image found or blocked by captcha.`);
      }
      
      // Delay to prevent getting blocked instantly
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  console.log(`\nFinished crawling. Successfully auto-filled ${crawledCount} images!`);
}

run().catch(console.error);
