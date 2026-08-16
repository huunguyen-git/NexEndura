const fs = require('fs');
const path = require('path');

const sports = [
  { name: 'Football', slug: 'football' },
  { name: 'Basketball', slug: 'basketball' },
  { name: 'Running', slug: 'running' },
  { name: 'Tennis', slug: 'tennis' },
  { name: 'Gym & Fitness', slug: 'gym-fitness' }
];

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// 40 Unique Hand-Curated Products
const productsData = [
  // Nike
  { brand: 'Nike', name: 'Nike Air Zoom Pegasus 40', sport: 'Running', price: 130, colors: [{n: 'Black', h: '#000000'}, {n: 'White', h: '#ffffff'}] },
  { brand: 'Nike', name: 'Nike Phantom GX Elite', sport: 'Football', price: 250, colors: [{n: 'Blue', h: '#0000ff'}, {n: 'Yellow', h: '#ffff00'}] },
  { brand: 'Nike', name: 'Nike LeBron 21', sport: 'Basketball', price: 200, colors: [{n: 'Red', h: '#ff0000'}, {n: 'Black', h: '#000000'}] },
  { brand: 'Nike', name: 'Nike Zoom Vapor Pro', sport: 'Tennis', price: 120, colors: [{n: 'White', h: '#ffffff'}, {n: 'Blue', h: '#0000ff'}] },
  { brand: 'Nike', name: 'Nike Metcon 9', sport: 'Gym & Fitness', price: 140, colors: [{n: 'Black', h: '#000000'}, {n: 'Orange', h: '#ffa500'}] },
  { brand: 'Nike', name: 'Nike Mercurial Vapor 15', sport: 'Football', price: 260, colors: [{n: 'Pink', h: '#ffc0cb'}, {n: 'White', h: '#ffffff'}] },

  // Adidas
  { brand: 'Adidas', name: 'Adidas Ultraboost Light', sport: 'Running', price: 190, colors: [{n: 'White', h: '#ffffff'}, {n: 'Black', h: '#000000'}] },
  { brand: 'Adidas', name: 'Adidas Predator Elite', sport: 'Football', price: 260, colors: [{n: 'Red', h: '#ff0000'}, {n: 'Yellow', h: '#ffff00'}] },
  { brand: 'Adidas', name: 'Adidas AE 1', sport: 'Basketball', price: 120, colors: [{n: 'Orange', h: '#ffa500'}, {n: 'Black', h: '#000000'}] },
  { brand: 'Adidas', name: 'Adidas Barricade', sport: 'Tennis', price: 150, colors: [{n: 'Blue', h: '#0000ff'}, {n: 'White', h: '#ffffff'}] },
  { brand: 'Adidas', name: 'Adidas Dropset 2', sport: 'Gym & Fitness', price: 130, colors: [{n: 'Black', h: '#000000'}, {n: 'Grey', h: '#808080'}] },
  { brand: 'Adidas', name: 'Adidas Adizero Boston 12', sport: 'Running', price: 160, colors: [{n: 'Cyan', h: '#00ffff'}, {n: 'White', h: '#ffffff'}] },

  // Jordan
  { brand: 'Jordan', name: 'Air Jordan 38', sport: 'Basketball', price: 200, colors: [{n: 'Red', h: '#ff0000'}, {n: 'Black', h: '#000000'}] },
  { brand: 'Jordan', name: 'Jordan Luka 2', sport: 'Basketball', price: 130, colors: [{n: 'Blue', h: '#0000ff'}, {n: 'White', h: '#ffffff'}] },
  { brand: 'Jordan', name: 'Jordan Tatum 1', sport: 'Basketball', price: 120, colors: [{n: 'Black', h: '#000000'}, {n: 'Orange', h: '#ffa500'}] },
  { brand: 'Jordan', name: 'Jordan Zion 3', sport: 'Basketball', price: 140, colors: [{n: 'White', h: '#ffffff'}, {n: 'Red', h: '#ff0000'}] },
  { brand: 'Jordan', name: 'Jordan Super.Fly', sport: 'Gym & Fitness', price: 110, colors: [{n: 'Black', h: '#000000'}, {n: 'Blue', h: '#0000ff'}] },

  // Puma
  { brand: 'Puma', name: 'Puma Velocity Nitro 3', sport: 'Running', price: 130, colors: [{n: 'Orange', h: '#ffa500'}, {n: 'Black', h: '#000000'}] },
  { brand: 'Puma', name: 'Puma Future 7 Ultimate', sport: 'Football', price: 220, colors: [{n: 'Blue', h: '#0000ff'}, {n: 'White', h: '#ffffff'}] },
  { brand: 'Puma', name: 'Puma MB.03', sport: 'Basketball', price: 125, colors: [{n: 'Yellow', h: '#ffff00'}, {n: 'Red', h: '#ff0000'}] },
  { brand: 'Puma', name: 'Puma Eliminate Power', sport: 'Tennis', price: 110, colors: [{n: 'White', h: '#ffffff'}, {n: 'Black', h: '#000000'}] },
  { brand: 'Puma', name: 'Puma PWRFrame TR 3', sport: 'Gym & Fitness', price: 100, colors: [{n: 'Black', h: '#000000'}, {n: 'Red', h: '#ff0000'}] },
  { brand: 'Puma', name: 'Puma Ultra Ultimate', sport: 'Football', price: 200, colors: [{n: 'Pink', h: '#ffc0cb'}, {n: 'Black', h: '#000000'}] },

  // Under Armour
  { brand: 'Under Armour', name: 'UA HOVR Phantom 3', sport: 'Running', price: 140, colors: [{n: 'Black', h: '#000000'}, {n: 'White', h: '#ffffff'}] },
  { brand: 'Under Armour', name: 'UA Clone Magnetico', sport: 'Football', price: 250, colors: [{n: 'Red', h: '#ff0000'}, {n: 'Black', h: '#000000'}] },
  { brand: 'Under Armour', name: 'UA Curry 11', sport: 'Basketball', price: 160, colors: [{n: 'Yellow', h: '#ffff00'}, {n: 'Blue', h: '#0000ff'}] },
  { brand: 'Under Armour', name: 'UA Flow Dynamic', sport: 'Gym & Fitness', price: 130, colors: [{n: 'Orange', h: '#ffa500'}, {n: 'Black', h: '#000000'}] },
  { brand: 'Under Armour', name: 'UA TriBase Reign 6', sport: 'Gym & Fitness', price: 130, colors: [{n: 'Grey', h: '#808080'}, {n: 'Red', h: '#ff0000'}] },

  // New Balance
  { brand: 'New Balance', name: 'NB Fresh Foam X 1080v13', sport: 'Running', price: 165, colors: [{n: 'Blue', h: '#0000ff'}, {n: 'White', h: '#ffffff'}] },
  { brand: 'New Balance', name: 'NB Tekela V4 Pro', sport: 'Football', price: 215, colors: [{n: 'Black', h: '#000000'}, {n: 'Red', h: '#ff0000'}] },
  { brand: 'New Balance', name: 'NB TWO WXY V4', sport: 'Basketball', price: 120, colors: [{n: 'Orange', h: '#ffa500'}, {n: 'Blue', h: '#0000ff'}] },
  { brand: 'New Balance', name: 'NB Coco CG1', sport: 'Tennis', price: 170, colors: [{n: 'White', h: '#ffffff'}, {n: 'Yellow', h: '#ffff00'}] },
  { brand: 'New Balance', name: 'NB Minimus TR', sport: 'Gym & Fitness', price: 130, colors: [{n: 'Black', h: '#000000'}, {n: 'White', h: '#ffffff'}] },
  { brand: 'New Balance', name: 'NB Furon V7 Pro', sport: 'Football', price: 210, colors: [{n: 'Green', h: '#008000'}, {n: 'Black', h: '#000000'}] },

  // ASICS
  { brand: 'ASICS', name: 'ASICS Gel-Nimbus 26', sport: 'Running', price: 160, colors: [{n: 'Blue', h: '#0000ff'}, {n: 'Black', h: '#000000'}] },
  { brand: 'ASICS', name: 'ASICS Novablast 4', sport: 'Running', price: 140, colors: [{n: 'Red', h: '#ff0000'}, {n: 'Yellow', h: '#ffff00'}] },
  { brand: 'ASICS', name: 'ASICS Gel-Resolution 9', sport: 'Tennis', price: 145, colors: [{n: 'White', h: '#ffffff'}, {n: 'Blue', h: '#0000ff'}] },
  { brand: 'ASICS', name: 'ASICS Court FF 3', sport: 'Tennis', price: 170, colors: [{n: 'Orange', h: '#ffa500'}, {n: 'Black', h: '#000000'}] },
  { brand: 'ASICS', name: 'ASICS Metcon Pro', sport: 'Gym & Fitness', price: 150, colors: [{n: 'Black', h: '#000000'}, {n: 'Red', h: '#ff0000'}] }
];

