import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Play, Phone, Mail, MessageCircle, MapPin, Zap, Layers, Circle, Star, Wind, Wrench, Triangle, Navigation } from 'lucide-react';
import { supabase } from '../lib/supabase';
const TP  = 'https://trambolinpark.com';

/* ── Data ─────────────────────────────────────────────────── */
const YT_ID = 'RMm3bn3koO0';


const PROCESS = [
  { num: '01', title: 'Keşif & Analiz', desc: 'Mekanınızı ve hedef kitlenizi analiz ederek projeye özgü konsept geliştiriyoruz.' },
  { num: '02', title: '3D Tasarım', desc: 'Uzman ekibimiz alanınıza özel 3D modelleme ve yerleşim planı hazırlıyor.' },
  { num: '03', title: 'Üretim', desc: 'EN-1176 standartlarında, yerli üretim ile yüksek kaliteli ürünler fabrikamızda üretiliyor.' },
  { num: '04', title: 'Kurulum & Açılış', desc: 'Profesyonel ekibimiz anahtar teslim kurulum gerçekleştirir, açılışınızda yanınızdayız.' },
];

/* ── Hooks ────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Reveal wrapper ───────────────────────────────────────── */
function Reveal({ children, dir = 'up', delay = 0, className = '' }: { children: React.ReactNode; dir?: 'up'|'left'|'right'; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  const cls = dir === 'left' ? 'reveal-left' : dir === 'right' ? 'reveal-right' : 'reveal';
  return (
    <div ref={ref} className={`${cls}${inView ? ' visible' : ''} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryMarquee />
      <ProductsSection />
      <SparePartsSection />
      <ProcessSection />
      <SparePartsBanner />
      <FooterCTA />
    </>
  );
}

/* ── 1. HERO ──────────────────────────────────────────────── */
function HeroSection() {
  const [videoModal, setVideoModal] = useState(false);

  return (
    <section className="tp-hero">
      {/* Arka plan video */}
      <video
        autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="tp-hero-overlay" />

      {/* Content */}
      <div className="tp-hero-content">
        <div className="container">
          <div className="col-12 col-lg-8">
            <h1 className="tp-hero-title">
              Eğlenceyi Tasarlıyoruz,
              <span className="accent-text">Güvenle İnşa Ediyoruz.</span>
            </h1>
            <p className="tp-hero-desc">
              Ticari trambolin parkları, soft play alanları ve top havuzları. Tasarımdan kuruluma anahtar teslim çözümler.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/iletisim" className="btn-accent">Ücretsiz Teklif Al <ArrowRight size={16} /></Link>
              <button onClick={() => setVideoModal(true)} className="btn-glass">
                <Play size={15} fill="currentColor" /> Tanıtım Filmi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="tp-scroll-indicator">
        <span>Keşfet</span>
        <div className="tp-scroll-line" />
      </div>

      {/* Video modal */}
      {videoModal && (
        <div onClick={() => setVideoModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 900, aspectRatio: '16/9', borderRadius: 16, overflow: 'hidden', background: '#000' }}>
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1`} title="Trambolinpark" allow="autoplay; fullscreen" />
          </div>
        </div>
      )}
    </section>
  );
}

/* ── 2. CATEGORY MARQUEE ─────────────────────────────────── */
const CAT_ITEMS = [
  { label: 'Trambolin Parkları',   icon: <Zap size={14} strokeWidth={1.5} />,        href: '/urunler/trambolin-parklari' },
  { label: 'Olimpik Trambolinler', icon: <Triangle size={14} strokeWidth={1.5} />,    href: '/urunler/olimpik-trambolinler' },
  { label: 'Top Havuzları',        icon: <Circle size={14} strokeWidth={1.5} />,      href: '/urunler/kucuk-top-havuzlari' },
  { label: 'Soft Play Alanları',   icon: <Layers size={14} strokeWidth={1.5} />,      href: '/urunler/soft-play-oyun-alanlari' },
  { label: 'Şişme Parklar',        icon: <Wind size={14} strokeWidth={1.5} />,        href: '/urunler/sisme-park-junior' },
  { label: 'Yedek Parçalar',       icon: <Wrench size={14} strokeWidth={1.5} />,      href: '/yedek-parcalar' },
  { label: 'Foam Pit',             icon: <Star size={14} strokeWidth={1.5} />,        href: '/urunler/trambolin-parklari' },
  { label: 'Ninja Kursu',          icon: <Navigation size={14} strokeWidth={1.5} />,  href: '/urunler/trambolin-parklari' },
];

