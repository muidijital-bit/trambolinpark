import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { SeoRow } from '../../lib/supabase';
import { AdminPageHeader } from './AdminLayout';
import { Pencil, X, Globe } from 'lucide-react';

const DEFAULT_PAGES: SeoRow[] = [
  { page_path: '/',                    page_name: 'Anasayfa',         title: '', description: '', keywords: '', og_image: '' },
  { page_path: '/urunler',             page_name: 'Ürünler',          title: '', description: '', keywords: '', og_image: '' },
  { page_path: '/yedek-parcalar',      page_name: 'Yedek Parçalar',   title: '', description: '', keywords: '', og_image: '' },
  { page_path: '/hakkimizda',          page_name: 'Hakkımızda',       title: '', description: '', keywords: '', og_image: '' },
  { page_path: '/iletisim',            page_name: 'İletişim',         title: '', description: '', keywords: '', og_image: '' },
  { page_path: '/galeri',              page_name: 'Galeri',           title: '', description: '', keywords: '', og_image: '' },
  { page_path: '/blog',                page_name: 'Blog',             title: '', description: '', keywords: '', og_image: '' },
  { page_path: '/kvkk',                page_name: 'KVKK',             title: '', description: '', keywords: '', og_image: '' },
  { page_path: '/cerez-politikasi',    page_name: 'Çerez Politikası', title: '', description: '', keywords: '', og_image: '' },
];

export default function AdminSeo() {
  const [rows, setRows] = useState<SeoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<SeoRow | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('seo_settings').select('*');
    const saved = data ?? [];
    // Merge defaults with saved data
    const merged = DEFAULT_PAGES.map(def => {
      const found = saved.find(s => s.page_path === def.page_path);
      return found ? { ...def, ...found } : def;
    });
    setRows(merged);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!modal) return;
    setSaving(true);
    const existing = rows.find(r => r.page_path === modal.page_path && r.id);
    if (existing?.id) {
      await supabase.from('seo_settings').update(modal).eq('id', existing.id);
    } else {
      await supabase.from('seo_settings').insert([modal]);
    }
    setSaving(false);
    setModal(null);
    load();
  };

  const titleLen = modal?.title?.length ?? 0;
  const descLen = modal?.description?.length ?? 0;

  return (
    <div>
      <AdminPageHeader title="SEO Ayarları" sub="Sayfa başına title, description ve keywords" />

      <div style={{ padding: '1.5rem 2rem' }}>
        <div style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                {['Sayfa', 'URL', 'Title', 'Açıklama', ''].map(h => (
                  <th key={h} style={{ padding: '10px 14px', color: '#555', fontSize: 11, fontWeight: 700, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#555', fontSize: 13 }}>Yükleniyor...</td></tr>}
              {rows.map(row => (
                <tr key={row.page_path} style={{ borderBottom: '1px solid #1a1a1a' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#1a1a1a')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '10px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Globe size={14} style={{ color: '#555', flexShrink: 0 }} />
                      <span style={{ color: '#ddd', fontSize: 13, fontWeight: 600 }}>{row.page_name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#555', fontSize: 12 }}>{row.page_path}</td>
                  <td style={{ padding: '10px 14px', maxWidth: 200 }}>
                    {row.title
                      ? <span style={{ color: '#a8d44a', fontSize: 12 }}>{row.title.slice(0, 40)}{row.title.length > 40 ? '…' : ''}</span>
                      : <span style={{ color: '#3a3a3a', fontSize: 12 }}>Tanımlanmamış</span>}
                  </td>
                  <td style={{ padding: '10px 14px', maxWidth: 220 }}>
                    {row.description
                      ? <span style={{ color: '#aaa', fontSize: 12 }}>{row.description.slice(0, 50)}{row.description.length > 50 ? '…' : ''}</span>
                      : <span style={{ color: '#3a3a3a', fontSize: 12 }}>Tanımlanmamış</span>}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <button onClick={() => setModal({ ...row })} style={{ background: '#2a2a2a', border: 'none', borderRadius: 7, padding: '6px 8px', color: '#aaa', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                      <Pencil size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#141414', border: '1px solid #222', borderRadius: 16, width: '100%', maxWidth: 540, maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#fff', margin: 0, fontSize: 16, fontWeight: 800 }}>{modal.page_name}</h3>
                <p style={{ color: '#555', fontSize: 12, margin: '2px 0 0' }}>{modal.page_path}</p>
              </div>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div className="mb-3">
                <label style={lbl}>
                  TITLE <span style={{ color: titleLen > 60 ? '#f87171' : titleLen > 50 ? '#fbbf24' : '#555' }}>({titleLen}/60)</span>
                </label>
                <input value={modal.title} onChange={e => setModal({ ...modal, title: e.target.value })}
                  placeholder="Trambolinpark | Ticari Trambolin Üreticisi"
                  style={{ ...inp, width: '100%', borderColor: titleLen > 60 ? '#f87171' : '#2a2a2a' }} />
              </div>
              <div className="mb-3">
                <label style={lbl}>
                  META DESCRIPTION <span style={{ color: descLen > 160 ? '#f87171' : descLen > 140 ? '#fbbf24' : '#555' }}>({descLen}/160)</span>
                </label>
                <textarea value={modal.description} onChange={e => setModal({ ...modal, description: e.target.value })}
                  rows={3} placeholder="EN-1176 sertifikalı ticari trambolin, soft play ve top havuzu üreticisi..."
                  style={{ ...inp, width: '100%', resize: 'vertical', borderColor: descLen > 160 ? '#f87171' : '#2a2a2a' }} />
              </div>
              <div className="mb-3">
                <label style={lbl}>KEYWORDS</label>
                <input value={modal.keywords} onChange={e => setModal({ ...modal, keywords: e.target.value })}
                  placeholder="trambolin, trambolin parkı, soft play, top havuzu"
                  style={{ ...inp, width: '100%' }} />
                <p style={{ color: '#444', fontSize: 11, marginTop: 4 }}>Virgülle ayırın</p>
              </div>
              <div className="mb-3">
                <label style={lbl}>OG IMAGE URL (Sosyal Medya Görseli)</label>
                <input value={modal.og_image} onChange={e => setModal({ ...modal, og_image: e.target.value })}
                  placeholder="https://trambolinpark.com/..."
                  style={{ ...inp, width: '100%' }} />
              </div>

              {/* Preview */}
              {(modal.title || modal.description) && (
                <div style={{ background: '#1a1a2e', border: '1px solid #2a2a44', borderRadius: 10, padding: '1rem', marginTop: '0.5rem' }}>
                  <p style={{ color: '#555', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Google Önizleme</p>
                  <p style={{ color: '#8ab4f8', fontSize: 14, margin: '0 0 2px', fontWeight: 500 }}>{modal.title || 'Başlık...'}</p>
                  <p style={{ color: '#aaa', fontSize: 12, margin: 0 }}>{modal.description || 'Açıklama...'}</p>
                </div>
              )}
            </div>
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #222', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setModal(null)} style={{ background: '#1e1e1e', border: 'none', borderRadius: 8, padding: '8px 18px', color: '#888', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>İptal</button>
              <button onClick={save} disabled={saving} style={{ background: '#a78bfa', color: '#0a0a0a', border: 'none', borderRadius: 8, padding: '8px 22px', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const lbl: React.CSSProperties = { color: '#777', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '.08em' };
const inp: React.CSSProperties = { background: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 13 };
