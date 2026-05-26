import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Phone, ChevronRight } from 'lucide-react';
import NotFound from './NotFound';

/* ── Cities ── */
const CITIES: Record<string, string> = {
  ankara: 'Ankara', istanbul: 'İstanbul', izmir: 'İzmir', bursa: 'Bursa',
  antalya: 'Antalya', adana: 'Adana', konya: 'Konya', mersin: 'Mersin',
  eskisehir: 'Eskişehir', gaziantep: 'Gaziantep', kayseri: 'Kayseri',
  kocaeli: 'Kocaeli', kahramanmaras: 'Kahramanmaraş', usak: 'Uşak',
  samsun: 'Samsun', trabzon: 'Trabzon', diyarbakir: 'Diyarbakır',
  erzurum: 'Erzurum', malatya: 'Malatya', denizli: 'Denizli',
  sivas: 'Sivas', sakarya: 'Sakarya', manisa: 'Manisa', hatay: 'Hatay',
  van: 'Van', sanliurfa: 'Şanlıurfa', canakkale: 'Çanakkale',
  edirne: 'Edirne', tekirdag: 'Tekirdağ', balikesir: 'Balıkesir',
  aydin: 'Aydın', mugla: 'Muğla', isparta: 'Isparta', kutahya: 'Kütahya',
  aksaray: 'Aksaray', nevsehir: 'Nevşehir', nigde: 'Niğde', karaman: 'Karaman',
  kirikkale: 'Kırıkkale', kastamonu: 'Kastamonu', bolu: 'Bolu',
  zonguldak: 'Zonguldak', karabuk: 'Karabük', bartin: 'Bartın',
  sinop: 'Sinop', ordu: 'Ordu', giresun: 'Giresun', rize: 'Rize',
  artvin: 'Artvin', elazig: 'Elazığ', batman: 'Batman', mardin: 'Mardin',
  siirt: 'Siirt', afyonkarahisar: 'Afyonkarahisar',
};

/* ── Topic templates ── */
type Section = { heading: string; body: (c: string) => string };
type Topic = {
  title: (c: string) => string;
  metaDesc: (c: string) => string;
  hero: (c: string) => string;
  intro: (c: string) => string;
  features: string[];
  sections: Section[];
  cta: string;
};