function CategoryMarquee() {
  const items = [...CAT_ITEMS, ...CAT_ITEMS];
  return (
    <div style={{ background: 'var(--accent)', overflow: 'hidden', padding: '0.85rem 0' }}>
      <div style={{ display: 'flex', width: 'max-content', animation: 'marqueeRun 30s linear infinite' }}>
        {items.map((item, i) => (
          <Link key={i} to={item.href}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 2.25rem', textDecoration: 'none', flexShrink: 0, color: '#0a0a0a' }}>
            {item.icon}
            <span style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.2em', whiteSpace: 'nowrap' }}>
              {item.label}
            </span>
            <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 7, marginLeft: 6 }}>✦</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── 4. PRODUCTS ──────────────────────────────────────────── */
const BENTO_ROW1 = [
  { tag: '02', name: 'Olimpik Trambolinler',  sub: 'Profesyonel & sertifikalı atlama ekipmanları.',  href: '/urunler/olimpik-trambolinler',    img: `${TP}/album/trambolinparkyeni/coklualbumler/1-kisilik-olimpik-trambolin-tp-110-EAr.jpg`  },
  { tag: '03', name: 'Top Havuzları',         sub: 'Rengarenk, güvenli eğlence havuzları.',          href: '/urunler/kucuk-top-havuzlari',     img: `${TP}/album/trambolinparkyeni/coklualbumler/-Wao.png` },
];
const BENTO_ROW2 = [
  { tag: '04', name: 'Soft Play Alanları',    sub: 'Mini kahramanlar için güvenli oyun dünyası.',    href: '/urunler/soft-play-oyun-alanlari', img: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$kjgxoxbLjL8vG5l.jpeg` },
  { tag: '05', name: 'Şişme Parklar',         sub: 'Junior ve büyük boy şişme oyun alanları.',       href: '/urunler/sisme-park-junior',       img: `${TP}/album/trambolinparkyeni/coklualbumler/-ymA.jpg`  },
  { tag: '06', name: 'Yedek Parçalar',        sub: 'Orijinal parçalar, hızlı kargo garantisi.',      href: '/yedek-parcalar',                  img: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$JOPdARVPbJTIL2YMKgtL.jpg` },
];

function ProductsSection() {
  return (
    <section style={{ background: '#fff', padding: '7rem 0' }}>
      <div className="container">

        {/* Header */}
        <div className="d-flex align-items-end justify-content-between mb-5 flex-wrap gap-3">
          <Reveal>
            <p className="font-poppins fw-black text-uppercase mb-2" style={{ fontSize: 10, letterSpacing: '.22em', color: '#5c9200' }}>Ürün Kataloğu</p>
            <h2 className="font-poppins fw-black mb-0"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-.03em', color: '#0a0a0a' }}>
              Trambolin, Soft Play,<br /><span style={{ color: '#5c9200' }}>Top Havuzu & Daha Fazlası.</span>
            </h2>
          </Reveal>
          <Link to="/urunler"
            className="d-inline-flex align-items-center gap-2 font-poppins fw-black"
            style={{ color: '#888', textDecoration: 'none', fontSize: 13, transition: 'color .2s', flexShrink: 0 }}
            onMouseEnter={e => (e.currentTarget.style.color = '#5c9200')}
            onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
            Tüm Katalog <ArrowRight size={15} />
          </Link>
        </div>

        {/* Row 1 — large + stacked mid */}
        <div className="row g-3 align-items-stretch mb-3">

          {/* Hero card */}
          <div className="col-12 col-lg-7 d-flex flex-column">
            <Link to="/urunler/trambolin-parklari" className="tp-bento-card" style={{ flex: 1, minHeight: 460 }}>
              <img src={`${TP}/album/trambolinparkyeni/coklualbumler/-VkT.jpg`} alt="Trambolin Parkları" loading="lazy" />
              <div className="tp-bento-overlay" />
              <div className="tp-bento-content">
                <div className="tp-bento-text">
                  <p className="tp-bento-tag">01 · Trambolin Parkları</p>
                  <p className="tp-bento-name tp-bento-name--lg">Tam Kapsamlı<br />Atlama Deneyimi.</p>
                  <p className="tp-bento-sub">Dodgeball, foam pit, slam dunk — eksiksiz park çözümleri.</p>
                </div>
                <span className="tp-bento-cta">Keşfet <ArrowRight size={12} /></span>
              </div>
            </Link>
          </div>

          {/* Stacked mid cards */}
          <div className="col-12 col-lg-5 d-flex flex-column">
            <div className="d-flex flex-column gap-3 flex-grow-1">
              {BENTO_ROW1.map(c => (
                <Link key={c.tag} to={c.href} className="tp-bento-card" style={{ flex: 1, minHeight: 216 }}>
                  <img src={c.img} alt={c.name} loading="lazy" />
                  <div className="tp-bento-overlay" />
                  <div className="tp-bento-content">
                    <div className="tp-bento-text">
                      <p className="tp-bento-tag">{c.tag} · {c.name}</p>
                      <p className="tp-bento-name">{c.name}</p>
                      <p className="tp-bento-sub">{c.sub}</p>
                    </div>
                    <span className="tp-bento-cta">Keşfet <ArrowRight size={12} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 — three equal */}
        <div className="row g-3">
          {BENTO_ROW2.map(c => (
            <div key={c.tag} className="col-12 col-sm-6 col-lg-4">
              <Link to={c.href} className="tp-bento-card" style={{ minHeight: 290 }}>
                <img src={c.img} alt={c.name} loading="lazy" />
                <div className="tp-bento-overlay" />
                <div className="tp-bento-content">
                  <div className="tp-bento-text">
                    <p className="tp-bento-tag">{c.tag} · {c.name}</p>
                    <p className="tp-bento-name">{c.name}</p>
                    <p className="tp-bento-sub">{c.sub}</p>
                  </div>
                  <span className="tp-bento-cta">Keşfet <ArrowRight size={12} /></span>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── 5. SPARE PARTS ───────────────────────────────────────── */
type HomePart = { key: string; name: string; desc: string; img: string };

function SparePartsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [parts, setParts] = useState<HomePart[]>([]);

  useEffect(() => {
    supabase.from('spare_parts').select('item_key, title, description, image').limit(10).then(({ data }) => {
      setParts((data ?? []).map(r => ({ key: r.item_key, name: r.title, desc: r.description, img: r.image })));
    });
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (trackRef.current) trackRef.current.scrollBy({ left: dir === 'right' ? 270 : -270, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let isDragging = false, startX = 0, scrollLeft = 0;
    const down = (e: MouseEvent) => { isDragging = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; el.style.userSelect = 'none'; };
    const up   = () => { isDragging = false; el.style.userSelect = ''; };
    const move = (e: MouseEvent) => { if (!isDragging) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX); };
    el.addEventListener('mousedown', down); el.addEventListener('mouseup', up); el.addEventListener('mousemove', move); el.addEventListener('mouseleave', up);
    return () => { el.removeEventListener('mousedown', down); el.removeEventListener('mouseup', up); el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', up); };
  }, []);

  return (
    <section style={{ background: '#f5f5f5', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>

      <div className="container position-relative">
        <Reveal>
          <div className="d-flex align-items-end justify-content-between mb-5 flex-wrap gap-3">
            <div>
              <span className="section-label">Yedek Parçalar</span>
              <h2 className="font-poppins fw-black mb-1" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.15 }}>
                Orijinal Yedek Parça Mağazası
              </h2>
              <p style={{ fontSize: 14, color: '#888', margin: 0 }}>Parkınızın ömrünü uzatın. Tüm parçalar orijinal üretim, hızlı kargo.</p>
            </div>
            <div className="d-flex gap-2">
              <button onClick={() => scroll('left')} className="tp-carousel-btn"><ChevronLeft size={20} /></button>
              <button onClick={() => scroll('right')} className="tp-carousel-btn"><ChevronRight size={20} /></button>
            </div>
          </div>
        </Reveal>

        <div ref={trackRef} className="tp-spare-track">
          {parts.map(p => (
            <div key={p.key} className="tp-spare-glass">
              <div className="tp-spare-glass-img">
                <img src={p.img} alt={p.name} loading="lazy" />
              </div>
              <div className="tp-spare-glass-body">
                <p className="tp-spare-glass-name">{p.name}</p>
                <p className="tp-spare-glass-desc">{p.desc}</p>
                <Link to={`/yedek-parcalar/${p.key}`} className="btn-accent" style={{ fontSize: 12, padding: '.45rem 1rem' }}>Sipariş Ver <ArrowRight size={13} /></Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link to="/yedek-parcalar" className="btn-outline-dark">Tüm Yedek Parçalar <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}

/* ── 6. PROCESS SECTION ───────────────────────────────────── */
function ProcessSection() {
  return (
    <section style={{ background: '#0a0a0a', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>

      {/* Dot grid texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px', pointerEvents: 'none',
      }} />

      {/* Top-right glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: -160, right: -80, width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(92,146,0,.45) 0%, transparent 65%)',
        filter: 'blur(55px)', pointerEvents: 'none',
      }} />

      <div className="container position-relative">

        {/* Header */}
        <Reveal>
          <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-end justify-content-between gap-3 mb-5">
            <div>
              <span className="section-label" style={{ color: 'rgba(195,233,45,.8)' }}>Nasıl Çalışıyoruz</span>
              <h2 className="font-poppins fw-black mb-0 text-white" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.05 }}>
                Çalışma<br /><span style={{ color: '#c3e92d' }}>Sürecimiz</span>
              </h2>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <Link to="/iletisim" className="btn-accent" style={{ fontSize: 13, padding: '.65rem 1.5rem' }}>
                Teklif Al <ArrowRight size={14} />
              </Link>
              <a href="tel:+905433494947" className="btn-glass" style={{ fontSize: 13, padding: '.65rem 1.5rem' }}>
                Bizi Arayın
              </a>
            </div>
          </div>
        </Reveal>

        {/* Steps — Desktop */}
        <div className="d-none d-lg-block position-relative" style={{ paddingTop: '2rem' }}>
          {/* Connector line */}
          <div style={{
            position: 'absolute', top: 56, left: '12.5%', right: '12.5%', height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(195,233,45,.25) 15%, rgba(195,233,45,.25) 85%, transparent)',
          }} />

          <div className="row g-4">
            {PROCESS.map((p, i) => (
              <div key={i} className="col-3">
                <Reveal delay={i * 0.1}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    {/* Number circle */}
                    <div style={{
                      width: 56, height: 56, borderRadius: '50%', marginBottom: '1.5rem',
                      background: i === 0 ? '#c3e92d' : 'transparent',
                      border: `1.5px solid ${i === 0 ? '#c3e92d' : 'rgba(195,233,45,.3)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: '"Poppins", sans-serif', fontWeight: 900, fontSize: 15,
                      color: i === 0 ? '#0a0a0a' : '#c3e92d',
                      position: 'relative', zIndex: 1,
                    }}>
                      {p.num}
                    </div>
                    {/* Card */}
                    <div style={{
                      background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)',
                      borderRadius: 16, padding: '1.5rem 1.25rem', width: '100%',
                      transition: 'background .2s, border-color .2s',
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(195,233,45,.06)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(195,233,45,.2)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,.04)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,.08)'; }}
                    >
                      <p className="font-poppins fw-black mb-2" style={{ fontSize: 15, color: '#fff', lineHeight: 1.3 }}>{p.title}</p>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>

          {/* Loop label */}
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,.3)', border: '1px solid rgba(255,255,255,.1)',
              padding: '.4rem 1.25rem', borderRadius: 100,
            }}>
              ↺ &nbsp;Sürekli Destek & Bakım Döngüsü
            </span>
          </div>
        </div>

        {/* Steps — Mobile */}
        <div className="d-lg-none">
          {PROCESS.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ display: 'flex', gap: 16, marginBottom: i < PROCESS.length - 1 ? '1.5rem' : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                    background: i === 0 ? '#c3e92d' : 'transparent',
                    border: `1.5px solid ${i === 0 ? '#c3e92d' : 'rgba(195,233,45,.3)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: '"Poppins", sans-serif', fontWeight: 900, fontSize: 13,
                    color: i === 0 ? '#0a0a0a' : '#c3e92d',
                  }}>
                    {p.num}
                  </div>
                  {i < PROCESS.length - 1 && (
                    <div style={{ flex: 1, width: 1, background: 'rgba(195,233,45,.2)', marginTop: 8, minHeight: 32 }} />
                  )}
                </div>
                <div style={{
                  background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)',
                  borderRadius: 14, padding: '1rem 1.1rem', flex: 1, marginBottom: i < PROCESS.length - 1 ? 8 : 0,
                }}>
                  <p className="font-poppins fw-black mb-1" style={{ fontSize: 14, color: '#fff' }}>{p.title}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}

          <div className="d-flex flex-wrap gap-2 mt-4">
            <Link to="/iletisim" className="btn-accent" style={{ fontSize: 13, padding: '.65rem 1.5rem' }}>
              Teklif Al <ArrowRight size={14} />
            </Link>
            <a href="tel:+905433494947" className="btn-glass" style={{ fontSize: 13, padding: '.65rem 1.5rem' }}>
              Bizi Arayın
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ── 7. SPARE PARTS BANNER ────────────────────────────────── */
const BANNER_TILES = [
  { name: 'Trambolinler',       sub: 'Tekli & Olimpik',  href: '/urunler/olimpik-trambolinler',    img: `${TP}/album/trambolinparkyeni/coklualbumler/1-kisilik-olimpik-trambolin-tp-110-EAr.jpg`  },
  { name: 'Trambolin Parkları', sub: 'Tam Ekipman',       href: '/urunler/trambolin-parklari',      img: `${TP}/album/trambolinparkyeni/coklualbumler/-VkT.jpg`  },
  { name: 'Soft Play',          sub: 'Renkli Oyun Alanı', href: '/urunler/soft-play-oyun-alanlari', img: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$kjgxoxbLjL8vG5l.jpeg` },
  { name: 'Top Havuzları',      sub: 'Junior & İşletme',  href: '/urunler/kucuk-top-havuzlari',     img: `${TP}/album/trambolinparkyeni/coklualbumler/-Wao.png` },
];

function SparePartsBanner() {
  return (
    <section style={{ background: '#fff', padding: '5.5rem 0', position: 'relative', overflow: 'hidden' }}>
      <div className="container position-relative">
        <div className="row align-items-center g-5">

          <div className="col-12 col-lg-6">
            <Reveal dir="left">
              <span className="section-label">Yedek Parça</span>
              <h2 className="font-poppins fw-black mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.1 }}>
                Orijinal Parçalar,<br />
                <span style={{ color: '#5c9200' }}>Hızlı Teslimat</span>
              </h2>
              <p style={{ color: '#666', fontSize: 15, lineHeight: 1.75, maxWidth: 440, marginBottom: '2rem' }}>
                Tüm ürünlerimize ait orijinal yedek parçalar stokta. EN-1176 sertifikalı bileşenler, aynı gün kargo imkânı.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/yedek-parcalar" className="btn-accent">Parça Mağazası <ArrowRight size={16} /></Link>
                <a href="tel:+905433494947" className="btn-outline-dark" style={{ fontSize: 14 }}>+90 543 349 49 47</a>
              </div>
            </Reveal>
          </div>

          <div className="col-12 col-lg-6">
            <Reveal dir="right">
              <div className="row g-3">
                {BANNER_TILES.map((tile, i) => (
                  <div key={i} className="col-6">
                    <Link to={tile.href} className="tp-banner-card text-decoration-none">
                      <img src={tile.img} alt={tile.name} loading="lazy" />
                      <div className="tp-banner-card-overlay">
                        <p className="tp-banner-card-sub">{tile.sub}</p>
                        <p className="tp-banner-card-name">{tile.name}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── 8. FOOTER CTA ────────────────────────────────────────── */
function FooterCTA() {
  return (
    <section style={{ background: '#060a04', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>

      {/* Animated green glow orbs */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute', top: '-10%', left: '20%',
          width: 'clamp(280px, 40vw, 520px)', height: 'clamp(280px, 40vw, 520px)',
          background: 'radial-gradient(circle, rgba(139,197,10,.22) 0%, transparent 65%)',
          filter: 'blur(60px)',
          animation: 'ctaOrb1 9s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-5%', right: '15%',
          width: 'clamp(200px, 30vw, 400px)', height: 'clamp(200px, 30vw, 400px)',
          background: 'radial-gradient(circle, rgba(195,233,45,.14) 0%, transparent 65%)',
          filter: 'blur(50px)',
          animation: 'ctaOrb2 12s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '-5%',
          width: 'clamp(150px, 20vw, 280px)', height: 'clamp(150px, 20vw, 280px)',
          background: 'radial-gradient(circle, rgba(92,146,0,.12) 0%, transparent 65%)',
          filter: 'blur(40px)',
          animation: 'ctaOrb3 15s ease-in-out infinite',
        }} />
      </div>

      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-.1em', left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'Poppins, sans-serif', fontWeight: 900,
        fontSize: 'clamp(5rem, 16vw, 14rem)', lineHeight: 1,
        color: 'rgba(255,255,255,.025)', pointerEvents: 'none', userSelect: 'none',
        whiteSpace: 'nowrap', letterSpacing: '-.02em',
      }}>
        TRAMBOLINPARK
      </div>

      <div className="container position-relative">
        <Reveal>
          <div className="text-center mb-5">
            <span className="section-label" style={{ color: '#c3e92d' }}>Haydi Başlayalım</span>
            <h2 className="font-poppins fw-black mb-4" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', lineHeight: 1.05, color: '#fff' }}>
              Projenizi Birlikte<br />
              <span style={{ background: 'linear-gradient(135deg, #c3e92d 0%, #8cb800 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Hayata Geçirelim
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 16, maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
              Tasarımdan kuruluma tüm süreçleri yönetiyoruz. Ücretsiz keşif randevusu alın.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="row g-3 mb-5 justify-content-center">
            {[
              { icon: <Phone size={22} strokeWidth={1.5} />,          label: 'Telefon',  value: '+90 543 349 49 47',      href: 'tel:+905433494947',                               ext: false },
              { icon: <Mail size={22} strokeWidth={1.5} />,           label: 'E-posta',  value: 'info@trambolinpark.com', href: 'mailto:info@trambolinpark.com',                    ext: false },
              { icon: <MessageCircle size={22} strokeWidth={1.5} />,  label: 'WhatsApp', value: 'Hemen Yaz',              href: 'https://api.whatsapp.com/send?phone=905433494947', ext: true  },
              { icon: <MapPin size={22} strokeWidth={1.5} />,         label: 'Adres',    value: 'İvedik OSB, Ankara',     href: '/iletisim',                                       ext: false },
            ].map((c, i) => (
              <div key={i} className="col-6 col-md-3">
                <a href={c.href} target={c.ext ? '_blank' : undefined} rel={c.ext ? 'noreferrer' : undefined} className="tp-contact-card-dark d-block text-decoration-none">
                  <div className="tp-contact-icon">{c.icon}</div>
                  <div className="tp-contact-label">{c.label}</div>
                  <div className="tp-contact-value">{c.value}</div>
                </a>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
            <Link to="/iletisim" className="btn-accent" style={{ fontSize: 15, padding: '.9rem 2.5rem' }}>
              Ücretsiz Teklif Al <ArrowRight size={17} />
            </Link>
            <a href="tel:+905433494947" className="btn-glass" style={{ fontSize: 15, padding: '.9rem 2.25rem' }}>
              +90 543 349 49 47
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
