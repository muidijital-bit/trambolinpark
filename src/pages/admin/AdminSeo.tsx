import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { SeoRow } from '../../lib/supabase';
import { AdminPageHeader } from './AdminLayout';
import { Pencil, X, Globe } from 'lucide-react';

const DEFAULT_PAGES: SeoRow[] = [
  { page_path: '/',                 page_name: 'Anasayfa',         title: '', description: '', keywords: '', og_image: '' },
  { page_path: '/urunler',          page_name: 'Ürünler',          title: '', description: '', keywords: '', og_image: '' },
  { page_path: '/yedek-parcalar',   page_name: 'Yedek Parçalar',   title: '', description: '', keywords: '', og_image: '' },
  { page_path: '/hakkimizda',       page_name: 'Hakkımızda',       title: '', description: '', keywords: '', og_image: '' },
  { page_path: '/iletisim',         page_name: 'İletişim',         title: '', description: '', keywords: '', og_image: '' },
  { page_path: '/galeri',           page_name: 'Galeri',           title: '', description: '', keywords: '', og_image: '' },
  { page_path: '/blog',             page_name: 'Blog',             title: '', description: '', keywords: '', og_image: '' },
  { page_path: '/kvkk',             page_name: 'KVKK',             title: '', description: '', keywords: '', og_image: '' },
  { page_path: '/cerez-politikasi', page_name: 'Çerez Politikası', title: '', description: '', keywords: '', og_image: '' },
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
    setRows(DEFAULT_PAGES.map(def => {
      const found = saved.find(s => s.page_path === def.page_path);
      return found ? { ...def, ...found } : def;
    }));
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
    <div style={{ background: '#f5f7fa', minHeight: '100vh' }}>
      <AdminPageHeader title="SEO Ayarları" sub="Sayfa başına title, description ve keywords" />

      <div style={{ padding: '1.5rem 2rem' }}>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: '#7c3aed', width: 28, height: 28, borderWidth: 3 }} role="status" />
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
                  {['Sayfa', 'URL', 'Title', 'Açıklama', ''].map(h => (
                    <th key={h} style={{ padding: '10px 16px', color: '#aaa', fontSize: 11, fontWeight: 700, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.page_path} style={{ borderBottom: i < rows.length - 1 ? '1px solid #f5f5f5' : 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ background: '#f5f3ff', color: '#7c3aed', width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Globe size={13} />
                        </div>
                        <span style={{ color: '#1a1a1a', fontSize: 13, fontWeight: 600 }}>{row.page_name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#aaa', fontSize: 12 }}>{row.page_path}</td>
                    <td style={{ padding: '12px 16px', maxWidth: 200 }}>
                      {row.title
                        ? <span style={{ color: '#3a7500', fontSize: 12 }}>{row.title.slice(0, 40)}{row.title.length > 40 ? '…' : ''}</span>
                        : <span style={{ color: '#ddd', fontSize: 12 }}>Tanımlanmamış</span>}
                    </td>
                    <td style={{ padding: '12px 16px', maxWidth: 220 }}>
                      {row.description
                        ? <span style={{ color: '#888', fontSize: 12 }}>{row.description.slice(0, 50)}{row.description.length > 50 ? '…' : ''}</span>
                        : <span style={{ color: '#ddd', fontSize: 12 }}>Tanımlanmamış</span>}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <button onClick={() => setModal({ ...row })} style={{ background: '#f5f5f5', border: 'none', borderRadius: 7, padding: '6px 8px', color: '#555', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                        <Pencil size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 540, maxHeight: '92vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,.15)' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#1a1a1a', margin: 0, fontSize: 16, fontWeight: 800 }}>{modal.page_name}</h3>
                <p style={{ color: '#aaa', fontSize: 12, margin: '2px 0 0' }}>{modal.page_path}</p>
              </div>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div className="mb-3">
                <label style={lbl}>
                  TITLE <span style={{ color: titleLen > 60 ? '#dc2626' : titleLen > 50 ? '#d97706' : '#aaa', fontWeight: 400 }}>({titleLen}/60)</span>
                </label>
                <input value={modal.title} onChange={e => setModal({ ...modal, title: e.target.value })}
                  placeholder="Trambolinpark | Ticari Trambolin Üreticisi"
                  style={{ ...inp, width: '100%', borderColor: titleLen > 60 ? '#fca5a5' : '#e0e0e0' }} />
              </div>
              <div className="mb-3">
                <label style={lbl}>
                  META DESCRIPTION <span style={{ color: descLen > 160 ? '#dc2626' : descLen > 140 ? '#d97706' : '#aaa', fontWeight: 400 }}>({descLen}/160)</span>
                </label>
                <textarea value={modal.description} onChange={e => setModal({ ...modal, description: e.target.value })}
                  rows={3} placeholder="EN-1176 sertifikalı ticari trambolin, soft play ve top havuzu üreticisi..."
                  style={{ ...inp, width: '100%', resize: 'vertical', borderColor: descLen > 160 ? '#fca5a5' : '#e0e0e0' }} />
              </div>
              <div className="mb-3">
                <label style={lbl}>KEYWORDS</label>
                <input value={modal.keywords} onChange={e => setModal({ ...modal, keywords: e.target.value })}
                  placeholder="trambolin, trambolin parkı, soft play, top havuzu"
                  style={{ ...inp, width: '100%' }} />
                <p style={{ color: '#ccc', fontSize: 11, marginTop: 4 }}>Virgülle ayırın</p>
              </div>
              <div className="mb-3">
                <label style={lbl}>OG IMAGE URL</label>
                <input value={modal.og_image} onChange={e => setModal({ ...modal, og_image: e.target.value })}
                  placeholder="https://trambolinpark.com/..." style={{ ...inp, width: '100%' }} />
              </div>

              {(modal.title || modal.description) && (
                <div style={{ background: '#f8faff', border: '1px solid #e0e8ff', borderRadius: 10, padding: '1rem' }}>
                  <p style={{ color: '#aaa', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Google Önizleme</p>
                  <p style={{ color: '#1a0dab', fontSize: 14, margin: '0 0 2px', fontWeight: 500 }}>{modal.title || 'Başlık...'}</p>
                  <p style={{ color: '#555', fontSize: 12, margin: 0 }}>{modal.description || 'Açıklama...'}</p>
                </div>
              )}
            </div>
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #f0f0f0', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setModal(null)} style={{ background: '#f5f5f5', border: 'none', borderRadius: 8, padding: '8px 18px', color: '#555', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>İptal</button>
              <button onClick={save} disabled={saving}
                style={{ background: '#ede9fe', color: '#7c3aed', border: 'none', borderRadius: 8, padding: '8px 22px', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const lbl: React.CSSProperties = { color: '#888', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '.08em' };
const inp: React.CSSProperties = { background: '#f9fafb', border: '1px solid #e0e0e0', borderRadius: 8, padding: '8px 12px', color: '#333', fontSize: 13 };
