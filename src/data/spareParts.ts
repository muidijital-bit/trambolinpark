const MX = 'https://matrax-web-six.vercel.app';
const TP = 'https://trambolinpark.com';

export type SparePart = {
  key: string;
  title: string;
  desc: string;
  image?: string;
  gallery?: string[];
};

export type PartSubCategory = {
  key: string;
  title: string;
  items: SparePart[];
};

export type PartCategory = {
  key: string;
  title: string;
  short: string;
  cover: string;
  icon: string;
  items: SparePart[];           // used when no subcategories
  subcategories?: PartSubCategory[];
};

export type PartLookup = {
  part: SparePart;
  category: PartCategory;
  subcategory: PartSubCategory | null;
};

export function findPartByKey(key: string): PartLookup | null {
  for (const cat of spareCategories) {
    if (cat.subcategories?.length) {
      for (const sub of cat.subcategories) {
        const part = sub.items.find(p => p.key === key);
        if (part) return { part, category: cat, subcategory: sub };
      }
    } else {
      const part = cat.items.find(p => p.key === key);
      if (part) return { part, category: cat, subcategory: null };
    }
  }
  return null;
}

export const spareCategories: PartCategory[] = [

  /* ── 1. Top Havuzu Yedek Parça ────────────────────────────── */
  {
    key: 'top-havuzu-yedek',
    title: 'Top Havuzu Yedek Parça',
    short: 'Top havuzları için yedek top, file, çerçeve ve aksesuar.',
    cover: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$7IqBTPuyBSbrW8yD2nQm.jpg`,
    icon: '🎱',
    items: [
      { key: 'top-6cm',    title: 'Top Havuzu Topu 6 cm',         desc: 'CE sertifikalı, crush-proof, çocuk güvenli HDPE top. 6 cm çap, karışık renk.', image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$7IqBTPuyBSbrW8yD2nQm.jpg` },
      { key: 'top-8cm',    title: 'Top Havuzu Topu 8 cm',         desc: 'CE sertifikalı, crush-proof, çocuk güvenli HDPE top. 8 cm çap, karışık renk.' },
      { key: 'top-filesi', title: 'Top Havuzu Çevre Filesi',      desc: 'Top kaçışını önleyen düz dokuma polietilen çevre filesi. Farklı yüksekliklerde.' },
      { key: 'top-panel',  title: 'Köpük Çerçeve Paneli',         desc: 'EVA kaplı darbe emici top havuzu kenar paneli. Özel kesim ve renk seçeneği.' },
      { key: 'top-atis',   title: 'Top Atış Aparatı',             desc: 'Manuel top fırlatma/toplama aksesuarı — top havuzu aktivitesi için.' },
    ],
  },

  /* ── 2. Trambolin Yedek Parçalar ──────────────────────────── */
  {
    key: 'trambolin-yedek',
    title: 'Trambolin Yedek Parçalar',
    short: 'Yay, pad, file, merdiven, aksesuar ve zemin parça grubu.',
    cover: `${MX}/images/yedek-parca/yay-25cm.png`,
    icon: '🔩',
    items: [],
    subcategories: [
      {
        key: 'yaylar',
        title: 'Trambolin Yayları',
        items: [
          { key: 'yay-85-kare',  title: '8,5 cm Kare Kesit Yay',             desc: 'Çocuk parkları ve junior trambolinler için kısa, sert yay. Galvaniz çelik.',        image: `${MX}/images/yedek-parca/yay-85cm-kare.png` },
          { key: 'yay-15',       title: '15 cm Yuvarlak Yay',                desc: 'Junior ve mid-size trambolinler için orta sertlikte standart yay.',                  image: `${MX}/images/yedek-parca/yay-15cm.png` },
          { key: 'yay-15-kare',  title: '15 cm Kare Kesit Yay',              desc: 'Yüksek esneklik dayanımlı kare kesit, pro işletmeler için tercih edilir.',          image: `${MX}/images/yedek-parca/yay-15cm-kare.png` },
          { key: 'yay-18',       title: '18 cm Yuvarlak Yay',                desc: 'Olimpik trambolinler için orta-uzun seri standart yay.',                             image: `${MX}/images/yedek-parca/yay-18cm.png` },
          { key: 'yay-20-kare',  title: '20 cm Kare Kesit Yay',              desc: 'Olimpik ticari trambolinler için kare kesit yüksek dayanımlı yay.',                 image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$chAZQZMg5X9ke4lSvxVx.jpg` },
          { key: 'yay-22',       title: '22 cm Yuvarlak Yay',                desc: 'Ticari olimpik trambolinler için 22 cm galvaniz çelik yuvarlak yay.',               image: `${TP}/album/trambolinparkyeni/urunler/D5zm4LhjhgfrjDS0CdSl.jpg` },
          { key: 'yay-25',       title: '25 cm Yuvarlak Yay',                desc: 'Profesyonel olimpik trambolinler için uzun seri esnek yay.',                         image: `${TP}/album/trambolinparkyeni/urunler/pJlCEealmxLOh37ysU7Z.jpg` },
          { key: 'yay-28-kare',  title: '28 cm Kare Kesit Yay',              desc: 'En uzun seri kare kesit yay — ağır kullanım olimpik sahalar için.',                  image: `${MX}/images/yedek-parca/yay-28cm-kare.png` },
          { key: 'yay-cekme',    title: 'Yay Çekme Aparatı',                 desc: 'Yay takıp çıkartmak için kaymaz kavramalı pratik T-aparat.' },
          { key: 'yay-kanca',    title: 'Step Trambolin Yay Kanca Tutacağı', desc: 'Step trambolin yaylarının kasaya bağlandığı paslanmaz çelik kanca tutacağı.' },
        ],
      },
      {
        key: 'padler',
        title: 'Koruma Padleri',
        items: [
          { key: 'pad-yuvarlak', title: 'Yuvarlak Trambolin Padi',    desc: 'Yuvarlak tip ev/junior trambolinler için A1 PVC kaplı UV dayanımlı pad.',                    image: `${MX}/images/yedek-parca/pad-real-1.jpg` },
          { key: 'pad-olimpik',  title: 'Olimpik Trambolin Padi',     desc: 'Olimpik (kare/dikdörtgen) ticari trambolinlere özel kesim, çift dikiş kenar koruma.',         image: `${MX}/images/yedek-parca/pad-real-2.jpg` },
          { key: 'pad-zemin',    title: 'Zemin Trambolin Padi',       desc: 'Zemin tip trambolinler için ince kesit kalın sünger dolgu tek modül pad.',                     image: `${MX}/images/yedek-parca/pad-real-3.jpg` },
          { key: 'pad-mantar',   title: 'Mantar Profil Kenar Koruma', desc: 'Tepe çubuğu/direk kapak süngeri — siyah PVC kaplı, kayar geçmeli.',                          image: `${MX}/images/yedek-parca/aksesuar-2.jpg` },
        ],
      },
      {
        key: 'fileler',
        title: 'Koruma Filesi & Ağı',
        items: [
          { key: 'file-4cm',          title: 'Koruma Filesi (4 cm Göz)',               desc: 'Trambolin etrafı için siyah örme polietilen, 4 cm göz aralıklı çocuk güvenli file.', image: `${MX}/images/yedek-parca/file-detail-4cm.png` },
          { key: 'file-duz',          title: 'Düz Alan Koruma Filesi',                 desc: 'Park alanları ve etrafı çevirmek için düz dokuma file.',                              image: `${MX}/images/yedek-parca/file-detail-duz.png` },
          { key: 'orme-ag',           title: 'Örme Zıplama Ağı',                       desc: 'Trambolin sıçrama yüzeyi — yüksek mukavemet polipropilen örme, çift dikişli kenar.' },
          { key: 'file-junior-ithal', title: 'Ticari Junior İthal Zıplama Filesi',     desc: 'Junior ölçü ticari trambolinler için ithal üretim, yüksek dayanımlı zıplama filesi.' },
          { key: 'file-olimpik-ithal', title: 'Ticari Olimpik İthal Zıplama Filesi',  desc: 'Olimpik ölçü ticari trambolinler için ithal üretim, yoğun kullanıma uygun zıplama filesi.' },
          { key: 'file-cevre-tp',     title: 'Düğümsüz Çevre Filesi (4×4)',            desc: 'Sağlam iplik yapısı ve 4×4 cm göz aralığı sayesinde darbelere karşı yüksek direnç.', image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$KtDHS3kg8rkGghkUJJDz.jpg` },
          { key: 'file-orme-olimpik', title: 'Olimpik El Örgü Örme Filesi',            desc: 'Olimpik trambolinler için el örgüsü örme zıplama ağı — uzun ömürlü.' },
          { key: 'file-orme-junior',  title: 'Junior El Örgü Örme Filesi',             desc: 'Junior ölçü trambolinler için el örgüsü örme zıplama ağı.' },
          { key: 'file-yuvarlak-cevre', title: 'Yuvarlak Çevre Koruma Filesi',         desc: 'Yuvarlak ev trambolinleri için çevre koruma güvenlik filesi.' },
          { key: 'file-yuvarlak-zip', title: 'Yuvarlak Trambolin Zıplama Filesi',      desc: 'Yuvarlak trambolinler için özel kesim zıplama yüzey ağı.' },
          { key: 'tirmanma-net',      title: 'Tırmanma & Park Filesi',                 desc: 'Tırmanma kuleleri ve oyun parkları için kalın örme file.',                           image: `${MX}/images/yedek-parca/file-3.jpg` },
        ],
      },
      {
        key: 'sungerler',
        title: 'Sünger Havuzu',
        items: [
          { key: 'sunger-8',   title: '8 cm Yedek Sünger',            desc: 'Standart sünger havuzu yedek dolgu — 8 cm kalınlık, antibakteriyel kaplı.',    image: `${MX}/images/yedek-parca/sunger-8cm.png` },
          { key: 'sunger-10',  title: '10 cm Yedek Sünger',           desc: 'Büyük havuzlar için 10 cm kalınlık dolgu sünger — yangın geciktirici sınıf.', image: `${MX}/images/yedek-parca/sunger-10cm.png` },
          { key: 'sunger-kup', title: 'Sünger Havuzu Küp Süngerleri', desc: 'Kübik kesim 20×20×20 cm sünger küpler — sünger havuzu malzemesi.' },
        ],
      },
      {
        key: 'merdivenler',
        title: 'Merdivenler & Step',
        items: [
          { key: 'merdiven',      title: 'Trambolin Merdiveni',        desc: 'Galvaniz çelik gövde + kaymaz basamak. Junior ve olimpik trambolinler için.' },
          { key: 'step-basamak',  title: 'Step Basamak',               desc: 'Çift kaplama metal step basamak. Kauçuk yüzey, kaymaz tasarım.',              image: `${MX}/images/yedek-parca/step-1.jpg` },
          { key: 'step-kaucuk',   title: 'Kauçuk Profil Yedek',        desc: 'Step kenar koruma kauçuk profili — UV dayanımlı siyah seri.',                 image: `${MX}/images/yedek-parca/step-2.jpg` },
          { key: 'step-aksesuar', title: 'Step Bağlantı Aksesuarları', desc: 'Vidalar, somunlar, dirsekler — step montaj kit yedeği.',                       image: `${MX}/images/yedek-parca/step-3.jpg` },
        ],
      },
      {
        key: 'aksesuarlar',
        title: 'Aksesuarlar',
        items: [
          { key: 'branda-kilif', title: 'Trambolin Branda Kılıfı',         desc: 'Tüm ölçü trambolin için A1 PVC dış mekan koruma kılıfı — UV ve yağmur dayanımlı.' },
          { key: 'boru-kopuk',   title: 'Trambolin Boru Köpükleri',        desc: 'Direk koruma siyah EVA köpük — kayar geçmeli, çift kat dolgu.' },
          { key: 'cift-kelepce', title: 'Çift Kelepçe',                    desc: 'Trambolin çerçeve birleşim çift kelepçesi — galvaniz çelik, vidalı.' },
          { key: 'ayak-stoperi', title: 'Yuvarlak Trambolin Ayak Stoperi', desc: 'Yuvarlak trambolin ayak ucu kauçuk stoperi — kaymaz, taban koruyucu.' },
          { key: 'plastik-apar', title: 'Plastik Aparatlar',               desc: 'Çeşitli plastik bağlantı, kapak ve montaj aparatları — orijinal yedek.' },
          { key: 'roller-pe',    title: 'Polietilen Roller Makara',        desc: 'Roller kaydırak için yüksek dayanımlı PE silindir makara.' },
          { key: 'roller-bilye', title: 'Bilyeli Roller Makara',           desc: 'Sessiz çalışan bilyeli sistem makara — premium kaydıraklar için.' },
          { key: 'roller-aks',   title: 'Roller Aks & Yatak',             desc: 'Çelik aks mili + bilyeli yatak takımı — roller komple yedek.' },
          { key: 'tutacaklar',   title: 'Tırmanma Duvarı Tutacakları',    desc: 'Renkli plastik tırmanma tutacakları — vida + gömme bağlantılı, çocuk güvenli.' },
          { key: 'tatami',       title: 'Tatami Kaplama Malzemesi',       desc: 'Spor salonu / soft play için EVA tatami kaplama — 2 cm ve 4 cm seçenek.' },
        ],
      },
      {
        key: 'zemin-parca',
        title: 'Zemin Trambolin Parçaları',
        items: [
          { key: 'zemin-kasa', title: 'Zemin Kasa & Çerçeve', desc: 'Yere gömme zemin trambolin için galvaniz çelik kasa modülleri.' },
          { key: 'zemin-zip',  title: 'Zemin Zıplama Ağı',    desc: 'Zemin trambolin için özel kesim örme zıplama yüzeyi — yan yana modüler.' },
          { key: 'zemin-pad',  title: 'Zemin Pad Kesim',      desc: 'Zemin trambolin yay üstü pad kesim seti.' },
        ],
      },
    ],
  },

  /* ── 3. Salto Trambolin Yedek Parça ───────────────────────── */
  {
    key: 'salto-yedek',
    title: 'Salto Trambolin Yedek Parça',
    short: 'Bungee sistemleri için lastik, kemer, toka, fırdöndü, makara ve gerdirme aparatı.',
    cover: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$HpHfKh9nP5SztBHMZuwb.jpg`,
    icon: '⚙️',
    items: [
      { key: 'salto-kemer-ticari', title: 'Ticari Salto Trambolin Kemeri',          desc: 'Salto trambolin kullanıcıları için profesyonel emniyet kemeri.',                                                     image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$HpHfKh9nP5SztBHMZuwb.jpg` },
      { key: 'salto-firdondu',     title: 'Salto Trambolin Kemer Fırdöndüsü',       desc: '8 mm kalınlığında, 360° sürtünmesiz dönüş sağlayan salto kemer fırdöndüsü.',                                        image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$T2g0udV9wdNkwfrFzJUT.jpg` },
      { key: 'salto-toka-tp',      title: 'Salto Trambolin Kemer Tokası',           desc: 'Kolay takılıp çıkarılabilir dayanıklı kemer tokası. Yoğun ticari kullanıma uygun.',                                  image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$netDSVpqd7OHOW6.jpg` },
      { key: 'salto-germe',        title: 'Salto Liftin Gerdirme Aparatı 18\'lik', desc: '100% çelik malzeme ile üretilmiş, bağlantı sistemlerinde ideal gerginliği sağlayan gerdirme aparatı.',             image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$xDFuMO84K1OCtxZ.jpg` },
      { key: 'salto-lastik-12',    title: 'Salto İthal Lastik Çiftli Kılıflı 12mm', desc: 'Çiftli yapısı ve 12 mm kalınlığıyla yüksek aşınma direnci sunan kılıflı salto lastik takımı.',                    image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$55xltyLpXTKYD4Xr8ChY.jpg` },
      { key: 'salto-makara',       title: 'Ticari Salto İnoksa Makara',             desc: 'Paslanmaz çelik gövde, 400 kg çekme kapasiteli salto trambolin makara sistemi.',                                     image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$bDF3iZ5NV3bm9IP.jpg` },
      { key: 'salto-lastik-10',    title: 'Salto Trambolin Lastiği 10mm',           desc: '%200 uzama kapasiteli, yüksek esneklik dayanımlı ticari salto trambolin lastiği.',                                  image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$FgjnyBnFN7mHcn43gr05.jpg` },
      { key: 'salto-lastik',       title: 'Salto Lastik Takımı',                    desc: 'Bungee salto sistemi için yüksek esneklik dayanımlı renkli lastik takımı.',                                          image: `${MX}/images/yedek-parca/salto-lastik.jpg` },
    ],
  },

  /* ── 4. Şişme Oyun Park Yedek Parça ───────────────────────── */
  {
    key: 'sisme-yedek',
    title: 'Şişme Oyun Park Yedek Parça',
    short: 'PVC kumaş, fan motoru, bekleme tüpleri ve bağlantı parçaları.',
    cover: `${MX}/images/products/sisme-parklar-sisme-park1.jpg`,
    icon: '🎈',
    items: [
      { key: 'sisme-motor-480', title: 'Şişme Oyun Parkı Motoru 480W',    desc: 'Küçük ve orta boy şişme oyun parkları için 480W sürekli hava üflemeli fan motoru.',          image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$JXpjkJYZtJQObKrb9grG.jpg` },
      { key: 'sisme-motor-950', title: 'Şişme Oyun Parkı Motoru 950W',    desc: 'Büyük şişme oyun parkları için 950W yüksek devirli fan motoru. Soğutma sistemi dahil.',       image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$mbODJhQtwqg8aVfO0Kj1.jpg` },
      { key: 'sisme-motor-2',   title: 'Şişme Oyun Parkı Motoru Model 2', desc: 'Orta-büyük şişme park alanları için güçlü fan motoru.',                                        image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$gh9Zdo7YjKo4vqw.jpg` },
      { key: 'sisme-motor',     title: 'Şişme Oyun Parkı Motoru',         desc: 'Genel amaçlı şişme park fan motoru. Hızlı şişirme ve uzun ömürlü yapı.',                      image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$rnnb9LKOdCaXAuZ.jpg` },
      { key: 'sisme-pvc',       title: 'PVC Tarpaulin Kumaş',             desc: '0,55 mm çift kat dikiş, yangın geciktirici PVC tarpaulin — onarım ve ek parçası.' },
      { key: 'sisme-boru',      title: 'Hava Giriş Borusu & Bağlantı',   desc: 'Fan çıkış borusu, klips ve bağlantı grubu — hava kaçağı önleme seti.' },
      { key: 'sisme-dikiş',     title: 'Şişme Yapı Dikiş Onarım Kiti',   desc: 'PVC yapıştırıcı, yama kumaşı ve ısıyla yapıştırma aparatı — saha onarım seti.' },
      { key: 'sisme-sirizme',   title: 'Emniyet Kanca & Halat',           desc: 'Şişme parkı sabitleme için paslanmaz çelik kanca, halat ve zemin çakma ekipmanı.' },
    ],
  },
];
