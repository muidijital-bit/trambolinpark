import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroSlider from '../components/HeroSlider';
import { allProducts } from '../data/mockData';

const MX = 'https://matrax-web-six.vercel.app';

// Add URL to src for logo, leave empty for placeholder name
const REFERANS_LOGOS: { name: string; src?: string }[] = [
  { name: 'Reference 1' },
  { name: 'Reference 2' },
  { name: 'Reference 3' },
  { name: 'Reference 4' },
  { name: 'Reference 5' },
  { name: 'Reference 6' },
  { name: 'Reference 7' },
  { name: 'Reference 8' },
];

const CATEGORIES = [
  {
    name: 'Trampolines',
    slug: 'trampolines',
    href: '/products/olimpik-trambolinler',
    image: `${MX}/images/galeri-yeni/galeri-3.jpg`,
    keys: ['tekli-trambolinler','yer-zemin-trambolin','salto-trambolin','olimpik-trambolinler','ticari-junior','profesyonel-trambolin'],
  },
  {
    name: 'Trampoline Parks',
    slug: 'trampoline-parks',
    href: '/products/trambolin-parklari',
    image: `${MX}/images/galeri-yeni/galeri-12.jpg`,
    keys: ['trambolin-parklari'],
  },
  {
    name: 'Soft Play Areas',
    slug: 'soft-play-areas',
    href: '/products/soft-play-oyun-alanlari',
    image: `${MX}/images/galeri-yeni/galeri-10.jpg`,
    keys: ['soft-play-oyun-alanlari'],
  },
  {
    name: 'Soft Play Toys',
    slug: 'soft-play-toys',
    href: '/products/soft-play-oyuncaklar',
    image: `${MX}/images/galeri-yeni/galeri-20.jpg`,
    keys: ['soft-play-oyuncaklar'],
  },
  {
    name: 'Ball Pits',
    slug: 'ball-pits',
    href: '/products/kucuk-top-havuzlari',
    image: `${MX}/images/galeri-yeni/galeri-25.jpg`,
    keys: ['kucuk-top-havuzlari','isletmelere-top-havuzlari'],
  },
  {
    name: 'Inflatable Park',
    slug: 'inflatable-park',
    href: '/products/sisme-park-junior',
    image: `${MX}/images/products/sisme-parklar-sisme-park1.jpg`,
    keys: ['sisme-park-junior','sisme-buyuk'],
  },
];

