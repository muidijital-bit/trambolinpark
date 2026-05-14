import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { ProductRow } from '../../lib/supabase';
import { AdminPageHeader } from './AdminLayout';
import { Plus, Pencil, Trash2, X, Check, Search, ChevronDown } from 'lucide-react';

const PRESET_CATEGORIES = [
  { key: 'tekli-trambolinler',        label: 'Tekli Trambolinler' },
  { key: 'yer-zemin-trambolin',       label: 'Yer/Zemin Trambolin' },
  { key: 'salto-trambolin',           label: 'Salto Trambolin' },
  { key: 'olimpik-trambolinler',      label: 'Olimpik Trambolinler' },
  { key: 'profesyonel-trambolin',     label: 'Profesyonel Trambolin' },
  { key: 'ticari-junior',             label: 'Ticari Junior' },
  { key: 'trambolin-parklari',        label: 'Trambolin Parkları' },
  { key: 'kucuk-top-havuzlari',       label: 'Küçük Top Havuzları' },
  { key: 'isletmelere-top-havuzlari', label: 'İşletmelere Top Havuzları' },
  { key: 'soft-play-oyun-alanlari',   label: 'Soft Play Oyun Alanları' },
  { key: 'soft-play-oyuncaklar',      label: 'Soft Play Oyuncaklar' },
  { key: 'sisme-park-junior',         label: 'Şişme Park Junior' },
];

const empty = (): Partial<ProductRow> => ({
  id: '', title: '', description: '', image_url: '',
  category: PRESET_CATEGORIES[0].key, category_name: PRESET_CATEGORIES[0].label, features: [],
});

