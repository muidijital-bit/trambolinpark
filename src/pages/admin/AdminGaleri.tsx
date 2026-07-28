import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { optimizeImage } from '../../lib/imageUtils';
import { AdminPageHeader } from './AdminLayout';
import { Trash2, Upload, ImageIcon } from 'lucide-react';

type GalleryImage = { id: string; url: string; category: string; sort_order: number };

const CATS = [
  { key: 'kurulum',    label: 'Saha Kurulumları' },
  { key: 'top-havuzu', label: 'Top Havuzları' },
  { key: 'softplay',   label: 'Softplay' },
  { key: 'projeler',   label: 'Tamamlanan Projeler' },
];

export default function AdminGaleri() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState('kurulum');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const { data } = await supabase.from('gallery_images').select('*').order('sort_order').order('created_at');
    setImages(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    const maxOrder = images.filter(i => i.category === activeCat).reduce((m, i) => Math.max(m, i.sort_order), -1);
    for (let idx = 0; idx < files.length; idx++) {
      const raw = files[idx];
      try {
        const file = await optimizeImage(raw);
        const path = `gallery/${Date.now()}-${idx}.${file.name.split('.').pop()}`;
        const { error } = await supabase.storage.from('urunler').upload(path, file, { upsert: false });
        if (error) { alert('Yükleme hatası: ' + error.message); continue; }
        const { data: { publicUrl } } = supabase.storage.from('urunler').getPublicUrl(path);
        await supabase.from('gallery_images').insert({ url: publicUrl, category: activeCat, sort_order: maxOrder + 1 + idx });
      } catch { alert('Hata oluştu, tekrar deneyin.'); }
    }
    await load();
    setUploading(false);
  };

  const remove = async (id: string) => {
    if (!confirm('Bu fotoğrafı silmek istediğinize emin misiniz?')) return;
    await supabase.from('gallery_images').delete().eq('id', id);
    setImages(prev => prev.filter(i => i.id !== id));
  };

  const filtered = images.filter(i => i.category === activeCat);

  return (
    <div>
      <AdminPageHeader
        title="Galeri"
        sub="Saha ve ürün fotoğraflarını yönetin"
        action={
          <div>
            <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: 'none' }}
              onChange={e => { handleFiles(e.target.files); e.target.value = ''; }} />
            <button onClick={() => fileRef.current?.click()} disabled={uploading}
              style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#3a7500', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 700, cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.7 : 1 }}>
              <Upload size={15} /> {uploading ? 'Yükleniyor...' : 'Fotoğraf Ekle'}
            </button>
          </div>
        }
      />

      <div style={{ padding: '1.5rem 2rem' }}>
        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {CATS.map(cat => {
            const count = images.filter(i => i.category === cat.key).length;
            const active = activeCat === cat.key;
            return (
              <button key={cat.key} onClick={() => setActiveCat(cat.key)}
                style={{ padding: '7px 16px', borderRadius: 8, border: `1.5px solid ${active ? '#3a7500' : '#e0e0e0'}`, background: active ? '#f0f7e6' : '#fff', color: active ? '#3a7500' : '#666', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                {cat.label}
                <span style={{ marginLeft: 6, fontSize: 11, color: '#aaa' }}>({count})</span>
              </button>
            );
          })}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#aaa' }}>Yükleniyor...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#aaa' }}>
            <ImageIcon size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
            <p style={{ margin: '0 0 12px' }}>Bu kategoride henüz fotoğraf yok.</p>
            <button onClick={() => fileRef.current?.click()}
              style={{ background: '#3a7500', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              Fotoğraf Ekle
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
            {filtered.map(img => (
              <div key={img.id} style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1.5px solid #ebebeb', background: '#f8f8f8', aspectRatio: '4/3' }}>
                <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <button onClick={() => remove(img.id)}
                  style={{ position: 'absolute', top: 6, right: 6, width: 30, height: 30, borderRadius: 6, background: 'rgba(220,38,38,.9)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
