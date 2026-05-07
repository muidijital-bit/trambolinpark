import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { spareCategories } from '../data/spareParts';

export default function YedekParca() {
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="mb-8 md:mb-12">
          <span className="text-[#a0afbf] font-extrabold text-xs tracking-widest uppercase block mb-2">DESTEK & BAKIM</span>
          <h1 className="text-3xl md:text-5xl font-black text-[#1a1a1a]">
            Yedek <span className="text-[#9fc91a]">Parçalar</span>
          </h1>
          <p className="mt-3 text-[#64748b] text-base md:text-lg max-w-2xl">
            Tüm Trambolinpark ürünlerine ait orijinal yedek parçalar. Hızlı teslimat ile hizmetinizdeyiz.
          </p>
        </div>

        {/* Category overview cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-16">
          {spareCategories.map(cat => (
            <a
              key={cat.key}
              href={`#${cat.key}`}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-2"
            >
              <span className="text-2xl">{cat.icon}</span>
              <h3 className="font-black text-[#1a1a1a] text-sm leading-tight">{cat.title}</h3>
              <span className="text-xs text-[#9fc91a] font-bold">{cat.items.length} ürün</span>
            </a>
          ))}
        </div>

        {/* Each category section */}
        {spareCategories.map(cat => (
          <section key={cat.key} id={cat.key} className="mb-16 scroll-mt-40">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <h2 className="text-2xl font-black text-[#1a1a1a]">{cat.title}</h2>
                <p className="text-[#64748b] text-sm mt-0.5">{cat.short}</p>
              </div>
              <span className="ml-auto bg-[#9fc91a]/10 text-[#9fc91a] text-xs font-black px-3 py-1 rounded-full shrink-0">
                {cat.items.length} ürün
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {cat.items.map(item => (
                <div
                  key={item.key}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {item.image ? (
                    <button
                      onClick={() => setLightbox({ src: item.image!, title: item.title })}
                      className="relative bg-gray-50 h-40 flex items-center justify-center p-4 overflow-hidden group cursor-zoom-in w-full"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-100 drop-shadow transition-opacity" />
                      </div>
                    </button>
                  ) : (
                    <div className="bg-[#f8fafc] h-40 flex items-center justify-center">
                      <span className="text-5xl opacity-30">{cat.icon}</span>
                    </div>
                  )}
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <h3 className="font-black text-[#1a1a1a] text-[14px] leading-tight">{item.title}</h3>
                    <p className="text-[#64748b] text-xs leading-relaxed flex-1">{item.desc}</p>
                    <a
                      href={`https://api.whatsapp.com/send?phone=905433494947&text=${encodeURIComponent(`Merhaba, "${item.title}" hakkında bilgi almak istiyorum.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-[#9fc91a] text-xs font-black uppercase tracking-wider hover:gap-2 transition-all"
                    >
                      Fiyat & Bilgi →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <div className="mt-8 bg-[#1a1a1a] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-black text-2xl mb-2">İhtiyacınız olan parçayı bulamadınız mı?</h3>
            <p className="text-gray-400">Bize ulaşın, tüm modellerimiz için stok dışı parçaları da temin ediyoruz.</p>
          </div>
          <a
            href="https://api.whatsapp.com/send?phone=905433494947"
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
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl"
            >
              <div className="bg-gray-50 p-8 flex items-center justify-center min-h-[300px]">
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="max-h-[60vh] max-w-full object-contain"
                />
              </div>
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-4">
                <p className="font-black text-[#1a1a1a] text-sm">{lightbox.title}</p>
                <a
                  href={`https://api.whatsapp.com/send?phone=905433494947&text=${encodeURIComponent(`Merhaba, "${lightbox.title}" hakkında bilgi almak istiyorum.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="shrink-0 bg-[#9fc91a] text-white font-bold text-xs px-4 py-2 rounded-full hover:bg-[#8ab516] transition-colors whitespace-nowrap"
                >
                  Fiyat & Bilgi
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
