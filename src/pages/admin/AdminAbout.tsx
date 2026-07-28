import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { optimizeImage } from '../../lib/imageUtils';
import { AdminPageHeader } from './AdminLayout';
import { Save, Upload } from 'lucide-react';

type Stat = { value: string; label: string };

type AboutData = {
  stats: Stat[];
  story_images: string[];
  strip_images: string[];
};

const DEFAULTS: AboutData = {
  stats: [
    { value: '18+',  label: 'Yıllık Deneyim' },
    { value: '623+', label: 'Tamamlanan Proje' },
    { value: '81',   label: 'İlde Kurulum' },
    { value: '%100', label: 'Yerli Üretim' },
  ],
  story_images: ['/images/about-story-1.jpeg', '/images/about-story-2.jpeg', '/images/about-story-3.jpeg'],
  strip_images: ['/images/about-1.jpeg', '/images/about-2.jpeg', '/images/about-3.jpeg'],
};

async function loadSettings(): Promise<AboutData> {
  const { data } = await supabase.from('about_settings').select('key, value');
  if (!data || data.length === 0) return DEFAULTS;
  const map: Record<string, string> = {};
  data.forEach((r: { key: string; value: string }) => { map[r.key] = r.value; });
  return {
    stats: map.stats ? JSON.parse(map.stats) : DEFAULTS.stats,
    story_images: map.story_images ? JSON.parse(map.story_images) : DEFAULTS.story_images,
    strip_images: map.strip_images ? JSON.parse(map.strip_images) : DEFAULTS.strip_images,
  };
}

async function saveKey(key: string, value: string) {
  await supabase.from('about_settings').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
}

export default function AdminAbout() {
  const [data, setData] = useState<AboutData>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const storyRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const stripRefs  = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  useEffect(() => {
    loadSettings().then(d => { setData(d); setLoading(false); });
  }, []);

  const uploadImage = async (section: 'story' | 'strip', index: number, file: File) => {
    const key = `${section}-${index}`;
    setUploading(key);
    try {
      const optimized = await optimizeImage(file);
      const path = `about/${section}-${index}-${Date.now()}.${optimized.name.split('.').pop()}`;
      const { error } = await supabase.storage.from('urunler').upload(path, optimized, { upsert: false });
      if (error) { alert('Yükleme hatası: ' + error.message); return; }
      const { data: { publicUrl } } = supabase.storage.from('urunler').getPublicUrl(path);
      setData(prev => {
        const updated = { ...prev };
        if (section === 'story') {
          updated.story_images = [...prev.story_images];
          updated.story_images[index] = publicUrl;
        } else {
          updated.strip_images = [...prev.strip_images];
          updated.strip_images[index] = publicUrl;
        }
        return updated;
      });
    } catch { alert('Hata oluştu.'); }
    setUploading(null);
  };

  const save = async () => {
    setSaving(true);
    await Promise.all([
      saveKey('stats', JSON.stringify(data.stats)),
      saveKey('story_images', JSON.stringify(data.story_images)),
      saveKey('strip_images', JSON.stringify(data.strip_images)),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: '#aaa' }}>Yükleniyor...</div>;

  const imgBox = (src: string, label: string, onUpload: (f: File) => void, inputRef: React.RefObject<HTMLInputElement | null>) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: '#555', margin: 0 }}>{label}</p>
      <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1.5px solid #ebebeb', background: '#f8f8f8', aspectRatio: '4/3', maxWidth: 220 }}>
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <button onClick={() => inputRef.current?.click()}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.45)', border: 'none', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', opacity: 0, transition: 'opacity .2s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0')}>
          <Upload size={20} />
          <span style={{ fontSize: 12, fontWeight: 700 }}>Değiştir</span>
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={e => { if (e.target.files?.[0]) onUpload(e.target.files[0]); e.target.value = ''; }} />
    </div>
  );

  return (
    <div>
      <AdminPageHeader
        title="Hakkımızda"
        sub="Hakkımızda sayfası içeriğini düzenleyin"
        action={
          <button onClick={save} disabled={saving}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: saved ? '#3a7500' : '#1a1a1a', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'background .3s' }}>
            <Save size={15} /> {saved ? 'Kaydedildi ✓' : saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        }
      />

      <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: 900 }}>

        {/* Stats */}
        <section>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: '#1a1a1a', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1.5px solid #ebebeb' }}>İstatistikler</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {data.stats.map((stat, i) => (
              <div key={i} style={{ background: '#fff', border: '1.5px solid #ebebeb', borderRadius: 12, padding: '1rem' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>İstatistik {i + 1}</p>
                <input value={stat.value} onChange={e => setData(prev => { const s = [...prev.stats]; s[i] = { ...s[i], value: e.target.value }; return { ...prev, stats: s }; })}
                  placeholder="18+" style={{ width: '100%', marginBottom: 8, border: '1.5px solid #e0e0e0', borderRadius: 8, padding: '7px 10px', fontSize: 18, fontWeight: 800, color: '#3a7500' }} />
                <input value={stat.label} onChange={e => setData(prev => { const s = [...prev.stats]; s[i] = { ...s[i], label: e.target.value }; return { ...prev, stats: s }; })}
                  placeholder="Yıllık Deneyim" style={{ width: '100%', border: '1.5px solid #e0e0e0', borderRadius: 8, padding: '7px 10px', fontSize: 12, color: '#555' }} />
              </div>
            ))}
          </div>
        </section>

        {/* Story images */}
        <section>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: '#1a1a1a', marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1.5px solid #ebebeb' }}>Biz Kimiz? Bölümü Görselleri</h3>
          <p style={{ fontSize: 12, color: '#aaa', marginBottom: '1rem' }}>Büyük (üst) görsel + 2 küçük (alt) görsel</p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {data.story_images.map((src, i) => imgBox(
              src,
              i === 0 ? 'Büyük Görsel (Üst)' : `Küçük Görsel ${i} (Alt)`,
              f => uploadImage('story', i, f),
              storyRefs[i],
            ))}
          </div>
          {uploading?.startsWith('story') && <p style={{ fontSize: 12, color: '#3a7500', marginTop: 8 }}>Yükleniyor...</p>}
        </section>

        {/* Strip images */}
        <section>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: '#1a1a1a', marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1.5px solid #ebebeb' }}>Alt Galeri Şeridi Görselleri</h3>
          <p style={{ fontSize: 12, color: '#aaa', marginBottom: '1rem' }}>Sayfanın alt kısmındaki 3'lü galeri şeridi</p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {data.strip_images.map((src, i) => imgBox(
              src,
              `Görsel ${i + 1}${i === 0 ? ' (Büyük — Sol)' : ''}`,
              f => uploadImage('strip', i, f),
              stripRefs[i],
            ))}
          </div>
          {uploading?.startsWith('strip') && <p style={{ fontSize: 12, color: '#3a7500', marginTop: 8 }}>Yükleniyor...</p>}
        </section>

      </div>
    </div>
  );
}
