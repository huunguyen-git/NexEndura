const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const parts = line.split('=');
  if (parts.length > 1) {
    acc[parts[0]] = parts.slice(1).join('=').trim();
  }
  return acc;
}, {});

fetch(env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/products?select=*,category:categories(slug),variants:product_variants(color_hex)', {
  headers: {
    apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    Authorization: 'Bearer ' + env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  }
}).then(r => r.json()).then(console.log).catch(console.error);
