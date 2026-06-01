import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { SparePartRow } from '../../lib/supabase';
import { optimizeImage } from '../../lib/imageUtils';
import { AdminPageHeader } from './AdminLayout';
import { Plus, Pencil, Trash2, X, Check, Search, Upload, Link, Wrench } from 'lucide-react';

const CAT_OPTIONS = [
  { key: 'trambolin-yedek', label: 'Trambolin Yedek' },
  { key: 'salto-yedek',     label: 'Salto Yedek' },
  { key: 'sisme-yedek',     label: 'Şişme Yedek' },
];

const emptyRow = (): Partial<SparePartRow> => ({
  category_key: 'trambolin-yedek', category_title: 'Trambolin Yedek Parçaları',
  category_short: '', category_cover: '', category_icon: '',
  sub_key: null, sub_title: null,
  item_key: '', title: '', description: '', image: '', gallery: [],
});

export default function AdminSpareParts() {
  const [rows, setRows] = useState<SparePartRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<Partial<SparePartRow> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [delConfirm, setDelConfirm] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [toast, setToast] = useState('');
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('spare_parts').select('*').order('category_key').order('title');
    setRows(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = rows.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.item_key.toLowerCase().includes(search.toLowerCase()) ||
    r.category_key.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, SparePartRow[]>>((acc, r) => {
    const key = r.category_title || r.category_key;
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const optimized = await optimizeImage(file);
      const path = `spare-parts/${Date.now()}-${optimized.name}`;
      const { error } = await supabase.storage.from('urunler').upload(path, optimized, { upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from('urunler').getPublicUrl(path);
      setModal(prev => ({ ...prev!, image: data.publicUrl }));
    } catch (e: any) {
      alert('Yükleme hatası: ' + e.message);
    }
    setUploading(false);
  };

  const del = async (id: string) => {
    await supabase.from('spare_parts').delete().eq('id', id);
    setDelConfirm(null);
    load();
  };

  const save = async () => {
    if (!modal) return;
    setSaving(true);
    const cat = CAT_OPTIONS.find(c => c.key === modal.category_key);
    const payload = { ...modal, category_title: cat?.label ?? modal.category_title };
    const { error } = modal.id
      ? await supabase.from('spare_parts').update(payload).eq('id', modal.id)
      : await supabase.from('spare_parts').insert([payload]);
    setSaving(false);
    if (error) { alert('Hata: ' + error.message); return; }
    showToast(modal.id ? 'Parça güncellendi ✓' : 'Parça eklendi ✓');
    setModal(null);
    load();
  };

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh' }}>
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, background: '#dcfce7', border: '1px solid #86efac', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 600, color: '#16a34a', zIndex: 99999, boxShadow: '0 4px 16px rgba(0,0,0,.1)' }}>
          {toast}
        </div>
      )}
      <AdminPageHeader
        title="Yedek Parçalar"
        sub={`${rows.length} parça`}
        action={
          <button onClick={() => setModal(emptyRow())} className="btn btn-sm fw-bold d-flex align-items-center gap-2"
            style={{ background: '#dbeafe', color: '#1d4ed8', borderRadius: 8, border: 'none' }}>
            <Plus size={14} /> Yeni Parça
          </button>
        }
      />

      <div style={{ padding: '1.5rem 2rem' }}>
        <div style={{ position: 'relative', maxWidth: 320, marginBottom: '1.5rem' }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Parça ara..."
            style={{ width: '100%', background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: '8px 12px 8px 34px', color: '#333', fontSize: 13 }} />
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: '#1d4ed8', width: 28, height: 28, borderWidth: 3 }} role="status" />
          </div>
        ) : (
          Object.entries(grouped).map(([catName, items]) => (
            <div key={catName} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: '#1d4ed8' }}>{catName}</p>
                <span style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>{items.length}</span>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 12, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {items.map((row, i) => (
                      <tr key={row.id} style={{ borderBottom: i < items.length - 1 ? '1px solid #f5f5f5' : 'none' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <td style={{ padding: '10px 14px', width: 52 }}>
                          {row.image ? (
                            <img src={row.image} alt="" referrerPolicy="no-referrer"
                              style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8, background: '#f0f0f0' }}
                              onError={e => { (e.target as HTMLImageElement).src = ''; (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.style.background = '#f0f0f0'; }} />
                          ) : (
                            <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Wrench size={16} style={{ color: '#ccc' }} />
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1a1a1a' }}>{row.title}</p>
                          <p style={{ margin: 0, color: '#bbb', fontSize: 11 }}>{row.item_key}{row.sub_key ? ` · ${row.sub_key}` : ''}</p>
                        </td>
                        <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                            <button onClick={() => setModal({ ...row })} style={btn('#f5f5f5', '#555')}><Pencil size={13} /></button>
                            {delConfirm === row.id ? (
                              <>
                                <button onClick={() => del(row.id!)} style={btn('#fee2e2', '#dc2626')}><Check size={13} /></button>
                                <button onClick={() => setDelConfirm(null)} style={btn('#f5f5f5', '#888')}><X size={13} /></button>
                              </>
                            ) : (
                              <button onClick={() => setDelConfirm(row.id!)} style={btn('#f5f5f5', '#aaa')}><Trash2 size={13} /></button>
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

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 520, maxHeight: '92vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,.15)' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#1a1a1a', margin: 0, fontSize: 16, fontWeight: 800 }}>{modal.id ? 'Parça Düzenle' : 'Yeni Parça'}</h3>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <F label="Başlık" value={modal.title ?? ''} onChange={v => setModal({ ...modal, title: v })} />
              <div className="mb-3">
                <label style={lbl}>KATEGORİ</label>
                <select value={modal.category_key ?? ''} onChange={e => setModal({ ...modal, category_key: e.target.value })} style={{ ...inp, width: '100%' }}>
                  {CAT_OPTIONS.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                </select>
              </div>
              <F label="Alt Kategori Key (opsiyonel)" value={modal.sub_key ?? ''} onChange={v => setModal({ ...modal, sub_key: v || null })} placeholder="yaylar" />
              <F label="Alt Kategori Başlığı (opsiyonel)" value={modal.sub_title ?? ''} onChange={v => setModal({ ...modal, sub_title: v || null })} placeholder="Trambolin Yayları" />
              <div className="mb-3">
                <label style={lbl}>GÖRSEL</label>
                {modal.image && (
                  <div style={{ marginBottom: 8, position: 'relative', display: 'inline-block' }}>
                    <img src={modal.image} alt="" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, border: '1px solid #e8e8e8' }} />
                    <button onClick={() => setModal(prev => ({ ...prev!, image: '' }))}
                      style={{ position: 'absolute', top: -6, right: -6, background: '#dc2626', border: 'none', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', padding: 0 }}>
                      <X size={10} />
                    </button>
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <button onClick={() => fileRef.current?.click()} disabled={uploading}
                    style={{ ...inp, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: '#555', fontWeight: 600, fontSize: 12, border: '1.5px dashed #d0d0d0', background: '#fafafa', flex: 1, justifyContent: 'center', padding: '10px' }}>
                    <Upload size={14} /> {uploading ? 'Yükleniyor...' : 'Dosya Yükle'}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
                    onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0])} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Link size={12} style={{ color: '#aaa', flexShrink: 0 }} />
                  <input value={modal.image ?? ''} onChange={e => setModal({ ...modal, image: e.target.value })}
                    placeholder="veya görsel URL yapıştır" style={{ ...inp, flex: 1, fontSize: 12 }} />
                </div>
                <p style={{ color: '#bbb', fontSize: 11, margin: '4px 0 0' }}>200 KB üzeri görseller otomatik WebP'ye dönüştürülür.</p>
              </div>
              <div className="mb-3">
                <label style={lbl}>AÇIKLAMA</label>
                <textarea value={modal.description ?? ''} onChange={e => setModal({ ...modal, description: e.target.value })}
                  rows={3} style={{ ...inp, width: '100%', resize: 'vertical' }} />
              </div>
              <F label="Kategori Kapak Görseli" value={modal.category_cover ?? ''} onChange={v => setModal({ ...modal, category_cover: v })} />
              <F label="Kategori İkon (emoji)" value={modal.category_icon ?? ''} onChange={v => setModal({ ...modal, category_icon: v })} placeholder="🔧" />
              <F label="Kategori Kısa Açıklama" value={modal.category_short ?? ''} onChange={v => setModal({ ...modal, category_short: v })} />
            </div>
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #f0f0f0', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setModal(null)} style={{ background: '#f5f5f5', border: 'none', borderRadius: 8, padding: '8px 18px', color: '#555', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>İptal</button>
              <button onClick={save} disabled={saving}
                style={{ background: '#dbeafe', color: '#1d4ed8', border: 'none', borderRadius: 8, padding: '8px 22px', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
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

function F({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="mb-3">
      <label style={lbl}>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...inp, width: '100%' }} />
    </div>
  );
}
