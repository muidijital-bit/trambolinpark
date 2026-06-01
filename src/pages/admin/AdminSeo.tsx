import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { AdminPageHeader } from './AdminLayout';
import { Save, Globe, Tag, Image, BarChart2, RefreshCw } from 'lucide-react';

type SiteSettings = {
  site_title: string;
  site_description: string;
  keywords: string;
  og_image: string;
  favicon_url: string;
  google_analytics_id: string;
};

const DEFAULTS: SiteSettings = {
  site_title: 'Ticari Trambolin Park Ekipmanı Üreticisi | TrambolinPark',
  site_description: 'TrambolinPark: EN-1176 sertifikalı ticari trambolin, softplay ve oyun parkı ekipmanları. 81 ilde kurulum ve satış. AVM, işletme ve eğlence merkezlerine anahtar teslim çözüm.',
  keywords: 'ticari trambolin üretici, trambolin park ekipmanı, soft play üretici türkiye, top havuzu imalatçı, trambolin park kurulum, kapalı oyun alanı üretimi, EN-1176 sertifikalı, oyun parkı ekipmanı, AVM oyun parkı, profesyonel trambolin imalatı',
  og_image: 'https://trambolinpark.com/album/trambolinparkyeni/coklualbumler/-VkT.jpg',
  favicon_url: '',
  google_analytics_id: '',
};

const SECTIONS = [
  {
    key: 'seo',
    label: 'Temel SEO',
    icon: <Globe size={16} />,
    color: '#7c3aed',
    bg: '#f5f3ff',
    fields: [
      { key: 'site_title',       label: 'Site Başlığı (Title)',     type: 'text',     max: 60,  placeholder: 'Ticari Trambolin Park Ekipmanı Üreticisi | TrambolinPark', hint: 'Tarayıcı sekmesinde ve Google sonuçlarında görünür.' },
      { key: 'site_description', label: 'Meta Açıklaması',          type: 'textarea', max: 160, placeholder: 'TrambolinPark: EN-1176 sertifikalı ticari trambolin...', hint: 'Google arama sonuçlarında başlığın altında çıkar.' },
    ],
  },
  {
    key: 'keywords',
    label: 'Anahtar Kelimeler',
    icon: <Tag size={16} />,
    color: '#059669',
    bg: '#ecfdf5',
    fields: [
      { key: 'keywords', label: 'Keywords', type: 'textarea', max: 0, placeholder: 'ticari trambolin üretici, soft play üretici, top havuzu...', hint: 'Virgülle ayırın. Google önemsemese de diğer arama motorları kullanır.' },
    ],
  },
  {
    key: 'social',
    label: 'Sosyal Medya (OG)',
    icon: <Image size={16} />,
    color: '#0284c7',
    bg: '#f0f9ff',
    fields: [
      { key: 'og_image', label: 'OG Görsel URL', type: 'text', max: 0, placeholder: 'https://trambolinpark.com/...', hint: 'WhatsApp, Twitter, Facebook paylaşımlarında çıkacak görsel.' },
    ],
  },
  {
    key: 'analytics',
    label: 'Analitik',
    icon: <BarChart2 size={16} />,
    color: '#d97706',
    bg: '#fffbeb',
    fields: [
      { key: 'google_analytics_id', label: 'Google Analytics ID', type: 'text', max: 0, placeholder: 'G-XXXXXXXXXX', hint: 'Google Analytics 4 ölçüm ID\'si.' },
    ],
  },
];

