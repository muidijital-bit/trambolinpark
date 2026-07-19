const TP = 'https://trambolinpark.com';

export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  categoryName?: string;
  features?: string[];
  gallery?: string[];
}

const OLIMPiK_FEATURES = [
  'CE Belgeli Güvenli Tasarım',
  'Galvanizli Çelik İskelet (Paslanmaz)',
  '6 mm Çelik Yay — Çift Galvaniz Kaplama',
  'A-1 Kalite UV Dayanımlı PVC Yay Pedi',
  'Mantar Profil Kenar Koruması',
  'Anahtar Teslim Kurulum',
  '2 Yıl Üretici Garantisi',
];

const JUNIOR_FEATURES = [
  'CE Belgeli Güvenli Tasarım',
  '4-10 Yaş Grubuna Özel Junior Ölçü',
  'Galvanizli Çelik İskelet (Paslanmaz)',
  '6 mm Çelik Yay — Çift Galvaniz Kaplama',
  'A-1 Kalite UV Dayanımlı PVC Yay Pedi',
  'Mantar Profil Kenar Koruması',
  'Anahtar Teslim Kurulum',
  '2 Yıl Üretici Garantisi',
];

const SOFTPLAY_FEATURES = [
  'CE Belgeli Güvenli Tasarım',
  'Yangın Geciktirici (B-s1, d0) Sünger Dolgu',
  'Antibakteriyel & Yıkanabilir PVC Kaplama',
  'Yumuşak Köşe & Kenar Tasarımı',
  'Renk Garantili UV Stabilizatörlü Malzeme',
  'Modüler — Birleştirilebilir',
];

const PARK_FEATURES = [
  'CE Belgeli Anahtar Teslim Park',
  'Yüksek Yoğunluklu Sünger Havuzları',
  'Galvaniz Çelik Konstrüksiyon',
  'Profesyonel İşletme Yoğunluğu için Tasarım',
  'Modüler Genişletilebilir Plan',
  'Mimari & Teknik Çizim Hizmeti Dahil',
  '2 Yıl Üretici Garantisi',
];

const HAVUZ_FEATURES = [
  'CE Belgeli Güvenli Tasarım',
  'Yüksek Yoğunluklu Köpük Duvarlar',
  'Antibakteriyel & Yıkanabilir PVC Kaplama',
  'CE Sertifikalı 8 cm Toplar Dahil',
  'Özel Boyut ve Renk Seçeneği',
  'Anahtar Teslim Kurulum',
];

// Helper: 200x200 → 350x350 for better quality
const img = (path: string) =>
  `${TP}/${path}`.replace('/200x200/', '/350x350/');

