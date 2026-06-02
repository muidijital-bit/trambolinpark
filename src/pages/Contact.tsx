import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

const WA = '905433494947';

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18, flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const INFO = [
  { icon: <Phone size={16} />, label: 'Telefon',  value: '0 (312) 911 27 87',        href: 'tel:+903129112787' },
  { icon: <Mail size={16} />,  label: 'E-Posta',  value: 'info@trambolinpark.com',   href: 'mailto:info@trambolinpark.com' },
  { icon: <MapPin size={16} />,label: 'Adres',    value: 'İvedik OSB 1372 Sok. No. 33/2\nYenimahalle / Ankara', href: null },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Merhaba, iletişim formundan mesaj geldi:\n\nAd Soyad: ${form.name}\nTelefon: ${form.phone}\nE-posta: ${form.email}\nMesaj: ${form.message}`
    );
    window.open(`https://api.whatsapp.com/send?phone=${WA}&text=${text}`, '_blank');
    setSent(true);
    setForm({ name: '', phone: '', email: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

      {/* Hero */}
      <div className="tp-page-hero">
        <div aria-hidden="true" className="tp-hero-watermark">İLETİŞİM</div>
        <div className="container">
          <span className="badge rounded-pill mb-3" style={{ background: 'rgba(195,233,45,.15)', color: '#c3e92d', fontSize: 11, fontWeight: 800, letterSpacing: '.1em', padding: '.4rem 1rem' }}>BİZE ULAŞIN</span>
          <div className="tp-hero-line" />
          <h1 className="display-5 fw-black text-white mb-2">İletişim</h1>
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 15, maxWidth: 480 }}>Projeleriniz için en uygun çözümleri birlikte tasarlayalım.</p>
        </div>
      </div>

      {/* Contact panel */}
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="row g-0 rounded-4 overflow-hidden"
          style={{ boxShadow: '0 32px 100px rgba(0,0,0,.14)', border: '1px solid rgba(0,0,0,.07)' }}>

          {/* ── Left: dark info panel ── */}
          <div className="col-12 col-lg-5 position-relative overflow-hidden"
            style={{ background: '#0a0a0a', padding: '3.5rem 2.75rem' }}>

            {/* green blur orbs */}
            <div aria-hidden="true" style={{ position: 'absolute', top: -100, right: -60, width: 380, height: 380, background: 'radial-gradient(circle, rgba(92,146,0,.45) 0%, transparent 65%)', filter: 'blur(55px)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div aria-hidden="true" style={{ position: 'absolute', bottom: -60, left: -40, width: 260, height: 260, background: 'radial-gradient(circle, rgba(195,233,45,.18) 0%, transparent 65%)', filter: 'blur(45px)', borderRadius: '50%', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <p className="font-poppins fw-black text-uppercase mb-2" style={{ fontSize: 10, letterSpacing: '.2em', color: '#c3e92d' }}>Bize Ulaşın</p>
              <h2 className="font-poppins fw-black mb-3" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', lineHeight: 1.15, color: '#fff' }}>
                Sizinle<br />konuşmak isteriz.
              </h2>
              <p style={{ color: 'rgba(255,255,255,.42)', fontSize: 14, lineHeight: 1.8, marginBottom: '2.75rem' }}>
                Projenizi paylaşın, trambolin parkı çözümünü birlikte tasarlayalım.
              </p>

              {/* Contact rows */}
              <div className="d-flex flex-column gap-4" style={{ marginBottom: '2.5rem' }}>
                {INFO.map((item, i) => (
                  <div key={i} className="d-flex align-items-start gap-3">
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(195,233,45,.07)', border: '1px solid rgba(195,233,45,.15)', color: '#c3e92d' }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: 9, color: 'rgba(255,255,255,.3)', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', margin: '0 0 4px' }}>{item.label}</p>
                      {item.href
                        ? <a href={item.href} style={{ color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none', lineHeight: 1.4 }}>{item.value}</a>
                        : <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: 0, whiteSpace: 'pre-line', lineHeight: 1.5 }}>{item.value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a href={`https://api.whatsapp.com/send?phone=${WA}`} target="_blank" rel="noreferrer"
                className="d-flex align-items-center gap-3"
                style={{ padding: '14px 20px', borderRadius: 12, background: 'rgba(37,211,102,.09)', border: '1px solid rgba(37,211,102,.22)', color: '#25D366', fontWeight: 700, fontSize: 14, textDecoration: 'none', transition: 'background .2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,211,102,.16)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(37,211,102,.09)')}>
                <WaIcon />
                WhatsApp ile Yazın
              </a>
            </div>
          </div>

          {/* ── Right: form panel ── */}
          <div className="col-12 col-lg-7" style={{ background: '#fff', padding: '3.5rem 2.75rem' }}>

            {sent ? (
              <div className="d-flex flex-column align-items-center justify-content-center gap-3 py-5 h-100">
                <div className="d-flex align-items-center justify-content-center"
                  style={{ width: 76, height: 76, borderRadius: '50%', background: 'rgba(92,146,0,.08)' }}>
                  <CheckCircle2 size={36} color="#5c9200" strokeWidth={1.75} />
                </div>
                <h3 className="font-poppins fw-black mb-0" style={{ fontSize: 22, color: '#0a0a0a' }}>Mesajınız iletildi!</h3>
                <p style={{ color: '#888', fontSize: 14, margin: 0 }}>WhatsApp üzerinden devam edebilirsiniz.</p>
              </div>
            ) : (
              <>
                <p className="font-poppins fw-black text-uppercase mb-1" style={{ fontSize: 10, letterSpacing: '.2em', color: '#5c9200' }}>Mesaj Formu</p>
                <h3 className="font-poppins fw-black mb-4" style={{ fontSize: 22, color: '#0a0a0a' }}>Mesaj Gönderin</h3>

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <label className="tp-form-label">Ad Soyad *</label>
                      <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Adınız Soyadınız" className="tp-form-control" />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="tp-form-label">Telefon</label>
                      <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="+90 5xx xxx xx xx" className="tp-form-control" />
                    </div>
                  </div>

                  <div>
                    <label className="tp-form-label">E-Posta</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="ornek@email.com" className="tp-form-control" />
                  </div>

                  <div>
                    <label className="tp-form-label">Mesajınız *</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Projeniz hakkında bilgi verin..." className="tp-form-control" style={{ resize: 'none' }} />
                  </div>

                  <div className="d-flex gap-3 mt-2">
                    <button type="submit"
                      className="d-flex align-items-center justify-content-center gap-2 font-poppins fw-black"
                      style={{ flex: 1, padding: '14px 20px', borderRadius: 12, background: '#0a0a0a', color: '#fff', border: 'none', fontSize: 14, cursor: 'pointer', transition: 'background .2s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#1f1f1f')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0a')}>
                      <Send size={15} /> Gönder
                    </button>
                    <a href={`https://api.whatsapp.com/send?phone=${WA}`} target="_blank" rel="noreferrer"
                      className="d-flex align-items-center justify-content-center gap-2 font-poppins fw-black"
                      style={{ flex: 1, padding: '14px 20px', borderRadius: 12, background: '#5c9200', color: '#fff', fontSize: 14, textDecoration: 'none', transition: 'background .2s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#4a7500')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#5c9200')}>
                      <WaIcon /> WhatsApp
                    </a>
                  </div>
                  <p style={{ fontSize: 11, color: '#bbb', textAlign: 'center', margin: 0 }}>
                    Form gönderildiğinde WhatsApp üzerinden iletilir.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Full-width grayscale map */}
      <div style={{ filter: 'grayscale(1) contrast(1.08) brightness(.95)', height: 420, display: 'block' }}>
        <iframe title="Trambolinpark Konum"
          src="https://maps.google.com/maps?q=%C4%B0vedik+OSB+1372+Sokak+No+33+2+Yenimahalle+Ankara&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%" height="100%" style={{ border: 0, display: 'block' }}
          allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>

    </div>
  );
}
