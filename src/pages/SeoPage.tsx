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

/* ── Types ── */
type Section = { heading: string; body?: (c: string) => string; items?: (c: string) => string[] };
type Topic = {
  title: (c: string) => string;
  metaDesc: (c: string) => string;
  hero: (c: string) => string;
  intro: (c: string) => string;
  features: string[];
  sections: Section[];
  cta: string;
};

/* ── Topics with real content from trambolinpark.com ── */
const TOPICS: Record<string, Topic> = {
  'trambolin-modelleri': {
    title: (c) => `${c} Trambolin Modelleri – 2026 Güncel Ürün Rehberi`,
    metaDesc: (c) => `${c} trambolin modelleri 2026. Ev tipi, profesyonel, mini fitness ve büyük bahçe trambolinleri. Güvenlik donanımları ve geniş model seçenekleri.`,
    hero: (c) => `${c} Trambolin Modelleri`,
    intro: (c) => `Spor, eğlence ve fiziksel aktiviteyi bir arada sunan trambolinler, son yıllarda hem aileler hem de spor merkezleri tarafından yoğun şekilde tercih edilmeye başladı. ${c}'de trambolin talebinin artmasıyla birlikte ürün kategorileri de genişledi; bugün hem iç mekâna hem dış mekâna uygun pek çok model bulmak mümkün.`,
    features: ['Güvenlik ağlı ev tipi modeller', 'Profesyonel jimnastik trambolinleri', 'Mini fitness (Jumping) modelleri', 'Büyük bahçe trambolinleri', 'EN-1176 sertifikalı ticari modeller'],
    sections: [
      { heading: 'Ev Tipi Trambolin Modelleri', body: (c) => `${c}'de ev tipi trambolinler genellikle daha kompakt, güvenlik ağı bulunan ve çocukların kullanımına uygun seçeneklerdir. Yay sistemi ve zıplama yüzeyi kalitesi uzun ömürlü kullanımı doğrudan etkiler.` },
      { heading: 'Profesyonel Trambolin Modelleri', body: (c) => `${c}'deki spor salonları, jimnastik merkezleri ve fitness stüdyoları için üretilen profesyonel trambolinler çok daha dayanıklı malzemelerden üretilir. Yüksek taşıma kapasitesi ve geniş atlama yüzeyi bu modellerin öne çıkan özellikleri arasındadır.` },
      { heading: 'Mini Trambolin (Jumping Fitness) Modelleri', body: (c) => `Son yıllarda oldukça popüler hale gelen mini trambolinler, ${c}'de yetişkinlerin spor amaçlı tercih ettiği ürünlerdir. Düşük darbe etkisiyle eklemlere zarar vermeden kalori yakımı sağlar.` },
      { heading: 'Büyük Bahçe Trambolinleri', body: (c) => `Geniş aile bahçeleri için tasarlanan bu modeller daha yüksek taşıma kapasitesine sahiptir. ${c}'de dış mekân kullanımı için UV dayanımlı malzeme ve güçlendirilmiş çelik çerçeve tercih edilmesi önerilir.` },
      {
        heading: 'Trambolin Seçerken Nelere Dikkat Edilmeli?',
        items: () => ['Güvenlik ağının sağlamlığı ve yüksekliği', 'Zıplama matının kalitesi ve dikişlerinin dayanıklılığı', 'Yay mekanizmasının esnekliği ve dayanıklılığı', 'Yağmur ve güneşe karşı dayanıklı dış kaplama', 'Kurulumun kolaylığı ve söküm imkânı', 'Sağlam garanti ve satış sonrası destek'],
      },
    ],
    cta: 'Ücretsiz Fiyat Teklifi Al',
  },

  'trambolin-cesitleri': {
    title: (c) => `${c} Trambolin Çeşitleri – 2026 Güncel Ürün İncelemesi`,
    metaDesc: (c) => `${c} trambolin çeşitleri 2026. Bahçe trambolinleri, ev tipi, mini fitness, profesyonel jimnastik ve güvenlik ağlı modeller. Teklif için iletişime geçin.`,
    hero: (c) => `${c} Trambolin Çeşitleri`,
    intro: (c) => `Son yıllarda hem eğlence hem de spor amacıyla kullanılan trambolinler, ${c}'de giderek daha fazla ilgi görmeye başladı. Dayanıklı yapıları ve güvenlik özellikleriyle ürünler geniş bir kullanıcı kitlesine hitap etmektedir.`,
    features: ['Bahçe trambolinleri', 'Ev tipi küçük trambolinler', 'Mini fitness trambolinleri', 'Profesyonel jimnastik trambolinleri', 'Güvenlik ağıyla desteklenmiş modeller'],
    sections: [
      { heading: 'Bahçe Trambolinleri', body: (c) => `${c}'de bahçeli evlerde en çok tercih edilen modellerdir. Geniş çaplı yapıları, güvenlik ağı, güçlü yay mekanizması ve dayanıklı çelik gövdeleriyle hem çocuklar hem de yetişkinler için idealdir.` },
      { heading: 'Ev Tipi Küçük Trambolinler', body: (c) => `Daha kompakt yapıya sahip olan bu trambolinler, ${c}'de genellikle çocuk odası veya küçük bahçelerde tercih edilir. Katlanabilir modeller depolama kolaylığı sağlar.` },
      { heading: 'Mini Fitness Trambolinleri', body: (c) => `"Jumping Fitness" olarak da bilinen bu modeller, ${c}'de özellikle yetişkinlerin egzersiz amaçlı kullandığı küçük çaplı trambolinlerdir. Eklemlere düşük darbe etkisiyle etkili kardiyovasküler antrenman sağlar.` },
      { heading: 'Profesyonel Jimnastik Trambolinleri', body: (c) => `${c}'deki spor salonları ve profesyonel kullanıcılar için üretilen bu modeller daha güçlü yaylara, geniş zıplama alanına ve yüksek taşıma kapasitesine sahiptir.` },
      {
        heading: 'Trambolin Seçerken Nelere Dikkat Etmelisiniz?',
        items: () => ['Kullanım amacını belirleyin (ev, bahçe, spor salonu)', 'Çerçeve dayanıklılığı ve malzeme kalitesini inceleyin', 'Güvenlik ağının standartlara uygunluğunu kontrol edin', 'Yay sayısı ve esnekliğini değerlendirin', 'Garanti süresi ve satış sonrası desteği sorgulayın'],
      },
    ],
    cta: 'Ücretsiz Danışmanlık Al',
  },

  'trambolin-kurulumu': {
    title: (c) => `${c} Trambolin Kurulumu – 2026 Rehberi`,
    metaDesc: (c) => `${c} trambolin kurulumu rehberi. Alan seçimi, kurulum adımları, güvenlik kontrolleri ve profesyonel montaj hizmetleri hakkında 2026 güncel bilgiler.`,
    hero: (c) => `${c} Trambolin Kurulumu`,
    intro: (c) => `Trambolinler, eğlence ve spor için güvenli bir alan sunarken doğru kurulmadığında kazalara davetiye çıkarabilir. Bu nedenle ${c} trambolin kurulumu, hem çocukların hem yetişkinlerin güvenliği açısından son derece önemlidir.`,
    features: ['Düz ve sağlam zemin seçimi', 'Tüm parçaların eksiksiz kontrolü', 'Güvenlik ağı ve ped takılması', 'Yay gerilim ayarları', 'Profesyonel montaj hizmeti'],
    sections: [
      {
        heading: 'Kurulum Öncesi Hazırlık',
        items: (c) => [
          `Alan Seçimi: ${c}'de trambolinin kurulacağı alan düz ve sağlam olmalıdır. Bahçe, çim veya beton zemin üzerinde trambolin kurulabilir; ancak zemin seviyesi ve drenaj kontrol edilmelidir.`,
          'Malzeme Kontrolü: Kurulumdan önce trambolinin tüm parçaları eksiksiz olmalıdır. Eksik parçalarla kurulum yapılmamalıdır.',
          'Güvenlik Önlemleri: Çocuklar için kullanılacaksa güvenlik ağı mutlaka takılmalıdır.',
        ],
      },
      {
        heading: 'Kurulum Adımları',
        items: () => [
          'Çerçevenin Kurulması: Çelik veya alüminyum çerçeve düz bir zemine yerleştirilir, tüm bağlantı noktaları sıkıştırılır.',
          'Zıplama Minderinin Takılması: Minder, çerçeveye eşit gerilimle bağlanır; gevşek bölge bırakılmaz.',
          'Güvenlik Pedleri ve Ağının Montajı: Yayların üzerini kapatan pedler ve çevre ağı üretici talimatlarına göre sabitlenir.',
          'Son Kontroller: Tüm vidalı bağlantılar, yay gerilimleri ve ağ dikişleri kontrol edilir.',
        ],
      },
      { heading: 'Kurulumda Dikkat Edilmesi Gerekenler', body: (c) => `${c}'deki kurulumda trambolinin düz zemine yerleştirilmesi devrilme riskini azaltır. Yaylar eşit gerilimde olmalı, güvenlik ekipmanları (ped, ağ) asla atlanmamalıdır. Kurulumun ardından ağırlık kapasitesine uygun kullanım sağlanmalıdır.` },
      { heading: 'Profesyonel Kurulum Hizmetleri', body: (c) => `${c} genelinde büyük park sistemleri ve ticari kurulumlar için profesyonel montaj ekibimiz hizmet vermektedir. Anahtar teslim kurulumun ardından kapsamlı güvenlik testi yapılır ve belgesi teslim edilir.` },
    ],
    cta: 'Kurulum Teklifi Al',
  },

  'trambolin-fiyatlari': {
    title: (c) => `${c} Trambolin Fiyatları – 2026 Güncel Rehber`,
    metaDesc: (c) => `${c} trambolin fiyatları 2026. Ev tipi, profesyonel ve ticari trambolin fiyat rehberi. Fiyatı etkileyen faktörler ve satın alma önerileri.`,
    hero: (c) => `${c} Trambolin Fiyatları`,
    intro: (c) => `Ev tipi trambolinlerden profesyonel kullanım için tasarlanmış büyük modellere kadar geniş bir ürün yelpazesine sahip olan bu spor ekipmanları, son yıllarda yoğun ilgi görüyor. ${c}'de 2026 yılında trambolinlere olan talep gözle görülür şekilde arttı.`,
    features: ['Bütçeye uygun model seçenekleri', 'Güvenlik ağlı modeller', 'Profesyonel yük kapasiteli trambolinler', 'Dayanıklı dış mekan trambolinleri', 'Ücretsiz fiyat teklifi'],
    sections: [
      {
        heading: 'Fiyatları Etkileyen Başlıca Unsurlar',
        items: (c) => [
          `Boyut: ${c}'de küçük çaplı trambolinlerle büyük bahçe trambolinleri arasında ciddi fiyat farkı bulunur.`,
          'Kullanım Amacı: Ev tipi modeller genellikle daha ekonomik olurken, spor salonları için tasarlanan profesyonel trambolinler daha yüksek fiyatlarla sunulur.',
          'Güvenlik Donanımları: Koruma filesi, ekstra destek direkleri ve kalın kenar pedleri hem güvenliği hem de fiyatı artırır.',
          'Malzeme Kalitesi: Dayanıklı çelik gövde, UV dayanımlı yüzey kaplamaları ve kaliteli yay sistemleri uzun ömürlü kullanım sağlar.',
          'Marka ve Garanti Süresi: Sertifikalı markalar genellikle daha güçlü garanti ve servis desteği sunar.',
        ],
      },
      {
        heading: 'Satın Alırken Nelere Dikkat Edilmeli?',
        items: () => [
          'Kurulumun kolay olması',
          'Güvenlik ağının sağlamlığı',
          'Zıplama matının kalitesi',
          'Yay mekanizmasının dayanıklılığı',
          'Yağmur ve güneşe karşı dayanıklı dış kaplama',
          'Sağlam garanti desteği',
        ],
      },
      { heading: 'Güncel Fiyat Teklifi Alın', body: (c) => `${c} trambolin fiyatları modelden modele değiştiği için net bir rakam vermek doğru olmayacaktır. Size uygun trambolin modelini belirleyerek hem ihtiyacınıza hem de bütçenize en uygun seçeneği sunmak için ekibimizle iletişime geçin.` },
    ],
    cta: 'Fiyat Teklifi İste',
  },

  'sisme-oyun-parki-fiyatlari': {
    title: (c) => `${c} Şişme Oyun Parkı Fiyatları – 2026 Güncel Rehberi`,
    metaDesc: (c) => `${c} şişme oyun parkı fiyatları 2026. Boyut, model ve malzeme kalitesine göre fiyat rehberi. Doğum günü, okul etkinlikleri ve AVM için kiralama ve satış.`,
    hero: (c) => `${c} Şişme Oyun Parkı Fiyatları`,
    intro: (c) => `Çocukların eğlenceli ve güvenli bir oyun deneyimi yaşamalarını sağlayan şişme oyun parkları, son yıllarda yoğun ilgi görmeye başladı. ${c}'de doğum günü organizasyonları, okul etkinlikleri, AVM aktiviteleri ve açık hava etkinlikleri için tercih edilen bu yapılar kolay kurulumları ve geniş kullanım alanlarıyla öne çıkıyor.`,
    features: ['Farklı boyut ve model seçenekleri', 'Kiralama ve satış alternatifleri', 'Ankara\'dan hızlı teslimat', 'Montaj ve söküm hizmeti', 'EN-71 güvenlik sertifikalı ürünler'],
    sections: [
      {
        heading: 'Fiyat Nasıl Belirlenir?',
        items: (c) => [
          `Şişme Oyun Parkının Boyutu: ${c}'de küçük ev organizasyonlarından büyük ticari alanlara kadar farklı boyutlarda modeller mevcuttur. Boyut arttıkça malzeme ve nakliye maliyeti yükselir.`,
          'Model ve Tasarım Özellikleri: Kaydıraklı, tırmanma alanlı, su parkı özellikli veya temalı modeller farklı fiyat aralıklarında sunulur.',
          '2026 Standartlarına Uygun Malzeme Kalitesi: Kaliteli PVC ve benzeri malzemeler dayanıklılığı artırırken maliyeti de etkiler.',
          `Kurulum ve Nakliye Hizmetleri: ${c} içi teslimatlar genellikle daha ekonomiktir; uzak lokasyonlar farklılık gösterebilir.`,
          'Ek Güvenlik ve Aksesuarlar: Motor (blower), yedek malzeme, koruma brandası ve sabitleme aparatları pakete dahil veya ek seçenek olarak sunulabilir.',
        ],
      },
      {
        heading: 'Neden Trambolinpark\'ı Tercih Etmelisiniz?',
        items: (c) => [
          `${c}'ye hızlı teslimat ve kurulum`,
          'Yerel üretici garantisi ve teknik destek',
          'Farklı model ve bütçe seçeneklerini karşılaştırma imkânı',
          'Toplu alımlarda özel indirimler',
          'Ekonomik bakım ve onarım hizmetleri',
        ],
      },
      { heading: 'En Doğru Fiyat İçin İletişime Geçin', body: (c) => `${c} için net ve güncel fiyat bilgisi almak üzere bize ulaşın. Hem ihtiyaçlarınıza uygun ürünü belirlemek hem de bütçenize uygun çözüm bulmak için profesyonel destek alın.` },
    ],
    cta: 'Şimdi Teklif Al',
  },

  'sisme-oyun-parki-modelleri': {
    title: (c) => `${c} Şişme Oyun Parkı Modelleri – 2026 Güncel Rehber`,
    metaDesc: (c) => `${c} şişme oyun parkı modelleri 2026. Kaydıraklı, tırmanma engelli, su parkı, temalı ve mini modeller. Dayanıklı PVC, güvenlik sertifikalı ürünler.`,
    hero: (c) => `${c} Şişme Oyun Parkı Modelleri`,
    intro: (c) => `Çocukların hem eğlendiği hem de güvenli şekilde zaman geçirdiği alanlar oluşturmak isteyen kurum ve işletmeler için şişme oyun parkları, ${c}'de 2026 yılında da yoğun ilgi görmeye devam ediyor. Belediyeler, kreşler, eğlence merkezleri ve AVM'ler tarafından tercih edilen bu ürünler; dayanıklı yapıları, renkli tasarımları ve geniş kullanım alanlarıyla öne çıkıyor.`,
    features: ['Kolay kurulum ve hızlı kullanıma hazır hale gelme', 'Farklı yaş gruplarına uygun model seçenekleri', 'İç ve dış mekân kullanımı', 'Dayanıklı PVC kaplama ve güçlendirilmiş dikişler', 'Görsel çekicilik ile müşteri kazanımı'],
    sections: [
      {
        heading: 'En Çok Tercih Edilen Modeller',
        items: (c) => [
          `Kaydıraklı Şişme Park Modelleri: ${c}'de en çok tercih edilen modellerdir. Renkli ve yüksek kaydıraklarıyla çocukların enerjisini en iyi şekilde atabileceği yapılardır.`,
          'Tırmanma Engelli Şişme Parklar: Hem oyun hem spor niteliği taşır. Motor gelişimini destekleyen tırmanma bölümleri sayesinde eğitim kurumları tarafından sıkça tercih edilir.',
          'Su Parkı Şişme Modelleri: Yaz etkinliklerinde ve eğlence merkezlerinde kullanılabilir. Su geçirmez yapıları ve kaydırak bölümleriyle sezonluk etkinlikler için idealdir.',
          'Temalı Şişme Oyun Parkları: Kale, korsan gemisi, orman ve dinozor gibi temalarla üretilir. AVM ve organizasyon firmaları tarafından yoğun ilgi görür.',
          'Mini Şişme Oyun Parkları: Küçük alanlara uygun modellerdir. Kreşler, anaokulları ve iç mekân eğlence alanları için idealdir.',
        ],
      },
      {
        heading: 'Seçerken Nelere Dikkat Edilmeli?',
        items: () => [
          'Modelin kullanılacağı yaş grubuna uygunluğu',
          'PVC kalınlığı ve dikiş kalitesi',
          'Güvenlik sertifikaları (EN-71)',
          'Kullanım alanının ölçülerine uygunluk',
          'Tamir, bakım ve yedek parça desteği',
          'Kurulum ve söküm kolaylığı',
        ],
      },
      { heading: '2026 Trendleri', body: (c) => `${c}'de 2026 yılıyla birlikte tasarımlarda daha geniş oyun alanları, yüksek kaydıraklar, çoklu engel parkurları ve daha güçlü hava motorları öne çıkıyor. Su bazlı modellerde daha güvenli zemin kaplamaları ve dikkat çekici renk kombinasyonları da 2026'nın ayrılmaz parçaları arasında yer alıyor.` },
    ],
    cta: 'Model Kataloğunu İncele',
  },

  'oyun-parki-firmalari': {
    title: (c) => `${c} Oyun Parkı Firmaları – 2026 Güncel Rehberi`,
    metaDesc: (c) => `${c} oyun parkı firmaları 2026. Anaokulu, site, park ve rekreasyon alanları için ekipman temini, kurulum ve bakım hizmetleri. Ücretsiz keşif için iletişime geçin.`,
    hero: (c) => `${c} Oyun Parkı Firmaları`,
    intro: (c) => `Oyun parkları, çocukların fiziksel, sosyal ve zihinsel gelişimini destekleyen alanlardır. ${c}'de doğru ekipman ve güvenli tasarım; hem keyifli hem de emniyetli oyun ortamları yaratır.`,
    features: ['Anaokulu ve kreş ekipmanları', 'Site ve bahçe oyun parkları', 'Park ve rekreasyon alanları', 'Anahtar teslim montaj hizmeti', 'Bakım ve yedek parça desteği'],
    sections: [
      {
        heading: 'Hizmet Alanları',
        items: (c) => [
          `Anaokulu ve Kreş Oyun Alanları: ${c}'deki eğitim kurumlarına özel, yaş grubuna uygun güvenli ekipmanlar.`,
          'Site ve Bahçe Oyun Parkları: Konut projelerine özel tasarım ve kurulum.',
          'Park ve Rekreasyon Alanları: Belediye ve kamu alanları için dayanıklı dış mekan ekipmanları.',
          'Montaj ve Kurulum Hizmetleri: Anahtar teslim profesyonel kurulum.',
          'Bakım ve Onarım Hizmetleri: Periyodik kontrol, yedek parça temini ve teknik destek.',
        ],
      },
      {
        heading: 'Öne Çıkan Özellikler',
        items: () => [
          'Güvenlik odaklı tasarım (EN-1176 standartları)',
          'Geniş malzeme ve renk seçenekleri',
          'Alana özel özelleştirilebilir projeler',
          'Yerinde kurulum ve montaj desteği',
          'Uzun vadeli yedek parça temini',
        ],
      },
      {
        heading: 'Oyun Parkı Kurulumunda Dikkat Edilmesi Gerekenler',
        items: (c) => [
          `${c}'deki alanın ölçüsüne ve ihtiyaca uygun ekipman seçimi`,
          'Güvenlik sertifikaları ve belgelendirme',
          'Malzeme kalitesi ve dayanıklılık',
          'Profesyonel montaj ve kurulum',
          'Periyodik bakım planlaması',
        ],
      },
    ],
    cta: 'Ücretsiz Keşif Talep Et',
  },
};

