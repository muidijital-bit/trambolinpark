import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { AdminPageHeader } from './AdminLayout';
import { Save } from 'lucide-react';

type Phone = { label: string; num: string; href: string; hint: string };

type ContactData = {
  wa: string;
  phones: Phone[];
  email: string;
  address: string;
};

const DEFAULTS: ContactData = {
  wa: '905433494947',
  phones: [
    { label: 'Sabit Hat', num: '0 (312) 911 27 87', href: 'tel:+903129112787', hint: 'Pazartesi – Cumartesi, 09:00 – 18:00' },
    { label: 'Cep Hattı', num: '0 (543) 349 49 47', href: 'tel:+905433494947', hint: 'Hafta içi & hafta sonu' },
  ],
  email: 'info@trambolinpark.com',
  address: 'İvedik OSB 1372 Sok. No. 33/2, Yenimahalle / Ankara',
};

async function loadSettings(): Promise<ContactData> {
  const { data } = await supabase.from('about_settings').select('key,value')
    .in('key', ['contact_wa', 'contact_phones', 'contact_email', 'contact_address']);
  if (!data || data.length === 0) return DEFAULTS;
  const map: Record<string, string> = {};
  data.forEach((r: { key: string; value: string }) => { map[r.key] = r.value; });
  return {
    wa:      map.contact_wa      ?? DEFAULTS.wa,
    phones:  map.contact_phones  ? JSON.parse(map.contact_phones) : DEFAULTS.phones,
    email:   map.contact_email   ?? DEFAULTS.email,
    address: map.contact_address ?? DEFAULTS.address,
  };
}

async function saveKey(key: string, value: string) {
  await supabase.from('about_settings').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
}

const inputStyle: React.CSSProperties = { width: '100%', border: '1.5px solid #e0e0e0', borderRadius: 8, padding: '8px 10px', fontSize: 13, color: '#1a1a1a', background: '#fafafa' };
const labelStyle: React.CSSProperties = { fontSize: 11, fontWeight: 700, color: '#555', display: 'block', marginBottom: 4 };
const sectionHead: React.CSSProperties = { fontSize: 14, fontWeight: 800, color: '#1a1a1a', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1.5px solid #ebebeb' };

export default function AdminContact() {
  const [data, setData] = useState<ContactData>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSettings().then(d => { setData(d); setLoading(false); });
  }, []);

  const save = async () => {
    setSaving(true);
    await Promise.all([
      saveKey('contact_wa',      data.wa),
      saveKey('contact_phones',  JSON.stringify(data.phones)),
      saveKey('contact_email',   data.email),
      saveKey('contact_address', data.address),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const setPhone = (i: number, field: keyof Phone, val: string) =>
    setData(prev => { const p = [...prev.phones]; p[i] = { ...p[i], [field]: val }; return { ...prev, phones: p }; });

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: '#aaa' }}>Yükleniyor...</div>;

  return (
    <div>
      <AdminPageHeader
        title="İletişim"
        sub="İletişim sayfası bilgilerini düzenleyin"
        action={
          <button onClick={save} disabled={saving}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: saved ? '#3a7500' : '#1a1a1a', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'background .3s' }}>
            <Save size={15} /> {saved ? 'Kaydedildi ✓' : saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        }
      />

      <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: 700 }}>

        {/* WhatsApp */}
        <section>
          <h3 style={sectionHead}>WhatsApp</h3>
          <label style={labelStyle}>Numara (başında + olmadan, örn: 905433494947)</label>
          <input value={data.wa} onChange={e => setData(p => ({ ...p, wa: e.target.value }))} style={inputStyle} />
        </section>

        {/* Telefon hatları */}
        <section>
          <h3 style={sectionHead}>Telefon Hatları</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {data.phones.map((ph, i) => (
              <div key={i} style={{ background: '#fff', border: '1.5px solid #ebebeb', borderRadius: 12, padding: '1rem' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 12px' }}>Hat {i + 1}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={labelStyle}>Etiket</label>
                    <input value={ph.label} onChange={e => setPhone(i, 'label', e.target.value)} style={inputStyle} placeholder="Sabit Hat" />
                  </div>
                  <div>
                    <label style={labelStyle}>Numara (görünen)</label>
                    <input value={ph.num} onChange={e => setPhone(i, 'num', e.target.value)} style={inputStyle} placeholder="0 (312) 911 27 87" />
                  </div>
                  <div>
                    <label style={labelStyle}>Tel linki (href)</label>
                    <input value={ph.href} onChange={e => setPhone(i, 'href', e.target.value)} style={inputStyle} placeholder="tel:+903129112787" />
                  </div>
                  <div>
                    <label style={labelStyle}>Alt not</label>
                    <input value={ph.hint} onChange={e => setPhone(i, 'hint', e.target.value)} style={inputStyle} placeholder="Pazartesi – Cumartesi, 09:00–18:00" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* E-posta */}
        <section>
          <h3 style={sectionHead}>E-Posta</h3>
          <label style={labelStyle}>Adres</label>
          <input value={data.email} onChange={e => setData(p => ({ ...p, email: e.target.value }))} style={inputStyle} />
        </section>

        {/* Adres */}
        <section>
          <h3 style={sectionHead}>Adres</h3>
          <label style={labelStyle}>Açık Adres</label>
          <input value={data.address} onChange={e => setData(p => ({ ...p, address: e.target.value }))} style={inputStyle} />
        </section>

      </div>
    </div>
  );
}