const TOPICS: Record<string, Topic> = {
  'trambolin-modelleri': {
    title: (c) => `${c} Trambolin Modelleri – 2026 Güncel Rehber`,
    metaDesc: (c) => `${c} için en uygun trambolin modellerini keşfedin. Ticari, olimpik ve park trambolinleri. Ücretsiz keşif ve fiyat teklifi.`,
    hero: (c) => `${c} Trambolin Modelleri`,
    intro: (c) => `${c}'de trambolin parkı kurmak veya mevcut alanınızı geliştirmek istiyorsanız doğru yerdesiniz. Trambolinpark olarak ${c} ve çevresine özel trambolin modelleri sunuyoruz.`,
    features: ['EN-1176 sertifikalı güvenli üretim', 'Ticari ve olimpik model seçenekleri', 'Anahtar teslim kurulum hizmeti', 'Yedek parça ve teknik destek', 'Ücretsiz 3D yerleşim planı'],
    sections: [
      { heading: 'Ticari Trambolin Modelleri', body: (c) => `${c}'deki eğlence merkezleri, AVM'ler ve spor tesisleri için özel olarak tasarlanmış ticari trambolin modellerimiz; yoğun kullanıma dayanıklı yapısı ve geniş atlama yüzeyleriyle öne çıkıyor.` },
      { heading: 'Olimpik Trambolin Modelleri', body: (c) => `Profesyonel sporculara yönelik olimpik trambolinlerimiz, ${c}'de spor kulüpleri ve antrenman tesisleri tarafından tercih edilmektedir. Uluslararası standartlara uygun üretim garantisi sunuyoruz.` },
      { heading: 'Neden Trambolinpark?', body: (c) => `${c}'de 10 yılı aşkın tecrübemizle anahtar teslim trambolin çözümleri sunuyoruz. Proje tasarımından montaja, garantiden yedek parçaya kadar tüm süreçlerde yanınızdayız.` },
    ],
    cta: 'Ücretsiz Fiyat Teklifi Al',
  },
  'trambolin-cesitleri': {
    title: (c) => `${c} Trambolin Çeşitleri – Ticari & Olimpik`,
    metaDesc: (c) => `${c} için trambolin çeşitleri: park trambolinleri, olimpik trambolinler, zemin trambolinleri ve daha fazlası. Fiyat ve teknik bilgi için iletişime geçin.`,
    hero: (c) => `${c} Trambolin Çeşitleri`,
    intro: (c) => `${c} ve çevresindeki müşterilerimize geniş trambolin yelpazemizi sunuyoruz. İhtiyacınıza ve bütçenize uygun en doğru modeli birlikte belirleyelim.`,
    features: ['Park trambolinleri', 'Olimpik trambolinler', 'Zemin (yer) trambolinleri', 'Bahçe trambolinleri', 'Foam pit sistemleri'],
    sections: [
      { heading: 'Park ve Eğlence Merkezi Trambolinleri', body: (c) => `${c}'deki eğlence parklarına yönelik ticari trambolinlerimiz yüksek kapasiteli kullanım için tasarlanmıştır. Rengarenk tasarımları ve güvenlik ağlarıyla hem çocuklara hem yetişkinlere hitap eder.` },
      { heading: 'Zemin Trambolinleri', body: (c) => `${c}'de zemin trambolinleri özellikle ninja parkurları ve serbest atlama alanları için tercih edilmektedir. Modüler yapısı sayesinde her alana kolayca uyum sağlar.` },
      { heading: 'Hangisi Size Uygun?', body: (c) => `${c}'deki projeniz için en uygun trambolin çeşidini belirlemek üzere ücretsiz danışmanlık hizmetimizden yararlanabilirsiniz. Alan ölçülerinizi paylaşın, size özel çözüm sunalım.` },
    ],
    cta: 'Ücretsiz Danışmanlık Al',
  },
  'trambolin-kurulumu': {
    title: (c) => `${c} Trambolin Kurulumu – Profesyonel Montaj`,
    metaDesc: (c) => `${c} trambolin kurulumu için profesyonel ekibimiz hizmetinizde. Anahtar teslim montaj, zemin düzenlemesi ve teknik destek. Hemen teklif alın.`,
    hero: (c) => `${c} Trambolin Kurulumu`,
    intro: (c) => `${c} genelinde profesyonel trambolin kurulum hizmetleri sunuyoruz. Deneyimli ekibimiz, projenizin ilk gününden itibaren yanınızda.`,
    features: ['Profesyonel saha analizi ve ölçüm', 'Zemin düzenlemesi ve hazırlığı', 'Hızlı ve güvenli montaj', 'Güvenlik testleri ve belgesi', 'Personel eğitimi'],
    sections: [
      { heading: 'Kurulum Süreci', body: (c) => `${c}'deki kurulum projelerimizde önce sahayı inceliyoruz; zemin yapısı, tavan yüksekliği ve alan planlamasını değerlendirerek size en verimli yerleşim planını sunuyoruz.` },
      { heading: 'Güvenlik Standartları', body: (c) => `Tüm ${c} kurulumlarımız EN-1176 güvenlik standardına uygun olarak gerçekleştirilmektedir. Montaj tamamlandıktan sonra kapsamlı güvenlik testi yapılır ve belgesi teslim edilir.` },
      { heading: 'Kurulum Sonrası Destek', body: (c) => `${c}'deki kurulumun ardından periyodik bakım ve teknik destek hizmetimiz devreye girer. Yedek parça desteği ve uzaktan teknik danışmanlıkla yanınızdayız.` },
    ],
    cta: 'Kurulum Teklifi Al',
  },
  'trambolin-fiyatlari': {
    title: (c) => `${c} Trambolin Fiyatları – 2026 Güncel`,
    metaDesc: (c) => `${c} trambolin fiyatları 2026. Ticari, olimpik ve park trambolinleri için güncel fiyat listesi. Ücretsiz keşif ve özel teklif.`,
    hero: (c) => `${c} Trambolin Fiyatları`,
    intro: (c) => `${c}'de trambolin fiyatları; model, kapasite ve kurulum gereksinimlerine göre değişmektedir. Size özel fiyat teklifi için ekibimizle iletişime geçin.`,
    features: ['Bütçenize uygun model seçenekleri', 'Taksit ve ödeme kolaylıkları', 'Anahtar teslim fiyatlandırma', 'Garanti kapsamı dahil', 'Ücretsiz keşif ve fiyat teklifi'],
    sections: [
      { heading: 'Fiyatı Etkileyen Faktörler', body: (c) => `${c}'deki trambolin fiyatları; modelin büyüklüğü, yay sayısı, malzeme kalitesi ve kurulum gereksinimine göre farklılık gösterir. EN-1176 sertifikalı ticari modeller güvenlik açısından tercih edilmesi gereken seçeneklerdir.` },
      { heading: 'Ticari Trambolin Yatırımı', body: (c) => `${c}'de trambolin parkı yatırımı yapmayı düşünüyorsanız doğru ekipman seçimi hem güvenlik hem karlılık açısından kritiktir. Ücretsiz fizibilite analizimizden yararlanabilirsiniz.` },
      { heading: 'Güncel Fiyat Teklifi', body: (c) => `${c} için güncel trambolin fiyatlarını öğrenmek üzere bize ulaşın. İhtiyacınıza özel çözümler ve rekabetçi fiyatlarla hizmetinizdeyiz.` },
    ],
    cta: 'Fiyat Teklifi İste',
  },
  'sisme-oyun-parki-fiyatlari': {
    title: (c) => `${c} Şişme Oyun Parkı Fiyatları – 2026`,
    metaDesc: (c) => `${c} şişme oyun parkı fiyatları 2026. Kaydıraklı, temalı ve su parkı modelleri. Çocuk oyun alanı için uygun fiyatlı çözümler.`,
    hero: (c) => `${c} Şişme Oyun Parkı Fiyatları`,
    intro: (c) => `${c}'de şişme oyun parkı kurmak veya kiralamak için güncel fiyat bilgisi almak üzere doğru sayfadasınız. Model, büyüklük ve kurulum gereksinimlerine göre size özel teklif hazırlıyoruz.`,
    features: ['Farklı büyüklük ve model seçenekleri', 'Kiralama ve satış alternatifleri', 'Ankara\'dan hızlı teslimat', 'Montaj ve söküm dahil fiyatlar', 'EN-71 güvenlik sertifikalı ürünler'],
    sections: [
      { heading: 'Fiyatları Etkileyen Faktörler', body: (c) => `${c}'deki şişme oyun parkı fiyatları; boyut, model tipi, malzeme kalitesi ve kurulum detaylarına göre değişmektedir. Kaydıraklı kombine yapılar ve temalı modeller en çok tercih edilenler arasında yer alıyor.` },
      { heading: 'Kiralama mı, Satın Alma mı?', body: (c) => `${c}'de organizasyon ve etkinlikler için kısa dönem kiralama, kalıcı eğlence alanları için satın alma seçeneklerimiz mevcuttur. Her iki seçenek için rekabetçi fiyatlar sunuyoruz.` },
      { heading: 'Ücretsiz Fiyat Teklifi', body: (c) => `${c} için şişme oyun parkı fiyat teklifinizi almak üzere hemen iletişime geçin. Alan ölçülerinizi ve ihtiyaçlarınızı paylaşın, 24 saat içinde teklif hazırlayalım.` },
    ],
    cta: 'Şimdi Teklif Al',
  },
  'sisme-oyun-parki-modelleri': {
    title: (c) => `${c} Şişme Oyun Parkı Modelleri – 2026 Rehber`,
    metaDesc: (c) => `${c} için şişme oyun parkı modelleri. Kaydıraklı, temalı, su parkı ve mini modeller. Dayanıklı PVC, güvenlik sertifikalı ürünler.`,
    hero: (c) => `${c} Şişme Oyun Parkı Modelleri`,
    intro: (c) => `${c} ve çevresindeki etkinlik organizatörleri, belediyeler ve eğlence merkezleri için geniş şişme oyun parkı model yelpazemizi sunuyoruz.`,
    features: ['Kaydıraklı şişme park modelleri', 'Tırmanma engelli modeller', 'Temalı (kale, korsan, orman) modeller', 'Su parkı şişme modelleri', 'Mini iç mekan modelleri'],
    sections: [
      { heading: 'En Çok Tercih Edilen Modeller', body: (c) => `${c}'de 2026 yılında en çok tercih edilen şişme oyun parkı modelleri; kaydıraklı kombine yapılar ve temalı tasarımlardır. Hem iç hem dış mekanda kullanılabilen modellerimiz mevcuttur.` },
      { heading: 'Güvenlik ve Malzeme Kalitesi', body: (c) => `${c}'ye tedarik ettiğimiz tüm şişme oyun parkları; dayanıklı PVC kaplama, güçlendirilmiş dikiş ve EN-71 güvenlik sertifikasıyla üretilmektedir.` },
      { heading: 'Modele Nasıl Karar Verilir?', body: (c) => `${c}'deki kullanım alanınız, hedef yaş grubu ve bütçenize göre en uygun modeli belirlemenize yardımcı oluyoruz. Ücretsiz danışmanlık için iletişime geçin.` },
    ],
    cta: 'Model Kataloğunu İncele',
  },
  'oyun-parki-firmalari': {
    title: (c) => `${c} Oyun Parkı Firmaları – Trambolinpark`,
    metaDesc: (c) => `${c} oyun parkı firmaları arasında Trambolinpark. Trambolin parkı, şişme oyun parkı ve soft play kurulumu. Ücretsiz keşif için iletişime geçin.`,
    hero: (c) => `${c} Oyun Parkı Firmaları`,
    intro: (c) => `${c}'de oyun parkı projeleriniz için deneyimli ve güvenilir bir çözüm ortağı arıyorsanız Trambolinpark'ı tercih edin. Tasarımdan kuruluma, garantiden teknik desteğe kadar yanınızdayız.`,
    features: ['Trambolin parkı tasarım ve kurulum', 'Şişme oyun parkı tedariki', 'Soft play alan kurulumu', 'Top havuzu sistemleri', 'Yedek parça ve bakım desteği'],
    sections: [
      { heading: 'Neden Trambolinpark?', body: (c) => `${c}'de 10 yılı aşkın sektör deneyimimizle yüzlerce başarılı proje tamamladık. Ticari oyun parkı çözümlerinde EN-1176 güvenlik sertifikamız ve uzman kadromuzla fark yaratıyoruz.` },
      { heading: 'Sunduğumuz Hizmetler', body: (c) => `${c} ve çevresindeki müşterilerimize; alan analizi, 3D tasarım, ekipman temini, anahtar teslim kurulum ve kurulum sonrası teknik destek hizmetleri sunuyoruz.` },
      { heading: 'Ücretsiz Keşif ve Teklif', body: (c) => `${c}'deki projeniz için ücretsiz keşif ve detaylı fiyat teklifi almak üzere hemen iletişime geçin. 24 saat içinde size dönüş yapıyoruz.` },
    ],
    cta: 'Ücretsiz Keşif Talep Et',
  },
};

