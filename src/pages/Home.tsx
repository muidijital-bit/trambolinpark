import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { allProducts } from '../data/mockData';

const TP = 'https://www.trampolinpark.com.tr';

/* ── Data ─────────────────────────────────────────────────── */
const SLIDES = [
  { type: 'video', src: '/hero.mp4' },
  { type: 'img',   src: `${TP}/album/trambolinparkyeni/urunler/II7N6JBcpS1KZLZOAk6O.jpg` },
  { type: 'img',   src: `${TP}/album/trambolinparkyeni/coklualbumler/-WbD.jpg` },
];

const MARQUEE_ITEMS = ['Ticari Trambolin', 'Olimpik Trambolin', 'Soft Play', 'Top Havuzu', 'Şişme Park', 'Ninja Parkur', 'Foam Pit', 'Anahtar Teslim'];

// Gerçek ürün kategorileri — allProducts'tan ilk görseli alır
const CATEGORIES = [
  { id: 'trambolinler',        label: 'Trambolin',  name: 'Trambolinler',         desc: 'Tekli, yer zemin, olimpik ve profesyonel trambolin seçenekleri.',                href: '/urunler/olimpik-trambolinler',    keys: ['tekli-trambolinler','yer-zemin-trambolin','salto-trambolin','olimpik-trambolinler','ticari-junior','profesyonel-trambolin'] },
  { id: 'trambolin-parklari',  label: 'Trambolin',  name: 'Trambolin Parkları',   desc: 'Serbest atlama, dodgeball, foam pit ve slam dunk alanlarıyla eksiksiz park.',   href: '/urunler/trambolin-parklari',     keys: ['trambolin-parklari'] },
  { id: 'soft-play',           label: 'Soft Play',  name: 'Soft Play Alanları',   desc: 'Küçük yaş grupları için güvenli, renkli kapalı oyun alanları.',                  href: '/urunler/soft-play-oyun-alanlari',keys: ['soft-play-oyun-alanlari','soft-play-oyuncaklar'] },
  { id: 'top-havuzlari',       label: 'Aktivite',   name: 'Top Havuzları',        desc: 'Farklı boyut ve derinliklerde, renkli toplarla dolu eğlence havuzları.',          href: '/urunler/kucuk-top-havuzlari',    keys: ['kucuk-top-havuzlari','isletmelere-top-havuzlari'] },
  { id: 'sisme-park',          label: 'Şişme Park', name: 'Şişme Parklar',        desc: 'Junior ve büyük boy şişme oyun parkları, her mekâna uygun çözümler.',            href: '/urunler/sisme-park-junior',      keys: ['sisme-park-junior','sisme-buyuk'] },
  { id: 'yedek-parcalar',      label: 'Destek',     name: 'Yedek Parçalar',       desc: 'Tüm ürünlerimize ait orijinal yedek parçalar stokta, hızlı kargo.',              href: '/yedek-parcalar',                 keys: [] },
];

