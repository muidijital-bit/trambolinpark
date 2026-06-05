import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Wrench, Palette, Medal, Users, Target, Compass } from 'lucide-react';

const TP = 'https://trambolinpark.com';

const STATS = [
  { value: '18+',  label: 'Yıllık Deneyim' },
  { value: '623+', label: 'Tamamlanan Proje' },
  { value: '81',   label: 'İlde Kurulum' },
  { value: '%100', label: 'Yerli Üretim' },
];

const VALUES = [
  { icon: <ShieldCheck size={20} strokeWidth={1.75} />, title: 'Güvenlik Standartları', desc: 'Uluslararası güvenlik standartlarını karşılayan CE belgeli ürünlerden tasarımlar.' },
  { icon: <Palette size={20} strokeWidth={1.75} />,     title: 'Özel Tasarım',          desc: 'Her mekân için sıfırdan hazırlanan özgün proje ve çizimler.' },
  { icon: <Zap size={20} strokeWidth={1.75} />,         title: 'Hızlı Kurulum',         desc: 'Kısa sürede anahtar teslim kurulum garantisi.' },
  { icon: <Medal size={20} strokeWidth={1.75} />,       title: 'Kalite Güvencesi',      desc: 'Her üründe titiz kalite kontrolü ve uzun ömürlü malzeme seçimi.' },
  { icon: <Wrench size={20} strokeWidth={1.75} />,      title: 'Satış Sonrası Destek',  desc: 'Bakım, yedek parça temini ve uzaktan teknik destek hizmetleri.' },
  { icon: <Users size={20} strokeWidth={1.75} />,       title: 'Deneyimli Ekibimiz',    desc: 'Tasarımdan montaja kadar aynı ekip, kesintisiz proje yönetimi.' },
];

const CHECKS = [
  'Uluslararası Güvenlik Standartları',
  '%100 Yerli ve Milli Üretim',
  'Profesyonel Satış Sonrası Destek',
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, delay },
});