export default function AdminProducts() {
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<Partial<ProductRow> | null>(null);
  const [saving, setSaving] = useState(false);
  const [featInput, setFeatInput] = useState('');
  const [delConfirm, setDelConfirm] = useState<string | null>(null);
  const [customCategory, setCustomCategory] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('category').order('title');
    setRows(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = rows.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase()) ||
    (r.category_name ?? '').toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setModal(empty());
    setFeatInput('');
    setCustomCategory(false);
  };

  const openEdit = (r: ProductRow) => {
    const isPreset = PRESET_CATEGORIES.some(c => c.key === r.category);
    setCustomCategory(!isPreset);
    setModal({ ...r });
    setFeatInput('');
  };

  const save = async () => {
    if (!modal) return;
    setSaving(true);
    const payload = { ...modal };
    if (!customCategory) {
      const preset = PRESET_CATEGORIES.find(c => c.key === modal.category);
      if (preset) payload.category_name = preset.label;
    }
    if (modal.id && rows.find(r => r.id === modal.id)) {
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

  // Group rows by category for display
  const grouped = filtered.reduce<Record<string, ProductRow[]>>((acc, r) => {
    const key = r.category_name || r.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh' }}>
      <AdminPageHeader
        title="Ürünler"
        sub={`${rows.length} ürün`}
        action={
          <button onClick={openNew} className="btn btn-sm fw-bold d-flex align-items-center gap-2"
            style={{ background: '#c3e92d', color: '#0a0a0a', borderRadius: 8, border: 'none' }}>
            <Plus size={14} /> Yeni Ürün
          </button>
        }
      />

      <div style={{ padding: '1.5rem 2rem' }}>
        {/* Search */}
        <div style={{ position: 'relative', maxWidth: 320, marginBottom: '1.5rem' }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Ürün veya kategori ara..."
            style={{ width: '100%', background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: '8px 12px 8px 34px', color: '#333', fontSize: 13 }} />
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: '#5c9200', width: 28, height: 28, borderWidth: 3 }} role="status" />
          </div>
        ) : Object.keys(grouped).length === 0 ? (
          <div className="text-center py-5" style={{ color: '#aaa', fontSize: 14 }}>Ürün bulunamadı.</div>
        ) : (
          Object.entries(grouped).map(([catName, items]) => (
            <div key={catName} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: '#3a7500' }}>{catName}</p>
                <span style={{ background: '#f0f7e6', color: '#3a7500', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>{items.length}</span>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 12, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {items.map((row, i) => (
                      <tr key={row.id} style={{ borderBottom: i < items.length - 1 ? '1px solid #f5f5f5' : 'none' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <td style={{ padding: '10px 14px', width: 52 }}>
                          <img src={row.image_url} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8, background: '#f0f0f0' }}
                            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1a1a1a' }}>{row.title}</p>
                          <p style={{ margin: 0, color: '#bbb', fontSize: 11 }}>{row.id}</p>
                        </td>
                        <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 12 }}>{row.features?.length ?? 0} özellik</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                            <button onClick={() => openEdit(row)} style={btn('#f5f5f5', '#555')}><Pencil size={13} /></button>
                            {delConfirm === row.id ? (
                              <>
                                <button onClick={() => del(row.id)} style={btn('#fee2e2', '#dc2626')}><Check size={13} /></button>
                                <button onClick={() => setDelConfirm(null)} style={btn('#f5f5f5', '#888')}><X size={13} /></button>
                              </>
                            ) : (
                              <button onClick={() => setDelConfirm(row.id)} style={btn('#f5f5f5', '#aaa')}><Trash2 size={13} /></button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 560, maxHeight: '92vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,.15)' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#1a1a1a', margin: 0, fontSize: 16, fontWeight: 800 }}>{rows.find(r => r.id === modal.id) ? 'Ürün Düzenle' : 'Yeni Ürün'}</h3>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <F label="ID (benzersiz, değiştirilemez)" value={modal.id ?? ''} onChange={v => setModal({ ...modal, id: v })}
                placeholder="ornek: olp-110" disabled={!!rows.find(r => r.id === modal.id)} />
              <F label="Başlık" value={modal.title ?? ''} onChange={v => setModal({ ...modal, title: v })} />
              <F label="Görsel URL" value={modal.image_url ?? ''} onChange={v => setModal({ ...modal, image_url: v })}
                placeholder="https://trambolinpark.com/..." />

              {/* Category — dropdown OR custom */}
              <div className="mb-3">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                  <label style={lbl}>KATEGORİ</label>
                  <button onClick={() => setCustomCategory(!customCategory)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, color: '#3a7500', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
                    <ChevronDown size={12} />
                    {customCategory ? 'Hazır kategorilerden seç' : 'Özel kategori gir'}
                  </button>
                </div>
                {customCategory ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div>
                      <p style={{ ...lbl, marginBottom: 4 }}>KATEGORİ KEY</p>
                      <input value={modal.category ?? ''} onChange={e => setModal({ ...modal, category: e.target.value })}
                        placeholder="yeni-kategori-adi" style={{ ...inp, width: '100%' }} />
                    </div>
                    <div>
                      <p style={{ ...lbl, marginBottom: 4 }}>KATEGORİ ADI</p>
                      <input value={modal.category_name ?? ''} onChange={e => setModal({ ...modal, category_name: e.target.value })}
                        placeholder="Yeni Kategori Adı" style={{ ...inp, width: '100%' }} />
                    </div>
                  </div>
                ) : (
                  <select value={modal.category ?? ''} onChange={e => {
                    const preset = PRESET_CATEGORIES.find(c => c.key === e.target.value);
                    setModal({ ...modal, category: e.target.value, category_name: preset?.label ?? '' });
                  }} style={{ ...inp, width: '100%' }}>
                    {PRESET_CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                  </select>
                )}
              </div>

              <div className="mb-3">
                <label style={lbl}>AÇIKLAMA</label>
                <textarea value={modal.description ?? ''} onChange={e => setModal({ ...modal, description: e.target.value })}
                  rows={3} style={{ ...inp, width: '100%', resize: 'vertical' }} />
              </div>

              <div className="mb-3">
                <label style={lbl}>ÖZELLİKLER</label>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  <input value={featInput} onChange={e => setFeatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    placeholder="Özellik yazıp Enter'a bas veya Ekle'ye tıkla"
                    style={{ ...inp, flex: 1 }} />
                  <button onClick={addFeature}
                    style={{ background: '#f0f7e6', border: '1px solid #c3e92d', borderRadius: 8, padding: '8px 14px', fontWeight: 700, fontSize: 12, color: '#3a7500', cursor: 'pointer' }}>
                    Ekle
                  </button>
                </div>
                {(modal.features ?? []).length === 0 && (
                  <p style={{ fontSize: 12, color: '#ccc', margin: 0 }}>Henüz özellik eklenmedi.</p>
                )}
                {modal.features?.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ flex: 1, background: '#f9fafb', border: '1px solid #e8e8e8', borderRadius: 6, padding: '6px 10px', color: '#444', fontSize: 12 }}>{f}</span>
                    <button onClick={() => removeFeature(i)} style={btn('#fee2e2', '#dc2626')}><X size={12} /></button>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #f0f0f0', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setModal(null)} style={{ background: '#f5f5f5', border: 'none', borderRadius: 8, padding: '8px 18px', color: '#555', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>İptal</button>
              <button onClick={save} disabled={saving}
                style={{ background: '#c3e92d', color: '#0a0a0a', border: 'none', borderRadius: 8, padding: '8px 22px', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
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
const btn = (bg: string, color: string): React.CSSProperties => ({ background: bg, border: 'none', borderRadius: 7, padding: '6px 8px', color, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' });

function F({ label, value, onChange, placeholder, disabled }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; disabled?: boolean }) {
  return (
    <div className="mb-3">
      <label style={lbl}>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} disabled={disabled}
        placeholder={placeholder} style={{ ...inp, width: '100%', opacity: disabled ? .5 : 1 }} />
    </div>
  );
}
