import { Cookie, Settings2, BarChart3, Megaphone, ToggleRight } from 'lucide-react';

const types = [
  {
    icon: <Settings2 size={18} />,
    title: 'Zorunlu Çerezler',
    desc: 'Sitenin çalışması için gerekli olan; oturum, dil tercihi ve güvenlik gibi temel işlevleri sağlayan çerezlerdir. Devre dışı bırakılamazlar.',
    color: 'bg-[#9fc91a]/10 text-[#9fc91a]',
  },
  {
    icon: <BarChart3 size={18} />,
    title: 'Performans / Analitik Çerezler',
    desc: 'Site trafiğini ve kullanıcı davranışlarını anonim olarak analiz etmek; sayfa hızlarını ve kullanıcı deneyimini iyileştirmek için kullanılır.',
    color: 'bg-slate-800/10 text-slate-800',
  },
  {
    icon: <ToggleRight size={18} />,
    title: 'İşlevsel Çerezler',
    desc: 'Tercihlerinizi (dil, görünüm vb.) hatırlayarak kişiselleştirilmiş bir deneyim sunmamızı sağlayan çerezlerdir.',
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    icon: <Megaphone size={18} />,
    title: 'Pazarlama Çerezleri',
    desc: 'Reklam ve yeniden hedefleme amacıyla, ilgi alanlarınıza uygun içerik göstermek için üçüncü taraf iş ortaklarımızca yerleştirilebilir.',
    color: 'bg-orange-500/10 text-orange-600',
  },
];

const sections = [
  {
    title: 'Çerez Nedir?',
    body: 'Çerezler, ziyaret ettiğiniz web sitelerinin tarayıcınız aracılığıyla cihazınıza kaydettiği küçük metin dosyalarıdır. Site deneyiminizin geliştirilmesi, kullanıcı tercihlerinin hatırlanması ve trafiğin analiz edilmesi gibi amaçlarla kullanılırlar.',
  },
  {
    title: 'Çerezleri Nasıl Kontrol Edersiniz?',
    body: 'Çerez tercihlerinizi her zaman tarayıcı ayarlarınızdan yönetebilir, mevcut çerezleri silebilir veya yeni çerezlerin yerleştirilmesini engelleyebilirsiniz. Ancak zorunlu çerezlerin devre dışı bırakılması durumunda sitemizin bazı bölümleri düzgün çalışmayabilir.',
  },
  {
    title: 'Üçüncü Taraf Çerezleri',
    body: 'Sitemizde Google Analytics gibi üçüncü taraf hizmet sağlayıcılarına ait çerezler kullanılabilir. Bu çerezler ilgili sağlayıcının gizlilik politikasına tabidir.',
  },
  {
    title: 'Politika Güncellemeleri',
    body: 'İşbu Çerez Politikası, ihtiyaç hâlinde tarafımızca güncellenebilir. Güncel sürüm her zaman bu sayfada yayınlanır.',
  },
];

export default function CerezPolitikasi() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* Header */}
      <section className="bg-[#1a1a1a] pt-24 md:pt-28 lg:pt-32 pb-10 md:pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="inline-flex items-center gap-2 text-[#9fc91a] font-extrabold text-[10px] tracking-widest uppercase mb-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            <Cookie size={12} /> KURUMSAL · ÇEREZ POLİTİKASI
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mt-2 mb-3">
            Çerez <span className="text-[#9fc91a]">Politikası</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed">
            Web sitemizde kullandığımız çerez türleri, kullanım amaçları ve tercihlerinizi nasıl yönetebileceğiniz hakkında bilgiler.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16">

        {/* Çerez kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12 max-w-5xl mx-auto">
          {types.map(t => (
            <div key={t.title} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
              <div className={`w-11 h-11 rounded-xl ${t.color} flex items-center justify-center mb-4`}>
                {t.icon}
              </div>
              <h3 className="text-base font-black text-[#1a1a1a] mb-2">{t.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Metinler */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 md:p-14 max-w-4xl mx-auto">
          {sections.map((s, i) => (
            <div key={i} className="mb-8 last:mb-0">
              <h2 className="text-lg font-black text-[#1a1a1a] mb-3">{s.title}</h2>
              <p className="text-slate-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
