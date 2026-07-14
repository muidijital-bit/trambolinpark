import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { ProductRow } from '../../lib/supabase';
import { optimizeImage, toSlug } from '../../lib/imageUtils';
import { AdminPageHeader } from './AdminLayout';
import { Plus, Pencil, Trash2, X, Check, Search, ChevronDown, Upload, Link, ImagePlus } from 'lucide-react';

const PRESET_CATEGORIES = [
  { key: 'tekli-trambolinler',        label: 'Tekli Trambolinler' },
  { key: 'yer-zemin-trambolin',       label: 'Yer/Zemin Trambolin' },
  { key: 'salto-trambolin',           label: 'Salto Trambolin' },
  { key: 'ticari-olimpik-trambolinler', label: 'Ticari Olimpik Trambolinler' },
  { key: 'profesyonel-trambolin',     label: 'Profesyonel Trambolin' },
  { key: 'ticari-junior',             label: 'Ticari Junior' },
  { key: 'trambolin-parklari',        label: 'Trambolin Parkları' },
  { key: 'kucuk-top-havuzlari',       label: 'Küçük Top Havuzları' },
  { key: 'isletmelere-top-havuzlari', label: 'İşletmelere Top Havuzları' },
  { key: 'softplay-oyun-alanlari',    label: 'Softplay Oyun Alanları' },
  { key: 'softplay-oyuncaklar',       label: 'Softplay Oyuncaklar' },
  { key: 'sisme-park-junior',         label: 'Şişme Park Junior' },
];

const empty = (): Partial<ProductRow & { gallery: string[] }> => ({
  id: '', title: '', description: '', image_url: '',
  category: PRESET_CATEGORIES[0].key, category_name: PRESET_CATEGORIES[0].label,
  features: [], gallery: [],
});

