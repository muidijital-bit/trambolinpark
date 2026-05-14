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
    { label: 'Ürün',        value: counts.products,    icon: <Package size={20} />,  color: '#3a7500', bg: '#f0f7e6', href: '/admin/urunler' },
    { label: 'Yedek Parça', value: counts.spare_parts, icon: <Wrench size={20} />,   color: '#1d4ed8', bg: '#eff6ff', href: '/admin/yedek-parcalar' },
    { label: 'SEO Kaydı',   value: counts.seo,         icon: <Search size={20} />,   color: '#7c3aed', bg: '#f5f3ff', href: '/admin/seo' },
  ];

  return (
    <div>
      <AdminPageHeader title="Dashboard" sub="Trambolinpark yönetim paneline hoş geldiniz." />

      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {cards.map(card => (
            <a key={card.label} href={card.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 12, padding: '1.5rem', transition: 'box-shadow .15s, border-color .15s', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,.08)'; e.currentTarget.style.borderColor = card.color; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e8e8e8'; }}>
                <div style={{ background: card.bg, color: card.color, width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  {card.icon}
                </div>
                <p style={{ color: '#1a1a1a', fontSize: 28, fontWeight: 800, margin: 0 }}>{card.value}</p>
                <p style={{ color: '#888', fontSize: 12, margin: '4px 0 0' }}>{card.label}</p>
              </div>
            </a>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 12, padding: '1.5rem' }}>
          <p style={{ color: '#aaa', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 12px' }}>Hızlı Bağlantılar</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              { label: 'Siteyi Aç', href: 'https://trambolinpark.com' },
              { label: 'Ürünler Sayfası', href: '/urunler' },
              { label: 'Yedek Parçalar', href: '/yedek-parcalar' },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8, background: '#f5f5f5', color: '#555', fontSize: 12, fontWeight: 600, textDecoration: 'none', border: '1px solid #e8e8e8' }}>
                {link.label} <ExternalLink size={11} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
