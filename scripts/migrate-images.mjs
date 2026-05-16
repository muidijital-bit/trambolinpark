import { createClient } from '@supabase/supabase-js';
import https from 'https';
import http from 'http';

const supabase = createClient(
  'https://skucanbrmuceruasvjui.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://trambolinpark.com' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ buffer: Buffer.concat(chunks), contentType: res.headers['content-type'] || 'image/jpeg' }));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function getExt(url, contentType) {
  if (url.endsWith('.png') || contentType.includes('png')) return 'png';
  if (url.endsWith('.jpeg') || url.endsWith('.jpg') || contentType.includes('jpeg')) return 'jpg';
  if (url.endsWith('.webp') || contentType.includes('webp')) return 'webp';
  return 'jpg';
}

async function migrateUrl(url, folder) {
  if (!url || url.includes('supabase.co')) return url; // already migrated
  try {
    const { buffer, contentType } = await downloadBuffer(url);
    const ext = getExt(url, contentType);
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const path = `${folder}/${filename}`;
    const { error } = await supabase.storage.from('urunler').upload(path, buffer, { contentType, upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from('urunler').getPublicUrl(path);
    return data.publicUrl;
  } catch (e) {
    console.warn(`  ⚠ Skip ${url.slice(0, 60)}... — ${e.message}`);
    return url; // keep original on failure
  }
}

async function migrateProducts() {
  console.log('\n📦 Ürün görselleri taşınıyor...');
  const { data: products } = await supabase.from('products').select('id, image_url, gallery');
  let done = 0;
  for (const p of products) {
    const updates = {};
    if (p.image_url && !p.image_url.includes('supabase.co')) {
      process.stdout.write(`  [${++done}/${products.length}] ${p.id}... `);
      updates.image_url = await migrateUrl(p.image_url, 'products');
      console.log('✓');
    }
    if (p.gallery?.length) {
      const newGallery = [];
      for (const g of p.gallery) {
        newGallery.push(await migrateUrl(g, 'products/gallery'));
      }
      updates.gallery = newGallery;
    }
    if (Object.keys(updates).length) {
      await supabase.from('products').update(updates).eq('id', p.id);
    }
  }
}

async function migrateSpareParts() {
  console.log('\n🔧 Yedek parça görselleri taşınıyor...');
  const { data: parts } = await supabase.from('spare_parts').select('id, image, category_cover');
  let done = 0;
  for (const p of parts) {
    const updates = {};
    if (p.image && !p.image.includes('supabase.co')) {
      process.stdout.write(`  [${++done}/${parts.length}] ${p.id}... `);
      updates.image = await migrateUrl(p.image, 'spare-parts');
      console.log('✓');
    }
    if (p.category_cover && !p.category_cover.includes('supabase.co')) {
      updates.category_cover = await migrateUrl(p.category_cover, 'spare-parts/covers');
    }
    if (Object.keys(updates).length) {
      await supabase.from('spare_parts').update(updates).eq('id', p.id);
    }
  }
}

async function main() {
  console.log('🚀 Görsel taşıma başlıyor...\n');
  await migrateProducts();
  await migrateSpareParts();
  console.log('\n✅ Tüm görseller Supabase Storage\'a taşındı!');
}

main().catch(console.error);
