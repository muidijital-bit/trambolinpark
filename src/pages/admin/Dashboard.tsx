import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { AdminPageHeader } from './AdminLayout';
import { Package, Wrench, Search, ExternalLink } from 'lucide-react';

export default function Dashboard() {
  const [counts, setCounts] = useState({ products: 0, spare_parts: 0, seo: 0 });

  useEffect(() => {
    const load = async () => {
      const [p, s, seo] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('spare_parts').select('id', { count: 'exact', head: true }),
        supabase.from('seo_settings').select('id', { count: 'exact', head: true }),
      ]);
      setCounts({ products: p.count ?? 0, spare_parts: s.count ?? 0, seo: seo.count ?? 0 });
    };
    load();
  }, []);

  const cards = [
    { label: 'Ürün',         value: counts.products,    icon: <Package size={20} />,  color: '#c3e92d', href: '/admin/urunler' },
    { label: 'Yedek Parça',  value: counts.spare_parts, icon: <Wrench size={20} />,   color: '#60a5fa', href: '/admin/yedek-parcalar' },
    { label: 'SEO Kaydı',    value: counts.seo,         icon: <Search size={20} />,   color: '#a78bfa', href: '/admin/seo' },
  ];

  return (
    <div>
      <AdminPageHeader title="Dashboard" sub="Trambolinpark yönetim paneline hoş geldiniz." />

      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {cards.map(card => (
            <a key={card.label} href={card.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#141414', border: '1px solid #222', borderRadius: 12, padding: '1.5rem', transition: 'border-color .15s', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = card.color)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#222')}>
                <div style={{ color: card.color, marginBottom: 12 }}>{card.icon}</div>
                <p style={{ color: '#fff', fontSize: 28, fontWeight: 800, margin: 0 }}>{card.value}</p>
                <p style={{ color: '#666', fontSize: 12, margin: '4px 0 0' }}>{card.label}</p>
              </div>
            </a>
          ))}
        </div>

        <div style={{ background: '#141414', border: '1px solid #222', borderRadius: 12, padding: '1.5rem' }}>
          <p className="fw-bold mb-3" style={{ color: '#aaa', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em' }}>Hızlı Bağlantılar</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              { label: 'Siteyi Aç', href: 'https://trambolinpark.com', ext: true },
              { label: 'Ürünler Sayfası', href: '/urunler', ext: true },
              { label: 'Yedek Parçalar', href: '/yedek-parcalar', ext: true },
            ].map(link => (
              <a key={link.label} href={link.href} target={link.ext ? '_blank' : undefined} rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8, background: '#1e1e1e', color: '#aaa', fontSize: 12, fontWeight: 600, textDecoration: 'none', border: '1px solid #2a2a2a' }}>
                {link.label} {link.ext && <ExternalLink size={11} />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
