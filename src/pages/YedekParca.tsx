import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, X, Wrench } from 'lucide-react';
import { spareCategories } from '../data/spareParts';
import type { SparePart } from '../data/spareParts';

const WA_NUMBER = '905433494947';
const buildWa = (title: string) =>
  `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(`Merhaba, "${title}" hakkında bilgi almak istiyorum.`)}`;

export default function YedekParca() {
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());
  const [zoom, setZoom] = useState<{ images: string[]; idx: number; title: string } | null>(null);

  const toggle = (key: string) =>
    setOpenKeys(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* HERO */}
      <section className="bg-[#1a1a1a] pt-24 md:pt-28 lg:pt-32 pb-10 md:pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="inline-flex items-center gap-2 text-[#9fc91a] font-extrabold text-[10px] tracking-widest uppercase mb-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            DESTEK & BAKIM
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mt-2 mb-3">
            Yedek <span className="text-[#9fc91a]">Parçalar</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed">
            Yaydan süngere, fileden aksesuara — tüm ürünlerimize ait orijinal yedek parçalar stokta hazır.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 pt-8 md:pt-12 pb-16 md:pb-24">

        {/* Accordion kategoriler */}
        <div className="flex flex-col gap-4">
          {spareCategories.map((cat, ci) => {
            const isOpen = openKeys.has(cat.key);
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: (ci % 5) * 0.05 }}
                className="bg-white rounded-[1.5rem] md:rounded-[2rem] border-2 border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Kategori başlığı — tıklanabilir */}
                <button
                  onClick={() => toggle(cat.key)}
                  className="w-full flex items-center gap-4 md:gap-5 p-3 md:p-4 text-left hover:bg-slate-50/60 transition-colors"
                >
                  {/* Cover görseli */}
                  <div className="relative w-16 h-16 md:w-24 md:h-24 shrink-0 rounded-xl md:rounded-2xl bg-slate-50 overflow-hidden">
                    <img
                      src={cat.cover}
                      alt={cat.title}
                      loading="lazy"
                      className="w-full h-full object-contain p-2"
                      onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
                    />
                  </div>

                  {/* Başlık + açıklama */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-base md:text-lg font-black text-[#1a1a1a] leading-tight">{cat.title}</h3>
                      <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#9fc91a]/10 text-[#9fc91a]">
                        {cat.items.length} parça
                      </span>
                    </div>
                    <p className="text-xs md:text-sm font-medium text-slate-500 line-clamp-2 leading-snug">{cat.short}</p>
                  </div>

                  {/* Chevron */}
                  <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? 'bg-[#1a1a1a] text-white rotate-180' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* İçerik — accordion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 p-3 md:p-5">
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 mt-3">
                          {cat.items.map(item => (
                            <SparePartCard
                              key={item.key}
                              item={item}
                              onZoom={(images, idx) => setZoom({ images, idx, title: item.title })}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-[#1a1a1a] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-black text-xl md:text-2xl mb-2">İhtiyacınız olan parçayı bulamadınız mı?</h3>
            <p className="text-gray-400 text-sm">Bize ulaşın, tüm modellerimiz için stok dışı parçaları da temin ediyoruz.</p>
          </div>
          <a
            href={`https://api.whatsapp.com/send?phone=${WA_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 bg-[#9fc91a] text-white font-black px-8 py-4 rounded-full hover:bg-[#8ab516] transition-colors whitespace-nowrap"
          >
            WhatsApp ile Sor
          </a>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoom && (
          <PartLightbox
            images={zoom.images}
            startIdx={zoom.idx}
            title={zoom.title}
            onClose={() => setZoom(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function SparePartCard({ item, onZoom }: {
  item: SparePart;
  onZoom: (images: string[], idx: number) => void;
}) {
  const images = item.gallery?.length ? item.gallery : item.image ? [item.image] : [];

  return (
    <div className="bg-slate-50 hover:bg-white border-2 border-slate-100 hover:border-slate-200 rounded-2xl overflow-hidden flex flex-col transition-all hover:shadow-md">
      {/* Görsel */}
      <button
        onClick={() => images.length && onZoom(images, 0)}
        className={`relative aspect-[4/3] bg-white overflow-hidden group ${images.length ? 'cursor-zoom-in' : 'cursor-default'}`}
      >
        {images[0] ? (
          <img
            src={images[0]}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
            onError={e => { (e.currentTarget as HTMLImageElement).parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-slate-300"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>`; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <Wrench size={28} />
          </div>
        )}
        {images.length > 1 && (
          <span className="absolute top-2 right-2 text-[9px] font-black bg-slate-900/80 text-white px-2 py-0.5 rounded-full">
            +{images.length - 1}
          </span>
        )}
      </button>

      {/* Bilgi */}
      <div className="p-3 md:p-4 flex flex-col gap-2 flex-1">
        <h4 className="text-sm font-black text-[#1a1a1a] leading-tight">{item.title}</h4>
        <p className="text-xs font-medium text-slate-500 leading-snug flex-1">{item.desc}</p>
        <a
          href={buildWa(item.title)}
          target="_blank"
          rel="noreferrer"
          className="mt-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-black text-xs px-3 py-2.5 rounded-xl transition-all"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp ile Sor
        </a>
      </div>
    </div>
  );
}

function PartLightbox({ images, startIdx, title, onClose }: {
  images: string[];
  startIdx: number;
  title: string;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);
  const next = () => setIdx(i => (i + 1) % images.length);
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button onClick={onClose}
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
        <X size={20} />
      </button>

      {images.length > 1 && (
        <>
          <button onClick={e => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
            <ChevronLeft size={24} />
          </button>
          <button onClick={e => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <motion.img
        key={idx}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        src={images[idx]}
        alt={title}
        onClick={e => e.stopPropagation()}
        className="max-w-full max-h-[85vh] object-contain rounded-2xl bg-white/5"
      />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-black text-sm">
        {title}{images.length > 1 && ` · ${idx + 1} / ${images.length}`}
      </div>
    </motion.div>
  );
}