/* Standalone (city-independent) pages */
type StandalonePage = {
  title: string; metaDesc: string; hero: string; intro: string;
  features: string[]; sections: { heading: string; body: string }[]; cta: string;
};

const STANDALONE: Record<string, StandalonePage> = {
  'trambolin-parklari': {
    title: 'Trambolin Parkları – Ticari Trambolin Çözümleri | Trambolinpark',
    metaDesc: 'Ticari trambolin parkları için ekipman, tasarım ve kurulum hizmetleri. EN-1176 sertifikalı trambolinler, anahtar teslim çözümler.',
    hero: 'Trambolin Parkları',
    intro: 'Eğlence merkezleri, AVM\'ler ve rekreasyon tesisleri için profesyonel trambolin parkı çözümleri sunuyoruz. Tasarımdan kuruluma her adımda yanınızdayız.',
    features: ['EN-1176 sertifikalı ekipmanlar', 'Özel tasarım ve 3D planlama', 'Anahtar teslim kurulum', 'Personel eğitimi', 'Yedek parça ve teknik destek'],
    sections: [
      { heading: 'Ticari Trambolin Parkı Nedir?', body: 'Ticari trambolin parkları; eğlence merkezleri, AVM\'ler ve spor tesislerinde kurulan, geniş atlama alanları, foam pit bölümleri, ninja parkurları ve dodgeball sahalarından oluşan çok bölümlü eğlence kompleksleridir.' },
      { heading: 'Yatırım Geri Dönüşü', body: 'İyi konumlandırılmış bir trambolin parkı, sektör ortalamalarına göre 24–36 ayda yatırımını amorti etmektedir. Doğum günü paketleri ve kurumsal etkinlikler ek gelir kapısı oluşturur.' },
      { heading: 'Projeleriniz İçin Yanınızdayız', body: 'Trambolin parkı kurmayı planlıyorsanız ücretsiz fizibilite analizi ve 3D yerleşim planı için ekibimizle iletişime geçin.' },
    ],
    cta: 'Fizibilite Analizi Al',
  },
};

