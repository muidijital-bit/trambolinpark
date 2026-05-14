import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { ProductRow } from '../../lib/supabase';
import { AdminPageHeader } from './AdminLayout';
import { Plus, Pencil, Trash2, X, Check, Search } from 'lucide-react';

const CATEGORIES = [
  { key: 'tekli-trambolinler',       label: 'Tekli Trambolinler' },
  { key: 'yer-zemin-trambolin',      label: 'Yer/Zemin Trambolin' },
  { key: 'salto-trambolin',          label: 'Salto Trambolin' },
  { key: 'olimpik-trambolinler',     label: 'Olimpik Trambolinler' },
  { key: 'profesyonel-trambolin',    label: 'Profesyonel Trambolin' },
  { key: 'ticari-junior',            label: 'Ticari Junior' },
  { key: 'trambolin-parklari',       label: 'Trambolin Parkları' },
  { key: 'kucuk-top-havuzlari',      label: 'Küçük Top Havuzları' },
  { key: 'isletmelere-top-havuzlari', label: 'İşletmelere Top Havuzları' },
  { key: 'soft-play-oyun-alanlari',  label: 'Soft Play Oyun Alanları' },
  { key: 'soft-play-oyuncaklar',     label: 'Soft Play Oyuncaklar' },
  { key: 'sisme-park-junior',        label: 'Şişme Park Junior' },
];

const empty = (): Partial<ProductRow> => ({
  id: '', title: '', description: '', image_url: '', category: CATEGORIES[0].key, category_name: CATEGORIES[0].label, features: [],
});