export default function AdminSeo() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from('site_settings').select('*').eq('id', 1).single().then(({ data }) => {
      if (data) {
        setSettings({
          site_title:           data.site_title       || DEFAULTS.site_title,
          site_description:     data.site_description || DEFAULTS.site_description,
          keywords:             data.keywords         || DEFAULTS.keywords,
          og_image:             data.og_image         || DEFAULTS.og_image,
          favicon_url:          data.favicon_url      || '',
          google_analytics_id:  data.google_analytics_id || '',
        });
      }
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    await supabase.from('site_settings').upsert({ id: 1, ...settings });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const reset = () => setSettings(DEFAULTS);

  const set = (key: keyof SiteSettings, value: string) =>
    setSettings(prev => ({ ...prev, [key]: value }));

  if (loading) return (
    <div>
      <AdminPageHeader title="SEO Ayarları" />
      <div className="text-center py-5">
        <div className="spinner-border" style={{ color: '#7c3aed', width: 28, height: 28, borderWidth: 3 }} role="status" />
      </div>
    </div>
  );

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh' }}>
      <AdminPageHeader
        title="SEO Ayarları"
        sub="Sitenin genel arama motoru ve sosyal medya ayarları"
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={reset} style={{ background: '#f5f5f5', border: 'none', borderRadius: 8, padding: '8px 14px', color: '#888', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <RefreshCw size={13} /> Varsayılana Dön
            </button>
            <button onClick={save} disabled={saving}
              style={{ background: saved ? '#dcfce7' : '#c3e92d', color: saved ? '#16a34a' : '#0a0a0a', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all .2s' }}>
              <Save size={13} /> {saving ? 'Kaydediliyor...' : saved ? 'Kaydedildi ✓' : 'Kaydet'}
            </button>
          </div>
        }
      />

      <div style={{ padding: '2rem', maxWidth: 760 }}>
        {SECTIONS.map(section => (
          <div key={section.key} style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 14, marginBottom: '1.25rem', overflow: 'hidden' }}>
            {/* Section header */}
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #f5f5f5', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ background: section.bg, color: section.color, width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {section.icon}
              </div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#1a1a1a' }}>{section.label}</p>
            </div>

            <div style={{ padding: '1.25rem' }}>
              {section.fields.map(field => {
                const val = settings[field.key as keyof SiteSettings];
                const len = val.length;
                const over = field.max > 0 && len > field.max;
                const warn = field.max > 0 && len > field.max * 0.85 && !over;
                return (
                  <div key={field.key} style={{ marginBottom: section.fields.length > 1 ? '1.25rem' : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <label style={{ color: '#555', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em' }}>{field.label}</label>
                      {field.max > 0 && (
                        <span style={{ fontSize: 11, fontWeight: 600, color: over ? '#dc2626' : warn ? '#d97706' : '#ccc' }}>
                          {len}/{field.max}
                        </span>
                      )}
                    </div>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={val}
                        onChange={e => set(field.key as keyof SiteSettings, e.target.value)}
                        rows={field.key === 'keywords' ? 3 : 3}
                        placeholder={field.placeholder}
                        style={{ width: '100%', background: '#f9fafb', border: `1px solid ${over ? '#fca5a5' : '#e0e0e0'}`, borderRadius: 8, padding: '10px 12px', color: '#333', fontSize: 13, resize: 'vertical', outline: 'none' }}
                      />
                    ) : (
                      <input
                        value={val}
                        onChange={e => set(field.key as keyof SiteSettings, e.target.value)}
                        placeholder={field.placeholder}
                        style={{ width: '100%', background: '#f9fafb', border: `1px solid ${over ? '#fca5a5' : '#e0e0e0'}`, borderRadius: 8, padding: '10px 12px', color: '#333', fontSize: 13, outline: 'none' }}
                      />
                    )}
                    {field.hint && <p style={{ color: '#bbb', fontSize: 11, margin: '5px 0 0' }}>{field.hint}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Google Preview */}
        <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #f5f5f5' }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#1a1a1a' }}>Google Önizleme</p>
          </div>
          <div style={{ padding: '1.25rem' }}>
            <div style={{ background: '#f8f9fa', border: '1px solid #e8e8e8', borderRadius: 10, padding: '1.25rem' }}>
              <p style={{ color: '#aaa', fontSize: 11, margin: '0 0 6px' }}>trambolinpark.com</p>
              <p style={{ color: '#1a0dab', fontSize: 18, fontWeight: 500, margin: '0 0 4px', lineHeight: 1.3 }}>
                {settings.site_title || 'Site başlığı...'}
              </p>
              <p style={{ color: '#444', fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                {settings.site_description || 'Meta açıklaması...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