/* ── Parse slug ── */
function parsePage(slug: string) {
  // standalone
  if (STANDALONE[slug]) return { type: 'standalone' as const, data: STANDALONE[slug] };

  // city-based: find which city key the slug starts with
  const cityKey = Object.keys(CITIES).find((k) => slug.startsWith(k + '-'));
  if (!cityKey) return null;

  const topicSlug = slug.slice(cityKey.length + 1);
  const topic = TOPICS[topicSlug];
  if (!topic) return null;

  return { type: 'city' as const, city: CITIES[cityKey], topic };
}

/* ── Component ── */
export default function SeoPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const parsed = parsePage(slug);
  if (!parsed) return <NotFound />;

  const cityName = parsed.type === 'city' ? parsed.city : '';
  const title    = parsed.type === 'city' ? parsed.topic.title(cityName)    : parsed.data.title;
  const metaDesc = parsed.type === 'city' ? parsed.topic.metaDesc(cityName) : parsed.data.metaDesc;
  const hero     = parsed.type === 'city' ? parsed.topic.hero(cityName)     : parsed.data.hero;
  const intro    = parsed.type === 'city' ? parsed.topic.intro(cityName)    : parsed.data.intro;
  const features = parsed.type === 'city' ? parsed.topic.features           : parsed.data.features;
  const sections = parsed.type === 'city'
    ? parsed.topic.sections.map((s) => ({ heading: s.heading, body: s.body(cityName) }))
    : parsed.data.sections;
  const cta      = parsed.type === 'city' ? parsed.topic.cta : parsed.data.cta;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={`https://trambolinpark.com/${slug}`} />
      </Helmet>

      <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

        {/* Hero */}
        <div className="tp-page-hero">
          <div aria-hidden="true" className="tp-hero-watermark">{cityName || 'TR'}</div>
          <div className="container">
            <nav aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
              <ol className="breadcrumb mb-0" style={{ fontSize: 12, opacity: .7 }}>
                <li className="breadcrumb-item"><Link to="/" style={{ color: 'inherit' }}>Ana Sayfa</Link></li>
                <li className="breadcrumb-item active">{hero}</li>
              </ol>
            </nav>
            <div className="tp-hero-line" />
            <h1>{hero}</h1>
            <p style={{ maxWidth: 560 }}>{intro}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <Link to="/iletisim" className="btn fw-bold"
                style={{ background: '#c3e92d', color: '#0a0a0a', borderRadius: 8, padding: '10px 24px' }}>
                {cta}
              </Link>
              <a href="tel:+905327765350" className="btn fw-bold d-flex align-items-center gap-2"
                style={{ background: 'rgba(255,255,255,.12)', color: '#fff', borderRadius: 8, padding: '10px 24px', border: '1px solid rgba(255,255,255,.2)' }}>
                <Phone size={15} /> Hemen Ara
              </a>
            </div>
          </div>
        </div>

        <div className="container py-5">
          <div className="row g-4">

            {/* Main content */}
            <div className="col-lg-8">

              {/* Features */}
              <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem', border: '1px solid #e8e8e8' }}>
                <h2 style={{ fontFamily: '"Poppins",sans-serif', fontWeight: 800, fontSize: '1.15rem', color: '#1a1a1a', marginBottom: '1.25rem' }}>
                  Neler Sunuyoruz?
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 10 }}>
                  {features.map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={16} style={{ color: '#5c9200', flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: '#333' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sections */}
              {sections.map((s) => (
                <div key={s.heading} style={{ background: '#fff', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem', border: '1px solid #e8e8e8' }}>
                  <h2 style={{ fontFamily: '"Poppins",sans-serif', fontWeight: 800, fontSize: '1.15rem', color: '#1a1a1a', marginBottom: '.75rem' }}>
                    {s.heading}
                  </h2>
                  <p style={{ fontSize: 15, color: '#555', lineHeight: 1.8, margin: 0 }}>{s.body}</p>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div style={{ background: '#1a1a1a', borderRadius: 16, padding: '2rem', position: 'sticky', top: 100 }}>
                <h3 style={{ fontFamily: '"Poppins",sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#fff', marginBottom: '.75rem' }}>
                  Ücretsiz Teklif Alın
                </h3>
                <p style={{ fontSize: 13.5, color: '#aaa', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Projeniz için özel fiyat teklifi ve ücretsiz danışmanlık hizmeti sunuyoruz.
                </p>
                <Link to="/iletisim" className="btn w-100 fw-bold mb-3"
                  style={{ background: '#c3e92d', color: '#0a0a0a', borderRadius: 8, padding: '12px' }}>
                  {cta} <ChevronRight size={14} style={{ marginLeft: 4 }} />
                </Link>
                <a href="tel:+905327765350" className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                  style={{ background: 'rgba(255,255,255,.08)', color: '#fff', borderRadius: 8, padding: '12px', border: '1px solid rgba(255,255,255,.1)' }}>
                  <Phone size={14} /> +90 532 776 53 50
                </a>
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,.1)' }}>
                  <Link to="/urunler" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#c3e92d', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                    <ChevronRight size={14} /> Ürün Kataloğuna Git
                  </Link>
                  <Link to="/blog" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#aaa', fontSize: 13, marginTop: 10, textDecoration: 'none' }}>
                    <ChevronRight size={14} /> Blog Yazılarını İncele
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
