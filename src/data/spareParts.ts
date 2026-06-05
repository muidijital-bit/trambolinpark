const TP = 'https://trambolinpark.com';
const img = (id: string) => `${TP}/media/image/350x350/${id}`;

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

  /* ── 1. Trambolin Yedek Parçalar ──────────────────────────── */
  {
    key: 'trambolin-yedek',
    title: 'Trambolin Yedek Parçalar',
    short: 'Trambolin yayları, zıplama filesi ve çevre ağları.',
    cover: img('album$trambolinparkyeni$urunler$pJlCEealmxLOh37ysU7Z.jpg'),
    icon: '🔩',
    items: [
      { key: 'yay-85',               title: 'Step Trambolin Yayı 8,5 cm',              desc: 'Çocuk parkları ve junior trambolinler için kısa, sert yay. Galvaniz çelik.',       image: img('album$trambolinparkyeni$urunler$Jn8GICOCwiXbNOQhhTHl.jpg') },
      { key: 'yay-15',               title: 'Ticari Trambolin Yayı 15 cm',             desc: 'Junior ve mid-size trambolinler için orta sertlikte standart yay.',                 image: img('album$trambolinparkyeni$urunler$6gyCD7h1MeIItfyHegS6.jpg') },
      { key: 'yay-18',               title: 'Ticari Trambolin Yayı 18 cm',             desc: 'Olimpik trambolinler için orta-uzun seri standart yay.',                            image: img('album$trambolinparkyeni$urunler$JOPdARVPbJTIL2YMKgtL.jpg') },
      { key: 'yay-20',               title: 'Ticari Trambolin Yayı 20 cm',             desc: 'Olimpik ticari trambolinler için yüksek dayanımlı yay.',                            image: img('album$trambolinparkyeni$urunler$chAZQZMg5X9ke4lSvxVx.jpg') },
      { key: 'yay-22',               title: 'Ticari Trambolin Yayı 22 cm',             desc: 'Ticari olimpik trambolinler için 22 cm galvaniz çelik yuvarlak yay.',              image: img('album$trambolinparkyeni$urunler$D5zm4LhjhgfrjDS0CdSl.jpg') },
      { key: 'yay-25',               title: 'Ticari Trambolin Yayı 25 cm',             desc: 'Profesyonel olimpik trambolinler için uzun seri esnek yay.',                        image: img('album$trambolinparkyeni$urunler$pJlCEealmxLOh37ysU7Z.jpg') },
      { key: 'yay-28',               title: 'Ticari Trambolin Yayı 28 cm',             desc: 'En uzun seri yay — ağır kullanım olimpik sahalar için.',                            image: img('album$trambolinparkyeni$urunler$BEu33EpO5TXwzGbIIB0O.jpg') },
      { key: 'yay-kanca',            title: 'Step Trambolin Yay Kanca Tutacağı',       desc: 'Step trambolin yaylarının kasaya bağlandığı paslanmaz çelik kanca tutacağı.',      image: img('album$trambolinparkyeni$urunler$ZHxlyYrkuBPpiEzgFZWK.jpg') },
      { key: 'sunger',               title: 'Trambolin Süngerleri',                     desc: 'Sünger havuzu yedek dolgu — antibakteriyel kaplı, yangın geciktirici sınıf.',      image: img('album$trambolinparkyeni$urunler$gss643v6tGRnQTW4efZs.jpg') },
      { key: 'file-junior-ithal',    title: 'Ticari Junior İthal Zıplama Filesi',      desc: 'Junior ölçü ticari trambolinler için ithal üretim, yüksek dayanımlı zıplama filesi.',       image: img('album$trambolinparkyeni$urunler$H2o3NCT2olryjl6MoiRR.jpg') },
      { key: 'file-olimpik-ithal',   title: 'Ticari Olimpik İthal Zıplama Filesi',     desc: 'Olimpik ölçü ticari trambolinler için ithal üretim, yoğun kullanıma uygun zıplama filesi.', image: img('album$trambolinparkyeni$urunler$5Tz1YsX1TtB7kjxUYA6W.jpg') },
      { key: 'file-cevre',           title: 'Düğümsüz Çevre Filesi (4×4)',             desc: 'Sağlam iplik yapısı ve 4×4 cm göz aralığıyla darbelere karşı yüksek direnç.',                image: img('album$trambolinparkyeni$urunler$KtDHS3kg8rkGghkUJJDz.jpg') },
      { key: 'file-orme-olimpik',    title: 'Olimpik El Örgü Örme Filesi',             desc: 'Olimpik trambolinler için el örgüsü örme zıplama ağı — uzun ömürlü.',                          image: img('album$trambolinparkyeni$urunler$2foK5oIMuNJYJNXeZLqh.jpg') },
      { key: 'file-orme-junior',     title: 'Junior El Örgü Örme Filesi',              desc: 'Junior ölçü trambolinler için el örgüsü örme zıplama ağı.',                                   image: img('album$trambolinparkyeni$urunler$x1tZikUrUvWJVC0lfR2U.jpg') },
      { key: 'file-yuvarlak-cevre',  title: 'Yuvarlak Çevre Koruma Filesi',            desc: 'Yuvarlak ev trambolinleri için çevre koruma güvenlik filesi.',                                 image: img('album$trambolinparkyeni$urunler$yYNskKOCknmt0wHM1tf5.jpg') },
      { key: 'file-yuvarlak-zip',    title: 'Yuvarlak Trambolin Zıplama Filesi',       desc: 'Yuvarlak trambolinler için özel kesim zıplama yüzey ağı.',                                     image: img('album$trambolinparkyeni$urunler$ajnOBEsB0P5uXVrUwu70.jpg') },
    ],
  },

  /* ── 2. Salto Trambolin Yedek Parça ───────────────────────── */
  {
    key: 'salto-yedek',
    title: 'Salto Trambolin Yedek Parça',
    short: 'Bungee sistemleri için lastik, kemer, toka, fırdöndü ve makara.',
    cover: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$HpHfKh9nP5SztBHMZuwb.jpg`,
    icon: '⚙️',
    items: [
      { key: 'salto-kemer-ticari', title: 'Ticari Salto Trambolin Kemeri',           desc: 'Salto trambolin kullanıcıları için profesyonel emniyet kemeri.',                                   image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$HpHfKh9nP5SztBHMZuwb.jpg` },
      { key: 'salto-firdondu',     title: 'Salto Trambolin Kemer Fırdöndüsü',        desc: '8 mm kalınlığında, 360° sürtünmesiz dönüş sağlayan salto kemer fırdöndüsü.',                       image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$T2g0udV9wdNkwfrFzJUT.jpg` },
      { key: 'salto-toka',         title: 'Salto Trambolin Kemer Tokası',            desc: 'Kolay takılıp çıkarılabilir dayanıklı kemer tokası. Yoğun ticari kullanıma uygun.',                 image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$netDSVpqd7OHOW6.jpg` },
      { key: 'salto-germe',        title: "Salto Liftin Gerdirme Aparatı 18'lik",    desc: '100% çelik malzeme ile üretilmiş, bağlantı sistemlerinde ideal gerginliği sağlayan gerdirme.',      image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$xDFuMO84K1OCtxZ.jpg` },
      { key: 'salto-lastik-12',    title: 'Salto İthal Lastik Çiftli Kılıflı 12 mm', desc: 'Çiftli yapısı ve 12 mm kalınlığıyla yüksek aşınma direnci sunan kılıflı salto lastik takımı.',     image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$55xltyLpXTKYD4Xr8ChY.jpg` },
      { key: 'salto-makara',       title: 'Ticari Salto İnoksa Makara',              desc: 'Paslanmaz çelik gövde, 400 kg çekme kapasiteli salto trambolin makara sistemi.',                    image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$bDF3iZ5NV3bm9IP.jpg` },
      { key: 'salto-kemer-2',      title: 'Ticari Salto Trambolin Kemeri 2',         desc: 'Ticari salto trambolin kullanıcıları için yedek profesyonel emniyet kemeri.',                       image: img('album$trambolinparkyeni$urunler$lNEZeKgQtIWjkum.jpg') },
      { key: 'salto-lastik-10',    title: 'Salto Trambolin Lastiği 10 mm',           desc: '%200 uzama kapasiteli, yüksek esneklik dayanımlı ticari salto trambolin lastiği.',                  image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$FgjnyBnFN7mHcn43gr05.jpg` },
    ],
  },

  /* ── 3. Şişme Oyun Park Yedek Parça ───────────────────────── */
  {
    key: 'sisme-yedek',
    title: 'Şişme Oyun Park Yedek Parça',
    short: 'Şişme oyun parkları için fan motoru yedekleri.',
    cover: img('album$trambolinparkyeni$urunler$JXpjkJYZtJQObKrb9grG.jpg'),
    icon: '🎈',
    items: [
      { key: 'sisme-motor-480', title: 'Şişme Oyun Parkı Motoru 480W',     desc: 'Küçük ve orta boy şişme oyun parkları için 480W sürekli hava üflemeli fan motoru.', image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$JXpjkJYZtJQObKrb9grG.jpg` },
      { key: 'sisme-motor-950', title: 'Şişme Oyun Parkı Motoru 950W',     desc: 'Büyük şişme oyun parkları için 950W yüksek devirli fan motoru. Soğutma sistemi dahil.', image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$mbODJhQtwqg8aVfO0Kj1.jpg` },
      { key: 'sisme-motor-2',   title: 'Şişme Oyun Parkı Motoru Model 2',  desc: 'Orta-büyük şişme park alanları için güçlü fan motoru.',                               image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$gh9Zdo7YjKo4vqw.jpg` },
      { key: 'sisme-motor',     title: 'Şişme Oyun Parkı Motoru',          desc: 'Genel amaçlı şişme park fan motoru. Hızlı şişirme ve uzun ömürlü yapı.',             image: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$rnnb9LKOdCaXAuZ.jpg` },
    ],
  },
];