export default function AdminProducts() {
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<Partial<ProductRow & { gallery: string[] }> | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [featInput, setFeatInput] = useState('');
  const [delConfirm, setDelConfirm] = useState<string | null>(null);
  const [customCategory, setCustomCategory] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(true);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };
  const [uploading, setUploading] = useState(false);
  const [galleryUrlInput, setGalleryUrlInput] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);

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

  const grouped = filtered.reduce<Record<string, ProductRow[]>>((acc, r) => {
    const key = r.category_name || r.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  const openNew = () => { setModal(empty()); setFeatInput(''); setCustomCategory(false); setIsNewProduct(true); };
  const openEdit = (r: ProductRow) => {
    const isPreset = PRESET_CATEGORIES.some(c => c.key === r.category);
    setCustomCategory(!isPreset);
    setModal({ ...r, gallery: (r as any).gallery ?? [] });
    setFeatInput('');
    setIsNewProduct(false);
  };

  // Auto-generate ID from title
  const onTitleChange = (title: string) => {
    setModal(prev => ({
      ...prev!, title,
      id: isNewProduct ? toSlug(title) : prev!.id,
    }));
  };

  // Upload main image
  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const optimized = await optimizeImage(file);
      const path = `products/${Date.now()}-${optimized.name}`;
      const { error } = await supabase.storage.from('urunler').upload(path, optimized, { upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from('urunler').getPublicUrl(path);
      setModal(prev => ({ ...prev!, image_url: data.publicUrl }));
    } catch (e: any) {
      alert('Yükleme hatası: ' + e.message);
    }
    setUploading(false);
  };

  // Upload gallery image
  const uploadGalleryImage = async (file: File) => {
    setUploading(true);
    try {
      const optimized = await optimizeImage(file);
      const path = `products/gallery/${Date.now()}-${optimized.name}`;
      const { error } = await supabase.storage.from('urunler').upload(path, optimized, { upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from('urunler').getPublicUrl(path);
      setModal(prev => ({ ...prev!, gallery: [...(prev!.gallery ?? []), data.publicUrl] }));
    } catch (e: any) {
      alert('Yükleme hatası: ' + e.message);
    }
    setUploading(false);
  };

  const addGalleryUrl = () => {
    if (!galleryUrlInput.trim() || !modal) return;
    setModal(prev => ({ ...prev!, gallery: [...(prev!.gallery ?? []), galleryUrlInput.trim()] }));
    setGalleryUrlInput('');
  };

  const removeGalleryItem = (i: number) => {
    setModal(prev => ({ ...prev!, gallery: prev!.gallery?.filter((_, idx) => idx !== i) }));
  };

  const save = async () => {
    if (!modal) return;
    setSaving(true);
    const { id: _id, slug: _slug, created_at: _ca, updated_at: _ua, ...payload }: any = { ...modal };
    if (!customCategory) {
      const preset = PRESET_CATEGORIES.find(c => c.key === modal.category);
      if (preset) payload.category_name = preset.label;
    }
    const isEdit = !isNewProduct;
    let error: { message: string } | null = null;
    if (isEdit) {
      const { error: rpcErr } = await supabase.rpc('update_product', { p_id: modal.id!, p_data: payload });
      error = rpcErr;
    } else {
      let id = modal.id?.trim() || toSlug(modal.title ?? '');
      if (rows.some(r => r.id === id)) {
        let i = 2;
        while (rows.some(r => r.id === `${id}-${i}`)) i++;
        id = `${id}-${i}`;
      }
      const { error: insErr } = await supabase.from('products').insert([{ ...payload, id }]);
      error = insErr;
    }
    setSaving(false);
    if (error) { alert('Hata: ' + error.message); return; }
    showToast(isEdit ? 'Ürün güncellendi ✓' : 'Ürün eklendi ✓');
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

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh' }}>
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, background: '#dcfce7', border: '1px solid #86efac', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 600, color: '#16a34a', zIndex: 99999, boxShadow: '0 4px 16px rgba(0,0,0,.1)' }}>
          {toast}
        </div>
      )}
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
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 580, maxHeight: '92vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,.15)' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#1a1a1a', margin: 0, fontSize: 16, fontWeight: 800 }}>{rows.find(r => r.id === modal.id) ? 'Ürün Düzenle' : 'Yeni Ürün'}</h3>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <div style={{ padding: '1.5rem' }}>
              {/* Başlık */}
              <div className="mb-3">
                <label style={lbl}>BAŞLIK</label>
                <input value={modal.title ?? ''} onChange={e => onTitleChange(e.target.value)}
                  placeholder="Ürün başlığı" style={{ ...inp, width: '100%' }} />
              </div>

              {/* ID — otomatik, salt okunur */}
              <div className="mb-3">
                <label style={lbl}>ID <span style={{ color: '#bbb', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(otomatik)</span></label>
                <input value={modal.id ?? ''} readOnly
                  style={{ ...inp, width: '100%', background: '#f0f0f0', color: '#aaa', cursor: 'not-allowed' }} />
              </div>

              {/* Ana Görsel */}
              <div className="mb-3">
                <label style={lbl}>ANA GÖRSEL</label>
                {modal.image_url && (
                  <div style={{ marginBottom: 8, position: 'relative', display: 'inline-block' }}>
                    <img src={modal.image_url} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #e8e8e8' }} />
                    <button onClick={() => setModal(prev => ({ ...prev!, image_url: '' }))}
                      style={{ position: 'absolute', top: -6, right: -6, background: '#dc2626', border: 'none', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', padding: 0 }}>
                      <X size={10} />
                    </button>
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => fileRef.current?.click()} disabled={uploading}
                    style={{ ...inp, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: '#555', fontWeight: 600, fontSize: 12, border: '1.5px dashed #d0d0d0', background: '#fafafa', flex: 1, justifyContent: 'center', padding: '10px' }}>
                    <Upload size={14} />
                    {uploading ? 'Yükleniyor...' : 'Dosya Yükle'}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
                    onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0])} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                  <Link size={12} style={{ color: '#aaa', flexShrink: 0 }} />
                  <input value={modal.image_url ?? ''} onChange={e => setModal(prev => ({ ...prev!, image_url: e.target.value }))}
                    placeholder="veya görsel URL yapıştır" style={{ ...inp, flex: 1, fontSize: 12 }} />
                </div>
                <p style={{ color: '#bbb', fontSize: 11, margin: '4px 0 0' }}>200 KB üzeri görseller otomatik WebP'ye dönüştürülür.</p>
              </div>

              {/* Galeri Görselleri */}
              <div className="mb-3">
                <label style={lbl}>GALERİ GÖRSELLERİ <span style={{ color: '#bbb', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(opsiyonel)</span></label>
                {(modal.gallery ?? []).length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                    {(modal.gallery ?? []).map((url, i) => (
                      <div key={i} style={{ position: 'relative' }}>
                        <img src={url} alt="" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 6, border: '1px solid #e8e8e8' }} />
                        <button onClick={() => removeGalleryItem(i)}
                          style={{ position: 'absolute', top: -5, right: -5, background: '#dc2626', border: 'none', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', padding: 0 }}>
                          <X size={9} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <button onClick={() => galleryFileRef.current?.click()} disabled={uploading}
                    style={{ ...inp, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: '#555', fontWeight: 600, fontSize: 12, border: '1.5px dashed #d0d0d0', background: '#fafafa', padding: '8px 14px' }}>
                    <ImagePlus size={13} /> Görsel Ekle
                  </button>
                  <input ref={galleryFileRef} type="file" accept="image/*" style={{ display: 'none' }}
                    onChange={e => e.target.files?.[0] && uploadGalleryImage(e.target.files[0])} />
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <input value={galleryUrlInput} onChange={e => setGalleryUrlInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addGalleryUrl())}
                    placeholder="veya URL ile ekle" style={{ ...inp, flex: 1, fontSize: 12 }} />
                  <button onClick={addGalleryUrl} style={{ background: '#f0f7e6', border: '1px solid #c3e92d', borderRadius: 8, padding: '8px 14px', fontWeight: 700, fontSize: 12, color: '#3a7500', cursor: 'pointer' }}>Ekle</button>
                </div>
              </div>

              {/* Kategori */}
              <div className="mb-3">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                  <label style={lbl}>KATEGORİ</label>
                  <button onClick={() => setCustomCategory(!customCategory)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, color: '#3a7500', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
                    <ChevronDown size={12} />
                    {customCategory ? 'Hazır listeden seç' : 'Özel kategori gir'}
                  </button>
                </div>
                {customCategory ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div>
                      <p style={{ ...lbl, marginBottom: 4 }}>KEY</p>
                      <input value={modal.category ?? ''} onChange={e => setModal({ ...modal, category: e.target.value })}
                        placeholder="yeni-kategori" style={{ ...inp, width: '100%' }} />
                    </div>
                    <div>
                      <p style={{ ...lbl, marginBottom: 4 }}>ADI</p>
                      <input value={modal.category_name ?? ''} onChange={e => setModal({ ...modal, category_name: e.target.value })}
                        placeholder="Yeni Kategori" style={{ ...inp, width: '100%' }} />
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

              {/* Açıklama */}
              <div className="mb-3">
                <label style={lbl}>AÇIKLAMA</label>
                <textarea value={modal.description ?? ''} onChange={e => setModal({ ...modal, description: e.target.value })}
                  rows={3} style={{ ...inp, width: '100%', resize: 'vertical' }} />
              </div>

              {/* Özellikler */}
              <div className="mb-3">
                <label style={lbl}>ÖZELLİKLER</label>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  <input value={featInput} onChange={e => setFeatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    placeholder="Özellik ekle, Enter'a bas" style={{ ...inp, flex: 1 }} />
                  <button onClick={addFeature}
                    style={{ background: '#f0f7e6', border: '1px solid #c3e92d', borderRadius: 8, padding: '8px 14px', fontWeight: 700, fontSize: 12, color: '#3a7500', cursor: 'pointer' }}>
                    Ekle
                  </button>
                </div>
                {modal.features?.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ flex: 1, background: '#f9fafb', border: '1px solid #e8e8e8', borderRadius: 6, padding: '6px 10px', color: '#444', fontSize: 12 }}>{f}</span>
                    <button onClick={() => setModal({ ...modal, features: modal.features?.filter((_, idx) => idx !== i) })}
                      style={btn('#fee2e2', '#dc2626')}><X size={12} /></button>
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
