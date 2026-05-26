import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { optimizeImage, toSlug } from '../../lib/imageUtils';
import { AdminPageHeader } from './AdminLayout';
import { Plus, Pencil, Trash2, X, Check, Search, Upload, Link, Eye, EyeOff } from 'lucide-react';
import { blogPosts as staticPosts } from '../../data/blogPosts';

type BlogRow = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover_image: string;
  read_time: number;
  date: string;
  published: boolean;
};

function staticToRow(p: typeof staticPosts[number]): BlogRow {
  return { slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category, cover_image: p.coverImage, read_time: p.readTime, date: p.date, published: true };
}

const emptyPost = (): BlogRow => ({
  slug: '', title: '', excerpt: '', category: '',
  cover_image: '', read_time: 5,
  date: new Date().toISOString().split('T')[0],
  published: true,
});

const CATEGORIES = ['Yatırım & İşletme', 'Güvenlik & Sertifikasyon', 'Tasarım & Kurulum', 'Sektör Haberleri', 'İpuçları'];

export default function AdminBlog() {
  const [rows, setRows] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<BlogRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [delConfirm, setDelConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('blog_posts').select('*').order('date', { ascending: false });
    const remote = data ?? [];
    const remoteSlugs = new Set(remote.map((r: BlogRow) => r.slug));
    const local = staticPosts.map(staticToRow).filter(r => !remoteSlugs.has(r.slug));
    const merged = [...remote, ...local].sort((a, b) => b.date.localeCompare(a.date));
    setRows(merged);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const filtered = rows.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  );

  const onTitleChange = (title: string) => {
    const isNew = !rows.find(r => r.id === (modal as any)?.id);
    setModal(prev => ({ ...prev!, title, slug: isNew ? toSlug(title) : prev!.slug }));
  };

  const uploadCover = async (file: File) => {
    setUploading(true);
    try {
      const optimized = await optimizeImage(file);
      const path = `blog/${Date.now()}-${optimized.name}`;
      const { error } = await supabase.storage.from('urunler').upload(path, optimized, { upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from('urunler').getPublicUrl(path);
      setModal(prev => ({ ...prev!, cover_image: data.publicUrl }));
    } catch (e: any) {
      alert('Yükleme hatası: ' + e.message);
    }
    setUploading(false);
  };

  const save = async () => {
    if (!modal) return;
    setSaving(true);
    const isEdit = rows.find(r => r.id === (modal as any).id);
    const { error } = isEdit
      ? await supabase.from('blog_posts').update(modal).eq('id', (modal as any).id)
      : await supabase.from('blog_posts').insert([modal]);
    setSaving(false);
    if (error) { alert('Hata: ' + error.message); return; }
    showToast(isEdit ? 'Yazı güncellendi ✓' : 'Yazı eklendi ✓');
    setModal(null);
    load();
  };

  const del = async (id: string) => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) { alert('Silme hatası: ' + error.message); return; }
    setDelConfirm(null);
    load();
  };

  const togglePublish = async (row: BlogRow) => {
    await supabase.from('blog_posts').update({ published: !row.published }).eq('id', (row as any).id);
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
        title="Blog Yazıları"
        sub={`${rows.length} yazı`}
        action={
          <button onClick={() => setModal(emptyPost())} className="btn btn-sm fw-bold d-flex align-items-center gap-2"
            style={{ background: '#c3e92d', color: '#0a0a0a', borderRadius: 8, border: 'none' }}>
            <Plus size={14} /> Yeni Yazı
          </button>
        }
      />

      <div style={{ padding: '1.5rem 2rem' }}>
        <div style={{ position: 'relative', maxWidth: 320, marginBottom: '1.5rem' }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Yazı ara..."
            style={{ width: '100%', background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: '8px 12px 8px 34px', color: '#333', fontSize: 13 }} />
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: '#5c9200', width: 28, height: 28, borderWidth: 3 }} role="status" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-5" style={{ color: '#aaa', fontSize: 14 }}>Blog yazısı bulunamadı.</div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
                  {['Kapak', 'Başlık', 'Kategori', 'Tarih', 'Durum', ''].map(h => (
                    <th key={h} style={{ padding: '10px 14px', color: '#aaa', fontSize: 11, fontWeight: 700, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr key={(row as any).id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f5f5f5' : 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <td style={{ padding: '10px 14px', width: 52 }}>
                      {row.cover_image
                        ? <img src={row.cover_image} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8 }} />
                        : <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f0f0f0' }} />}
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1a1a1a' }}>{row.title}</p>
                      <p style={{ margin: 0, color: '#bbb', fontSize: 11 }}>{row.slug}</p>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ background: '#f0f7e6', color: '#3a7500', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>{row.category || '—'}</span>
                    </td>
                    <td style={{ padding: '10px 14px', color: '#888', fontSize: 12 }}>{row.date}</td>
                    <td style={{ padding: '10px 14px' }}>
                      {row.id ? (
                        <button onClick={() => togglePublish(row)}
                          style={{ display: 'flex', alignItems: 'center', gap: 5, background: row.published ? '#dcfce7' : '#f5f5f5', border: 'none', borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: row.published ? '#16a34a' : '#888', cursor: 'pointer' }}>
                          {row.published ? <><Eye size={11} /> Yayında</> : <><EyeOff size={11} /> Gizli</>}
                        </button>
                      ) : (
                        <span style={{ background: '#fff7e6', color: '#b45309', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>Yerel</span>
                      )}
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        <button onClick={() => setModal({ ...row })} style={btn('#f5f5f5', '#555')} title={row.id ? 'Düzenle' : 'Supabase\'e aktar'}><Pencil size={13} /></button>
                        {row.id && (
                          delConfirm === row.id ? (
                            <>
                              <button onClick={() => del(row.id!)} style={btn('#fee2e2', '#dc2626')}><Check size={13} /></button>
                              <button onClick={() => setDelConfirm(null)} style={btn('#f5f5f5', '#888')}><X size={13} /></button>
                            </>
                          ) : (
                            <button onClick={() => setDelConfirm(row.id!)} style={btn('#f5f5f5', '#aaa')}><Trash2 size={13} /></button>
                          )
                        )}
                      </div>
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
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 560, maxHeight: '92vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,.15)' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#1a1a1a', margin: 0, fontSize: 16, fontWeight: 800 }}>
                {(modal as any).id ? 'Yazı Düzenle' : (modal.slug ? 'Yerel Yazıyı Aktar' : 'Yeni Blog Yazısı')}
              </h3>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <div className="mb-3">
                <label style={lbl}>BAŞLIK</label>
                <input value={modal.title} onChange={e => onTitleChange(e.target.value)}
                  placeholder="Blog yazısı başlığı" style={{ ...inp, width: '100%' }} />
              </div>

              <div className="mb-3">
                <label style={lbl}>SLUG <span style={{ color: '#bbb', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(otomatik)</span></label>
                <input value={modal.slug} readOnly style={{ ...inp, width: '100%', background: '#f0f0f0', color: '#aaa', cursor: 'not-allowed' }} />
              </div>

              {/* Kapak Görseli */}
              <div className="mb-3">
                <label style={lbl}>KAPAK GÖRSELİ</label>
                {modal.cover_image && (
                  <div style={{ marginBottom: 8, position: 'relative', display: 'inline-block' }}>
                    <img src={modal.cover_image} alt="" style={{ width: 120, height: 72, objectFit: 'cover', borderRadius: 8, border: '1px solid #e8e8e8' }} />
                    <button onClick={() => setModal(prev => ({ ...prev!, cover_image: '' }))}
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
                    onChange={e => e.target.files?.[0] && uploadCover(e.target.files[0])} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Link size={12} style={{ color: '#aaa', flexShrink: 0 }} />
                  <input value={modal.cover_image} onChange={e => setModal(prev => ({ ...prev!, cover_image: e.target.value }))}
                    placeholder="veya görsel URL yapıştır" style={{ ...inp, flex: 1, fontSize: 12 }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="mb-3">
                <div>
                  <label style={lbl}>KATEGORİ</label>
                  <select value={modal.category} onChange={e => setModal({ ...modal, category: e.target.value })} style={{ ...inp, width: '100%' }}>
                    <option value="">Seçin...</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>OKUMA SÜRESİ (DAK.)</label>
                  <input type="number" value={modal.read_time} onChange={e => setModal({ ...modal, read_time: +e.target.value })}
                    min={1} max={60} style={{ ...inp, width: '100%' }} />
                </div>
              </div>

              <div className="mb-3">
                <label style={lbl}>YAYIM TARİHİ</label>
                <input type="date" value={modal.date} onChange={e => setModal({ ...modal, date: e.target.value })} style={{ ...inp, width: '100%' }} />
              </div>

              <div className="mb-3">
                <label style={lbl}>ÖZET</label>
                <textarea value={modal.excerpt} onChange={e => setModal({ ...modal, excerpt: e.target.value })}
                  rows={3} placeholder="Kısa açıklama (liste sayfasında görünür)" style={{ ...inp, width: '100%', resize: 'vertical' }} />
              </div>

              <div className="mb-3">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={modal.published} onChange={e => setModal({ ...modal, published: e.target.checked })} style={{ width: 16, height: 16, accentColor: '#3a7500' }} />
                  <span style={{ ...lbl, margin: 0 }}>Yayında (aktif)</span>
                </label>
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
