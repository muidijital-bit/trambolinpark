import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, SlidersHorizontal, X } from 'lucide-react';
import { allProducts } from '../data/mockData';
import type { Product } from '../data/mockData';

// ─── Veri yapısı ───────────────────────────────────────────────────
const GROUPS = [
  {
    key: 'trambolinler',
    name: 'Trambolinler',
    subs: [
      { id: 'tekli-trambolinler',    name: 'Tekli Trambolinler' },
      { id: 'yer-zemin-trambolin',   name: 'Yer (Zemin) Trambolinleri' },
      { id: 'salto-trambolin',       name: 'Salto Trambolin' },
      { id: 'olimpik-trambolinler',  name: 'Olimpik Trambolinler' },
      { id: 'ticari-junior',         name: 'Ticari Junior Trambolin' },
      { id: 'profesyonel-trambolin', name: 'Profesyonel Trambolin' },
      { id: 'trambolin-parklari',    name: 'Trambolin Parkları' },
    ],
  },
  {
    key: 'soft-play-havuzlar',
    name: 'Soft Play & Havuzlar',
    subs: [
      { id: 'kucuk-top-havuzlari',       name: 'Küçük Top Havuzları' },
      { id: 'isletmelere-top-havuzlari', name: 'İşletmelere Top Havuzları' },
      { id: 'soft-play-oyun-alanlari',   name: 'Soft Play Oyun Alanları' },
      { id: 'soft-play-oyuncaklar',      name: 'Soft Play Oyuncaklar' },
    ],
  },
  {
    key: 'sisme-park',
    name: 'Şişme Park',
    subs: [
      { id: 'sisme-park-junior', name: 'Şişme Park Junior' },
      { id: 'sisme-buyuk',       name: 'Şişme Büyük' },
    ],
  },
];

const GROUP_KEYS  = GROUPS.map(g => g.key);
const ALL_SUB_IDS = GROUPS.flatMap(g => g.subs.map(s => s.id));
const ALL_IDS     = [...GROUP_KEYS, ...ALL_SUB_IDS];

const products = allProducts.filter(p => ALL_SUB_IDS.includes(p.category));

const groupOf = (id: string) => GROUPS.find(g => g.key === id || g.subs.some(s => s.id === id))!;
const subOf   = (id: string) => GROUPS.flatMap(g => g.subs).find(s => s.id === id);

const countGroup  = (gKey: string) => products.filter(p => groupOf(p.category)?.key === gKey).length;
const countSub    = (sId:  string) => products.filter(p => p.category === sId).length;

