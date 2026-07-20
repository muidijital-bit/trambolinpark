import { ShieldCheck, Factory, Palette, Wrench } from 'lucide-react';

export const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Site genelinde (Hakkımızda sayfası) zaten kullanılan, doğrulanmış marka vaatleri.
export const TRUST_BADGES = [
  { icon: ShieldCheck, title: 'Güvenlik Standartları' },
  { icon: Factory,      title: 'Yerli Üretim' },
  { icon: Palette,      title: 'Özel Tasarım' },
  { icon: Wrench,       title: 'Satış Sonrası Destek' },
];

// "Etiket: açıklama" satırlarını madde işaretli listeye, "?"/":" ile bitmeyen
// kısa satırları da dahil olmak üzere kısa satırları alt başlığa çevirerek
// düz metin açıklamayı biçimlendirir.
export function renderDescription(description: string) {
  const lines = description.split('\n').map(l => l.trim());
  const blocks: React.ReactNode[] = [];
  let bulletGroup: string[] = [];

  const flushBullets = () => {
    if (bulletGroup.length === 0) return;
    const group = bulletGroup;
    blocks.push(
      <ul key={`ul-${blocks.length}`} style={{ listStyle: 'none', padding: 0, margin: '4px 0 20px' }}>
        {group.map((line, i) => {
          const idx = line.indexOf(':');
          const label = line.slice(0, idx + 1);
          const rest = line.slice(idx + 1).replace(/^(?=\S)/, ' ');
          return (
            <li key={i} className="d-flex" style={{ gap: 10, padding: '8px 0', borderBottom: i < group.length - 1 ? '1px solid #ececec' : 'none' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5c9200', flexShrink: 0, marginTop: 8 }} />
              <span style={{ color: '#444', fontSize: 14.5, lineHeight: 1.6 }}>
                <strong style={{ color: '#1a1a1a' }}>{label}</strong>{rest}
              </span>
            </li>
          );
        })}
      </ul>
    );
    bulletGroup = [];
  };

  for (const line of lines) {
    if (!line) { flushBullets(); continue; }
    const bulletMatch = /^[^:]{2,40}:\s*\S.*$/.test(line);
    const isHeading = !bulletMatch && line.length < 80;
    if (isHeading) {
      flushBullets();
      blocks.push(
        <h3 key={blocks.length} className="font-poppins fw-black" style={{ fontSize: 17, color: '#5c9200', margin: blocks.length === 0 ? '0 0 8px' : '22px 0 8px' }}>
          {line}
        </h3>
      );
    } else if (bulletMatch) {
      bulletGroup.push(line);
    } else {
      flushBullets();
      blocks.push(<p key={blocks.length} style={{ color: '#555', fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>{line}</p>);
    }
  }
  flushBullets();
  return blocks;
}