export default function AdminProducts() {
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<Partial<ProductRow> | null>(null);
  const [saving, setSaving] = useState(false);
  const [featInput, setFeatInput] = useState('');
  const [delConfirm, setDelConfirm] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('category').order('title');
    setRows(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = rows.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => { setModal(empty()); setFeatInput(''); };
  const openEdit = (r: ProductRow) => { setModal({ ...r }); setFeatInput(''); };

  const save = async () => {
    if (!modal) return;
    setSaving(true);
    const cat = CATEGORIES.find(c => c.key === modal.category);
    const payload = { ...modal, category_name: cat?.label ?? modal.category_name };
    if (modal.id) {
      await supabase.from('products').update(payload).eq('id', modal.id);
    } else {
      await supabase.from('products').insert([payload]);
    }
    setSaving(false);
    setModal(null);
    load();
  };

  const del = async (id: string) => {
    await supabase.from('products').delete().eq('id', id);
    setDelConfirm(null);
    load();
  };

  const addFeature = () => {
    if (!featInput.trim() || !modal) return;
    setModal({ ...modal, features: [...(modal.features ?? []), featInput.trim()] });
    setFeatInput('');
  };

  const removeFeature = (i: number) => {
    if (!modal) return;
    setModal({ ...modal, features: modal.features?.filter((_, idx) => idx !== i) });
  };

  return (
    <div>
      <AdminPageHeader
        title="Ürünler"
        sub={`${rows.length} ürün`}
        action={
          <button onClick={openNew} className="btn btn-sm fw-bold d-flex align-items-center gap-2"
            style={{ background: '#c3e92d', color: '#0a0a0a', borderRadius: 8 }}>
            <Plus size={14} /> Yeni Ürün
          </button>
        }
      />

      <div style={{ padding: '1.5rem 2rem' }}>
        {/* Search */}
        <div style={{ position: 'relative', maxWidth: 320, marginBottom: '1.25rem' }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Ürün ara..."
            style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px 8px 34px', color: '#fff', fontSize: 13 }}
          />
        </div>

        {/* Table */}
        <div style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                {['Görsel', 'Başlık', 'Kategori', 'Özellik', ''].map(h => (
                  <th key={h} style={{ padding: '10px 14px', color: '#555', fontSize: 11, fontWeight: 700, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#555', fontSize: 13 }}>Yükleniyor...</td></tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#555', fontSize: 13 }}>Ürün bulunamadı.</td></tr>
              )}
              {filtered.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid #1a1a1a' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#1a1a1a')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '8px 14px' }}>
                    <img src={row.image_url} alt="" style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6, background: '#222' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </td>
                  <td style={{ padding: '8px 14px', color: '#ddd', fontSize: 13, maxWidth: 260 }}>
                    <p style={{ margin: 0, fontWeight: 600 }}>{row.title}</p>
                    <p style={{ margin: 0, color: '#555', fontSize: 11 }}>{row.id}</p>
                  </td>
                  <td style={{ padding: '8px 14px' }}>
                    <span style={{ background: '#1e2a10', color: '#a8d44a', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>
                      {row.category_name || row.category}
                    </span>
                  </td>
                  <td style={{ padding: '8px 14px', color: '#555', fontSize: 12 }}>{row.features?.length ?? 0} özellik</td>
                  <td style={{ padding: '8px 14px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => openEdit(row)} style={btnStyle('#2a2a2a', '#aaa')}><Pencil size={13} /></button>
                      {delConfirm === row.id ? (
                        <>
                          <button onClick={() => del(row.id)} style={btnStyle('#3a1010', '#f87171')}><Check size={13} /></button>
                          <button onClick={() => setDelConfirm(null)} style={btnStyle('#2a2a2a', '#888')}><X size={13} /></button>
                        </>
                      ) : (
                        <button onClick={() => setDelConfirm(row.id)} style={btnStyle('#2a2a2a', '#888')}><Trash2 size={13} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#141414', border: '1px solid #222', borderRadius: 16, width: '100%', maxWidth: 560, maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#fff', margin: 0, fontSize: 16, fontWeight: 800 }}>{modal.id ? 'Ürün Düzenle' : 'Yeni Ürün'}</h3>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <Field label="ID (benzersiz)" value={modal.id ?? ''} onChange={v => setModal({ ...modal, id: v })} placeholder="ornek: olp-110" disabled={!!rows.find(r => r.id === modal.id)} />
              <Field label="Başlık" value={modal.title ?? ''} onChange={v => setModal({ ...modal, title: v })} />
              <Field label="Görsel URL" value={modal.image_url ?? ''} onChange={v => setModal({ ...modal, image_url: v })} placeholder="https://trambolinpark.com/..." />
              <div className="mb-3">
                <label style={labelStyle}>KATEGORİ</label>
                <select value={modal.category ?? ''} onChange={e => setModal({ ...modal, category: e.target.value })} style={{ ...inputStyle, width: '100%' }}>
                  {CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                </select>
              </div>
              <div className="mb-3">
                <label style={labelStyle}>AÇIKLAMA</label>
                <textarea value={modal.description ?? ''} onChange={e => setModal({ ...modal, description: e.target.value })}
                  rows={3} style={{ ...inputStyle, width: '100%', resize: 'vertical' }} />
              </div>
              {/* Features */}
              <div className="mb-3">
                <label style={labelStyle}>ÖZELLİKLER</label>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  <input value={featInput} onChange={e => setFeatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    placeholder="Özellik ekle..." style={{ ...inputStyle, flex: 1 }} />
                  <button onClick={addFeature} style={{ ...btnStyle('#c3e92d', '#0a0a0a'), padding: '8px 14px', fontWeight: 700, fontSize: 12 }}>Ekle</button>
                </div>
                {modal.features?.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ flex: 1, background: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: 6, padding: '5px 10px', color: '#ccc', fontSize: 12 }}>{f}</span>
                    <button onClick={() => removeFeature(i)} style={btnStyle('#2a2a2a', '#888')}><X size={12} /></button>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #222', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setModal(null)} style={{ ...btnStyle('#1e1e1e', '#888'), padding: '8px 18px', fontSize: 13, fontWeight: 600 }}>İptal</button>
              <button onClick={save} disabled={saving} style={{ background: '#c3e92d', color: '#0a0a0a', border: 'none', borderRadius: 8, padding: '8px 22px', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const labelStyle: React.CSSProperties = { color: '#777', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '.08em' };
const inputStyle: React.CSSProperties = { background: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 13 };
const btnStyle = (bg: string, color: string): React.CSSProperties => ({ background: bg, border: 'none', borderRadius: 7, padding: '6px 8px', color, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' });

function Field({ label, value, onChange, placeholder, disabled }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; disabled?: boolean }) {
  return (
    <div className="mb-3">
      <label style={labelStyle}>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} disabled={disabled}
        placeholder={placeholder} style={{ ...inputStyle, width: '100%', opacity: disabled ? .5 : 1 }} />
    </div>
  );
}
