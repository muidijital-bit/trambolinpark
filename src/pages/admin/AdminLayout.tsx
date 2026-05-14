import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LayoutDashboard, Package, Wrench, Search, LogOut, ChevronRight } from 'lucide-react';

const NAV = [
  { to: '/admin',              label: 'Dashboard',     icon: <LayoutDashboard size={16} />, end: true },
  { to: '/admin/urunler',      label: 'Ürünler',       icon: <Package size={16} /> },
  { to: '/admin/yedek-parcalar', label: 'Yedek Parçalar', icon: <Wrench size={16} /> },
  { to: '/admin/seo',          label: 'SEO Ayarları',  icon: <Search size={16} /> },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f0f' }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: '#141414', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid #222' }}>
          <p className="fw-black mb-0" style={{ color: '#fff', fontSize: 15, letterSpacing: '-.02em' }}>Trambolinpark</p>
          <p style={{ color: '#555', fontSize: 11, margin: 0 }}>Yönetim Paneli</p>
        </div>

        <nav style={{ flex: 1, padding: '1rem 0.75rem' }}>
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 8,
                marginBottom: 2,
                color: isActive ? '#c3e92d' : '#888',
                background: isActive ? 'rgba(195,233,45,.08)' : 'transparent',
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 600,
                transition: 'all .15s',
              })}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '0.75rem', borderTop: '1px solid #222' }}>
          <button
            onClick={logout}
            style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 12px', borderRadius: 8, background: 'transparent', border: 'none', color: '#666', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            <LogOut size={16} /> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}

export function AdminPageHeader({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#141414' }}>
      <div>
        <h1 style={{ color: '#fff', fontSize: 18, fontWeight: 800, margin: 0, letterSpacing: '-.02em' }}>{title}</h1>
        {sub && <p style={{ color: '#555', fontSize: 12, margin: '2px 0 0' }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function AdminBreadcrumb({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 12 }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {i > 0 && <ChevronRight size={12} />}
          <span style={{ color: i === items.length - 1 ? '#aaa' : '#555' }}>{item}</span>
        </span>
      ))}
    </div>
  );
}