export default function HomeEnglish() {
  return (
    <div className="w-full relative overflow-hidden bg-[#fafafa] text-[#333]">
      
      {/* 1. MAXPLAY STYLE HERO SLIDER */}
      <HeroSlider />

      {/* 2. PRODUCT CATEGORIES */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">

          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">CATEGORIES</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Product <span className="text-[#9fc91a]">Categories</span>
              </h2>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-2 text-[#9fc91a] font-black hover:opacity-70 transition-opacity text-sm">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, i) => {
              const count = allProducts.filter(p => cat.keys.includes(p.category)).length;
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, type: 'spring', stiffness: 200, damping: 22 }}
                >
                  <Link
                    to={cat.href}
                    className="block bg-white rounded-[2.5rem] p-4 border-2 border-slate-100 hover:border-slate-200 hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-5">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
                        {count} products
                      </span>
                    </div>
                    <div className="px-2 pb-2 flex items-center justify-between gap-3">
                      <h3 className="text-xl font-bold text-slate-800 leading-tight">{cat.name}</h3>
                      <span className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#9fc91a] group-hover:text-white transition-colors shrink-0">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-6 md:hidden">
            <Link to="/products" className="inline-flex items-center gap-2 text-[#9fc91a] font-black text-sm">
              All Categories <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>

      {/* SPARE PARTS CARDS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">

          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">SUPPORT & MAINTENANCE</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Spare <span className="text-[#9fc91a]">Parts</span>
              </h2>
            </div>
            <Link to="/spare-parts" className="hidden md:flex items-center gap-2 text-[#9fc91a] font-black hover:opacity-70 transition-opacity text-sm">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Trampoline Spare Parts',
                desc: 'Spring · Pad · Net · Accessory',
                href: '/spare-parts#trambolin-yaylari',
                image: `${MX}/images/yedek-parca/pad-real-2.jpg`,
                contain: false,
              },
              {
                name: 'Salto Spare Parts',
                desc: 'Bungee · Belt · Buckle · Rope',
                href: '/spare-parts#salto-emniyet',
                image: `${MX}/images/yedek-parca/salto-matrax.png`,
                contain: true,
              },
              {
                name: 'Softplay Spare Parts',
                desc: 'Sponge · PVC · Roller · Tatami',
                href: '/spare-parts#yedek-sungerler',
                image: `${MX}/images/yedek-parca/sunger-10cm.png`,
                contain: true,
              },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 22 }}
              >
                <Link
                  to={item.href}
                  className="block bg-white rounded-[2.5rem] p-4 border-2 border-slate-100 hover:border-slate-200 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className={`relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-5 ${item.contain ? 'bg-[#f8fafc]' : ''}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${item.contain ? 'object-contain p-8' : 'object-cover'}`}
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
                      {item.desc}
                    </span>
                  </div>
                  <div className="px-2 pb-2 flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-slate-800 leading-tight">{item.name}</h3>
                    <span className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#9fc91a] group-hover:text-white transition-colors shrink-0">
                        <ArrowUpRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6 md:hidden">
            <Link to="/spare-parts" className="inline-flex items-center gap-2 text-[#9fc91a] font-black text-sm">
              All Parts <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <div>

        {/* Top wavy transition — white background, green teeth down */}
        <div style={{
          height: 44,
          background: 'radial-gradient(circle at 50% 100%, #9fc91a 42px, #ffffff 43px)',
          backgroundSize: '88px 44px',
          backgroundRepeat: 'repeat-x',
        }} />

        {/* Green band */}
        <div style={{
          backgroundColor: '#9fc91a',
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.10) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}>
          <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-10 flex flex-col sm:flex-row items-center justify-between gap-6 md:gap-8">

            {/* Left badge */}
            <div
              className="hidden sm:flex items-center gap-2 bg-[#1a1a1a] text-white font-black text-[13px] uppercase tracking-widest px-5 py-3 rotate-[-4deg] select-none"
              style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.35)', border: '2px solid #1a1a1a' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885 3.91 10.51l.59-3.44L2 4.635l3.455-.505L7 1z" fill="#9fc91a"/></svg>
              Turnkey
            </div>

            {/* Center big button */}
            <a
              href="https://api.whatsapp.com/send?phone=905433494947"
              target="_blank"
              rel="noreferrer"
              className="block flex-shrink-0 group"
            >
              <div
                className="bg-[#1a1a1a] text-white font-black text-xl md:text-[2rem] px-8 py-4 md:px-14 md:py-5 text-center whitespace-nowrap select-none transition-transform group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
                style={{
                  borderRadius: 999,
                  border: '3px solid #1a1a1a',
                  boxShadow: '5px 5px 0 rgba(0,0,0,0.28)',
                  letterSpacing: '0.01em',
                }}
              >
                Get a Quote →
              </div>
            </a>

            {/* Right star badge */}
            <div className="hidden sm:block rotate-[6deg]">
              <svg width="88" height="88" viewBox="0 0 100 100">
                <polygon
                  points="50,3 61,35 95,35 68,56 79,89 50,71 21,89 32,56 5,35 39,35"
                  fill="#1a1a1a"
                />
                <text x="50" y="48" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">EN-1176</text>
                <text x="50" y="61" textAnchor="middle" fill="#9fc91a" fontSize="8" fontFamily="sans-serif">CERTIFIED</text>
              </svg>
            </div>

          </div>
        </div>

        {/* Bottom wavy transition — f8fafc background, green teeth up */}
        <div style={{
          height: 44,
          background: 'radial-gradient(circle at 50% 0%, #9fc91a 42px, #f8fafc 43px)',
          backgroundSize: '88px 44px',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: '0 0',
        }} />

        {/* Bottom text + contact */}
        <div className="bg-[#f8fafc] pb-0 pt-6">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-6 flex-wrap text-sm font-bold">
              <a href="mailto:info@trambolinpark.com" className="text-[#1a1a1a] hover:text-[#9fc91a] transition-colors">
                info@trambolinpark.com
              </a>
              <span className="text-slate-300">·</span>
              <a href="tel:+905433494947" className="text-[#1a1a1a] hover:text-[#9fc91a] transition-colors">
                +90 543 349 49 47
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* REFERENCES */}
      <section className="py-16 md:py-20 bg-[#f8fafc] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 mb-8 text-center">
          <p className="text-sm md:text-base font-black text-[#1a1a1a] uppercase tracking-widest">OUR REFERENCES</p>
        </div>

        {/* Infinite scrolling strip */}
        <div className="relative">
          {/* Left / right fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#f8fafc] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#f8fafc] to-transparent" />

          <div className="flex gap-6 animate-marquee whitespace-nowrap">
            {[...REFERANS_LOGOS, ...REFERANS_LOGOS].map((logo, i) => (
              <div
                key={i}
                className="inline-flex items-center justify-center shrink-0 w-44 h-20 bg-white rounded-2xl border border-slate-100 shadow-sm px-6 grayscale hover:grayscale-0 transition-all duration-300"
              >
                {logo.src ? (
                  <img src={logo.src} alt={logo.name} className="max-h-10 max-w-full object-contain" />
                ) : (
                  <span className="text-slate-300 font-black text-sm tracking-wide">{logo.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}