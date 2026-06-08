import { thumb } from '../lib/imageUtils';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  date: string;
  coverImage: string;
  content: BlogSection[];
}

export interface BlogSection {
  type: 'heading' | 'paragraph' | 'list' | 'callout';
  text?: string;
  items?: string[];
}


const STORAGE = 'https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products';
const IMG = (file: string) => thumb(`${STORAGE}/${file}`, 800, 500);


export const blogPosts: BlogPost[] = [
  {
    slug: 'trambolin-park-yatirim-rehberi-2025',
    title: 'Trambolin Park Yatırımı: 2025 Kapsamlı Rehber',
    excerpt: 'Ticari trambolin parkı açmayı düşünüyorsanız doğru yerdesiniz. Metrekare planlamasından geri dönüş süresine, güvenlik standartlarından ekipman seçimine kadar her şey bu rehberde.',
    category: 'Yatırım & İşletme',
    readTime: 8,
    date: '2025-04-10',
    coverImage: IMG('migrated-album-trambolinparkyeni-urunler-75pLpRx6IWjwkvlu3hsd.jpg'),
    content: [
      { type: 'paragraph', text: 'Eğlence sektörü, pandemi sonrası hızla toparlanarak Türkiye\'de yılda %18 büyüme kaydetti. Bu büyümenin en dinamik kolu ticari trambolin parkları. Düşük işletme maliyeti, yüksek metrekare başı gelir ve geniş hedef kitle bu alanı cazip bir yatırım haline getiriyor.' },
      { type: 'heading', text: 'Kaç Metrekareye İhtiyacınız Var?' },
      { type: 'paragraph', text: 'Minimum uygulanabilir park için 400 m² önerilir; ancak gerçek karlılık genellikle 800–1.500 m² aralığında başlar. Net tavan yüksekliği en az 5 metre olmalı; olimpik atlama bölgelerinde 7 metre idealdir.' },
      { type: 'list', items: ['400–600 m²: Mini park, 3–5 bölüm, günlük 150–200 ziyaretçi kapasitesi', '600–1.000 m²: Orta ölçek, foam pit + dodgeball dahil, 300+ kapasite', '1.000 m² üzeri: Tam kapsamlı park, ninja kursu, kule ve kafeyle 500+ kapasite'] },
      { type: 'heading', text: 'Yatırım Geri Dönüş Süresi' },
      { type: 'paragraph', text: 'Sektör ortalamalarına göre iyi konumlandırılmış bir park 24–36 ayda yatırımını amorti eder. Bilet fiyatı, hafta sonu doluluk oranı ve çocuk doğum günü paketi satışları üç temel gelir kalemi olarak öne çıkmaktadır.' },
      { type: 'callout', text: '💡 Trambolinpark olarak ücretsiz fizibilite analizi ve 3D yerleşim planı sunuyoruz. İletişime geçin.' },
      { type: 'heading', text: 'EN-1176 Güvenlik Standardı Neden Zorunlu?' },
      { type: 'paragraph', text: 'Türkiye\'de ticari oyun ve atlama ekipmanlarında EN-1176 sertifikası yasal bir zorunluluktur. Sertifikasız ekipman kullanan parklar sigorta kapsamı dışında kalır ve kaza durumunda tam sorumluluk işletmeciye aittir.' },
    ],
  },
  {
    slug: 'trambolin-parki-guvenlik-standartlari',
    title: 'Trambolin Parkı Güvenlik Standartları: EN-1176 ve ASTM F2970 Karşılaştırması',
    excerpt: 'Dünya genelinde ticari trambolin parkları için geçerli iki ana güvenlik standardını, farklılıklarını ve Türkiye\'deki yasal gereklilikleri detaylıca inceliyoruz.',
    category: 'Güvenlik & Standartlar',
    readTime: 6,
    date: '2025-03-22',
    coverImage: IMG('migrated--3l3.jpg'),
    content: [
      { type: 'paragraph', text: 'Güvenlik standartları, trambolin parkı işletmecilerinin en sık kafa karıştırdığı konuların başında gelir. Avrupa\'da EN-1176 zorunlu iken ABD\'de ASTM F2970 esas alınır. Türkiye\'de ise AB uyum süreci kapsamında EN-1176 geçerlidir.' },
      { type: 'heading', text: 'EN-1176 Neler Kapsar?' },
      { type: 'list', items: ['Malzeme yorulma testleri (50.000 atlama siklusu)', 'Çerçeve ve bağlantı elemanı mukavemet değerleri', 'Yay koruması ve kenar güvenliği gereksinimleri', 'Zemin yumuşatma (fall zone) hesaplamaları', 'Periyodik bakım ve muayene kayıt zorunluluğu'] },
      { type: 'heading', text: 'ASTM F2970 Farkı' },
      { type: 'paragraph', text: 'ASTM standartları özellikle foam pit derinliği, ağ gerilme değerleri ve denetçi görüş alanı konularında EN-1176\'ya kıyasla daha ayrıntılı düzenlemeler içerir. ABD pazarına ihracat planlayan üreticiler her iki sertifikayı birden almanın avantajlarını değerlendirmelidir.' },
      { type: 'callout', text: '⚠️ Sigorta poliçenizi imzalamadan önce ekipman tedarikçinizin EN-1176 sertifika belgelerini mutlaka talep edin.' },
      { type: 'heading', text: 'Periyodik Bakımı Atlamayın' },
      { type: 'paragraph', text: 'Standartlar sadece satın alma anında değil, işletme boyunca geçerlidir. Yaylar 6 ayda bir, atlama yüzeyleri 3 ayda bir, bağlantı elemanları ise her ay kontrol edilmelidir. Kayıt tutma yükümlülüğü denetim sırasında sigorta şirketleri tarafından incelenir.' },
    ],
  },
  {
    slug: 'soft-play-alani-tasarim-ipuclari',
    title: 'Soft Play Alanı Tasarımında Dikkat Edilmesi Gereken 7 Kural',
    excerpt: '0–8 yaş grubuna hitap eden soft play alanları, doğru tasarlandığında hem çocuklara güvenli bir gelişim ortamı sunar hem de işletmelere yüksek geri dönüş sağlar.',
    category: 'Tasarım & Konsept',
    readTime: 5,
    date: '2025-03-05',
    coverImage: IMG('migrated-album-trambolinparkyeni-urunler-Zw8A7X6eAOlXDUI.jpg'),
    content: [
      { type: 'paragraph', text: 'Soft play alanları, küçük yaş grubuna yönelik en hızlı büyüyen eğlence segmentlerinden biri. Alışveriş merkezi içi kurulumdan bağımsız çocuk eğlence merkezlerine kadar geniş bir yelpazede uygulama alanı buluyor.' },
      { type: 'heading', text: '1. Yaş Gruplarını Birbirinden Ayırın' },
      { type: 'paragraph', text: '0–3 ve 4–8 yaş grupları için ayrı bölümler oluşturmak hem güvenlik hem de ebeveyn memnuniyeti açısından kritiktir. Küçük çocukların büyüklerden ayrışması kaza riskini %60\'a kadar azaltmaktadır.' },
      { type: 'heading', text: '2. Renk Psikolojisini Kullanın' },
      { type: 'paragraph', text: 'Canlı ve kontrast renkler çocukların motor gelişimini destekler. Sarı, turuncu ve kırmızı bölgeler enerji ve aktiviteyi teşvik ederken, mavi ve yeşil bölgeler sakinleşme alanları için idealdir.' },
      { type: 'list', items: ['Yüzey malzemesi: EN-71 sertifikalı EVA köpük veya vinil kaplama', 'Renk haslığı: En az 200 saat UV dayanımlı boyalar', 'Dikişsiz köşe geçişleri: Takılma riskini ortadan kaldırır', 'Ebeveyn gözetim hattı: Her noktanın görünür olduğu oturma düzeni', 'Temizlenebilir yüzeyler: Günlük dezenfeksiyona uygun malzeme seçimi', 'Acil çıkış bölgeleri: Her 40 m²\'de bir erişilebilir çıkış', 'Havalandırma: Saatte en az 6 hava değişimi kapasiteli sistem'] },
      { type: 'callout', text: '🎨 Ücretsiz 3D konsept çizimi için ekibimizle iletişime geçin. Mekanınızın boyutlarını gönderin, 3 iş günü içinde tasarım sunalım.' },
    ],
  },
  {
    slug: 'trambolin-parki-isletmeciligi-ipuclari',
    title: 'Trambolin Parkı İşletmeciliğinde Karlılığı Artıran 5 Strateji',
    excerpt: 'Park açmak başlangıç — onu karlı tutmak asıl iş. Fiyatlandırmadan etkinlik paketlerine, personel yönetiminden dijital pazarlamaya kadar en etkili büyüme stratejilerini derledik.',
    category: 'Yatırım & İşletme',
    readTime: 7,
    date: '2025-02-18',
    coverImage: IMG('migrated-album-trambolinparkyeni-urunler-z70rxGQ4nYF1EgfPtcUz.jpg'),
    content: [
      { type: 'paragraph', text: 'Trambolin parkı işletmecilerinin çoğu ilk yılın sonunda benzer bir sorunla karşılaşır: Hafta sonu doluluk %90\'ın üzerinde, hafta içi ise boş. Bu dengesizliği gidermek karlılığın anahtarıdır.' },
      { type: 'heading', text: '1. Dinamik Fiyatlandırma' },
      { type: 'paragraph', text: 'Hafta içi sabah seansları için 15–20% indirimli "okul sonrası" paketi oluşturun. Abonelik modeli (aylık sınırsız atlama) düzenli nakit akışı sağlar ve müşteri bağlılığını artırır.' },
      { type: 'heading', text: '2. Doğum Günü Paketleri Odak Kalem' },
      { type: 'paragraph', text: 'Sektör verilerine göre doğum günü paketleri, ortalama bilet gelirine kıyasla 4–6x daha yüksek kişi başı gelir üretir. Özel oda, pasta, animatör ve fotoğraf paketi standart bir teklif haline getirilmeli.' },
      { type: 'heading', text: '3. Okul & Kurumsal Bağlantılar' },
      { type: 'list', items: ['İlkokullara yönelik beden eğitimi programları (sabah seansı)', 'Şirket team-building etkinlikleri (kapalı park kiralama)', 'Spor kulüplerine özel antrenman paketleri', 'Yaz okulu kampları için haftalık rezervasyon anlaşmaları'] },
      { type: 'heading', text: '4. F&B ve Mağazacılık' },
      { type: 'paragraph', text: 'Çorap satışı zorunlu bir gelir kalemidir (hijyen kuralı). Kafede sağlıklı atıştırmalıklar ve paketli ürünler ekleyin. F&B, iyi yönetilen parklarda toplam gelirin %25–30\'una ulaşabilir.' },
      { type: 'heading', text: '5. Dijital Rezervasyon Sistemi' },
      { type: 'paragraph', text: 'Online rezervasyon doluluk tahminini kolaylaştırır, personel planlamasını optimize eder ve müşteri verisi toplar. Kapasite yönetimi güvenlik açısından da yasal bir gereklilik haline gelmektedir.' },
      { type: 'callout', text: '📊 Parkınızın potansiyel gelirini hesaplamak için ücretsiz fizibilite görüşmesi talep edin.' },
    ],
  },
  {
    slug: 'ankara-sisme-oyun-parki-modelleri',
    title: 'Ankara Şişme Oyun Parkı Modelleri – 2026 Güncel Rehber',
    excerpt: 'Belediyeler, kreşler, AVM\'ler ve organizasyon firmaları için 2026\'nın öne çıkan şişme oyun parkı modellerini, seçim kriterlerini ve tasarım trendlerini bu rehberde derledik.',
    category: 'Tasarım & Konsept',
    readTime: 5,
    date: '2026-01-20',
    coverImage: IMG('migrated-album-trambolinparkyeni-urunler-FOrSGnRGStPYr1Q.jpg'),
    content: [
      { type: 'paragraph', text: 'Çocukların güvenli şekilde zaman geçirdiği alanlar oluşturmak isteyen kurumlar için şişme oyun parkları, 2026 yılında da yoğun ilgi görmeye devam ediyor. Belediyeler, kreşler, eğlence merkezleri ve organizasyon firmaları; dayanıklı yapıları, renkli tasarımları ve geniş kullanım alanlarıyla öne çıkan bu ürünleri tercih ediyor.' },
      { type: 'heading', text: 'Neden Tercih Ediliyor?' },
      { type: 'paragraph', text: '2026 itibarıyla şişme oyun parkları, kullanım kolaylığı ve maliyet avantajı nedeniyle pek çok kurum için ideal bir çözüm haline geldi.' },
      { type: 'list', items: [
        'Kolay kurulur ve hızlı şekilde kullanıma hazır hale gelir',
        'Farklı yaş gruplarına hitap eden çok sayıda model seçeneğine sahiptir',
        'Hem iç hem dış mekânlarda kullanılabilir',
        'Dayanıklı PVC kaplama ve güçlendirilmiş dikişler sayesinde uzun yıllar sorunsuz hizmet verir',
        'Görsel olarak dikkat çekici olduğundan işletmelere ek müşteri kazandırır',
      ]},
      { type: 'heading', text: 'En Çok Tercih Edilen Modeller' },
      { type: 'paragraph', text: '2026 trendleri incelendiğinde öne çıkan başlıca şişme oyun parkı modelleri şunlardır:' },
      { type: 'heading', text: 'Kaydıraklı Şişme Park Modelleri' },
      { type: 'paragraph', text: 'Renkli ve yüksek kaydıraklarıyla çocukların enerjisini en iyi şekilde atabileceği modellerdir. Her yaş grubu için uygundur ve kalabalık alanlarda yoğun ilgi görür.' },
      { type: 'heading', text: 'Tırmanma Engelli Şişme Parklar' },
      { type: 'paragraph', text: 'Hem oyun hem spor niteliği taşır. Çocukların motor gelişimini destekleyen tırmanma bölümleri sayesinde eğitim kurumları tarafından sıkça tercih edilir.' },
      { type: 'heading', text: 'Su Parkı Şişme Modelleri' },
      { type: 'paragraph', text: 'Hem yaz etkinliklerinde hem eğlence merkezlerinde kullanılabilir. Su geçirmez yapıları ve kaydırak bölümleriyle sezonluk etkinlikler için en ideal modeller arasındadır.' },
      { type: 'heading', text: 'Temalı Şişme Oyun Parkları' },
      { type: 'paragraph', text: 'Kale, korsan gemisi, orman ve dinozor gibi temalarla üretilir. Özellikle AVM ve organizasyon firmaları tarafından tercih edilir; görsel açıdan dikkat çekici olduğu için işletmelere önemli avantaj sağlar.' },
      { type: 'heading', text: 'Mini Şişme Oyun Parkları' },
      { type: 'paragraph', text: 'Küçük alanlara uygun modellerdir. Kreşler, anaokulları ve iç mekân eğlence alanları için idealdir.' },
      { type: 'heading', text: 'Seçerken Nelere Dikkat Edilmeli?' },
      { type: 'list', items: [
        'Modelin kullanılacağı yaş grubuna uygunluğu',
        'PVC kalınlığı ve dikiş kalitesi',
        'Güvenlik sertifikaları',
        'Kullanım alanının ölçülerine uygunluk',
        'Tamir, bakım ve yedek parça desteği',
        'Kurulum ve söküm kolaylığı',
      ]},
      { type: 'heading', text: '2026 Trendleri' },
      { type: 'paragraph', text: '2026 yılıyla birlikte tasarımlarda daha geniş oyun alanları, yüksek kaydıraklar, çoklu engel parkurları ve daha güçlü hava motorları öne çıkıyor. Su bazlı modellerde daha güvenli zemin kaplamaları ve gelişmiş renk kombinasyonları da 2026 tasarımlarının ayrılmaz parçaları arasında yer alıyor.' },
      { type: 'callout', text: '📞 Projenize uygun modeli belirlemek için Trambolinpark uzmanlarıyla iletişime geçin. Ücretsiz danışmanlık ve 3D yerleşim planı sunuyoruz.' },
    ],
  },
  {
    slug: 'ankara-sisme-oyun-parki-fiyatlari',
    title: 'Ankara Şişme Oyun Parkı Fiyatları – 2026 Güncel Rehberi',
    excerpt: 'Şişme oyun parkı fiyatlarını etkileyen faktörler, model karşılaştırmaları ve Ankara\'daki avantajlar hakkında 2026 güncel bilgiler.',
    category: 'Yatırım & İşletme',
    readTime: 4,
    date: '2026-02-10',
    coverImage: IMG('migrated-album-trambolinparkyeni-urunler-Uqt8gLiSjgA6pon.jpg'),
    content: [
      { type: 'paragraph', text: 'Şişme oyun parkları; doğum günü organizasyonları, okul etkinlikleri, AVM aktiviteleri ve açık hava organizasyonları gibi pek çok alanda giderek yaygınlaşıyor. 2026 yılında fiyatlar; park büyüklüğü, model özellikleri ve malzeme kalitesine göre farklılık göstermektedir.' },
      { type: 'heading', text: 'Fiyatları Etkileyen Temel Faktörler' },
      { type: 'heading', text: '1. Park Büyüklüğü' },
      { type: 'paragraph', text: 'Küçük parklar ev ve küçük organizasyonlara uygunken, orta ve büyük parklar kamusal alanlarda veya ticari kullanım için tercih edilir. Büyüklük arttıkça malzeme ve nakliye maliyeti de yükselir.' },
      { type: 'heading', text: '2. Model ve Tasarım' },
      { type: 'paragraph', text: 'Parklar; kaydırak, tırmanma alanı, zıplama bölümü, su unsurları veya temalı tasarımlar içerebilir. Yazın su parkı modelleri yoğun ilgi görürken çok aktiviteli modeller daha kapsamlı bir kullanım deneyimi sunar.' },
      { type: 'heading', text: '3. Malzeme Kalitesi' },
      { type: 'paragraph', text: '2026 standartlarına uygun yüksek kaliteli PVC malzemelerin seçimi, uzun ömürlü ve güvenli kullanım açısından kritik bir faktördür. Dış mekân kullanımında UV dayanımlı malzeme tercih edilmesi önerilir.' },
      { type: 'heading', text: '4. Kurulum ve Nakliye' },
      { type: 'paragraph', text: 'Ankara içi teslimatlar genellikle ekonomiktir; Ankara dışı veya özel kurulum gerektiren projelerde nakliye ve montaj maliyetleri değişkenlik gösterebilir.' },
      { type: 'heading', text: '5. Ek Güvenlik Aksesuarları' },
      { type: 'paragraph', text: 'Hava motorları, yedek parçalar, koruyucu örtüler ve sabitleme ekipmanları pakete dahil olabilir veya ek seçenek olarak sunulabilir. Bu unsurlar toplam maliyeti etkileyen önemli kalemler arasındadır.' },
      { type: 'callout', text: '💬 Güncel fiyat bilgisi ve projenize özel teklif almak için Trambolinpark ekibiyle iletişime geçin.' },
    ],
  },
  {
    slug: 'ankara-oyun-parki-ureticileri',
    title: 'Ankara Oyun Parkı Üreticileri – 2026 Rehberi',
    excerpt: 'Ankara\'daki oyun parkı üreticilerinin üretim alanları, öne çıkan özellikleri ve doğru üretici seçiminde dikkat edilmesi gerekenler.',
    category: 'Sektör Haberleri',
    readTime: 4,
    date: '2026-02-25',
    coverImage: IMG('migrated--P4Q.jpg'),
    content: [
      { type: 'paragraph', text: 'Çocuk oyun alanları, eğlence ve gelişim açısından kritik öneme sahiptir. Bu alanlarda kullanılan ekipmanların güvenliği, dayanıklılığı ve estetiği doğru üretici seçimiyle mümkün olur. 2026 yılında Ankara oyun parkı üreticileri, farklı yaş gruplarına ve kullanım alanlarına uygun ekipmanlar üretmeye devam etmektedir.' },
      { type: 'heading', text: 'Üretim Alanları' },
      { type: 'list', items: [
        'Anaokulu ve kreş ekipmanları',
        'Site ve bahçe oyun alanları',
        'Park ve rekreasyon alanları',
        'Anahtar teslim montaj ve kurulum hizmetleri',
        'Bakım ve yedek parça desteği',
      ]},
      { type: 'heading', text: 'Öne Çıkan Özellikler' },
      { type: 'list', items: [
        'Uluslararası güvenlik standartlarına uygun üretim (EN-1176)',
        'Farklı mekânlara özel özelleştirilebilir tasarımlar',
        'Yüksek kaliteli ve dayanıklı malzeme seçenekleri',
        'Anahtar teslim kurulum ve montaj hizmeti',
        'Uzun vadeli bakım ve teknik destek',
      ]},
      { type: 'heading', text: 'Doğru Üretici Seçiminde Dikkat Edilmesi Gerekenler' },
      { type: 'list', items: [
        'Mekânın ölçülerine ve ihtiyaçlarına uygunluk',
        'Güvenlik sertifikaları ve belgelendirme',
        'Malzeme kalitesi ve dayanıklılık',
        'Kolay montaj ve kurulum imkânı',
        'Yerel üretim avantajı ve hızlı teknik destek',
      ]},
      { type: 'heading', text: 'Ankara\'da Yerel Üretimin Avantajları' },
      { type: 'paragraph', text: 'Yerelde üretim ve hizmet; hızlı teslimat, garanti kapsamında teknik destek ve ekonomik bakım hizmetleri gibi kritik avantajlar sunar. Proje gereksinimlerinize uygun ekipmanlar için uzman kadrodan destek almak, uzun vadeli bir yatırım güvencesi sağlar.' },
      { type: 'callout', text: '🏗️ Oyun alanı projeniz için profesyonel destek ve ücretsiz keşif hizmeti almak üzere Trambolinpark ile iletişime geçin.' },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find(p => p.slug === slug) ?? null;
}