export default function About() {
  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

      {/* Hero */}
      <div className="tp-page-hero">
        <div aria-hidden="true" className="tp-hero-watermark">HAKKIMIZDA</div>
        <div className="container">
          <span className="badge rounded-pill mb-3" style={{ background: 'rgba(195,233,45,.15)', color: '#c3e92d', fontSize: 11, fontWeight: 800, letterSpacing: '.1em', padding: '.4rem 1rem' }}>KURUMSAL</span>
          <div className="tp-hero-line" />
          <h1 className="display-5 fw-black text-white mb-2">Hakkımızda</h1>
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 15, maxWidth: 500 }}>Trambolinpark olarak eğlence alanları tasarlıyor, üretiyor ve anahtar teslim kuruyoruz.</p>
        </div>
      </div>

      {/* ── Stats band ── */}
      <div style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
        <div className="container">
          <div className="row g-0">
            {STATS.map((s, i) => (
              <div key={i} className="col-6 col-md-3">
                <motion.div {...fade(i * 0.06)}
                  style={{ padding: '2.25rem 1.5rem', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,.06)' : 'none' }}>
                  <p className="font-poppins fw-black mb-1"
                    style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', lineHeight: 1, color: '#c3e92d', letterSpacing: '-.02em', margin: 0 }}>
                    {s.value}
                  </p>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,.38)', textTransform: 'uppercase', letterSpacing: '.18em', fontWeight: 700, margin: '6px 0 0' }}>
                    {s.label}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Story section ── */}
      <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="row g-5 align-items-center">

          {/* Image stack */}
          <div className="col-12 col-lg-6">
            <motion.div {...fade(0)} style={{ position: 'relative', paddingBottom: 72, paddingRight: 56 }}>

              {/* Main image */}
              <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 28px 72px rgba(0,0,0,.18)', aspectRatio: '4/3' }}>
                <img src={`${TP}/album/trambolinparkyeni/coklualbumler/-VkT.jpg`} alt="Kurulum sahası"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>

              {/* Floating secondary image */}
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '52%', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 56px rgba(0,0,0,.22)', border: '4px solid #f5f5f5', aspectRatio: '4/3' }}>
                <img src={`${TP}/album/trambolinparkyeni/coklualbumler/1-kisilik-olimpik-trambolin-tp-110-EAr.jpg`} alt="Saha detay"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>

              {/* Year badge */}
              <div style={{ position: 'absolute', top: 28, left: -24, background: '#c3e92d', borderRadius: 14, padding: '14px 22px', boxShadow: '0 12px 32px rgba(195,233,45,.4)', zIndex: 2 }}>
                <p className="font-poppins fw-black mb-0" style={{ fontSize: 30, lineHeight: 1, color: '#0a0a0a' }}>2009</p>
                <p style={{ fontSize: 9, fontWeight: 900, letterSpacing: '.15em', color: 'rgba(0,0,0,.55)', margin: '3px 0 0', textTransform: 'uppercase' }}>Kuruluş</p>
              </div>

              {/* Subtle dot accent */}
              <div style={{ position: 'absolute', bottom: 28, left: -12, width: 80, height: 80, backgroundImage: 'radial-gradient(rgba(92,146,0,.5) 1.5px, transparent 1.5px)', backgroundSize: '12px 12px', borderRadius: 8, zIndex: 0 }} />
            </motion.div>
          </div>

          {/* Text */}
          <div className="col-12 col-lg-6">
            <motion.div {...fade(0.1)}>
              <p className="font-poppins fw-black text-uppercase mb-2"
                style={{ fontSize: 10, letterSpacing: '.22em', color: '#5c9200' }}>Biz Kimiz?</p>
              <h2 className="font-poppins fw-black mb-4"
                style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-.02em', color: '#0a0a0a' }}>
                Türkiye'nin Öncü<br /><span style={{ color: '#5c9200' }}>Trambolin Parkı</span><br />Üreticisi
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: '#555', marginBottom: '1.25rem' }}>
                Kapalı ve açık alan eğlence merkezleri, trambolin parkları ve soft play sistemleri üretiminde
                Türkiye'nin öncü markalarından biri olmanın gururunu yaşıyoruz.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: '#555', marginBottom: '2rem' }}>
                Tasarımından üretimine, anahtar teslim kurulumuna kadar projenin her aşamasını
                profesyonel ekibimizle yönetiyor; maksimum güvenlikli oyun alanları inşa ediyoruz.
              </p>

              {/* Checklist */}
              <div className="d-flex flex-column gap-2 mb-4">
                {CHECKS.map((item, i) => (
                  <div key={i} className="d-flex align-items-center gap-3">
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(92,146,0,.1)', border: '1.5px solid rgba(92,146,0,.25)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="#5c9200" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span className="font-poppins fw-bold" style={{ fontSize: 14, color: '#1a1a1a' }}>{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/iletisim"
                className="d-inline-flex align-items-center gap-2 font-poppins fw-black"
                style={{ background: '#0a0a0a', color: '#fff', padding: '14px 28px', borderRadius: 12, textDecoration: 'none', fontSize: 14, letterSpacing: '-.01em' }}>
                Projenizi Konuşalım <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Values grid ── */}
      <div style={{ background: '#fff', borderTop: '1.5px solid #ebebeb', borderBottom: '1.5px solid #ebebeb' }}>
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
          <motion.div {...fade()} className="text-center mb-5">
            <p className="font-poppins fw-black text-uppercase mb-2"
              style={{ fontSize: 10, letterSpacing: '.22em', color: '#5c9200' }}>Değerlerimiz</p>
            <h2 className="font-poppins fw-black mb-0"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-.02em', color: '#0a0a0a' }}>
              Neden Trambolinpark?
            </h2>
          </motion.div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {VALUES.map((v, i) => (
              <div key={i} className="col">
                <motion.div {...fade((i % 3) * 0.07)}>
                  <div className="h-100" style={{ background: '#f8f8f8', borderRadius: 16, border: '1.5px solid #ebebeb', padding: '2rem 1.75rem', transition: 'border-color .2s, transform .2s, box-shadow .2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(92,146,0,.35)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(0,0,0,.07)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#ebebeb'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(92,146,0,.07)', border: '1.5px solid rgba(92,146,0,.18)', color: '#5c9200', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                      {v.icon}
                    </div>
                    <h3 className="font-poppins fw-black mb-2" style={{ fontSize: 15, color: '#0a0a0a', letterSpacing: '-.01em' }}>{v.title}</h3>
                    <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Full-bleed gallery strip ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', height: 360, overflow: 'hidden' }}>
        {[`${TP}/album/trambolinparkyeni/coklualbumler/-VkT.jpg`, `${TP}/album/trambolinparkyeni/coklualbumler/-Wao.png`, `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$kjgxoxbLjL8vG5l.jpeg`].map((src, i) => (
          <div key={i} style={{ overflow: 'hidden', position: 'relative' }}>
            <img src={src} alt="" loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: i > 0 ? 'brightness(.85)' : 'none', transition: 'transform .6s ease' }}
              onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)')}
              onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')} />
            {i === 0 && (
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,10,10,.55) 0%, rgba(10,10,10,.1) 60%)', display: 'flex', alignItems: 'flex-end', padding: '2.5rem' }}>
                <div>
                  <p className="font-poppins fw-black text-uppercase mb-1" style={{ fontSize: 10, color: '#c3e92d', letterSpacing: '.2em' }}>Galeri</p>
                  <p className="font-poppins fw-black mb-0" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', color: '#fff', lineHeight: 1.2 }}>623+ proje,<br />teslim edildi.</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Vision & Mission ── */}
      <div style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: -120, right: -80, width: 500, height: 500, background: 'radial-gradient(circle, rgba(92,146,0,.35) 0%, transparent 65%)', filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: -80, left: -60, width: 380, height: 380, background: 'radial-gradient(circle, rgba(195,233,45,.15) 0%, transparent 65%)', filter: 'blur(50px)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem', position: 'relative', zIndex: 1 }}>
          <motion.div {...fade()} className="text-center mb-5">
            <p className="font-poppins fw-black text-uppercase mb-2"
              style={{ fontSize: 10, letterSpacing: '.22em', color: '#c3e92d' }}>İlkelerimiz</p>
            <h2 className="font-poppins fw-black mb-0"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-.02em', color: '#fff' }}>
              Vizyon & Misyon
            </h2>
          </motion.div>

          <div className="row g-4">
            {[
              {
                icon: <Target size={22} strokeWidth={1.5} />,
                tag: 'Vizyonumuz',
                heading: 'Sektörün küresel referans markası olmak.',
                body: 'Teknolojik gelişmeleri ve küresel trendleri yakından takip ederek, güvenli eğlencenin sınırlarını yeniden çizen, Türkiye genelinde referans alınan bir marka olmak.',
              },
              {
                icon: <Compass size={22} strokeWidth={1.5} />,
                tag: 'Misyonumuz',
                heading: 'Çocukların gelişimine katkı sağlayan alanlar.',
                body: 'Müşterilerimize yaratıcı, maksimum güvenli özelleştirilmiş çözümler sunarken; çocukların fiziksel ve zihinsel gelişimini destekleyen sağlıklı oyun alanları tasarlamak.',
              },
            ].map((item, i) => (
              <div key={i} className="col-12 col-md-6">
                <motion.div {...fade(i * 0.1)}>
                  <div style={{ background: 'rgba(255,255,255,.04)', border: '1.5px solid rgba(255,255,255,.08)', borderRadius: 20, padding: '2.5rem', height: '100%', transition: 'border-color .2s, background .2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(195,233,45,.25)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,.06)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,.08)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,.04)'; }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(195,233,45,.08)', border: '1px solid rgba(195,233,45,.2)', color: '#c3e92d', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                      {item.icon}
                    </div>
                    <p className="font-poppins fw-black text-uppercase mb-2" style={{ fontSize: 9, letterSpacing: '.18em', color: '#c3e92d' }}>{item.tag}</p>
                    <h3 className="font-poppins fw-black mb-3" style={{ fontSize: 18, color: '#fff', lineHeight: 1.3, letterSpacing: '-.01em' }}>{item.heading}</h3>
                    <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 14, lineHeight: 1.85, margin: 0 }}>{item.body}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