export const allProducts: Product[] = [

  // ── TEKLİ TRAMBOLİNLER ──────────────────────────────────────
  {
    id: 'tb-tekli-1',
    title: 'Tekli Trambolin',
    description: '244 x 420 x H335 cm boyutlarında, güçlü çelik konstrüksiyon yapısıyla uzun ömürlü kullanım sağlayan ticari trambolin. UV katkılı güvenlik ağları ve yüksek yoğunluklu koruma minderleri ile maksimum güvenlik sunar.',
    imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-rv9Bx1Zt2aqGpDaGJpjH.jpg`,
    category: 'tekli-trambolinler', categoryName: 'Tekli Trambolinler',
    features: ['Boyut: 244×420×H335 cm', 'Güçlü çelik konstrüksiyon', 'UV katkılı güvenlik ağı', 'Yüksek yoğunluklu koruma minderleri', 'Özel üretim çelik yay sistemi', 'Modüler kolay kurulum'],
  },
  {
    id: 'tb-tekli-2',
    title: 'İç Mekan Trambolin',
    description: '200 x 200 x H230 cm boyutlarıyla kapalı alan işletmeleri için özel tasarlanmış trambolin. PVC kaplamalı güvenlik ağları ve darbelere karşı dayanıklı gövde yapısıyla eğlence merkezlerinde güvenli kullanım sunar.',
    imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-aWyahTLXI61Tyl8kFDEl.jpg`,
    category: 'tekli-trambolinler', categoryName: 'Tekli Trambolinler',
    features: ['Boyut: 200×200×H230 cm', 'İç mekan kullanımına uygun', 'PVC kaplamalı güvenlik ağı', 'Darbelere karşı dayanıklı gövde', 'Özel üretim çelik yay sistemi', 'Modüler kolay kurulum'],
  },
  {
    id: 'tb-tekli-3',
    title: 'Dış Mekan Trambolin',
    description: '200 x 300 x H280 cm boyutlarında dış mekan kullanımı için üretilmiş ticari trambolin. UV katkılı güvenlik ağları güneş ışınlarına ve tüm hava koşullarına karşı uzun süreli koruma sağlar.',
    imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-WTInI4C6vO2ZOLdaAE6g.jpg`,
    category: 'tekli-trambolinler', categoryName: 'Tekli Trambolinler',
    features: ['Boyut: 200×300×H280 cm', 'Dış mekan kullanımına uygun', 'UV katkılı güvenlik ağı', 'Yüksek taşıma kapasiteli zıplama ağı', 'Özel üretim çelik yay sistemi'],
  },
  {
    id: 'tb-tekli-4',
    title: '102 cm Çocuk Trambolini',
    description: 'Çocukların enerjisini sağlıklı ve eğlenceli biçimde atmasını sağlayan, ev içi ve açık alan kullanımına uygun kompakt trambolin. Kenar koruma pedi ile yaylar tamamen gizlenmiş olup kaymaz ayakları sayesinde her zeminde güvenle kullanılabilir.',
    imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-II7N6JBcpS1KZLZOAk6O.jpg`,
    category: 'tekli-trambolinler', categoryName: 'Tekli Trambolinler',
    features: ['Çap: 102 cm', 'İç ve dış mekan kullanımına uygun', 'Kaymaz ayaklar', 'Kenar koruma pedi', 'Dayanıklı metal gövde', 'Kolay kurulum ve taşıma'],
  },
  {
    id: 'tb-tekli-9',
    title: "İç Mekan 2'li Trambolin",
    description: 'Kapalı eğlence alanları için 2 kişilik iç mekan trambolini. Güçlü çelik konstrüksiyon, PVC kaplamalı koruma minderleri ve UV dayanımlı güvenlik ağlarıyla uzun ömürlü ticari kullanım sunar.',
    imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-03UxdqFQy1mlU5xTZEQc.jpg`,
    category: 'tekli-trambolinler', categoryName: 'Tekli Trambolinler',
    features: ['2 kişilik kapasite', 'İç mekan kullanımına uygun', 'Güçlü çelik konstrüksiyon', 'UV dayanımlı güvenlik ağı', 'Özel ölçülerde üretim'],
  },
  {
    id: 'tb-tekli-10',
    title: "İç Mekan 3'lü Trambolin",
    description: 'Çocuk oyun merkezleri için 3 kişilik iç mekan trampolini. Modüler tasarımı ile farklı alan konfigürasyonlarına uyum sağlar.',
    imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-z70rxGQ4nYF1EgfPtcUz.jpg`,
    category: 'tekli-trambolinler', categoryName: 'Tekli Trambolinler',
    features: ['3 kişilik kapasite', 'İç mekan kullanımına uygun', 'Modüler tasarım', 'PVC kaplamalı güvenlik ağı'],
  },
  {
    id: 'tb-tekli-11',
    title: "İç Mekan 4'lü Trambolin",
    description: 'Büyük oyun merkezleri için 4 kişilik iç mekan trampolini. Yan yana modüler yapısıyla geniş alanlarda verimli kullanım sağlar.',
    imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-75pLpRx6IWjwkvlu3hsd.jpg`,
    category: 'tekli-trambolinler', categoryName: 'Tekli Trambolinler',
    features: ['4 kişilik kapasite', 'Modüler yan yana tasarım', 'UV dayanımlı güvenlik ağı', '2 Yıl Garanti'],
  },
  {
    id: 'tb-tekli-12',
    title: "İç Mekan 6'lı Trambolin",
    description: 'Yüksek kapasiteli ticari tesisler için 6 kişilik iç mekan trampolini. Geniş zıplama yüzeyi ve dayanıklı yapısıyla yoğun kullanım ortamlarına uygundur.',
    imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-7IqBTPuyBSbrW8yD2nQm.jpg`,
    category: 'tekli-trambolinler', categoryName: 'Tekli Trambolinler',
    features: ['6 kişilik kapasite', 'Yüksek yoğunluklu koruma minderleri', 'Anahtar Teslim Kurulum'],
  },
  {
    id: 'tb-tekli-13',
    title: '240 cm Yuvarlak Trambolin',
    description: 'Bahçe, site ve açık alan oyun alanları için 240 cm çaplı yuvarlak trambolin. Güvenlik ağı, paslanmaya dayanıklı metal çerçeve ve dahil edilen merdiven ile tam donanımlı olarak teslim edilir.',
    imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-YliVTf2jGI7EUEeS6D9G.jpg`,
    category: 'tekli-trambolinler', categoryName: 'Tekli Trambolinler',
    features: ['Çap: 240 cm', 'Güvenlik ağı dahil', 'Paslanmaya dayanıklı çerçeve', 'Merdiven dahil'],
  },
  {
    id: 'tb-tekli-14',
    title: 'Dış Mekan Trambolin 2',
    description: '200 x 200 x H250 cm boyutlarında dış mekan kullanımı için üretilmiş ticari trambolin. UV katkılı güvenlik ağları ve yüksek yoğunluklu koruma minderleri ile her hava koşulunda güvenli kullanım sağlar.',
    imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-aV21Z34gSPnTk89Hn3qX.jpg`,
    category: 'tekli-trambolinler', categoryName: 'Tekli Trambolinler',
    features: ['Boyut: 200×200×H250 cm', 'Dış mekan kullanımına uygun', 'UV katkılı güvenlik ağı'],
  },

  // ── YER (ZEMİN) TRAMBOLİN ────────────────────────────────────
  {
    id: 'tb-yer-1',
    title: 'Yer Park (Zemin) Trambolin TP-12',
    description: 'Eğlence parkları ve rekreasyon alanları için zemine gömülü trambolin sistemi. Yüzey seviyesinde kurulumu sayesinde takılma ve düşme riskini minimize eder.',
    imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-nLGXYo1NzSU8VLqvA559.jpg`,
    category: 'yer-zemin-trambolin', categoryName: 'Yer (Zemin) Trambolinleri',
    features: ['Zemine gömülü sistem', 'Yüzey seviyesinde kurulum', 'Takılma riski yok', 'Dayanıklı çelik konstrüksiyon'],
  },
  {
    id: 'tb-yer-2',
    title: 'Zemin Trambolini — Standart',
    description: 'Zemine gömülü standart ölçü yer trambolini. Park, oyun alanı ve okul bahçeleri için güvenli çözüm.',
    imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-03UxdqFQy1mlU5xTZEQc.jpg`,
    category: 'yer-zemin-trambolin', categoryName: 'Yer (Zemin) Trambolinleri',
    features: ['CE Belgeli Güvenli Tasarım', 'Sıfır Düşme Yüksekliği', 'Galvanizli Çelik Çerçeve', 'UV & Don Dayanımlı PVC Pad', 'Anahtar Teslim Kurulum'],
  },
  {
    id: 'tb-yer-3',
    title: 'Zemin Olimpik Trambolin',
    description: 'Olimpik standart ölçülerde (3×5 m) zemine entegre profesyonel trambolin. Belediye parkları ve spor tesisleri için ideal.',
    imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-z70rxGQ4nYF1EgfPtcUz.jpg`,
    category: 'yer-zemin-trambolin', categoryName: 'Yer (Zemin) Trambolinleri',
    features: ['CE Belgeli Güvenli Tasarım', 'Olimpik Standart Ölçü (3×5 m)', 'Sıfır Düşme Yüksekliği', '2 Yıl Üretici Garantisi'],
  },

  // ── SALTO TRAMBOLİN ───────────────────────────────────────────
  {
    id: 'tb-salto-1',
    title: 'Salto Trambolin TP-122',
    description: 'Geniş atlama yüzeyi ve güçlü yay sistemiyle akrobatik hareketler için özel tasarlanmış ticari salto trampolini. Eğlence parkları, spor tesisleri ve trambolin parkları için ideal.',
    imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-2SbOOLt8h3RdZRameKiQ.jpg`,
    category: 'salto-trambolin', categoryName: 'Salto Trambolin',
    features: ['Model: TP-122', 'Geniş atlama yüzeyi', 'Güçlü yay sistemi', 'Akrobatik hareketlere uygun', 'Eksiksiz güvenlik donanımı'],
  },

  // ── OLİMPİK TRAMBOLİNLER (TP-110 to TP-121) ─────────────────
  { id: 'olp-110', title: '1 Kişilik Ticari Olimpik Trambolin TP-110',        description: '1 kişilik olimpik standart ölçü ticari trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar ve A-1 kalite UV dayanımlı PVC pedi.',        imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-1-kisilik-olimpik-trambolin-tp-110-EAr.jpg`,             category: 'ticari-olimpik-trambolinler', categoryName: 'Ticari Olimpik Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'olp-111', title: '2 Kişilik Ticari Olimpik Trambolin TP-111',        description: '2 kişilik olimpik standart ölçü ticari trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar ve A-1 kalite UV dayanımlı PVC pedi.',        imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-2-kisilik-olimpik-trambolin-tp-111-CMr.jpg`,             category: 'ticari-olimpik-trambolinler', categoryName: 'Ticari Olimpik Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'olp-112', title: '3 Kişilik Ticari Olimpik Trambolin TP-112',        description: '3 kişilik olimpik standart ölçü ticari trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar ve A-1 kalite UV dayanımlı PVC pedi.',        imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-3-kisilik-olimpik-trmbolin-tp-112-r2B.jpg`,             category: 'ticari-olimpik-trambolinler', categoryName: 'Ticari Olimpik Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'olp-114', title: '4 Kişilik Ticari Olimpik Trambolin TP-114',        description: '4 kişilik olimpik standart ölçü ticari trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar ve A-1 kalite UV dayanımlı PVC pedi.',        imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-4-kisilik-olimpik-trambolin-tp-114-ZUr.jpg`,             category: 'ticari-olimpik-trambolinler', categoryName: 'Ticari Olimpik Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'olp-116', title: '6 Kişilik Ticari Olimpik Trambolin TP-116',        description: '6 kişilik olimpik standart ölçü ticari trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar ve A-1 kalite UV dayanımlı PVC pedi.',        imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-6-kisilik-olimpik-trambolin-tp-116-nnc.jpg`,             category: 'ticari-olimpik-trambolinler', categoryName: 'Ticari Olimpik Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'olp-119', title: '8 Kişilik Ticari Olimpik Trambolin TP-119',        description: '8 kişilik olimpik standart ölçü ticari trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar ve A-1 kalite UV dayanımlı PVC pedi.',        imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-8-kisilik-olimpik-trambolin-tp-119-fDa.jpg`,             category: 'ticari-olimpik-trambolinler', categoryName: 'Ticari Olimpik Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'olp-120', title: '10 Kişilik Ticari Olimpik Trambolin TP-120',       description: '10 kişilik olimpik standart ölçü ticari trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar ve A-1 kalite UV dayanımlı PVC pedi.',       imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-10-kisilik-olimpik-trambolin-tp-120-6C2.jpg`,            category: 'ticari-olimpik-trambolinler', categoryName: 'Ticari Olimpik Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'olp-121', title: '12 Kişilik Ticari Olimpik Trambolin TP-121',       description: '12 kişilik olimpik standart ölçü ticari trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar ve A-1 kalite UV dayanımlı PVC pedi.',       imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-12-kisilik-olimpik-trambolin-tp-121-dx6.jpg`,            category: 'ticari-olimpik-trambolinler', categoryName: 'Ticari Olimpik Trambolinler', features: OLIMPiK_FEATURES },

  // ── PROFESYONEL (İnce Uzun serisi) ────────────────────────────
  { id: 'prof-113', title: '4 Kişilik İnce Uzun Ticari Olimpik Trambolin TP-113', description: '4 kişilik ince ve uzun gövde tasarımlı olimpik trambolin. Dar koridorlar veya sıralı kullanım için idealdir.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-4-kisilik-ince-uzun-olimpik-trambolin-tp-113-CZK.jpg`, category: 'profesyonel-trambolin', categoryName: 'Profesyonel Trambolin', features: OLIMPiK_FEATURES },
  { id: 'prof-115', title: '5 Kişilik İnce Uzun Ticari Olimpik Trambolin TP-115', description: '5 kişilik ince ve uzun gövde tasarımlı olimpik trambolin. Dar koridorlar veya sıralı kullanım için idealdir.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-5-kisilik-ince-uzun-olimpik-trambolin-tp-115-JCZ.jpg`, category: 'profesyonel-trambolin', categoryName: 'Profesyonel Trambolin', features: OLIMPiK_FEATURES },
  { id: 'prof-117', title: '6 Kişilik İnce Uzun Ticari Olimpik Trambolin TP-117', description: '6 kişilik ince ve uzun gövde tasarımlı olimpik trambolin. Dar koridorlar veya sıralı kullanım için idealdir.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-6-kisilik-ince-uzun-olimpik-trambolin-tp-117-y6M.jpg`, category: 'profesyonel-trambolin', categoryName: 'Profesyonel Trambolin', features: OLIMPiK_FEATURES },
  { id: 'prof-118', title: '8 Kişilik İnce Uzun Ticari Olimpik Trambolin TP-118', description: '8 kişilik ince ve uzun gövde tasarımlı olimpik trambolin. Dar koridorlar veya sıralı kullanım için idealdir.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-8-kisilik-ince-uzun-olimpik-trmbolin-tp-118-TI6.jpg`, category: 'profesyonel-trambolin', categoryName: 'Profesyonel Trambolin', features: OLIMPiK_FEATURES },

  // ── TİCARİ JUNİOR TRAMBOLİN (TP-101 to TP-109) ───────────────
  { id: 'jnr-101', title: 'Ticari Junior Trambolin 1 Kişilik TP-101', description: '4-10 yaş grubuna özel 1 kişilik ticari junior trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar ve A-1 kalite UV dayanımlı PVC pedi ile profesyonel işletmelerde uzun yıllar dayanır.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-iIxeQoNoJpXNWUDa2qja.jpg`, category: 'ticari-junior', categoryName: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },
  { id: 'jnr-102', title: 'Ticari Junior Trambolin 2 Kişilik TP-102', description: '4-10 yaş grubuna özel 2 kişilik ticari junior trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar ve A-1 kalite UV dayanımlı PVC pedi.',                                           imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-uF2UnUuAh1bf2J1iMfCI.jpg`, category: 'ticari-junior', categoryName: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },
  { id: 'jnr-103', title: 'Ticari Junior Trambolin 3 Kişilik TP-103', description: '4-10 yaş grubuna özel 3 kişilik ticari junior trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar ve A-1 kalite UV dayanımlı PVC pedi.',                                           imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-awreZiFS6HgnlAlUL4o7.jpg`, category: 'ticari-junior', categoryName: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },
  { id: 'jnr-104', title: 'Ticari Junior Trambolin 4 Kişilik TP-104', description: '4-10 yaş grubuna özel 4 kişilik ticari junior trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar ve A-1 kalite UV dayanımlı PVC pedi.',                                           imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-8DdbBFHKZfe6mRffgxKH.jpg`, category: 'ticari-junior', categoryName: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },
  { id: 'jnr-105', title: 'Ticari Junior Trambolin 5 Kişilik TP-105', description: '4-10 yaş grubuna özel 5 kişilik ticari junior trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar ve A-1 kalite UV dayanımlı PVC pedi.',                                           imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-Vi637h7t1JeE4CdEtTEP.jpg`, category: 'ticari-junior', categoryName: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },
  { id: 'jnr-106', title: 'Ticari Junior Trambolin 6 Kişilik TP-106', description: '4-10 yaş grubuna özel 6 kişilik ticari junior trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar ve A-1 kalite UV dayanımlı PVC pedi.',                                           imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-oyGMLheQbx9Oyrreu1Wd.jpg`, category: 'ticari-junior', categoryName: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },
  { id: 'jnr-107', title: 'Ticari Junior Trambolin 8 Kişilik TP-107', description: '4-10 yaş grubuna özel 8 kişilik ticari junior trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar ve A-1 kalite UV dayanımlı PVC pedi.',                                           imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-RlqryWIgvYG1SGlW0CGU.jpg`, category: 'ticari-junior', categoryName: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },
  { id: 'jnr-108', title: 'Ticari Junior Trambolin 10 Kişilik TP-108', description: '4-10 yaş grubuna özel 10 kişilik ticari junior trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar ve A-1 kalite UV dayanımlı PVC pedi.',                                          imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-IhbCWRutyIJ8IjtNFWZv.jpg`, category: 'ticari-junior', categoryName: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },
  { id: 'jnr-109', title: 'Ticari Junior Trambolin 12 Kişilik TP-109', description: '4-10 yaş grubuna özel 12 kişilik ticari junior trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar ve A-1 kalite UV dayanımlı PVC pedi.',                                          imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-tp02bhOB1ZaoJgTrfv0e.jpg`, category: 'ticari-junior', categoryName: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },

  // ── TRAMBOLİN PARKLARI (TP-205 to TP-209) ────────────────────
  { id: 'tp-205', title: 'Trambolin Park TP-205', description: 'Profesyonel anahtar teslim trambolin park kurulumu. Zıplama yüzeyleri, sünger havuzu ve aktivite modülleriyle tam kapsamlı eğlence merkezi. Ticari kullanıma uygun dayanıklı yapı.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated--VkT.jpg`, category: 'trambolin-parklari', categoryName: 'Trambolin Parkları', features: PARK_FEATURES },
  { id: 'tp-206', title: 'Trambolin Park TP-206', description: 'Profesyonel anahtar teslim trambolin park kurulumu. Zıplama yüzeyleri, sünger havuzu ve aktivite modülleriyle tam kapsamlı eğlence merkezi.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated--ymA.jpg`, category: 'trambolin-parklari', categoryName: 'Trambolin Parkları', features: PARK_FEATURES },
  { id: 'tp-207', title: 'Trambolin Park TP-207', description: 'Profesyonel anahtar teslim trambolin park kurulumu. Zıplama yüzeyleri, sünger havuzu ve aktivite modülleriyle tam kapsamlı eğlence merkezi.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated--lk6.jpg`, category: 'trambolin-parklari', categoryName: 'Trambolin Parkları', features: PARK_FEATURES },
  { id: 'tp-208', title: 'Trambolin Park TP-208', description: 'Profesyonel anahtar teslim trambolin park kurulumu. Zıplama yüzeyleri, sünger havuzu ve aktivite modülleriyle tam kapsamlı eğlence merkezi.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated--3l3.jpg`, category: 'trambolin-parklari', categoryName: 'Trambolin Parkları', features: PARK_FEATURES },
  { id: 'tp-209', title: 'Trambolin Park TP-209', description: 'Profesyonel anahtar teslim trambolin park kurulumu. Zıplama yüzeyleri, sünger havuzu ve aktivite modülleriyle tam kapsamlı eğlence merkezi.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated--P4Q.jpg`, category: 'trambolin-parklari', categoryName: 'Trambolin Parkları', features: PARK_FEATURES },

  // ── KÜÇÜK TOP HAVUZLARI (TP-311 to TP-319) ───────────────────
  { id: 'th-311', title: 'Top Havuzu TP-311', description: 'Ticari kullanıma uygun top havuzu. Yüksek yoğunluklu köpük duvarlar, antibakteriyel PVC kaplama ve CE sertifikalı toplarla uzun ömürlü eğlence.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated--Wao.png`, category: 'kucuk-top-havuzlari', categoryName: 'Küçük Top Havuzları', features: HAVUZ_FEATURES },
  { id: 'th-312', title: 'Top Havuzu TP-312', description: 'Ticari kullanıma uygun top havuzu. Yüksek yoğunluklu köpük duvarlar, kolay temizlenebilir PVC kaplama ile hijyenik kullanım.',                           imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated--WbD.jpg`, category: 'kucuk-top-havuzlari', categoryName: 'Küçük Top Havuzları', features: HAVUZ_FEATURES },
  { id: 'th-313', title: 'Top Havuzu TP-313', description: 'Eğlence merkezi ve oyun alanları için kompakt top havuzu. Dayanıklı malzemeleri ve kurumsal renk tercihlerine göre özelleştirilebilir.',                imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated--JvF.jpg`, category: 'kucuk-top-havuzlari', categoryName: 'Küçük Top Havuzları', features: HAVUZ_FEATURES },
  { id: 'th-314', title: 'Top Havuzu TP-314', description: 'Orta ölçekli işletmeler için ticari top havuzu. Dayanıklı yapı ve güvenli tasarımıyla oyun merkezlerinde güvenle kullanılır.',                                imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated--I6R.jpg`, category: 'kucuk-top-havuzlari', categoryName: 'Küçük Top Havuzları', features: HAVUZ_FEATURES },
  { id: 'th-315', title: 'Top Havuzu TP-315', description: 'Orta ölçekli işletmeler için tasarlanmış ticari top havuzu. Büyük eğlence merkezleri ve alışveriş merkezi oyun alanlarında kullanıma uygun.',               imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated--uET.jpg`, category: 'isletmelere-top-havuzlari', categoryName: 'İşletmelere Top Havuzları', features: HAVUZ_FEATURES },
  { id: 'th-316', title: 'Top Havuzu TP-316', description: 'Yüksek kapasiteli işletmeler için geniş orta boy ticari top havuzu. Uzun ömürlü PVC malzeme ile yoğun kullanıma dayanıklı.',                                imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated--Zwu.jpg`, category: 'isletmelere-top-havuzlari', categoryName: 'İşletmelere Top Havuzları', features: HAVUZ_FEATURES },
  { id: 'th-317', title: 'Top Havuzu TP-317', description: 'Ticari eğlence sektörü için üretilmiş orta boy top havuzu. Farklı renk ve dekor seçenekleriyle mekâna uygun özelleştirme imkânı.',                           imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated--xwg.jpg`, category: 'isletmelere-top-havuzlari', categoryName: 'İşletmelere Top Havuzları', features: HAVUZ_FEATURES },
  { id: 'th-318', title: 'Top Havuzu TP-318', description: 'Eğlence merkezi ve AVM oyun alanları için geniş kapasiteli ticari top havuzu. Kolay temizlenebilir PVC kaplamasıyla yoğun kullanıma dayanıklı.',               imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated--lcb.jpg`, category: 'isletmelere-top-havuzlari', categoryName: 'İşletmelere Top Havuzları', features: HAVUZ_FEATURES },
  { id: 'th-319', title: 'Top Havuzu TP-319', description: 'Büyük ticari tesisler için büyük boy top havuzu çözümü. Antibakteriyel yüzey kaplaması ve modüler yapısıyla farklı alan ölçülerine uyarlanabilir.',             imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated--9H4.jpg`, category: 'isletmelere-top-havuzlari', categoryName: 'İşletmelere Top Havuzları', features: HAVUZ_FEATURES },

  // ── SOFT PLAY OYUN ALANLARI (TP-501 to TP-516) ───────────────
  { id: 'sp-501', title: 'Softplay Park TP-501', description: 'Profesyonel modüler soft play oyun sistemi. Tırmanma, kaydırak, tünel ve engel parkuru modülleriyle tam kapsamlı oyun alanı kurulumu.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-kjgxoxbLjL8vG5l.jpg`,        category: 'softplay-oyun-alanlari', categoryName: 'Softplay Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-502', title: 'Softplay Park TP-502', description: 'Profesyonel modüler soft play oyun sistemi. Tırmanma, kaydırak, tünel ve engel parkuru modülleriyle tam kapsamlı oyun alanı kurulumu.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-FV3OamzHMw8iR61.jpg`,         category: 'softplay-oyun-alanlari', categoryName: 'Softplay Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-503', title: 'Softplay Park TP-503', description: 'Profesyonel modüler soft play oyun sistemi. Tırmanma, kaydırak, tünel ve engel parkuru modülleriyle tam kapsamlı oyun alanı kurulumu.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-4IgH4UwNDa1tQMs.jpg`,          category: 'softplay-oyun-alanlari', categoryName: 'Softplay Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-504', title: 'Softplay Park TP-504', description: 'Profesyonel modüler soft play oyun sistemi. Tırmanma, kaydırak, tünel ve engel parkuru modülleriyle tam kapsamlı oyun alanı kurulumu.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-Uqt8gLiSjgA6pon.jpg`,          category: 'softplay-oyun-alanlari', categoryName: 'Softplay Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-505', title: 'Softplay Park TP-505', description: 'Orta ölçekli eğlence tesisleri için ideal soft play oyun kompleksi. Farklı yaş gruplarına hitap eden çok katlı oyun modülleri.',                         imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-hlsMpXHkFC2OtM2.jpg`,          category: 'softplay-oyun-alanlari', categoryName: 'Softplay Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-506', title: 'Softplay Park TP-506', description: 'Profesyonel modüler soft play oyun sistemi. Tırmanma, kaydırak, tünel ve engel parkuru modülleriyle tam kapsamlı oyun alanı.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-Zw8A7X6eAOlXDUI.jpg`,           category: 'softplay-oyun-alanlari', categoryName: 'Softplay Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-507', title: 'Softplay Park TP-507', description: 'Profesyonel modüler soft play oyun sistemi. Tırmanma, kaydırak, tünel ve engel parkuru modülleriyle tam kapsamlı oyun alanı.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-FOrSGnRGStPYr1Q.jpg`,           category: 'softplay-oyun-alanlari', categoryName: 'Softplay Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-508', title: 'Softplay Park TP-508', description: 'Profesyonel modüler soft play oyun sistemi. Tırmanma, kaydırak, tünel ve engel parkuru modülleriyle tam kapsamlı oyun alanı.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-6X8kFJZaOfKasT6ACtsq.jpg`,     category: 'softplay-oyun-alanlari', categoryName: 'Softplay Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-509', title: 'Softplay Park TP-509', description: 'Profesyonel modüler soft play oyun sistemi. Tırmanma, kaydırak, tünel ve engel parkuru modülleriyle tam kapsamlı oyun alanı.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-HaI00mz3PCBnGYjI9VTw.jpg`,     category: 'softplay-oyun-alanlari', categoryName: 'Softplay Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-510', title: 'Softplay Park TP-510', description: 'Büyük ölçekli eğlence merkezleri için kapsamlı soft play sistemi. Modüler yapısı sayesinde mekâna göre şekillendirilebilir.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-DiDyhtrFKkUfRPMIVQfZ.jpg`,    category: 'softplay-oyun-alanlari', categoryName: 'Softplay Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-511', title: 'Softplay Park TP-511', description: 'Profesyonel modüler soft play oyun sistemi. Tırmanma, kaydırak, tünel ve engel parkuru modülleriyle tam kapsamlı oyun alanı.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-CV0fkQbGBCPiKPxdibD8.jpg`,     category: 'softplay-oyun-alanlari', categoryName: 'Softplay Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-512', title: 'Softplay Park TP-512', description: 'Profesyonel modüler soft play oyun sistemi. Tırmanma, kaydırak, tünel ve engel parkuru modülleriyle tam kapsamlı oyun alanı.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-C0EDMD8dwVJvy0R4X5R7.jpg`,     category: 'softplay-oyun-alanlari', categoryName: 'Softplay Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-513', title: 'Softplay Park TP-513', description: 'Profesyonel modüler soft play oyun sistemi. Tırmanma, kaydırak, tünel ve engel parkuru modülleriyle tam kapsamlı oyun alanı.', imageUrl: img('media/image/200x200/album$trambolinparkyeni$urunler$26E2DwCER87NlCZWt9xy.jpeg'),     category: 'softplay-oyun-alanlari', categoryName: 'Softplay Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-514', title: 'Softplay Park TP-514', description: 'Profesyonel modüler soft play oyun sistemi. Tırmanma, kaydırak, tünel ve engel parkuru modülleriyle tam kapsamlı oyun alanı.', imageUrl: img('media/image/200x200/album$trambolinparkyeni$urunler$9gkhOB1Z4GYmdwJro1xf.jpeg'),     category: 'softplay-oyun-alanlari', categoryName: 'Softplay Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-515', title: 'Softplay Park TP-515', description: 'Profesyonel modüler soft play oyun sistemi. Tırmanma, kaydırak, tünel ve engel parkuru modülleriyle tam kapsamlı oyun alanı.', imageUrl: img('media/image/200x200/album$trambolinparkyeni$urunler$p99DPKG8R8FY4k3qu5Lz.jpeg'),     category: 'softplay-oyun-alanlari', categoryName: 'Softplay Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-516', title: 'Softplay Park TP-516', description: 'Geniş alanlara sahip büyük eğlence tesisleri için üretilmiş kapsamlı soft play oyun kompleksi.', imageUrl: img('media/image/200x200/album$trambolinparkyeni$urunler$1lv1MIWxeLn03m4P0m60.jpeg'),              category: 'softplay-oyun-alanlari', categoryName: 'Softplay Oyun Alanları', features: SOFTPLAY_FEATURES },

  // ── SOFT PLAY OYUNCAKLAR (TP-701 to TP-710) ──────────────────
  { id: 'spo-701', title: 'Softplay Oyuncak TP-701', description: 'Profesyonel soft play oyun modülü. Yangın geciktirici sünger dolgu ve antibakteriyel PVC kaplama ile güvenli eğlence.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-s6Bcp58tu0R1QqNuYB8h.jpg`, category: 'softplay-oyuncaklar', categoryName: 'Softplay Oyuncaklar', features: SOFTPLAY_FEATURES },
  { id: 'spo-702', title: 'Softplay Oyuncak TP-702', description: 'Profesyonel soft play oyun modülü. Yangın geciktirici sünger dolgu ve antibakteriyel PVC kaplama ile güvenli eğlence.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-OpqDW9FeOghTbAgqvWkX.jpg`, category: 'softplay-oyuncaklar', categoryName: 'Softplay Oyuncaklar', features: SOFTPLAY_FEATURES },
  { id: 'spo-703', title: 'Softplay Oyuncak TP-703', description: 'Profesyonel soft play oyun modülü. Yangın geciktirici sünger dolgu ve antibakteriyel PVC kaplama ile güvenli eğlence.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-2rtSfbXiwWL2WH4ZXwgE.jpg`, category: 'softplay-oyuncaklar', categoryName: 'Softplay Oyuncaklar', features: SOFTPLAY_FEATURES },
  { id: 'spo-704', title: 'Softplay Oyuncak TP-704', description: 'Profesyonel soft play oyun modülü. Yangın geciktirici sünger dolgu ve antibakteriyel PVC kaplama ile güvenli eğlence.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-nZBxckmTLiMLC5KDBnLH.jpg`, category: 'softplay-oyuncaklar', categoryName: 'Softplay Oyuncaklar', features: SOFTPLAY_FEATURES },
  { id: 'spo-705', title: 'Softplay Oyuncak TP-705', description: 'Profesyonel soft play oyun modülü. Yangın geciktirici sünger dolgu ve antibakteriyel PVC kaplama ile güvenli eğlence.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-LqX89w1cUC1dDTaVNaZt.jpg`, category: 'softplay-oyuncaklar', categoryName: 'Softplay Oyuncaklar', features: SOFTPLAY_FEATURES },
  { id: 'spo-706', title: 'Softplay Oyuncak TP-706', description: 'Profesyonel soft play oyun modülü. Yangın geciktirici sünger dolgu ve antibakteriyel PVC kaplama ile güvenli eğlence.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-qVu1R9nM8UwXFNZa57tq.jpg`, category: 'softplay-oyuncaklar', categoryName: 'Softplay Oyuncaklar', features: SOFTPLAY_FEATURES },
  { id: 'spo-707', title: 'Softplay Oyuncak TP-707', description: 'Profesyonel soft play oyun modülü. Yangın geciktirici sünger dolgu ve antibakteriyel PVC kaplama ile güvenli eğlence.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-WdFUzhrV0xhJtkwspR4i.jpg`, category: 'softplay-oyuncaklar', categoryName: 'Softplay Oyuncaklar', features: SOFTPLAY_FEATURES },
  { id: 'spo-708', title: 'Softplay Oyuncak TP-708', description: 'Profesyonel soft play oyun modülü. Yangın geciktirici sünger dolgu ve antibakteriyel PVC kaplama ile güvenli eğlence.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-GKlADat6LXJdlWuo9bhL.jpg`, category: 'softplay-oyuncaklar', categoryName: 'Softplay Oyuncaklar', features: SOFTPLAY_FEATURES },
  { id: 'spo-709', title: 'Softplay Oyuncak TP-709', description: 'Profesyonel soft play oyun modülü. Yangın geciktirici sünger dolgu ve antibakteriyel PVC kaplama ile güvenli eğlence.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-xGwjAvJWQWRWZyedusxW.jpg`, category: 'softplay-oyuncaklar', categoryName: 'Softplay Oyuncaklar', features: SOFTPLAY_FEATURES },
  { id: 'spo-710', title: 'Ring Trambolin TP-710', description: 'Modüler ring trambolin oyun ünitesi. Çocuklar için güvenli ve eğlenceli ring içinde zıplama deneyimi. Soft play alanlarına entegre edilebilir.', imageUrl: `https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated-album-trambolinparkyeni-urunler-wkjhik4aTZucboHfYpXs.jpg`, category: 'softplay-oyuncaklar', categoryName: 'Softplay Oyuncaklar', features: SOFTPLAY_FEATURES },

];

export const trambolinler = allProducts.filter(p => [
  'tekli-trambolinler', 'yer-zemin-trambolin', 'salto-trambolin',
  'ticari-olimpik-trambolinler', 'ticari-junior', 'profesyonel-trambolin',
].includes(p.category));

export const topHavuzlari = allProducts.filter(p => [
  'softplay-oyuncaklar', 'kucuk-top-havuzlari', 'isletmelere-top-havuzlari', 'softplay-oyun-alanlari',
].includes(p.category));