/* ── Standalone pages ── */
type StandalonePage = {
  title: string; metaDesc: string; hero: string; intro: string;
  features: string[]; sections: { heading: string; body?: string; items?: string[] }[]; cta: string;
};

const STANDALONE: Record<string, StandalonePage> = {
  'trambolin-parklari': {
    title: 'Trambolin Parkları – Ticari Trambolin Park Ekipmanları | Trambolinpark',
    metaDesc: 'Ticari trambolin parkları için ekipman, tasarım ve kurulum hizmetleri. TP-205, TP-206, TP-207 ve daha fazla model. EN-1176 sertifikalı anahtar teslim çözümler.',
    hero: 'Trambolin Parkları',
    intro: 'Eğlence merkezleri, AVM\'ler ve rekreasyon tesisleri için profesyonel trambolin parkı çözümleri sunuyoruz. TP serisi modellerimiz EN-1176 güvenlik sertifikalıdır.',
    features: ['EN-1176 sertifikalı TP serisi modeller', 'Özel tasarım ve 3D yerleşim planı', 'Anahtar teslim kurulum', 'Personel eğitimi', 'Yedek parça ve teknik destek'],
    sections: [
      { heading: 'Ticari Trambolin Parkı Nedir?', body: 'Ticari trambolin parkları; eğlence merkezleri, AVM\'ler ve spor tesislerinde kurulan, geniş atlama alanları, foam pit bölümleri, ninja parkurları ve dodgeball sahalarından oluşan çok bölümlü eğlence kompleksleridir.' },
      { heading: 'TP Serisi Modeller', items: ['TP-205: Orta ölçek, 4–6 bölüm', 'TP-206: Geniş atlama alanı, foam pit dahil', 'TP-207: Ninja parkuru entegreli', 'TP-208: Dodgeball sahası dahil', 'TP-209: Tam kapsamlı park sistemi'] },
      { heading: 'Yatırım ve Geri Dönüş', body: 'İyi konumlandırılmış bir trambolin parkı, sektör ortalamalarına göre 24–36 ayda yatırımını amorti etmektedir. Doğum günü paketleri ve kurumsal etkinlikler ek gelir kapısı oluşturur.' },
    ],
    cta: 'Fizibilite Analizi Al',
  },
};