// ─── Ana bileşen ───────────────────────────────────────────────────
export default function Catalog() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Geçerli bir ID mi? Değilse default grup
  const activeId = categoryId && ALL_IDS.includes(categoryId) ? categoryId : 'trambolinler';

  const isGroupView = GROUP_KEYS.includes(activeId);
  const activeGroup = groupOf(activeId);
  const activeSub   = subOf(activeId);

  // Görüntülenecek ürünler
  const displayed = isGroupView
    ? products.filter(p => groupOf(p.category)?.key === activeId)
    : products.filter(p => p.category === activeId);

  const goTo = (id: string) => { navigate(`/urunler/${id}`); setDrawerOpen(false); };

  // Gruplu görünüm: her alt kategori ayrı bölüm
  const groupedSections = isGroupView
    ? activeGroup.subs
        .map(sub => ({ sub, items: products.filter(p => p.category === sub.id) }))
        .filter(s => s.items.length > 0)
    : [];

  const title = activeSub?.name ?? activeGroup?.name ?? 'Ürünler';

  // ─── Sidebar içeriği ─────────────────────────────────────────────
  const SidebarContent = () => (
    <div className="flex flex-col gap-1 pt-2">
      {GROUPS.map(group => {
        const isGroupActive = activeId === group.key || group.subs.some(s => s.id === activeId);
        const groupCount = countGroup(group.key);

        return (
          <div key={group.key}>
            {/* Ana kategori butonu */}
            <button
              onClick={() => goTo(group.key)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-black text-sm transition-all text-left ${
                activeId === group.key
                  ? 'bg-[#1a1a1a] text-white shadow-md'
                  : isGroupActive
                  ? 'bg-slate-100 text-[#1a1a1a]'
                  : 'text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-900'
              }`}
            >
              <span>{group.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                activeId === group.key ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
              }`}>{groupCount}</span>
            </button>

            {/* Alt kategoriler — aktif grup genişlemiş */}
            {isGroupActive && (
              <div className="ml-3 mt-1 mb-2 pl-3 border-l-2 border-slate-200 flex flex-col gap-0.5">
                {group.subs.map(sub => {
                  const count = countSub(sub.id);
                  if (count === 0) return null;
                  const isActiveSub = activeId === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => goTo(sub.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                        isActiveSub
                          ? 'bg-[#9fc91a] text-white shadow-sm'
                          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                      }`}
                    >
                      <span className="truncate">{sub.name}</span>
                      <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-full ml-1 ${
                        isActiveSub ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-400'
                      }`}>{count}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* HERO */}
      <section className="bg-[#1a1a1a] pt-24 md:pt-28 lg:pt-32 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 pb-8 md:pb-12">
            <div className="flex-1">
              <span className="inline-block text-[#9fc91a] font-extrabold text-xs tracking-widest uppercase mb-4">
                ÜRÜN KATALOĞU
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                <span className="text-[#9fc91a]">{title}</span>
              </h1>
              <p className="text-gray-400 text-base leading-relaxed max-w-md mb-6">
                Trambolin parkından soft play alanlarına, top havuzlarından şişme parklara — anahtar teslim çözümler.
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {displayed.length} ürün
                </span>
                {activeGroup && (
                  <span className="bg-[#9fc91a]/20 text-[#9fc91a] text-xs font-bold px-3 py-1.5 rounded-full">
                    {activeGroup.name}
                  </span>
                )}
                <span className="bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  EN-1176 Sertifikalı
                </span>
              </div>
            </div>
            <div className="w-full lg:w-[420px] h-44 md:h-60 lg:h-72 rounded-2xl md:rounded-3xl overflow-hidden shrink-0">
              <img
                src="https://matrax-web-six.vercel.app/images/galeri-yeni/galeri-10.jpg"
                alt="Ürün kataloğu"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* İÇERİK */}
      <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">

        {/* Mobil: üst filtre butonu */}
        <div className="flex items-center justify-between mb-5 md:hidden">
          <span className="text-xs font-black text-slate-400">{displayed.length} ürün</span>
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 bg-white border-2 border-slate-200 text-slate-700 font-black text-sm px-4 py-2.5 rounded-full shadow-sm"
          >
            <SlidersHorizontal size={15} /> Filtrele
          </button>
        </div>

        <div className="flex gap-6 lg:gap-10 items-start">

          {/* Sol sidebar — masaüstü */}
          <aside className="hidden md:block w-52 lg:w-60 shrink-0 sticky top-28">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Kategoriler</p>
            <SidebarContent />
          </aside>

          {/* Mobil drawer */}
          <AnimatePresence>
            {drawerOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/40 z-40 md:hidden"
                  onClick={() => setDrawerOpen(false)}
                />
                <motion.div
                  initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                  transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                  className="fixed left-0 top-0 bottom-0 w-72 bg-[#f8fafc] z-50 p-6 shadow-2xl md:hidden overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategoriler</p>
                    <button onClick={() => setDrawerOpen(false)}>
                      <X size={20} className="text-slate-400" />
                    </button>
                  </div>
                  <SidebarContent />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Ürünler */}
          <div className="flex-1 min-w-0">
            <p className="hidden md:block text-xs font-black text-slate-400 mb-6">
              {displayed.length} ürün listeleniyor
            </p>

            {displayed.length === 0 ? (
              <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center">
                <p className="text-lg font-bold text-slate-700 mb-2">Ürün bulunamadı</p>
                <p className="text-sm text-slate-400">Bu kategori için ürünlerimiz yakında eklenecektir.</p>
              </div>
            ) : isGroupView ? (
              // GRUP GÖRÜNÜMÜ — alt kategori başlıklı bölümler
              <div className="flex flex-col gap-12">
                {groupedSections.map(({ sub, items }) => (
                  <section key={sub.id} id={sub.id} className="scroll-mt-28">
                    <div className="flex items-end justify-between gap-3 mb-5 pb-3 border-b-2 border-slate-100">
                      <h2 className="text-lg md:text-xl font-black text-slate-800 leading-tight">
                        {sub.name}
                      </h2>
                      <span className="shrink-0 text-xs font-black bg-[#9fc91a]/10 text-[#9fc91a] px-3 py-1 rounded-full">
                        {items.length} ürün
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                      {items.map((p, i) => <CatalogCard key={p.id} product={p} index={i} />)}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              // ALT KATEGORİ GÖRÜNÜMÜ — düz grid
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {displayed.map((p, i) => <CatalogCard key={p.id} product={p} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Ürün kartı ────────────────────────────────────────────────────
function CatalogCard({ product, index }: { product: Product; index: number }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ delay: (index % 6) * 0.04, type: 'spring', stiffness: 200, damping: 22 }}
    >
      <button
        onClick={() => navigate(`/urun/${product.id}`)}
        className="block w-full bg-white rounded-[2rem] border-2 border-slate-100 hover:border-slate-200 hover:shadow-2xl transition-all group overflow-hidden text-left"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
          <img
            loading="lazy"
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute top-3 left-3 bg-[#9fc91a] text-white text-[10px] font-black px-3 py-1 rounded-full">
            {product.categoryName}
          </span>
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md">
            <ArrowUpRight size={14} className="text-slate-700" />
          </div>
        </div>
        <div className="p-4 md:p-5">
          <h3 className="text-sm md:text-base font-bold text-slate-800 leading-snug line-clamp-2">
            {product.title}
          </h3>
        </div>
      </button>
    </motion.div>
  );
}
