const MX = 'https://matrax-web-six.vercel.app';
const TP = 'https://trambolinpark.com';

export type SparePart = {
  key: string;
  title: string;
  desc: string;
  image?: string;
  gallery?: string[];
};

export type PartCategory = {
  key: string;
  title: string;
  short: string;
  cover: string;
  icon: string;
  items: SparePart[];
};

export const spareCategories: PartCategory[] = [
  {
    key: 'trambolin-yaylari',
    title: 'Trambolin Yayları',
    short: '8,5 cm — 28 cm arası galvaniz çelik yaylar. Yuvarlak ve kare kesit seçenekleri.',
    cover: `${MX}/images/yedek-parca/yay-25cm.png`,
    icon: '🔩',
    items: [
      { key: 'yay-85-kare',  title: '8,5 cm Kare Kesit Yay',            desc: 'Çocuk parkları ve junior trambolinler için kısa, sert yay. Galvaniz çelik, paslanmaz.',   image: `${MX}/images/yedek-parca/yay-85cm-kare.png` },
      { key: 'yay-15',       title: '15 cm Yuvarlak Yay',               desc: 'Junior ve mid-size trambolinler için orta sertlikte standart yay.',                       image: `${MX}/images/yedek-parca/yay-15cm.png` },
      { key: 'yay-15-kare',  title: '15 cm Kare Kesit Yay',             desc: 'Yüksek esneklik dayanımlı kare kesit, pro işletmeler için tercih edilir.',               image: `${MX}/images/yedek-parca/yay-15cm-kare.png` },
      { key: 'yay-18',       title: '18 cm Yuvarlak Yay',               desc: 'Olimpik trambolinler için orta-uzun seri standart yay.',                                  image: `${MX}/images/yedek-parca/yay-18cm.png` },
      { key: 'yay-20-kare',  title: '20 cm Kare Kesit Yay',             desc: 'Olimpik ticari trambolinler için kare kesit yüksek dayanımlı yay.',                      image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$chAZQZMg5X9ke4lSvxVx.jpg` },
      { key: 'yay-22',       title: '22 cm Yuvarlak Yay',               desc: 'Ticari olimpik trambolinler için 22 cm galvaniz çelik yuvarlak yay. Orta-uzun seri.',   image: `${TP}/album/trambolinparkyeni/urunler/D5zm4LhjhgfrjDS0CdSl.jpg` },
      { key: 'yay-25',       title: '25 cm Yuvarlak Yay',               desc: 'Profesyonel olimpik trambolinler için uzun seri esnek yay.',                              image: `${TP}/album/trambolinparkyeni/urunler/pJlCEealmxLOh37ysU7Z.jpg` },
      { key: 'yay-28-kare',  title: '28 cm Kare Kesit Yay',             desc: 'En uzun seri kare kesit yay — ağır kullanım olimpik sahalar için.',                       image: `${MX}/images/yedek-parca/yay-28cm-kare.png` },
      { key: 'yay-cekme',    title: 'Trambolin Yayı Çekme Aparatı',    desc: 'Yay takıp çıkartmak için kaymaz kavramalı pratik T-aparat. Kurulum ve servis seti.' },
      { key: 'yay-kanca',    title: 'Step Trambolin Yay Kanca Tutacağı', desc: 'Step trambolin yaylarının kasaya bağlandığı paslanmaz çelik kanca tutacağı. Yoğun ticari kullanıma uygun.' },
    ],
  },
  {
    key: 'koruma-padi',
    title: 'Trambolin Koruma Padleri',
    short: 'Yay ve çerçeve bölgesi PVC kaplı yüksek yoğunluk sünger pedler. Tüm ölçülere özel.',
    cover: `${MX}/images/yedek-parca/pad-real-1.jpg`,
    icon: '🛡️',
    items: [
      { key: 'pad-yuvarlak', title: 'Yuvarlak Trambolin Padi',    desc: 'Yuvarlak tip ev/junior trambolinler için A1 PVC kaplı UV dayanımlı pad.',                        image: `${MX}/images/yedek-parca/pad-real-1.jpg` },
      { key: 'pad-olimpik',  title: 'Olimpik Trambolin Padi',     desc: 'Olimpik (kare/dikdörtgen) ticari trambolinlere özel kesim, çift dikiş kenar koruma.',             image: `${MX}/images/yedek-parca/pad-real-2.jpg` },
      { key: 'pad-zemin',    title: 'Zemin Trambolin Padi',       desc: 'Zemin tip trambolinler için ince kesit kalın sünger dolgu tek modül pad.',                         image: `${MX}/images/yedek-parca/pad-real-3.jpg` },
      { key: 'pad-mantar',   title: 'Mantar Profil Kenar Koruma', desc: 'Tepe çubuğu/direk kapak süngeri — siyah PVC kaplı, kayar geçmeli.',                              image: `${MX}/images/yedek-parca/aksesuar-2.jpg` },
    ],
  },
  {
    key: 'koruma-filesi',
    title: 'Koruma Filesi & Zıplama Ağı',
    short: 'UV stabilizatörlü polietilen koruma fileleri ve örme zıplama ağı.',
    cover: `${MX}/images/yedek-parca/file-real-1.jpg`,
    icon: '🕸️',
    items: [
      { key: 'file-4cm',         title: 'Koruma Filesi (4 cm Göz)',              desc: 'Trambolin etrafı için siyah örme polietilen, 4 cm göz aralıklı çocuk güvenli file.', image: `${MX}/images/yedek-parca/file-detail-4cm.png` },
      { key: 'file-duz',         title: 'Düz Alan Koruma Filesi',                desc: 'Park alanları, sahalar ve etrafı çevirmek için düz dokuma file.',                      image: `${MX}/images/yedek-parca/file-detail-duz.png` },
      { key: 'orme-ag',          title: 'Örme Zıplama Ağı',                      desc: 'Trambolin sıçrama yüzeyi — yüksek mukavemet polipropilen örme, çift dikişli kenar.' },
      { key: 'file-junior-ithal', title: 'Ticari Junior İthal Zıplama Filesi',   desc: 'Junior ölçü ticari trambolinler için ithal üretim, yüksek dayanımlı zıplama filesi.' },
      { key: 'file-olimpik-ithal', title: 'Ticari Olimpik İthal Zıplama Filesi', desc: 'Olimpik ölçü ticari trambolinler için ithal üretim, yoğun kullanıma uygun zıplama filesi.' },
      { key: 'file-cevre-tp',    title: 'Trambolin Düğümsüz Çevre Filesi (4×4)', desc: 'Sağlam iplik yapısı ve 4×4 cm göz aralığı sayesinde darbelere karşı yüksek direnç sunan çevre güvenlik filesi.', image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$KtDHS3kg8rkGghkUJJDz.jpg` },
      { key: 'file-orme-olimpik', title: 'Olimpik Trambolin El Örgü Örme Filesi', desc: 'Olimpik trambolinler için el örgüsü örme zıplama ağı — uzun ömürlü ve yüksek dayanımlı.' },
      { key: 'file-orme-junior',  title: 'Junior Trambolin El Örgü Örme Filesi', desc: 'Junior ölçü trambolinler için el örgüsü örme zıplama ağı.' },
      { key: 'file-yuvarlak-cevre', title: 'Yuvarlak Trambolin Çevre Koruma Filesi', desc: 'Yuvarlak ev trambolinleri için çevre koruma güvenlik filesi.' },
      { key: 'file-yuvarlak-zip', title: 'Yuvarlak Trambolin Zıplama Filesi',    desc: 'Yuvarlak trambolinler için özel kesim zıplama yüzey ağı.' },
      { key: 'tirmanma-net',     title: 'Tırmanma & Park Filesi',                desc: 'Tırmanma kuleleri, oyun parkları ve macera parkurları için kalın örme file.',        image: `${MX}/images/yedek-parca/file-3.jpg` },
    ],
  },
  {
    key: 'salto-emniyet',
    title: 'Salto Trambolin Yedekleri',
    short: 'Salto bungee sistemleri için lastik, kemer, toka, fırdöndü, makara ve gerdirme aparatı.',
    cover: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$HpHfKh9nP5SztBHMZuwb.jpg`,
    icon: '⚙️',
    items: [
      { key: 'salto-kemer-ticari', title: 'Ticari Salto Trambolin Kemeri',         desc: 'Salto trambolin kullanıcılarının güvenli akrobatik hareketler yapabilmesi için profesyonel emniyet kemeri.',  image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$HpHfKh9nP5SztBHMZuwb.jpg` },
      { key: 'salto-firdondu',     title: 'Salto Trambolin Kemer Fırdöndüsü',      desc: '8 mm kalınlığında, 360° sürtünmesiz dönüş sağlayan salto kemer fırdöndüsü. Tüm salto sistemleriyle uyumlu.',  image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$T2g0udV9wdNkwfrFzJUT.jpg` },
      { key: 'salto-toka-tp',      title: 'Salto Trambolin Kemer Tokası',          desc: 'Kolay takılıp çıkarılabilir dayanıklı kemer tokası. Yoğun ticari kullanıma karşı dirençli yapı.',             image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$netDSVpqd7OHOW6.jpg` },
      { key: 'salto-germe',        title: 'Salto Liftin Gerdirme Aparatı 18\'lik', desc: '100% çelik malzeme ile üretilmiş, bağlantı sistemlerinde ideal gerginliği sağlayan gerdirme aparatı.',        image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$xDFuMO84K1OCtxZ.jpg` },
      { key: 'salto-lastik-12',    title: 'Salto İthal Lastik Çiftli Kılıflı 12mm', desc: 'Çiftli yapısı ve 12 mm kalınlığıyla yüksek aşınma direnci sunan kılıflı salto lastik takımı.',              image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$55xltyLpXTKYD4Xr8ChY.jpg` },
      { key: 'salto-makara',       title: 'Ticari Salto İnoksa Makara',            desc: 'Paslanmaz çelik gövde, 400 kg çekme kapasiteli salto trambolin makara sistemi. ~15 cm boy.',                   image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$bDF3iZ5NV3bm9IP.jpg` },
      { key: 'salto-lastik-10',    title: 'Salto Trambolin Lastiği 10mm',          desc: '%200 uzama kapasiteli, yüksek esneklik dayanımlı ticari salto trambolin lastiği.',                             image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$FgjnyBnFN7mHcn43gr05.jpg` },
      { key: 'salto-lastik',       title: 'Salto Lastik Takımı',                   desc: 'Bungee salto sistemi için yüksek esneklik dayanımlı renkli lastik takımı.',                                     image: `${MX}/images/yedek-parca/salto-lastik.jpg` },
      { key: 'salto-halat',        title: 'Salto Halatı',                           desc: 'Bungee salto için merkez halat + güvenlik klipsi. Çelik takviyeli dayanım.' },
    ],
  },
  {
    key: 'step-yedek',
    title: 'Trambolin Merdivenleri & Step Parçaları',
    short: 'Trambolin merdivenleri, step basamakları ve metal aksesuarlar.',
    cover: `${MX}/images/yedek-parca/step-real-1.jpg`,
    icon: '🪜',
    items: [
      { key: 'merdiven',      title: 'Trambolin Merdiveni',       desc: 'Galvaniz çelik gövde + kaymaz basamak. Junior ve olimpik trambolinler için yedek.' },
      { key: 'step-basamak',  title: 'Step Basamak',              desc: 'Çift kaplama metal step basamak. Kauçuk yüzey, kaymaz tasarım.',                     image: `${MX}/images/yedek-parca/step-1.jpg` },
      { key: 'step-kaucuk',   title: 'Kauçuk Profil Yedek',      desc: 'Step kenar koruma kauçuk profili — UV dayanımlı siyah seri.',                        image: `${MX}/images/yedek-parca/step-2.jpg` },
      { key: 'step-aksesuar', title: 'Step Bağlantı Aksesuarları', desc: 'Vidalar, somunlar, dirsekler — step montaj kit yedeği.',                            image: `${MX}/images/yedek-parca/step-3.jpg` },
    ],
  },
  {
    key: 'yedek-sungerler',
    title: 'Yedek Süngerler',
    short: 'Sünger havuzları için B-s1 sınıfı yanmaz dolgu ve küp süngerler.',
    cover: `${MX}/images/yedek-parca/sunger-10cm.png`,
    icon: '🧽',
    items: [
      { key: 'sunger-8',   title: '8 cm Yedek Sünger',             desc: 'Standart sünger havuzu yedek dolgu — 8 cm kalınlık, antibakteriyel kaplı.',       image: `${MX}/images/yedek-parca/sunger-8cm.png` },
      { key: 'sunger-10',  title: '10 cm Yedek Sünger',            desc: 'Büyük havuzlar için 10 cm kalınlık dolgu sünger — yangın geciktirici sınıf.',    image: `${MX}/images/yedek-parca/sunger-10cm.png` },
      { key: 'sunger-kup', title: 'Sünger Havuzu Küp Süngerleri',  desc: 'Kübik kesim 20×20×20 cm sünger küpler — sünger havuzu malzemesi.' },
    ],
  },
  {
    key: 'trambolin-aksesuar',
    title: 'Trambolin Aksesuarları',
    short: 'Branda kılıfı, boru köpükleri, çift kelepçe, ayak stoperi ve plastik aparatlar.',
    cover: `${MX}/images/yedek-parca/aksesuar-2.jpg`,
    icon: '🔧',
    items: [
      { key: 'branda-kilif', title: 'Trambolin Branda Kılıfı',          desc: 'Tüm ölçü trambolin için A1 PVC dış mekan koruma kılıfı — UV ve yağmur dayanımlı.' },
      { key: 'boru-kopuk',   title: 'Trambolin Boru Köpükleri',         desc: 'Direk koruma siyah eva köpük — kayar geçmeli, çift kat dolgu.' },
      { key: 'cift-kelepce', title: 'Çift Kelepçe',                     desc: 'Trambolin çerçeve birleşim çift kelepçesi — galvaniz çelik, vidalı.' },
      { key: 'ayak-stoperi', title: 'Yuvarlak Trambolin Ayak Stoperi',  desc: 'Yuvarlak trambolin ayak ucu kauçuk stoperi — kaymaz, taban koruyucu.' },
      { key: 'plastik-apar', title: 'Plastik Aparatlar',                desc: 'Çeşitli plastik bağlantı, kapak ve montaj aparatları — orijinal yedek parçalar.' },
    ],
  },
  {
    key: 'roller-makara',
    title: 'Roller Kaydırak Makaraları',
    short: 'Roller kaydırak ve macera parkuru için yedek silindir makaralar.',
    cover: `${MX}/images/products/roller-kaydirak-soft-play.jpg`,
    icon: '⚙️',
    items: [
      { key: 'makara-pe',    title: 'Polietilen Roller Makara',  desc: 'Standart roller kaydırak için yüksek dayanımlı PE silindir makara.' },
      { key: 'makara-bilye', title: 'Bilyeli Roller Makara',     desc: 'Sessiz çalışan bilyeli sistem makara — premium kaydıraklar için.' },
      { key: 'makara-aks',   title: 'Roller Aks & Yatak',        desc: 'Çelik aks mili + bilyeli yatak takımı — roller komple yedek.' },
    ],
  },
  {
    key: 'akrobasi-park',
    title: 'Akrobasi & Park Parçaları',
    short: 'Jimnastik ve macera parkurları için tay, halka, fırdöndü, halat.',
    cover: `${MX}/images/products/sunger-orman-hazinesi.jpeg`,
    icon: '🤸',
    items: [
      { key: 'taylar',    title: 'Akrobasi Tayları',    desc: 'Salto ve akrobasi antrenmanı için yedek tay — sünger dolgu, kaymaz dış kaplama.' },
      { key: 'halkalar',  title: 'Akrobasi Halkaları',  desc: 'Asılı jimnastik halkası — paslanmaz çelik bağlantılı, kayışlı yedek seti.' },
      { key: 'firdondu',  title: 'Fırdöndü',            desc: 'Salto bungee ve macera parkur halatları için yüksek mukavemet fırdöndü.' },
      { key: 'halat',     title: 'Park Halatı',         desc: 'Macera parkurları, tırmanma duvarları ve tarzan halatları için 26 mm halat.' },
    ],
  },
  {
    key: 'tirmanma-tatami',
    title: 'Tırmanma Tutacakları & Tatami',
    short: 'Tırmanma duvarı renkli tutacakları ve tatami kaplama malzemesi.',
    cover: `${MX}/images/products/tirmanma-duvari-soft-play-4.jpg`,
    icon: '🧩',
    items: [
      { key: 'tutacaklar', title: 'Tırmanma Duvarı Tutacakları', desc: 'Renkli plastik tırmanma tutacakları — vida + gömme bağlantılı, çocuk güvenli kenar.' },
      { key: 'tatami',     title: 'Tatami Kaplama Malzemesi',    desc: 'Spor salonu / soft play için EVA tatami kaplama — 2 cm ve 4 cm seçenek.' },
    ],
  },
  {
    key: 'zemin-parca',
    title: 'Zemin Trambolin Parçaları',
    short: 'Zemin trambolinleri için kasa, çerçeve, file ve özel kesim parçalar.',
    cover: `${MX}/images/products/zemin-trambolin.jpg`,
    icon: '🔩',
    items: [
      { key: 'zemin-kasa', title: 'Zemin Kasa & Çerçeve', desc: 'Yere gömme zemin trambolin için galvaniz çelik kasa modülleri.' },
      { key: 'zemin-zip',  title: 'Zemin Zıplama Ağı',    desc: 'Zemin trambolin için özel kesim örme zıplama yüzeyi — yan yana modüler.' },
      { key: 'zemin-pad',  title: 'Zemin Pad Kesim',      desc: 'Zemin trambolin yay üstü pad kesim seti.' },
    ],
  },
  {
    key: 'sisme-park-yedek',
    title: 'Şişme Park Yedek Parçaları',
    short: 'Şişme park ve şişme oyun alanları için PVC kumaş, fan motoru, bekleme tüpleri ve bağlantı parçaları.',
    cover: `${MX}/images/products/sisme-parklar-sisme-park1.jpg`,
    icon: '🎈',
    items: [
      { key: 'sisme-motor-480',  title: 'Şişme Oyun Parkı Motoru 480W',  desc: 'Küçük ve orta boy şişme oyun parkları için 480W sürekli hava üflemeli fan motoru. Tüm şişme park modellerine uyumlu.',  image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$JXpjkJYZtJQObKrb9grG.jpg` },
      { key: 'sisme-motor-950',  title: 'Şişme Oyun Parkı Motoru 950W',  desc: 'Büyük şişme oyun parkları için 950W yüksek devirli fan motoru. Uzun süreli kullanım için soğutma sistemi dahil.',          image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$mbODJhQtwqg8aVfO0Kj1.jpg` },
      { key: 'sisme-motor-2',    title: 'Şişme Oyun Parkı Motoru Model 2', desc: 'Orta-büyük şişme park alanları için güçlü fan motoru. Sessiz çalışma ve düşük enerji tüketimi.',                           image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$gh9Zdo7YjKo4vqw.jpg` },
      { key: 'sisme-motor',      title: 'Şişme Oyun Parkı Motoru',        desc: 'Genel amaçlı şişme park fan motoru. Hızlı şişirme kapasitesi ve uzun ömürlü yapı ile tüm modellere uyumlu.',               image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$rnnb9LKOdCaXAuZ.jpg` },
      { key: 'sisme-pvc',        title: 'PVC Tarpaulin Kumaş',            desc: '0,55 mm çift kat dikiş, yangın geciktirici PVC tarpaulin — şişme park onarım ve ek parçası.' },
      { key: 'sisme-boru',       title: 'Hava Giriş Borusu & Bağlantı',  desc: 'Fan çıkış borusu, klips ve bağlantı grubu — hava kaçağı önleme seti.' },
      { key: 'sisme-dikiş',      title: 'Şişme Yapı Dikiş Onarım Kiti',  desc: 'PVC yapıştırıcı, yama kumaşı ve ısıyla yapıştırma aparatı — saha onarım seti.' },
      { key: 'sisme-sirizme',    title: 'Emniyet Kanca & Halat',          desc: 'Şişme parkı sabitleme için paslanmaz çelik kanca, halat ve zemin çakma ekipmanı.' },
    ],
  },
];
