import { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(`Merhaba, iletişim formundan mesaj geldi:\n\nAd Soyad: ${form.name}\nTelefon: ${form.phone}\nE-posta: ${form.email}\nMesaj: ${form.message}`);
    window.open(`https://api.whatsapp.com/send?phone=905433494947&text=${text}`, '_blank');
    setSent(true);
    setForm({ name: '', phone: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>

      {/* Hero */}
      <div className="tp-page-hero">
        <div className="container">
          <span className="badge rounded-pill mb-3" style={{ background: 'rgba(159,201,26,.15)', color: '#9fc91a', fontSize: 11, fontWeight: 800, letterSpacing: '.1em', padding: '.4rem 1rem' }}>BİZE ULAŞIN</span>
          <h1 className="display-5 fw-black text-white mb-2">İletişim</h1>
          <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 500 }}>Projeleriniz için en uygun çözümleri birlikte tasarlayalım.</p>
        </div>
      </div>

      <div className="container py-4 py-md-5">
        <div className="row g-4">

          {/* Sol — iletişim bilgileri */}
          <div className="col-12 col-lg-5">
            <div className="bg-white rounded-4 p-4 p-md-5 h-100" style={{ border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,.05)' }}>
              <h2 className="fw-black mb-4" style={{ fontSize: 22 }}>İletişim Bilgileri</h2>

              <div className="d-flex flex-column gap-4 mb-4">
                {[
                  { icon: <MapPin size={20} />, label: 'Adres', value: 'İvedik Osb 1372 Sok. No. 33/2\nYenimahalle / Ankara', href: undefined },
                  { icon: <Phone size={20} />, label: 'WhatsApp', value: '+90 543 349 49 47', href: 'https://api.whatsapp.com/send?phone=905433494947' },
                  { icon: <Mail size={20} />, label: 'E-Posta', value: 'info@trambolinpark.com', href: 'mailto:info@trambolinpark.com' },
                ].map((item, i) => (
                  <div key={i} className="d-flex align-items-start gap-3">
                    <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ width: 44, height: 44, background: 'rgba(159,201,26,.1)', color: '#9fc91a' }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="fw-black mb-1" style={{ fontSize: 13, color: '#1a1a1a' }}>{item.label}</p>
                      {item.href
                        ? <a href={item.href} target="_blank" rel="noreferrer" style={{ color: '#64748b', fontSize: 14, textDecoration: 'none' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#9fc91a')} onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}>{item.value}</a>
                        : <p className="mb-0 text-secondary" style={{ fontSize: 14, whiteSpace: 'pre-line' }}>{item.value}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <a href="https://api.whatsapp.com/send?phone=905433494947" target="_blank" rel="noreferrer"
                className="btn btn-lg w-100 rounded-3 fw-black d-flex align-items-center justify-content-center gap-2"
                style={{ background: '#25D366', color: '#fff', border: 'none' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp ile Yaz
              </a>
            </div>
          </div>

          {/* Sağ — form */}
          <div className="col-12 col-lg-7">
            <div className="bg-white rounded-4 p-4 p-md-5 h-100" style={{ border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,.05)' }}>
              <h2 className="fw-black mb-4" style={{ fontSize: 22 }}>Mesaj Gönderin</h2>

              {sent ? (
                <div className="d-flex flex-column align-items-center justify-content-center py-5 gap-3">
                  <CheckCircle2 size={52} color="#9fc91a" />
                  <p className="fw-black fs-5 mb-0">Mesajınız iletildi!</p>
                  <p className="text-muted mb-0" style={{ fontSize: 14 }}>WhatsApp'tan devam edebilirsiniz.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <label className="tp-form-label">Ad Soyad *</label>
                      <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Adınız Soyadınız" className="tp-form-control" />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="tp-form-label">Telefon</label>
                      <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+90 5xx xxx xx xx" className="tp-form-control" />
                    </div>
                  </div>
                  <div>
                    <label className="tp-form-label">E-Posta</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="ornek@email.com" className="tp-form-control" />
                  </div>
                  <div>
                    <label className="tp-form-label">Mesajınız *</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Projeniz hakkında bilgi verin..." className="tp-form-control" style={{ resize: 'none' }} />
                  </div>
                  <button type="submit" className="btn btn-brand btn-lg rounded-3 fw-black d-flex align-items-center justify-content-center gap-2 mt-1">
                    <Send size={18} /> Gönder
                  </button>
                  <p className="text-center text-muted mb-0" style={{ fontSize: 12 }}>Form gönderildiğinde WhatsApp üzerinden iletilir.</p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Harita */}
        <div className="tp-map mt-4">
          <iframe title="Trambolinpark Konum"
            src="https://maps.google.com/maps?q=%C4%B0vedik+OSB+1372+Sokak+No+33+2+Yenimahalle+Ankara&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </div>
  );
}