let sql = `-- Seed data generated programmatically\n\n`;

sql += `DELETE FROM product_variants;\n`;
sql += `DELETE FROM products;\n`;
sql += `DELETE FROM categories;\n\n`;

const imageTemplate = {};

// 1. Insert Categories
const catIds = {};
sports.forEach(s => {
  const id = uuidv4();
  catIds[s.name] = id;
  sql += `INSERT INTO categories (id, name, slug, sport) VALUES ('${id}', '${s.name}', '${s.slug}', '${s.name}');\n`;
});
sql += `\n`;

// 2. Insert Products and Variants
productsData.forEach((p, index) => {
  const pId = uuidv4();
  const catId = catIds[p.sport];
  const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000);
  
  // Use semantic local product images
  const imgName1 = `${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${p.colors[0].n.toLowerCase()}.jpg`;
  const imgName2 = `${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${p.colors[1].n.toLowerCase()}.jpg`;
  
  const imgUrl1 = `/products/${imgName1}`;
  const imgUrl2 = `/products/${imgName2}`;
  
  // Track for our JSON template
  imageTemplate[imgName1] = "";
  imageTemplate[imgName2] = "";

  const productImages = JSON.stringify([
    { url: imgUrl1, alt: `${p.name} in ${p.colors[0].n}`, feature_tag: p.colors[0].n },
    { url: imgUrl2, alt: `${p.name} in ${p.colors[1].n}`, feature_tag: p.colors[1].n }
  ]);
  
  sql += `INSERT INTO products (id, name, slug, brand, price, category_id, images, status) 
VALUES ('${pId}', '${p.name}', '${slug}', '${p.brand}', ${p.price}, '${catId}', '${productImages}', 'active');\n`;

  // Variant 1
  const v1 = uuidv4();
  sql += `INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('${v1}', '${pId}', '${slug}-${p.colors[0].n}', '${p.colors[0].n}', '${p.colors[0].h}', ${Math.floor(Math.random()*100) + 10});\n`;

  // Variant 2
  const v2 = uuidv4();
  sql += `INSERT INTO product_variants (id, product_id, sku, color, color_hex, stock_count) 
VALUES ('${v2}', '${pId}', '${slug}-${p.colors[1].n}', '${p.colors[1].n}', '${p.colors[1].h}', ${Math.floor(Math.random()*100) + 10});\n`;
});

const outPath = path.join(__dirname, '..', 'scratch', 'seed.sql');
fs.writeFileSync(outPath, sql);
console.log('Generated seed.sql at', outPath);

const templatePath = path.join(__dirname, '..', 'product-image-urls.json');
fs.writeFileSync(templatePath, JSON.stringify(imageTemplate, null, 2));
console.log('Generated image template at', templatePath);
