import { Phone, Mail, MapPin } from 'lucide-react';

const WA = '905433494947';

const waStyles = `
@keyframes waDot  { 0%,80%,100% { transform:scale(0); opacity:.4; } 40% { transform:scale(1); opacity:1; } }
@keyframes msgIn  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
.wa-m1 { animation: msgIn .4s ease .1s both; }
.wa-m2 { animation: msgIn .4s ease .7s both; }
.wa-m3 { animation: msgIn .4s ease 1.4s both; }
.wa-m4 { animation: msgIn .4s ease 2.1s both; }
`;

const WaIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size, flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Contact() {
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

      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4.5rem' }}>

        {/* WhatsApp ana kart */}
        <style>{waStyles}</style>
        <div className="row g-4 align-items-stretch" style={{ marginBottom: '1.25rem' }}>

        {/* Sol: WhatsApp chat mockup */}
        <div className="col-12 col-lg-6">
        <a href={`https://api.whatsapp.com/send?phone=${WA}`} target="_blank" rel="noreferrer"
          style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
          <div style={{
            borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,.18)',
            transition: 'transform .25s, box-shadow .25s',
            height: '100%', display: 'flex', flexDirection: 'column',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 28px 72px rgba(0,0,0,.24)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px rgba(0,0,0,.18)'; }}
          >
            {/* Header */}
            <div style={{ background: '#075E54', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <WaIcon size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: 0 }}>Trambolinpark</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,.65)' }}>yazıyor</span>
                  {[0, .2, .4].map((d, i) => (
                    <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,.65)', animation: `waDot 1s ease-in-out ${d}s infinite` }} />
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>0 (543) 349 49 47</div>
            </div>

            {/* Mesajlar */}
            <div style={{ background: '#EFE7DD', padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="wa-m1" style={{ alignSelf: 'flex-start', background: '#fff', borderRadius: '0 12px 12px 12px', padding: '9px 14px', maxWidth: '75%', boxShadow: '0 1px 3px rgba(0,0,0,.1)' }}>
                <p style={{ fontSize: 14, color: '#111', margin: 0 }}>Merhaba! Trambolin park kurmak istiyorum 👋</p>
                <p style={{ fontSize: 10, color: '#999', margin: '4px 0 0', textAlign: 'right' }}>10:24</p>
              </div>
              <div className="wa-m2" style={{ alignSelf: 'flex-end', background: '#DCF8C6', borderRadius: '12px 0 12px 12px', padding: '9px 14px', maxWidth: '75%', boxShadow: '0 1px 3px rgba(0,0,0,.1)' }}>
                <p style={{ fontSize: 14, color: '#111', margin: 0 }}>Merhaba! Size yardımcı olmaktan memnuniyet duyarız 😊</p>
                <p style={{ fontSize: 10, color: '#999', margin: '4px 0 0', textAlign: 'right' }}>10:24 ✓✓</p>
              </div>
              <div className="wa-m3" style={{ alignSelf: 'flex-start', background: '#fff', borderRadius: '0 12px 12px 12px', padding: '9px 14px', maxWidth: '75%', boxShadow: '0 1px 3px rgba(0,0,0,.1)' }}>
                <p style={{ fontSize: 14, color: '#111', margin: 0 }}>Mekan büyüklüğünüz nedir? 📐</p>
                <p style={{ fontSize: 10, color: '#999', margin: '4px 0 0', textAlign: 'right' }}>10:24</p>
              </div>
              <div className="wa-m4" style={{ alignSelf: 'flex-end', background: '#DCF8C6', borderRadius: '12px 0 12px 12px', padding: '9px 14px', maxWidth: '75%', boxShadow: '0 1px 3px rgba(0,0,0,.1)' }}>
                <p style={{ fontSize: 14, color: '#111', margin: 0 }}>Yaklaşık 800 m² düşünüyoruz.</p>
                <p style={{ fontSize: 10, color: '#999', margin: '4px 0 0', textAlign: 'right' }}>10:25 ✓✓</p>
              </div>
            </div>

            {/* Input bar */}
            <div style={{ background: '#F0F0F0', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, background: '#fff', borderRadius: 24, padding: '10px 18px', fontSize: 14, color: '#bbb', boxShadow: '0 1px 2px rgba(0,0,0,.08)' }}>
                Siz de yazın...
              </div>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#075E54', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(7,94,84,.4)' }}>
                <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </div>
            </div>
          </div>
        </a>
        </div>{/* /col sol */}

        {/* Sağ: Bizi Arayın CTA */}
        <div className="col-12 col-lg-6">
          <div style={{
            borderRadius: 20, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column',
            background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,.1)',
            border: '1px solid rgba(0,0,0,.07)',
            transition: 'transform .25s, box-shadow .25s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 28px 72px rgba(0,0,0,.14)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px rgba(0,0,0,.1)'; }}
          >
            {/* Üst: başlık */}
            <div style={{ padding: '2rem 2rem 1.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(92,146,0,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={20} color="#5c9200" strokeWidth={1.75} />
              </div>
              <div>
                <p style={{ color: '#0a0a0a', fontWeight: 700, fontSize: 15, margin: 0 }}>Bizi Arayın</p>
                <p style={{ color: '#aaa', fontSize: 12, margin: 0 }}>Hemen konuşalım</p>
              </div>
            </div>

            {/* Numara kartları */}
            <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              {[
                { label: 'Sabit Hat', num: '0 (312) 911 27 87', href: 'tel:+903129112787', hint: 'Pazartesi – Cumartesi, 09:00 – 18:00' },
                { label: 'Cep Hattı', num: '0 (543) 349 49 47', href: 'tel:+905433494947', hint: 'Hafta içi & hafta sonu' },
              ].map((c, i) => (
                <a key={i} href={c.href} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{
                    background: '#f8f8f8', border: '1px solid #eee',
                    borderRadius: 14, padding: '1.1rem 1.25rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                    transition: 'background .2s, border-color .2s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(92,146,0,.06)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(92,146,0,.2)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#f8f8f8'; (e.currentTarget as HTMLDivElement).style.borderColor = '#eee'; }}
                  >
                    <div>
                      <p style={{ color: '#aaa', fontSize: 10, fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', margin: '0 0 4px' }}>{c.label}</p>
                      <p style={{ color: '#0a0a0a', fontFamily: '"Poppins",sans-serif', fontWeight: 800, fontSize: 18, margin: '0 0 3px' }}>{c.num}</p>
                      <p style={{ color: '#bbb', fontSize: 11, margin: 0 }}>{c.hint}</p>
                    </div>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(92,146,0,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={15} color="#5c9200" strokeWidth={2} />
                    </div>
                  </div>
                </a>
              ))}

              {/* E-posta */}
              <a href="mailto:info@trambolinpark.com" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  background: '#f8f8f8', border: '1px solid #eee',
                  borderRadius: 14, padding: '1.1rem 1.25rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                  transition: 'background .2s, border-color .2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(92,146,0,.06)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(92,146,0,.2)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#f8f8f8'; (e.currentTarget as HTMLDivElement).style.borderColor = '#eee'; }}
                >
                  <div>
                    <p style={{ color: '#aaa', fontSize: 10, fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', margin: '0 0 4px' }}>E-Posta</p>
                    <p style={{ color: '#0a0a0a', fontFamily: '"Poppins",sans-serif', fontWeight: 700, fontSize: 15, margin: '0 0 3px' }}>info@trambolinpark.com</p>
                    <p style={{ color: '#bbb', fontSize: 11, margin: 0 }}>İş günleri yanıtlanır</p>
                  </div>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(92,146,0,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={15} color="#7ab800" strokeWidth={2} />
                  </div>
                </div>
              </a>
            </div>

            {/* Adres alt şerit */}
            <div style={{ padding: '1.25rem 2rem', borderTop: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <MapPin size={15} color="#bbb" strokeWidth={1.75} />
              <p style={{ color: '#aaa', fontSize: 12, margin: 0 }}>İvedik OSB 1372 Sok. No. 33/2, Yenimahalle / Ankara</p>
            </div>
          </div>
        </div>{/* /col sağ */}

        </div>{/* /row */}

      </div>

      {/* Harita */}
      <div style={{ filter: 'grayscale(1) contrast(1.08) brightness(.95)', height: 420 }}>
        <iframe title="Trambolinpark Konum"
          src="https://maps.google.com/maps?q=%C4%B0vedik+OSB+1372+Sokak+No+33+2+Yenimahalle+Ankara&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%" height="100%" style={{ border: 0, display: 'block' }}
          allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>

    </div>
  );
}

