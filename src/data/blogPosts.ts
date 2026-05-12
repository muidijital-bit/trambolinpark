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


const GAL = 'https://matrax-web-six.vercel.app/images/galeri-yeni';

export const blogPosts: BlogPost[] = [
  {
    slug: 'trambolin-park-yatirim-rehberi-2025',
    title: 'Trambolin Park Yatırımı: 2025 Kapsamlı Rehber',
    excerpt: 'Ticari trambolin parkı açmayı düşünüyorsanız doğru yerdesiniz. Metrekare planlamasından geri dönüş süresine, güvenlik standartlarından ekipman seçimine kadar her şey bu rehberde.',
    category: 'Yatırım & İşletme',
    readTime: 8,
    date: '2025-04-10',
    coverImage: `${GAL}/galeri-1.jpg`,
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
    coverImage: `${GAL}/galeri-6.jpg`,
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
    coverImage: `${GAL}/galeri-22.jpg`,
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
    coverImage: `${GAL}/galeri-8.jpg`,
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
];

export function getBlogPost(slug: string) {
  return blogPosts.find(p => p.slug === slug) ?? null;
}
