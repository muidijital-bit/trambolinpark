import { Helmet } from 'react-helmet-async';
import { Settings2, BarChart3, Megaphone, ToggleRight } from 'lucide-react';

const types = [
  { icon: <Settings2 size={18} />, title: 'Zorunlu Çerezler', desc: 'Sitenin çalışması için gerekli; oturum, dil tercihi ve güvenlik gibi temel işlevleri sağlar. Devre dışı bırakılamazlar.', color: 'rgba(195,233,45,.1)', textColor: 'var(--accent)' },
  { icon: <BarChart3 size={18} />, title: 'Performans / Analitik', desc: 'Site trafiğini anonim olarak analiz ederek kullanıcı deneyimini iyileştirmek için kullanılır.', color: 'rgba(30,30,30,.08)', textColor: '#1a1a1a' },
  { icon: <ToggleRight size={18} />, title: 'İşlevsel Çerezler', desc: 'Tercihlerinizi (dil, görünüm vb.) hatırlayarak kişiselleştirilmiş bir deneyim sunar.', color: 'rgba(59,130,246,.1)', textColor: '#3b82f6' },
  { icon: <Megaphone size={18} />, title: 'Pazarlama Çerezleri', desc: 'Reklam ve yeniden hedefleme amacıyla üçüncü taraf iş ortaklarımızca yerleştirilebilir.', color: 'rgba(249,115,22,.1)', textColor: '#f97316' },
];

const sections = [
  { title: 'Çerez Nedir?', body: 'Çerezler, ziyaret ettiğiniz web sitelerinin tarayıcınız aracılığıyla cihazınıza kaydettiği küçük metin dosyalarıdır. Site deneyiminizin geliştirilmesi ve trafiğin analiz edilmesi gibi amaçlarla kullanılırlar.' },
  { title: 'Çerezleri Nasıl Kontrol Edersiniz?', body: 'Çerez tercihlerinizi tarayıcı ayarlarınızdan yönetebilir, mevcut çerezleri silebilir veya yeni çerezlerin yerleştirilmesini engelleyebilirsiniz.' },
  { title: 'Üçüncü Taraf Çerezleri', body: 'Sitemizde Google Analytics gibi üçüncü taraf hizmet sağlayıcılarına ait çerezler kullanılabilir. Bu çerezler ilgili sağlayıcının gizlilik politikasına tabidir.' },
  { title: 'Politika Güncellemeleri', body: 'İşbu Çerez Politikası, ihtiyaç hâlinde güncellenebilir. Güncel sürüm her zaman bu sayfada yayınlanır.' },
];

export default function CerezPolitikasi() {
  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <Helmet>
        <title>Çerez Politikası | Trambolinpark</title>
        <meta name="description" content="Trambolinpark web sitesinde kullanılan çerez türleri ve çerez tercihlerinizi nasıl yönetebileceğiniz hakkında bilgilendirme." />
        <link rel="canonical" href="https://trambolinpark.com/cerez-politikasi" />
      </Helmet>
      <div className="tp-page-hero">
        <div aria-hidden="true" className="tp-hero-watermark">ÇEREZ</div>
        <div className="container">
          <span className="badge rounded-pill mb-3" style={{ background: 'rgba(195,233,45,.15)', color: '#c3e92d', fontSize: 11, fontWeight: 800, letterSpacing: '.1em', padding: '.4rem 1rem' }}>KURUMSAL · ÇEREZ POLİTİKASI</span>
          <div className="tp-hero-line" />
          <h1 className="display-5 fw-black text-white mb-2">Çerez <span style={{ color: '#c3e92d' }}>Politikası</span></h1>
          <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 520 }}>Kullandığımız çerez türleri, amaçları ve tercihlerinizi nasıl yönetebileceğiniz hakkında bilgiler.</p>
        </div>
      </div>
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-md-2 g-3 mb-5" style={{ maxWidth: 900, margin: '0 auto' }}>
          {types.map(t => (
            <div key={t.title} className="col">
              <div className="bg-white rounded-4 p-4 h-100" style={{ border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,.04)', transition: 'box-shadow .2s' }}>
                <div className="d-flex align-items-center justify-content-center rounded-3 mb-3" style={{ width: 44, height: 44, background: t.color, color: t.textColor }}>{t.icon}</div>
                <h3 className="fw-black mb-2" style={{ fontSize: 15, color: '#1a1a1a' }}>{t.title}</h3>
                <p className="mb-0 text-secondary" style={{ fontSize: 13, lineHeight: 1.65 }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-4 p-4 p-md-5" style={{ maxWidth: 860, margin: '0 auto', border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,.05)' }}>
          {sections.map((s, i) => (
            <div key={i} className={i < sections.length - 1 ? 'mb-4 pb-4 border-bottom' : ''}>
              <h2 className="fw-black mb-2" style={{ fontSize: 16, color: '#1a1a1a' }}>{s.title}</h2>
              <p className="mb-0 text-secondary" style={{ fontSize: 14, lineHeight: 1.75 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