const SPARE_PARTS = [
  { name: 'Trambolin Yayı',         desc: 'Galvaniz kaplı, farklı sertlik seçenekleri',       img: `${TP}/album/trambolinparkyeni/urunler/D5zm4LhjhgfrjDS0CdSl.jpg` },
  { name: 'Atlama Yüzeyi (Mat)',    desc: 'UV dayanımlı, çift dikişli polipropilen',           img: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$aV21Z34gSPnTk89Hn3qX.jpg` },
  { name: 'Koruma Pedi',            desc: 'Yay ve çelik çerçeve üstü darbe emici',             img: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$75pLpRx6IWjwkvlu3hsd.jpg` },
  { name: 'Güvenlik Ağı',           desc: 'Yüksek dayanımlı PE örgü, UV korumalı',            img: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$KtDHS3kg8rkGghkUJJDz.jpg` },
  { name: 'Çelik Çerçeve Bağlantı', desc: 'Galvaniz / toz boya kaplı bağlantı elemanları',   img: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$chAZQZMg5X9ke4lSvxVx.jpg` },
  { name: 'Foam Pit Küpleri',       desc: 'Yanmaz sertifikalı, yüksek yoğunluklu sünger',    img: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$1lv1MIWxeLn03m4P0m60.jpeg` },
  { name: 'Soft Play Panel',        desc: 'Farklı renk ve şekillerde EVA kaplı paneller',     img: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$03UxdqFQy1mlU5xTZEQc.jpg` },
  { name: 'Top Havuzu Topları',     desc: 'CE sertifikalı, 8 cm, crush-proof toplar',         img: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$7IqBTPuyBSbrW8yD2nQm.jpg` },
];

const PROCESS = [
  { num: '01', title: 'Keşif & Analiz', desc: 'Mekanınızı ve hedef kitlenizi analiz ederek projeye özgü konsept geliştiriyoruz.' },
  { num: '02', title: '3D Tasarım', desc: 'Uzman ekibimiz alanınıza özel 3D modelleme ve yerleşim planı hazırlıyor.' },
  { num: '03', title: 'Üretim', desc: 'EN-1176 standartlarında, yerli üretim ile yüksek kaliteli ürünler fabrikamızda üretiliyor.' },
  { num: '04', title: 'Kurulum & Açılış', desc: 'Profesyonel ekibimiz anahtar teslim kurulum gerçekleştirir, açılışınızda yanınızdayız.' },
];

const STATS = [{ n: 200, suffix: '+', label: 'Tamamlanan Proje' }, { n: 15, suffix: '+', label: 'Yıl Deneyim' }, { n: 81, suffix: '', label: 'İlde Hizmet' }, { n: 50, suffix: '+', label: 'Uzman Kadro' }];

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

function useCounter(target: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0; const step = target / 60;
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, [active, target]);
  return count;
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
      <MarqueeSection />
      <AboutSection />
      <ProductsSection />
      <SparePartsSection />
      <ProcessSection />
      <StatsSection />
      <CTASection />
    </>
  );
}

/* ── 1. HERO ──────────────────────────────────────────────── */
function HeroSection() {
  const [slide, setSlide] = useState(0);
  const [videoModal, setVideoModal] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nextSlide = useCallback(() => setSlide(s => (s + 1) % SLIDES.length), []);

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [nextSlide]);

  const goTo = (i: number) => {
    setSlide(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 6000);
  };

  return (
    <section className="tp-hero">
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div key={i} className={`tp-hero-slide${i === slide ? ' active' : ''}`}>
          {s.type === 'video'
            ? <video autoPlay muted loop playsInline src={s.src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <img src={s.src} alt="" />}
        </div>
      ))}
      <div className="tp-hero-overlay" />

      {/* Content */}
      <div className="tp-hero-content">
        <div className="container-fluid px-3 px-md-5">
          <div className="row align-items-end">

            {/* Left */}
            <div className="col-12 col-lg-7">
              <div className="tp-hero-badge" style={{ animationDelay: '.3s' }}>
                <span className="tp-hero-badge-dot" />
                EN-1176 Sertifikalı Üretim
              </div>
              <h1 className="tp-hero-title">
                Eğlenceyi<br />
                <span className="accent-text">Zıplatıyoruz.</span>
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

              {/* Dots */}
              <div className="tp-dots mt-4 pt-2">
                {SLIDES.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} className={`tp-dot${i === slide ? ' active' : ''}`} />
                ))}
              </div>
            </div>

            {/* Right — stat cards */}
            <div className="col-12 col-lg-5 d-none d-lg-flex justify-content-end gap-3 pb-2">
              <div className="tp-stat-card">
                <div className="stat-num">200+</div>
                <div className="stat-lbl">Tamamlanan Proje</div>
              </div>
              <div className="tp-stat-card">
                <div className="stat-num">15+</div>
                <div className="stat-lbl">Yıl Deneyim</div>
              </div>
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
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Trambolinpark" allow="autoplay; fullscreen" />
          </div>
        </div>
      )}
    </section>
  );
}

/* ── 2. MARQUEE ───────────────────────────────────────────── */
function MarqueeSection() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="tp-marquee-section">
      <div className="tp-marquee-track">
        {items.map((item, i) => (
          <span key={i} className="tp-marquee-item">{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ── 3. ABOUT ─────────────────────────────────────────────── */
function AboutSection() {
  const FEATURES = [
    { icon: '🏅', title: 'EN-1176 Sertifikalı', desc: 'Tüm ürünlerimiz uluslararası güvenlik standartlarını karşılar.' },
    { icon: '⚡', title: 'Hızlı Kurulum', desc: 'Projelerinizi belirlenen süre içinde anahtar teslim teslim ediyoruz.' },
    { icon: '🇹🇷', title: 'Türkiye Geneli', desc: '81 ilde hizmet ağımızla her yerden ulaşabilirsiniz.' },
  ];
  return (
    <section style={{ background: '#fff', padding: '6rem 0' }}>
      <div className="container-fluid px-3 px-md-5">
        <div className="row g-5 align-items-center">

          <div className="col-12 col-lg-5">
            <Reveal dir="left">
              <span className="section-label">Neden Biz</span>
              <h2 className="font-poppins fw-black mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
                Türkiye'nin Lider<br />Trambolin Parkı<br />Üreticisi
              </h2>
              <p className="mb-5" style={{ fontSize: 15, color: '#555', lineHeight: 1.75, maxWidth: 480 }}>
                2010'dan bu yana sektörde edindiğimiz deneyimle, tasarımdan kuruluma kadar her aşamayı profesyonel ekibimizle yönetiyoruz.
              </p>
              <div className="d-flex flex-column">
                {FEATURES.map((f, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div className="tp-feature-row" style={{ borderBottom: i < FEATURES.length - 1 ? '1px solid #eee' : 'none' }}>
                      <div className="tp-feature-icon">{f.icon}</div>
                      <div>
                        <p className="fw-bold mb-1" style={{ fontSize: 15 }}>{f.title}</p>
                        <p className="mb-0" style={{ fontSize: 13, color: '#666' }}>{f.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="col-12 col-lg-7">
            <Reveal dir="right">
              <div style={{ position: 'relative', paddingBottom: '1.5rem', paddingRight: '1.5rem' }}>
                <img
                  src={`${TP}/album/trambolinparkyeni/urunler/2SbOOLt8h3RdZRameKiQ.jpg`}
                  alt="Kurulum"
                  style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 24, display: 'block' }}
                />
                <div className="tp-floating-card">
                  <div className="fc-num">200+</div>
                  <div className="fc-lbl">Mutlu Müşteri</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 4. PRODUCTS ──────────────────────────────────────────── */
function ProductsSection() {
  const [activeFilter, setActiveFilter] = useState('Tümü');
  const [visible, setVisible] = useState(true);
  const filters = ['Tümü', 'Trambolin', 'Soft Play', 'Şişme Park', 'Aktivite', 'Destek'];

  const filtered = activeFilter === 'Tümü' ? CATEGORIES : CATEGORIES.filter(c => c.label === activeFilter);

  const changeFilter = (f: string) => {
    setVisible(false);
    setTimeout(() => { setActiveFilter(f); setVisible(true); }, 200);
  };

  return (
    <section className="tp-prod-section" style={{ padding: '6rem 0' }}>
      <div className="container-fluid px-3 px-md-5">

        {/* Header */}
        <div className="row align-items-end mb-5">
          <div className="col-12 col-lg-7">
            <Reveal>
              <span className="section-label" style={{ color: 'rgba(195,233,45,.7)' }}>Ürünlerimiz</span>
              <h2 className="font-poppins fw-black text-white mb-0" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
                Profesyonel Eğlence<br />Çözümleri
              </h2>
            </Reveal>
          </div>
          <div className="col-12 col-lg-5">
            <Reveal dir="right" delay={0.1}>
              <p style={{ color: 'rgba(255,255,255,.45)', fontSize: 15, lineHeight: 1.7, marginTop: '1rem' }} className="mb-0">
                Her bütçe ve ölçekte, anahtar teslim ticari eğlence alanları tasarlıyor ve kuruyoruz.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="tp-filter-tabs mb-4">
          {filters.map(f => (
            <button key={f} onClick={() => changeFilter(f)} className={`tp-filter-tab${activeFilter === f ? ' active' : ''}`}>{f}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" style={{ opacity: visible ? 1 : 0, transition: 'opacity .2s' }}>
          {filtered.map((cat, i) => {
            const firstProduct = allProducts.find(p => cat.keys.includes(p.category));
            const img = firstProduct?.imageUrl ?? `${TP}/album/trambolinparkyeni/urunler/II7N6JBcpS1KZLZOAk6O.jpg`;
            const count = cat.keys.reduce((acc, k) => acc + allProducts.filter(p => p.category === k).length, 0);
            return (
              <div key={cat.id} className="col">
                <Reveal delay={i * 0.06}>
                  <div className="tp-prod-card h-100">
                    <div className="tp-prod-card-img">
                      <img src={img} alt={cat.name} loading="lazy" />
                    </div>
                    <div className="tp-prod-card-body">
                      <span className="tp-prod-cat">{cat.label}{count > 0 ? ` · ${count} ürün` : ''}</span>
                      <p className="tp-prod-name">{cat.name}</p>
                      <p className="tp-prod-desc">{cat.desc}</p>
                      <Link to={cat.href} className="tp-prod-link">Detaylı İncele <ArrowRight size={14} /></Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-5">
          <Link to="/urunler" className="btn-outline-white">Tüm Ürünleri Gör <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}

/* ── 5. SPARE PARTS ───────────────────────────────────────── */
function SparePartsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (trackRef.current) trackRef.current.scrollBy({ left: dir === 'right' ? 280 : -280, behavior: 'smooth' });
  };

  // Drag-to-scroll
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
    <section style={{ background: '#fff', padding: '6rem 0' }}>
      <div className="container-fluid px-3 px-md-5">

        {/* Header */}
        <Reveal>
          <div className="d-flex align-items-end justify-content-between mb-4 flex-wrap gap-3">
            <div>
              <span className="section-label">Yedek Parçalar</span>
              <h2 className="font-poppins fw-black mb-1" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.15 }}>
                Orijinal Yedek Parça Mağazası
              </h2>
              <p style={{ fontSize: 14, color: '#666', margin: 0 }}>Parkınızın ömrünü uzatın. Tüm parçalar orijinal üretim, hızlı kargo.</p>
            </div>
            <div className="d-flex gap-2">
              <button onClick={() => scroll('left')} className="tp-carousel-btn"><ChevronLeft size={20} /></button>
              <button onClick={() => scroll('right')} className="tp-carousel-btn"><ChevronRight size={20} /></button>
            </div>
          </div>
        </Reveal>

        {/* Track */}
        <div ref={trackRef} className="tp-spare-track">
          {SPARE_PARTS.map((p, i) => (
            <div key={i} className="tp-spare-card2">
              <div className="tp-spare-card2-img">
                <img src={p.img} alt={p.name} loading="lazy" />
              </div>
              <div className="tp-spare-card2-body">
                <p className="tp-spare-card2-name">{p.name}</p>
                <p className="tp-spare-card2-desc">{p.desc}</p>
                <Link to="/yedek-parcalar" className="btn-accent" style={{ fontSize: 12, padding: '.45rem 1rem' }}>Sipariş Ver <ArrowRight size={13} /></Link>
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

/* ── 6. PROCESS ───────────────────────────────────────────── */
function ProcessSection() {
  return (
    <section style={{ background: '#fafafa', padding: '6rem 0' }}>
      <div className="container-fluid px-3 px-md-5">
        <Reveal>
          <div className="text-center mb-5">
            <span className="section-label">Nasıl Çalışıyoruz</span>
            <h2 className="font-poppins fw-black" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Çalışma Sürecimiz</h2>
          </div>
        </Reveal>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          {PROCESS.map((p, i) => (
            <div key={i} className="col">
              <Reveal delay={i * 0.08}>
                <div className="tp-process-card h-100">
                  <div className="tp-process-num">{p.num}</div>
                  <p className="tp-process-title">{p.title}</p>
                  <p className="tp-process-desc">{p.desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 7. STATS ─────────────────────────────────────────────── */
function StatItem({ n, suffix, label }: { n: number; suffix: string; label: string }) {
  const { ref, inView } = useInView(0.3);
  const count = useCounter(n, inView);
  return (
    <div ref={ref} className="col-6 col-md-3">
      <div className="tp-stat-big">
        <div className="stat-n">{count}{suffix}</div>
        <div className="stat-l">{label}</div>
      </div>
    </div>
  );
}
function StatsSection() {
  return (
    <section className="tp-stats-section" style={{ padding: '5rem 0' }}>
      <div className="container-fluid px-3 px-md-5">
        <div className="row g-4 gy-5">
          {STATS.map((s, i) => <StatItem key={i} {...s} />)}
        </div>
      </div>
    </section>
  );
}

/* ── 8. CTA ───────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="tp-cta-section" style={{ padding: '7rem 0' }}>
      <div className="container-fluid px-3 px-md-5 text-center">
        <Reveal>
          <span className="section-label" style={{ color: 'rgba(195,233,45,.7)' }}>Haydi Başlayalım</span>
          <h2 className="font-poppins fw-black text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1 }}>
            Projenizi Birlikte<br />Hayata Geçirelim
          </h2>
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 16, maxWidth: 500, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Tasarımdan kuruluma tüm süreçleri yönetiyoruz. Ücretsiz keşif randevusu alın.
          </p>
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
            <Link to="/iletisim" className="btn-accent" style={{ fontSize: 15, padding: '.9rem 2.25rem' }}>
              Ücretsiz Teklif Al <ArrowRight size={17} />
            </Link>
            <a href="tel:+905433494947" className="btn-outline-white" style={{ fontSize: 15, padding: '.9rem 2.25rem' }}>
              +90 543 349 49 47
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