/* ── Parse slug ── */
function parsePage(slug: string) {
  if (STANDALONE[slug]) return { type: 'standalone' as const, data: STANDALONE[slug] };
  const cityKey = Object.keys(CITIES).find((k) => slug.startsWith(k + '-'));
  if (!cityKey) return null;
  const topic = TOPICS[slug.slice(cityKey.length + 1)];
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
    ? parsed.topic.sections.map((s) => ({
        heading: s.heading,
        body: s.body ? s.body(cityName) : undefined,
        items: s.items ? s.items(cityName) : undefined,
      }))
    : parsed.data.sections;
  const cta = parsed.type === 'city' ? parsed.topic.cta : parsed.data.cta;

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
                <h2 style={{ fontFamily: '"Poppins",sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#1a1a1a', marginBottom: '1.25rem' }}>
                  Neler Sunuyoruz?
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 10 }}>
                  {features.map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <CheckCircle2 size={16} style={{ color: '#5c9200', flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 14, color: '#333' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sections */}
              {sections.map((s) => (
                <div key={s.heading} style={{ background: '#fff', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem', border: '1px solid #e8e8e8' }}>
                  <h2 style={{ fontFamily: '"Poppins",sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#1a1a1a', marginBottom: '.75rem' }}>
                    {s.heading}
                  </h2>
                  {s.body && <p style={{ fontSize: 15, color: '#555', lineHeight: 1.8, margin: 0 }}>{s.body}</p>}
                  {s.items && (
                    <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {s.items.map((item) => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          <CheckCircle2 size={15} style={{ color: '#5c9200', flexShrink: 0, marginTop: 3 }} />
                          <span style={{ fontSize: 14.5, color: '#444', lineHeight: 1.7 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div style={{ background: '#1a1a1a', borderRadius: 16, padding: '2rem', position: 'sticky', top: 100 }}>
                <h3 style={{ fontFamily: '"Poppins",sans-serif', fontWeight: 800, fontSize: '1rem', color: '#fff', marginBottom: '.75rem' }}>
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
