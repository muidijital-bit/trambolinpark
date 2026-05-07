import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const BASE = 'https://matrax-web-six.vercel.app';

const allImages = [
  ...Array.from({ length: 28 }, (_, i) => `${BASE}/images/galeri-yeni/galeri-${i + 1}.jpg`),
  `${BASE}/images/galeri-yeni/galeri-29.png`,
  `${BASE}/images/galeri-yeni/galeri-30.jpg`,
];

const filters = [
  { key: 'tumu',        label: 'Tümü',                range: [0, 30] },
  { key: 'kurulum',     label: 'Saha Kurulumları',    range: [0, 14] },
  { key: 'top-havuzu',  label: 'Top Havuzları',       range: [14, 21] },
  { key: 'soft-play',   label: 'Soft Play Alanları',  range: [21, 28] },
  { key: 'projeler',    label: 'Tamamlanan Projeler', range: [28, 30] },
] as const;

type FilterKey = typeof filters[number]['key'];

export default function Galeri() {
  const [active, setActive] = useState<number | null>(null);
  const [filter, setFilter] = useState<FilterKey>('tumu');

  const visible = useMemo(() => {
    const f = filters.find(f => f.key === filter)!;
    return allImages.slice(f.range[0], f.range[1]);
  }, [filter]);

  const close = () => setActive(null);
  const next = () => setActive(a => a === null ? 0 : (a + 1) % visible.length);
  const prev = () => setActive(a => a === null ? 0 : (a - 1 + visible.length) % visible.length);

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* Header */}
      <section className="bg-[#1a1a1a] pt-24 md:pt-28 lg:pt-32 pb-10 md:pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="inline-flex items-center gap-2 text-[#9fc91a] font-extrabold text-[10px] tracking-widest uppercase mb-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            FOTO ALBÜMÜ
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mt-2 mb-3">
            Saha <span className="text-[#9fc91a]">Galeri</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-xl">
            Tamamlanan kurulumlar, saha uygulamaları ve ürünlerimizden kareler.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex-shrink-0 px-5 py-2 rounded-full font-black text-xs uppercase tracking-wider transition-all ${
                filter === f.key
                  ? 'bg-[#1a1a1a] text-white shadow'
                  : 'bg-[#f1f5f9] text-slate-500 hover:text-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {visible.map((src, i) => (
            <motion.button
              key={src}
              layout
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i % 8) * 0.04 }}
              onClick={() => setActive(i)}
              className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 group cursor-zoom-in shadow-sm hover:shadow-xl transition-shadow"
            >
              <img
                src={src}
                alt={`Galeri ${i + 1}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-black">#{i + 1}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={close}
          >
            <button onClick={close}
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X size={20} />
            </button>
            <button onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight size={24} />
            </button>
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              src={visible[active]}
              alt=""
              onClick={e => e.stopPropagation()}
              className="max-w-full max-h-full object-contain rounded-xl"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-black text-sm">
              {active + 1} / {visible.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
