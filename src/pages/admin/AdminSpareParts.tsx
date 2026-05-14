import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { SparePartRow } from '../../lib/supabase';
import { AdminPageHeader } from './AdminLayout';
import { Plus, Pencil, Trash2, X, Check, Search } from 'lucide-react';

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
  const [delConfirm, setDelConfirm] = useState<string | null>(null);

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

  const save = async () => {
    if (!modal) return;
    setSaving(true);
    const cat = CAT_OPTIONS.find(c => c.key === modal.category_key);
    const payload = { ...modal, category_title: cat?.label ?? modal.category_title };
    if (modal.id) {
      await supabase.from('spare_parts').update(payload).eq('id', modal.id);
    } else {
      await supabase.from('spare_parts').insert([payload]);
    }
    setSaving(false);
    setModal(null);
    load();
  };

  const del = async (id: string) => {
    await supabase.from('spare_parts').delete().eq('id', id);
    setDelConfirm(null);
    load();
  };

  return (
    <div>
      <AdminPageHeader
        title="Yedek Parçalar"
        sub={`${rows.length} parça`}
        action={
          <button onClick={() => setModal(emptyRow())} className="btn btn-sm fw-bold d-flex align-items-center gap-2"
            style={{ background: '#60a5fa', color: '#0a0a0a', borderRadius: 8 }}>
            <Plus size={14} /> Yeni Parça
          </button>
        }
      />

      <div style={{ padding: '1.5rem 2rem' }}>
        <div style={{ position: 'relative', maxWidth: 320, marginBottom: '1.25rem' }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Parça ara..."
            style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 12px 8px 34px', color: '#fff', fontSize: 13 }} />
        </div>

        <div style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                {['Görsel', 'Başlık', 'Anahtar', 'Kategori', 'Alt Kategori', ''].map(h => (
                  <th key={h} style={{ padding: '10px 14px', color: '#555', fontSize: 11, fontWeight: 700, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#555', fontSize: 13 }}>Yükleniyor...</td></tr>}
              {!loading && filtered.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#555', fontSize: 13 }}>Kayıt bulunamadı.</td></tr>}
              {filtered.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid #1a1a1a' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#1a1a1a')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '8px 14px' }}>
                    <img src={row.image} alt="" style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6, background: '#222' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </td>
                  <td style={{ padding: '8px 14px', color: '#ddd', fontSize: 13, fontWeight: 600 }}>{row.title}</td>
                  <td style={{ padding: '8px 14px', color: '#555', fontSize: 12 }}>{row.item_key}</td>
                  <td style={{ padding: '8px 14px' }}>
                    <span style={{ background: '#101a2a', color: '#60a5fa', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>{row.category_key}</span>
                  </td>
                  <td style={{ padding: '8px 14px', color: '#555', fontSize: 12 }}>{row.sub_key ?? '—'}</td>
                  <td style={{ padding: '8px 14px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => setModal({ ...row })} style={btnStyle('#2a2a2a', '#aaa')}><Pencil size={13} /></button>
                      {delConfirm === row.id ? (
                        <>
                          <button onClick={() => del(row.id!)} style={btnStyle('#3a1010', '#f87171')}><Check size={13} /></button>
                          <button onClick={() => setDelConfirm(null)} style={btnStyle('#2a2a2a', '#888')}><X size={13} /></button>
                        </>
                      ) : (
                        <button onClick={() => setDelConfirm(row.id!)} style={btnStyle('#2a2a2a', '#888')}><Trash2 size={13} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#141414', border: '1px solid #222', borderRadius: 16, width: '100%', maxWidth: 520, maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#fff', margin: 0, fontSize: 16, fontWeight: 800 }}>{modal.id ? 'Parça Düzenle' : 'Yeni Parça'}</h3>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <F label="Anahtar (benzersiz)" value={modal.item_key ?? ''} onChange={v => setModal({ ...modal, item_key: v })} placeholder="yay-18" />
              <F label="Başlık" value={modal.title ?? ''} onChange={v => setModal({ ...modal, title: v })} />
              <div className="mb-3">
                <label style={lbl}>KATEGORİ</label>
                <select value={modal.category_key ?? ''} onChange={e => setModal({ ...modal, category_key: e.target.value })} style={{ ...inp, width: '100%' }}>
                  {CAT_OPTIONS.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                </select>
              </div>
              <F label="Alt Kategori Anahtarı (opsiyonel)" value={modal.sub_key ?? ''} onChange={v => setModal({ ...modal, sub_key: v || null })} placeholder="yaylar" />
              <F label="Alt Kategori Başlığı (opsiyonel)" value={modal.sub_title ?? ''} onChange={v => setModal({ ...modal, sub_title: v || null })} placeholder="Yaylar" />
              <F label="Görsel URL" value={modal.image ?? ''} onChange={v => setModal({ ...modal, image: v })} placeholder="https://trambolinpark.com/..." />
              <div className="mb-3">
                <label style={lbl}>AÇIKLAMA</label>
                <textarea value={modal.description ?? ''} onChange={e => setModal({ ...modal, description: e.target.value })}
                  rows={3} style={{ ...inp, width: '100%', resize: 'vertical' }} />
              </div>
              <F label="Kategori Kapak Görseli" value={modal.category_cover ?? ''} onChange={v => setModal({ ...modal, category_cover: v })} />
              <F label="Kategori İkon (emoji veya kod)" value={modal.category_icon ?? ''} onChange={v => setModal({ ...modal, category_icon: v })} placeholder="🔧" />
              <F label="Kategori Kısa Açıklama" value={modal.category_short ?? ''} onChange={v => setModal({ ...modal, category_short: v })} />
            </div>
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #222', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setModal(null)} style={{ ...btnStyle('#1e1e1e', '#888'), padding: '8px 18px', fontSize: 13, fontWeight: 600 }}>İptal</button>
              <button onClick={save} disabled={saving} style={{ background: '#60a5fa', color: '#0a0a0a', border: 'none', borderRadius: 8, padding: '8px 22px', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
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
const btnStyle = (bg: string, color: string): React.CSSProperties => ({ background: bg, border: 'none', borderRadius: 7, padding: '6px 8px', color, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' });

function F({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="mb-3">
      <label style={lbl}>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...inp, width: '100%' }} />
    </div>
  );
}
