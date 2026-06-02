import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Phone, ChevronRight } from 'lucide-react';
import NotFound from './NotFound';

/* ── Cities ── */
const CITIES: Record<string, string> = {
  ankara: 'Ankara',
  istanbul: 'İstanbul',
  izmir: 'İzmir',
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
  'softplay': {
    title: (c) => `${c} Softplay – Softplay Üretim ve Kurulum 2026`,
    metaDesc: (c) => `${c} softplay ekipmanları 2026. Kreş, anaokulu, AVM ve eğlence merkezi için yerli üretim softplay sistemleri. Özel tasarım, CE sertifikalı, anahtar teslim.`,
    hero: (c) => `${c} Softplay`,
    intro: (c) => `${c}'deki kreş, anaokulu ve eğlence merkezleri için özel ölçü ve tasarımda softplay ekipmanları üretip kuruyoruz. CE sertifikalı malzemeler, yerli üretim kalitesi ve anahtar teslim montaj hizmetiyle projenizi hayata geçiriyoruz.`,
    features: ['Yerli üretim, CE sertifikalı', 'Özel ölçü ve tema tasarımı', 'Kaydırak, tünel, tırmanma bölümleri', 'Top havuzu entegrasyonu', 'Satış sonrası bakım desteği'],
    sections: [
      { heading: 'Softplay Çeşitleri', items: (c) => [`Klasik Softplay: ${c}'de en yaygın model. Kaydırak, tünel, tırmanma köprüsü ve top havuzu.`, 'Tematik Softplay: Orman, uzay, deniz altı gibi özel temalı tasarımlar.', 'İnteraktif Softplay: Dokunmatik ve sesli panelli modern modeller.', 'Outdoor Softplay: UV ve neme dayanıklı dış mekân versiyonları.'] },
      { heading: 'Proje Süreci', items: () => ['Ücretsiz keşif ve ölçüm', '3D tasarım ve müşteri onayı', 'CE sertifikalı üretim (3–6 hafta)', 'Anahtar teslim kurulum', 'Garanti ve bakım sözleşmesi'] },
    ],
    cta: 'Softplay Teklifi Al',
  },

  'oyun-parki': {
    title: (c) => `${c} Oyun Parkı – Çocuk Oyun Parkı Kurulumu 2026`,
    metaDesc: (c) => `${c} oyun parkı kurulumu ve ekipmanları 2026. Anaokulu, site, AVM ve rekreasyon alanları için güvenli oyun parkı tasarımı ve montajı.`,
    hero: (c) => `${c} Oyun Parkı`,
    intro: (c) => `${c}'de anaokulu, konut sitesi, belediye parkı ve alışveriş merkezleri için oyun parkı tasarlıyor, üretiyor ve kuruyoruz. EN-1176 sertifikalı ekipmanlarımız ve profesyonel montaj hizmetimizle çocukların güvenli, renkli oyun alanlarını yaratıyoruz.`,
    features: ['Anaokulu ve kreş ekipmanları', 'Site ve bahçe oyun parkları', 'Park ve rekreasyon alanları', 'Anahtar teslim montaj', 'Bakım ve yedek parça desteği'],
    sections: [
      { heading: 'Hizmet Alanlarımız', items: (c) => [`Anaokulu ve Kreş: ${c}'deki eğitim kurumlarına özel yaş grubuna uygun ekipmanlar`, 'Konut Siteleri: Bahçe ve ortak alan oyun parkları', 'Belediye Parkları: Dış mekan dayanıklı ekipmanlar', 'AVM ve Eğlence Merkezleri: İç mekân aktivite alanları'] },
      { heading: 'Standartlar', items: () => ['EN-1176 oyun ekipmanı standardı', 'EN-1177 zemin emniyet standardı', 'CE uygunluk belgesi', 'Periyodik güvenlik denetim raporu'] },
    ],
    cta: 'Oyun Parkı Keşfi İste',
  },

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

  'top-havuzu': {
    title: (c) => `${c} Top Havuzu – Çocuk Oyun Alanları için Top Havuzu Modelleri 2026`,
    metaDesc: (c) => `${c} top havuzu modelleri 2026. Kreş, anaokulu, AVM ve eğlence merkezi için güvenli top havuzu çeşitleri. Fiyat teklifi için iletişime geçin.`,
    hero: (c) => `${c} Top Havuzu`,
    intro: (c) => `Top havuzları, çocukların motor becerilerini geliştiren, eğlenceli ve güvenli oyun alanlarıdır. ${c}'de kreşlerden alışveriş merkezlerine kadar pek çok alanda tercih edilen top havuzları; dayanıklı PVC yapısı, yumuşak zemin kaplaması ve estetik tasarımıyla öne çıkmaktadır.`,
    features: ['Esnek boyut ve şekil seçenekleri', 'Yumuşak top ve zemin kaplaması', 'Dayanıklı PVC çerçeve', 'Kolay montaj ve demontaj', 'CE sertifikalı güvenli malzemeler'],
    sections: [
      { heading: 'Top Havuzu Neden Tercih Edilir?', body: (c) => `${c}'de anaokulu, kreş ve oyun merkezlerinde top havuzu; çocukların denge, koordinasyon ve fiziksel gelişimine katkı sağlar. Aynı zamanda ebeveynler için çocuklarını güvenle bırakabilecekleri denetimli bir alan sunar.` },
      {
        heading: 'Top Havuzu Modelleri',
        items: (c) => [
          `Kare Top Havuzu: ${c}'de en sık tercih edilen modeldir, köşeli tasarımı mekân içi yerleşime uygundur.`,
          'Yuvarlak Top Havuzu: Merkezi görünümü ve akıcı tasarımıyla AVM ve açık alanlara uygun.',
          'Tematik Top Havuzu: Kalp, yıldız, karikatür figür gibi şekillerde özelleştirilebilir.',
          'Modüler Top Havuzu: Farklı bölümler eklenerek büyütülebilen, esnek yapılı model.',
        ],
      },
      { heading: 'Seçerken Nelere Dikkat Etmeli?', items: () => ['Topu olmayan havuz tehlikelidir — top sayısı ve kalitesi önemli', 'PVC kalınlığı ve köşe dikişleri dayanıklılığı belirler', 'Zemin matının yumuşaklığı ve kalınlığı çocuk güvenliğini etkiler', 'CE / EN-71 güvenlik belgesi olmalı', 'Bakım kolaylığı ve temizlenebilir yüzey tercih edilmeli'] },
    ],
    cta: 'Top Havuzu Teklifi Al',
  },

  'buyuk-top-havuzu': {
    title: (c) => `${c} Büyük Top Havuzu – Ticari ve Kurumsal Modeller 2026`,
    metaDesc: (c) => `${c} büyük top havuzu modelleri. AVM, eğlence merkezi ve büyük oyun parkları için ticari top havuzu çözümleri. Özel ölçü ve tasarım.`,
    hero: (c) => `${c} Büyük Top Havuzu`,
    intro: (c) => `${c}'de ticari amaçlı kullanılan büyük top havuzları; yüksek kapasiteli PVC çerçeve, bol top ve geniş oyun alanıyla dikkat çeker. Eğlence merkezi, trambolin park ve alışveriş merkezi projelerinde vazgeçilmez bir bölüm oluşturur.`,
    features: ['Yüksek kapasiteli ticari modeller', 'Özel ölçü ve renk seçenekleri', 'Dayanıklı endüstriyel PVC kaplama', 'Kolay temizlik sistemi', 'Anahtar teslim kurulum'],
    sections: [
      { heading: 'Büyük Top Havuzunu Kimler Tercih Eder?', items: (c) => [`AVM ve eğlence merkezleri: ${c}'deki büyük alışveriş merkezleri için geniş alanlı modeller`, 'Trambolin parklar: Foam pit bölümleriyle entegre büyük havuzlar', 'Otel ve tatil köyleri: Çocuk eğlence alanı için özel modeller', 'Belediye ve rekreasyon alanları: Açık hava etkinlik alanları için'] },
      { heading: 'Teknik Özellikler', items: () => ['Minimum 6 m² — maksimum sınırsız alan', 'PVC duvar kalınlığı: 650–850 g/m²', 'Zemin matı: 6–10 cm yumuşak köpük', 'Top çapı: 6–7 cm plastik veya yumuşak model', 'Renk ve tasarım tamamen özelleştirilebilir'] },
      { heading: 'Kurulum ve Teslimat', body: (c) => `${c} ve çevresine anahtar teslim kurulum hizmetimizle büyük top havuzunuzu en kısa sürede hazır hale getiriyoruz. Profesyonel montaj ekibimiz teslimat sonrası güvenlik testini de gerçekleştirir.` },
    ],
    cta: 'Ticari Teklif Al',
  },

  'softplay-uretimi': {
    title: (c) => `${c} Softplay Üretimi – Yerli Üretici ile Özel Softplay Tasarımı 2026`,
    metaDesc: (c) => `${c} softplay üretimi ve kurulumu. Özel tasarım, yerli üretim softplay ekipmanları. Anaokulu, kreş, AVM ve eğlence merkezi projeleri için fiyat teklifi.`,
    hero: (c) => `${c} Softplay Üretimi`,
    intro: (c) => `Trambolinpark olarak ${c} başta olmak üzere Türkiye genelinde softplay ekipmanlarını yerli üretim anlayışıyla tasarlıyor ve üretiyoruz. Tünel, kaydırak, tırmanma bölümü, top havuzu ve köpük engel parkurlarından oluşan softplay sistemlerimiz her yaş grubuna hitap eder.`,
    features: ['%100 yerli üretim', 'Özel ölçü ve temaya göre tasarım', 'CE / EN-71 sertifikalı malzemeler', 'Anahtar teslim kurulum', 'Yedek parça ve bakım garantisi'],
    sections: [
      { heading: 'Softplay Üretim Süreci', items: () => ['Proje keşfi ve ölçüm: Alana özel yerleşim planı hazırlanır', 'Tasarım onayı: 3D görselleştirme ile müşteri onayı alınır', 'Üretim: CE sertifikalı köpük, kumaş ve çelik aksamlarla üretim', 'Kalite kontrol: Her ürün sevk öncesi güvenlik testinden geçirilir', 'Kurulum: Profesyonel montaj ekibiyle anahtar teslim'] },
      { heading: 'Neden Yerli Üretim?', items: () => ['Döviz riskinden bağımsız fiyatlama', 'Hızlı yedek parça temini', 'Türk güvenlik ve oyun standartlarına tam uyumluluk', 'Yerinde teknik destek ve servis', 'Özel renk ve logo baskısı imkânı'] },
      { heading: 'Referanslar', body: (c) => `${c} ve çevre illerdeki anaokulu zincirleri, AVM'ler ve eğlence merkezleri için tamamladığımız projelerin detaylarını görüşmek üzere bize ulaşabilirsiniz.` },
    ],
    cta: 'Üretim Teklifi Al',
  },

  'softplay-gruplari': {
    title: (c) => `${c} Softplay Grupları – Modüler Softplay Sistemleri 2026`,
    metaDesc: (c) => `${c} softplay grupları ve modüler oyun sistemleri. Küçük, orta ve büyük gruplar için fiyat seçenekleri. Anaokulu ve eğlence merkezi projeleri.`,
    hero: (c) => `${c} Softplay Grupları`,
    intro: (c) => `Softplay grupları; tünel, kaydırak, top havuzu, tırmanma köprüsü ve engel parkurundan oluşan modüler oyun sistemleridir. ${c}'de projenizin alanına ve bütçesine göre hazır gruplar arasından seçim yapabilir ya da özel kombinasyon oluşturabilirsiniz.`,
    features: ['Starter (küçük) gruplar', 'Mid (orta) gruplar', 'Pro (büyük) gruplar', 'Özel kombinasyon tasarımı', 'Modüler genişleme imkânı'],
    sections: [
      {
        heading: 'Softplay Grup Seçenekleri',
        items: (c) => [
          `Starter Grup (15–25 m²): ${c}'deki kreş ve anaokulları için ideal başlangıç paketi. Kaydırak, tünel ve mini top havuzu içerir.`,
          'Mid Grup (25–50 m²): Orta ölçekli eğlence alanları için. Çok katlı kule, geniş kaydırak ve engel bölümü eklenmiştir.',
          'Pro Grup (50 m²+): AVM ve büyük eğlence merkezleri için. Tam kapsamlı softplay deneyimi, interaktif paneller ve büyük top havuzu dahil.',
          'Özel Kombinasyon: İhtiyaçlarınıza göre sıfırdan tasarlanmış modüler sistem.',
        ],
      },
      { heading: 'Hangi Grup Size Uygun?', body: (c) => `${c}'deki alanınızın m² ölçüsünü ve günlük kullanıcı kapasitesini belirleyerek doğru grubu seçebilirsiniz. Ekibimiz ücretsiz keşif hizmetiyle en uygun kombinasyonu sizin için planlar.` },
    ],
    cta: 'Gruplara Göre Fiyat Al',
  },

  'softplay-cesitleri': {
    title: (c) => `${c} Softplay Çeşitleri – Tüm Softplay Modelleri 2026`,
    metaDesc: (c) => `${c} softplay çeşitleri 2026. Tematik softplay, klasik softplay, interaktif softplay ve outdoor modeller. Güvenli, sertifikalı oyun ekipmanları.`,
    hero: (c) => `${c} Softplay Çeşitleri`,
    intro: (c) => `Softplay ekipmanları; yumuşak dolgu, kaplanmış köpük ve esnek çerçevelerden üretilerek çocukların güvenle oynamasını sağlar. ${c}'de yaş grubu, alan büyüklüğü ve bütçeye göre birbirinden farklı softplay çeşitleri mevcuttur.`,
    features: ['Klasik softplay setleri', 'Tematik softplay (orman, uzay, deniz)', 'İnteraktif dijital panelli modeller', 'Outdoor / dış mekan softplay', 'Mini softplay (ev tipi)'],
    sections: [
      {
        heading: 'Başlıca Softplay Çeşitleri',
        items: (c) => [
          `Klasik Softplay: ${c}'de en yaygın model. Kaydırak, tünel, tırmanma köprüsü ve top havuzundan oluşur.`,
          'Tematik Softplay: Orman macerası, uzay yolculuğu, deniz altı gibi temalarda özelleştirilmiş tasarımlar.',
          'İnteraktif Softplay: Dokunmatik paneller, sesli ve ışıklı bölümlerle zenginleştirilmiş modern modeller.',
          'Outdoor Softplay: UV ve neme dayanıklı malzemeyle üretilmiş dış mekân versiyonları.',
          'Mini Softplay: Ev, apartman ortak alanı ve küçük kreşler için kompakt tasarımlar.',
        ],
      },
      { heading: 'Softplay Seçerken Dikkat Edilmesi Gerekenler', items: () => ['Kullanılacak yaş grubuna uygunluk (0–3 / 3–7 / 7+ yaş)', 'Alan ölçüleri ve çift katlı olup olmayacağı', 'İç mekân mı dış mekân mı kullanılacak', 'Bakım kolaylığı ve temizlenebilir kaplama', 'CE sertifikası ve güvenlik belgeleri'] },
    ],
    cta: 'Softplay Kataloğunu İncele',
  },

  'ticari-trambolin': {
    title: (c) => `${c} Ticari Trambolin – Profesyonel Trambolin Sistemleri 2026`,
    metaDesc: (c) => `${c} ticari trambolin sistemleri 2026. Eğlence merkezi, AVM ve trambolin park için EN-1176 sertifikalı profesyonel trambolin çözümleri.`,
    hero: (c) => `${c} Ticari Trambolin`,
    intro: (c) => `${c}'de eğlence merkezi, AVM, spor salonu ve trambolin park projelerinde kullanılan ticari trambolinler; yüksek taşıma kapasitesi, EN-1176 güvenlik sertifikası ve uzun ömürlü yapısıyla ev tipi modellerden belirgin biçimde ayrılır.`,
    features: ['EN-1176 güvenlik sertifikası', 'Yüksek taşıma kapasitesi (120–150 kg/kişi)', 'Galvanizli çelik çerçeve', 'Profesyonel yay sistemi', 'Anahtar teslim kurulum ve garanti'],
    sections: [
      { heading: 'Ticari Trambolin ile Ev Tipi Arasındaki Fark', items: () => ['Çerçeve kalınlığı: Ticari modeller en az 2× daha kalın çelik kullanır', 'Yay sayısı ve kalitesi: Daha fazla ve daha güçlü yaylarla uzun ömür', 'Güvenlik belgesi: EN-1176 zorunludur, ev tipi için isteğe bağlı', 'Taşıma kapasitesi: Günlük yoğun kullanıma dayanıklı', 'Bakım kolaylığı: Modüler yedek parça sistemi'] },
      { heading: 'Hangi İşletmeler Tercih Eder?', items: (c) => [`Trambolin parklar: ${c}'deki büyük eğlence kompleksleri için`, 'AVM aktivite alanları: Kısa süreli eğlence odaklı yerleşimler', 'Spor salonları: Fitness ve jimnastik odaklı kullanım', 'Okul ve kreşler: Çocukların motor gelişimine katkı sağlayan kurumsal projeler'] },
      { heading: 'Teknik Destek ve Garanti', body: (c) => `${c} ve Türkiye genelinde anahtar teslim kurulum, yıllık bakım sözleşmesi ve orijinal yedek parça teminini garantiliyoruz.` },
    ],
    cta: 'Ticari Teklif Al',
  },

  'olimpik-trambolin': {
    title: (c) => `${c} Olimpik Trambolin – FIG Onaylı Profesyonel Trambolin 2026`,
    metaDesc: (c) => `${c} olimpik trambolin modelleri. FIG onaylı, yarışma düzeyinde trambolin sistemleri. Spor kulübü, jimnastik salonu ve milli takım antrenman tesisleri için.`,
    hero: (c) => `${c} Olimpik Trambolin`,
    intro: (c) => `Olimpik trambolin, Uluslararası Jimnastik Federasyonu (FIG) standartlarına uygun, yarışma düzeyinde performans için tasarlanmış profesyonel bir spor ekipmanıdır. ${c}'deki jimnastik kulüpleri, spor salonları ve antrenman merkezleri için doğru olimpik trambolin seçimi kritik önem taşır.`,
    features: ['FIG / Uluslararası standart uyumu', 'Geniş atlama yüzeyi (5×3 m)', 'Yüksek esneklikli yay sistemi', 'Güvenlik düşme matları (spot matı)', 'Profesyonel kurulum ve sertifikasyon'],
    sections: [
      { heading: 'Olimpik Trambolin Özellikleri', items: () => ['Atlama yüzeyi: 5×3 m standart ölçü', 'Yükseklik: En az 1,15 m (FIG şartnamesi)', 'Yay sayısı: 110 adet (standart)', 'Çerçeve: Galvanizli veya kaplı çelik', 'Ek güvenlik: Spot matı ve yan güvenlik minderler zorunlu'] },
      { heading: 'Kimler İçin Uygundur?', items: (c) => [`${c}'deki jimnastik kulüpleri ve spor akademileri`, 'Beden eğitimi altyapısı güçlü okullar', 'Milli takım antrenman merkezleri', 'Profesyonel sporcuların bireysel antrenmanı'] },
      { heading: 'Kurulum ve Zemin Gereksinimleri', body: (c) => `${c}'de olimpik trambolin kurulumu için tavan yüksekliği minimum 8 m, alan boyutu ise en az 8×5 m olmalıdır. Zemin gereksinimlerini ve doğru model seçimini belirlemek için teknik ekibimizle iletişime geçebilirsiniz.` },
    ],
    cta: 'Olimpik Trambolin Teklifi Al',
  },

  'trambolin-park': {
    title: (c) => `${c} Trambolin Park – Ticari Trambolin Park Kurulumu 2026`,
    metaDesc: (c) => `${c} trambolin park kurulumu 2026. Anahtar teslim trambolin park tasarımı, ekipman temini ve işletme danışmanlığı. Fizibilite analizi için iletişime geçin.`,
    hero: (c) => `${c} Trambolin Park`,
    intro: (c) => `${c}'de trambolin park açmak isteyenler için anahtar teslim çözümler sunuyoruz. Serbest atlama alanları, foam pit, dodgeball sahası, ninja parkuru ve çocuk bölümünden oluşan tam kapsamlı trambolin park sistemleri tasarlar ve kurarız.`,
    features: ['Fizibilite ve alan analizi', '3D yerleşim planı', 'Anahtar teslim kurulum', 'EN-1176 sertifikalı ekipmanlar', 'İşletme ve personel eğitimi'],
    sections: [
      {
        heading: 'Trambolin Park Bölümleri',
        items: () => [
          'Serbest Atlama Alanı: Birden fazla trambolin yan yana, açık atlama bölümü',
          'Foam Pit: Köpük dolu çukur, akrobasi ve hava hareketleri için güvenli düşüş alanı',
          'Dodgeball Sahası: Grup oyunları için yere yerleşik trambolin sahası',
          'Ninja Parkuru: Denge, güç ve hız gerektiren tırmanma engel parkuru',
          'Çocuk Bölümü: 6 yaş altı için özel mini trambolin ve softplay entegrasyonu',
        ],
      },
      { heading: 'Yatırım ve Süreç', body: (c) => `${c}'de trambolin park yatırımı için önce fizibilite analizi yapılır, alan ölçümü ve ruhsat gereksinimlerine bakılır. Tasarım onayından kuruluma kadar tüm süreç ortalama 6–10 haftada tamamlanır.` },
      { heading: 'Geri Dönüş Süresi', body: () => 'Sektör ortalamalarına göre iyi konumlandırılmış bir trambolin park, 24–36 ayda yatırımını amorti eder. Doğum günü paketleri, kurumsal etkinlikler ve üyelik sistemleri ek gelir kapısı oluşturur.' },
    ],
    cta: 'Fizibilite Analizi Al',
  },

  'trambolin-sistemleri': {
    title: (c) => `${c} Trambolin Sistemleri – Modüler Trambolin Çözümleri 2026`,
    metaDesc: (c) => `${c} trambolin sistemleri ve modüler trambolin parkı çözümleri. Atlama zemin, duvar trambolinleri, foam pit ve eğim trambolinleri. Teklif alın.`,
    hero: (c) => `${c} Trambolin Sistemleri`,
    intro: (c) => `Modern trambolin parkları tek tip atlama alanından ibaret değildir. ${c}'de kurulan trambolin sistemleri; yerden trambolinler, duvara gömülü atlama panelleri, eğimli trambolin kanalları ve foam pit gibi birbirini tamamlayan modüler bileşenlerden oluşur.`,
    features: ['Zemin trambolinleri (flush floor)', 'Duvar trambolinleri', 'Eğim trambolinleri (angled)', 'Foam pit entegrasyonu', 'Modüler genişleme imkânı'],
    sections: [
      {
        heading: 'Trambolin Sistemi Bileşenleri',
        items: (c) => [
          `Zemin Trampolinleri (Flush Floor): ${c}'deki trambolin parklarda en yaygın model. Zemin hizasına gömülü, kesintisiz atlama deneyimi sunar.`,
          'Duvar Trambolinleri: Duvarlar boyunca yerleştirilen eğimli paneller. Duvardan sekme ve akrobasi hareketlerine olanak tanır.',
          'Eğim Trambolinleri: Farklı açılarda konumlandırılmış trambolin kanalları, ileri düzey kullanıcılar için.',
          'Foam Pit Entegrasyonu: Atlama kanalının sonuna bağlanan köpük dolu güvenli düşüş alanı.',
        ],
      },
      { heading: 'Sistem Tasarımı', body: (c) => `${c}'deki projeniz için alanın boyutuna, hedef kitleye ve bütçeye göre optimize edilmiş trambolin sistemi tasarımı hazırlıyoruz. 3D çizim ve CAD dosyaları ile kurulum öncesi görselleştirme sunuyoruz.` },
    ],
    cta: 'Sistem Teklifi Al',
  },

  'trambolin-ureticisi': {
    title: (c) => `${c} Trambolin Üreticisi – Yerli Trambolin Üretimi 2026`,
    metaDesc: (c) => `${c} trambolin üreticisi. Türkiye'nin deneyimli yerli trambolin üreticisi Trambolinpark ile tanışın. Özel tasarım, CE sertifikalı üretim ve anahtar teslim kurulum.`,
    hero: (c) => `${c} Trambolin Üreticisi`,
    intro: (c) => `Trambolinpark, Ankara merkezli yerli trambolin üreticisi olarak ${c} başta olmak üzere Türkiye genelinde ticari ve bireysel projelere hizmet vermektedir. Kendi atölyemizde üretilen trambolinler CE güvenlik sertifikalıdır ve yedek parça desteğiyle birlikte teslim edilir.`,
    features: ['Yerli üretim, ithal malzeme kalitesi', 'CE / EN sertifikalı ürünler', 'Özel boyut ve tasarım', 'Anahtar teslim montaj', 'Türkiye geneli servis ağı'],
    sections: [
      { heading: 'Üretim Kapasitesi ve Süreç', items: () => ['Çelik çerçeve: TIG kaynak, galvaniz kaplama', 'Yay üretimi: Yüksek karbonlu çelik, 10 000+ çevrim testi', 'Atlama yüzeyi: UV dayanımlı polipropilen dokuma', 'Güvenlik ağı: Polyester örgü, UV stabilizatörlü', 'Kalite kontrol: Her ürün yük ve esneklik testinden geçer'] },
      { heading: 'Neden Yerli Üretici?', items: (c) => [`${c}'e hızlı teslimat`, 'Döviz kuru riskinden bağımsız fiyat', 'Orijinal yedek parçaya anında erişim', 'Türkiye standartlarına tam uyum', 'Yerinde teknik servis garantisi'] },
    ],
    cta: 'Üretici ile İletişime Geç',
  },

  'softplay-yedek-parca': {
    title: (c) => `${c} Softplay Yedek Parça – Orijinal Softplay Parçaları 2026`,
    metaDesc: (c) => `${c} softplay yedek parça temini. Orijinal köpük dolgu, kaplama kumaşı, tünel, kaydırak ve bağlantı elemanları. Hızlı teslimat ve uygun fiyat.`,
    hero: (c) => `${c} Softplay Yedek Parça`,
    intro: (c) => `Softplay ekipmanlarının uzun ömürlü kalması için periyodik bakım ve yedek parça değişimi şarttır. ${c}'deki softplay işletmeleri için orijinal köpük dolgu, kaplama kumaşı, tünel borusu, kaydırak bölümü ve tüm bağlantı elemanlarını stoktan temin ediyoruz.`,
    features: ['Orijinal köpük dolgu ve yenileme', 'Kaplama kumaşı değişimi', 'Tünel ve boru sistemleri', 'Kaydırak bölümleri', 'Bağlantı ve sabitleme elemanları'],
    sections: [
      {
        heading: 'En Çok Aranan Yedek Parçalar',
        items: () => [
          'Köpük Dolgu (Rebond Foam): Zamanla sertleşen köpüklerin yenilenmesi',
          'Kaplama Kumaşı: Yırtık veya solmuş yüzeylerin orijinal renk eşleşmesiyle değişimi',
          'Tünel Boru ve Bağlantıları: Eklem yerlerinde aşınan parçaların değişimi',
          'Kaydırak Bölümü: Çizik veya kırık kaydırak panellerinin değişimi',
          'Cırt-Cırt ve Fermuarlı Kapaklar: Kapak sistemlerinin tamiri ve yenilenmesi',
          'Plastik Toplar: Top havuzu toplarının yenilenmesi',
        ],
      },
      { heading: 'Bakım Sözleşmesi', body: (c) => `${c}'deki işletmeniz için yıllık bakım sözleşmesiyle düzenli kontrol, erken arıza tespiti ve öncelikli yedek parça temini sunuyoruz. Bakım sözleşmesi ekipman ömrünü %40'a kadar uzatır.` },
    ],
    cta: 'Yedek Parça Sipariş Et',
  },

  'oyun-parki-yedek-parcalari': {
    title: (c) => `${c} Oyun Parkı Yedek Parçaları – Orijinal Ekipman Parçaları 2026`,
    metaDesc: (c) => `${c} oyun parkı yedek parçaları. Kaydırak, salıncak, tırmanma sistemi ve trambolin yedek parçaları. Hızlı teslimat, uygun fiyat, garanti.`,
    hero: (c) => `${c} Oyun Parkı Yedek Parçaları`,
    intro: (c) => `${c}'deki oyun parkı ekipmanlarının güvenli kalması için düzenli bakım ve zamanında yedek parça değişimi hayati önem taşır. Trambolinpark olarak kaydıraktan tırmanma sistemine, trambolinden softplay ekipmanlarına kadar geniş bir yedek parça yelpazesi sunuyoruz.`,
    features: ['Kaydırak bölümleri ve bağlantıları', 'Salıncak zincirleri ve oturma yerleri', 'Trambolin yay ve atlama yüzeyleri', 'Softplay köpük ve kaplama', 'Çelik çerçeve ve bağlantı elemanları'],
    sections: [
      {
        heading: 'Ürün Kategorilerine Göre Yedek Parçalar',
        items: (c) => [
          `Trambolin Yedek Parçaları: ${c}'de en sık aranan parçalardır. Yay, atlama yüzeyi, güvenlik ağı ve çerçeve bağlantı elemanları stokta mevcuttur.`,
          'Softplay Yedek Parçaları: Köpük dolgu, kaplama kumaşı, tünel ve kaydırak panelleri.',
          'Şişme Park Yedek Parçaları: PVC yama kiti, hava motoru, emniyet ipi ve bağlantı elemanları.',
          'Kaydırak ve Dış Mekan Yedek Parçaları: Polietilen kaydırak panelleri, çelik boru ve galvanizli bağlantılar.',
        ],
      },
      { heading: 'Sipariş ve Teslimat', body: (c) => `${c} ve Türkiye genelinde kargo veya kurye ile hızlı teslimat sağlıyoruz. Ürün kodunuzu veya fotoğrafını göndererek uyumlu yedek parçayı tespit etmemize yardımcı olabilirsiniz.` },
    ],
    cta: 'Yedek Parça Sor',
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
  'top-havuzu': {
    title: 'Top Havuzu – Türkiye Geneli Top Havuzu Modelleri | Trambolinpark',
    metaDesc: 'Türkiye genelinde top havuzu üretimi ve kurulumu. Kreş, anaokulu, AVM ve eğlence merkezi için güvenli top havuzu çeşitleri. Fiyat teklifi alın.',
    hero: 'Top Havuzu',
    intro: 'Top havuzları çocukların motor becerilerini geliştiren, eğlenceli ve güvenli oyun köşeleridir. Kreş, anaokulu, alışveriş merkezi ve eğlence merkezleri için farklı boyut ve renk seçenekleriyle top havuzu üretip kuruyoruz.',
    features: ['Esnek boyut ve şekil seçenekleri', 'Yumuşak top ve zemin kaplaması', 'Dayanıklı PVC çerçeve', 'CE sertifikalı güvenli malzemeler', 'Anahtar teslim kurulum'],
    sections: [
      { heading: 'Top Havuzu Modelleri', items: ['Kare Top Havuzu: En sık tercih edilen klasik model', 'Yuvarlak Top Havuzu: AVM ve açık alanlara uygun', 'Tematik Top Havuzu: Özel şekil ve karakter tasarımı', 'Modüler Top Havuzu: Bölüm ekleyerek büyütülebilir'] },
      { heading: 'Kullanım Alanları', items: ['Kreş ve anaokulları', 'Alışveriş merkezi aktivite alanları', 'Trambolin ve eğlence parkları', 'Otel çocuk kulüpleri', 'Belediye rekreasyon alanları'] },
      { heading: 'Teknik Özellikler', items: ['PVC duvar kalınlığı: 650–850 g/m²', 'Zemin matı: 6–10 cm yumuşak köpük', 'Top çapı: 6–7 cm plastik', 'EN-71 güvenlik belgeli', 'Temizlenebilir antimikrobiyal kaplama'] },
    ],
    cta: 'Top Havuzu Teklifi Al',
  },

  'turkiye-geneli-top-havuzu': {
    title: 'Türkiye Geneli Top Havuzu – Üretim ve Kurulum | Trambolinpark',
    metaDesc: 'Türkiye\'nin her iline top havuzu üretimi ve kurulum hizmeti. Ankara merkezli üretim, Türkiye geneli anahtar teslim montaj ve satış sonrası destek.',
    hero: 'Türkiye Geneli Top Havuzu',
    intro: "Ankara'daki üretim tesisimizden Türkiye'nin her iline top havuzu üretip kuruyoruz. İstanbul'dan Trabzon'a, İzmir'den Diyarbakır'a kadar anahtar teslim teslimat ve montaj hizmetimizle projenizi hayata geçiriyoruz.",
    features: ['81 ile teslimat ve kurulum', 'Yerli üretim, uygun fiyat', 'CE sertifikalı malzeme', 'Hızlı proje teslimi', 'Satış sonrası bakım desteği'],
    sections: [
      { heading: 'Türkiye Genelinde Hizmet Verdiğimiz İller', items: ['Marmara: İstanbul, Tekirdağ, Edirne, Kocaeli, Bursa, Balıkesir', 'Ege: İzmir, Manisa, Aydın, Muğla, Denizli', 'Akdeniz: Antalya, Adana, Mersin, Hatay', 'İç Anadolu: Ankara, Konya, Kayseri, Eskişehir', 'Karadeniz: Samsun, Trabzon, Ordu', 'Doğu ve Güneydoğu: Gaziantep, Diyarbakır, Erzurum'] },
      { heading: 'Neden Bizi Tercih Etmelisiniz?', items: ['Ankara merkezli yerli üretim', 'Döviz riskinden bağımsız fiyat', 'Türkiye geneli servis ağı', 'Orijinal yedek parça garantisi', 'Proje başlangıcından teslimata tek muhatap'] },
    ],
    cta: 'İliniz için Teklif Alın',
  },

  'turkiye-softplay': {
    title: 'Türkiye\'de Softplay – Yerli Softplay Üreticisi | Trambolinpark',
    metaDesc: 'Türkiye\'de softplay üretimi ve kurulumu. Ankara merkezli yerli üretim, CE sertifikalı softplay ekipmanları. Tüm illere teslimat ve anahtar teslim montaj.',
    hero: 'Türkiye\'de Softplay',
    intro: "Trambolinpark olarak Türkiye genelinde softplay ekipmanı üretip kuruyoruz. Ankara'daki tesisimizde CE sertifikalı malzemelerle üretilen softplay sistemlerimiz; anaokulu, kreş, AVM ve eğlence merkezi projelerine anahtar teslim olarak teslim edilir.",
    features: ['Yerli üretim, CE sertifikalı', 'Özel ölçü ve tema tasarımı', '81 ile teslimat', 'Bakım ve yedek parça desteği', 'Rekabetçi fiyat, kaliteli işçilik'],
    sections: [
      { heading: 'Softplay Nedir?', body: 'Softplay; yumuşak köpük, kaplanmış PVC ve esnek çerçevelerden oluşan, çocukların güvenle tırmanıp, kayıp, zıplayıp oynayabildiği kapalı alan oyun sistemleridir. Klasik softplay, tematik softplay ve interaktif modeller olarak üçe ayrılır.' },
      { heading: 'Türkiye\'den Referans Projeler', items: ['AVM aktivite alanları (İstanbul, Ankara, İzmir)', 'Anaokulu ve kreş zincirleri (ulusal ölçekli)', 'Otel çocuk kulüpleri (Antalya, Muğla)', 'Belediye oyun parkları (Ankara, Konya, Bursa)'] },
      { heading: 'Proje Süreci', items: ['1. Ücretsiz keşif ve ölçüm', '2. 3D tasarım ve onay', '3. Üretim (3–6 hafta)', '4. Anahtar teslim kurulum', '5. Garanti ve bakım desteği'] },
    ],
    cta: 'Softplay Projesi Başlat',
  },

  'trambolin': {
    title: 'Trambolin – Profesyonel Trambolin Üreticisi | Trambolinpark',
    metaDesc: 'Trambolinpark — Türkiye\'nin trambolin üreticisi. Ev tipi, ticari ve olimpik trambolin modelleri. CE sertifikalı, anahtar teslim kurulum. Fiyat teklifi alın.',
    hero: 'Trambolin',
    intro: 'Trambolinpark olarak Türkiye genelinde ev tipi, ticari ve olimpik trambolin üretimi yapıyoruz. Güvenlik öncelikli tasarımlarımız, CE ve EN-1176 sertifikalarıyla hem bireysel hem kurumsal kullanıcılara hitap eder.',
    features: ['Ev tipi ve ticari modeller', 'Olimpik ve jimnastik modelleri', 'CE / EN-1176 sertifikalı', 'Geniş yedek parça stoku', 'Türkiye geneli kurulum'],
    sections: [
      {
        heading: 'Trambolin Türleri',
        items: [
          'Ev Tipi Trambolin: Güvenlik ağlı, kompakt, aile bahçesi için',
          'Ticari Trambolin: Yüksek kapasite, EN-1176 sertifikalı, park ve eğlence merkezi için',
          'Olimpik Trambolin: FIG standartları, yarışma ve antrenman için',
          'Mini Trambolin: Jumping Fitness, ev ve spor salonu için',
          'Trambolin Park Sistemi: Modüler zemin trambolinleri, duvar ve eğim panelleri',
        ],
      },
      { heading: 'Güvenlik', items: ['EN-1176 (ticari) ve EN-71 (ev) standartları', 'Yüksek UV dayanımlı atlama yüzeyi', 'Çift katlı güvenlik ağı dikişi', 'Yük testi: 1,5× nominal kapasite', 'Periyodik bakım rehberi ile teslim'] },
      { heading: 'Satın Alma ve Kurulum', body: 'Ürün seçiminden kuruluma kadar tüm süreçte yanınızdayız. Ücretsiz keşif, teknik danışmanlık ve anahtar teslim montaj ile trambolininizi en kısa sürede kullanıma hazır hale getiriyoruz.' },
    ],
    cta: 'Trambolin Teklifi Al',
  },

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
              <ol className="breadcrumb mb-0" style={{ fontSize: 12, opacity: .7, color: 'rgba(255,255,255,.7)' }}>
                <li className="breadcrumb-item"><Link to="/" style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>Ana Sayfa</Link></li>
                <li className="breadcrumb-item active" style={{ color: '#fff' }}>{hero}</li>
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
              <a href="tel:+903129112787" className="btn fw-bold d-flex align-items-center gap-2"
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
                <a href="tel:+903129112787" className="btn w-100 d-flex align-items-center justify-content-center gap-2"
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
