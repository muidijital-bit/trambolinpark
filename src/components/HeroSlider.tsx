import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSlider() {
  return (
    <div className="relative w-full h-[80vh] md:h-[88vh] bg-black overflow-hidden mt-[72px] md:mt-[90px] lg:mt-[114px]">

      {/* Arka plan video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1a1a1a]/40" />

      {/* İçerik */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-5 text-center">

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4 md:mb-6 drop-shadow-2xl"
          >
            Yeni Nesil Trambolin Parkları
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-xl lg:text-2xl text-slate-200 mb-8 md:mb-10 max-w-2xl mx-auto drop-shadow-md font-medium"
          >
            Maksimum güvenlik ve sınırsız eğlenceyi bir araya getiriyoruz.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link
              to="/urunler"
              className="bg-[#c3e92d] text-[#1a1a1a] font-black px-8 py-4 md:px-12 md:py-5 rounded-full hover:bg-white hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2 md:gap-3 shadow-[0_10px_30px_rgba(195,233,45,0.3)] text-base md:text-lg"
            >
              Kategorileri İncele <ArrowRight size={20} />
            </Link>
          </motion.div>

        </div>
      </div>

    </div>
  );
}
