import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LayoutDashboard, Package, Wrench, Search, LogOut, ChevronRight, BookOpen } from 'lucide-react';

const NAV = [
  { to: '/admin',                label: 'Dashboard',       icon: <LayoutDashboard size={16} />, end: true },
  { to: '/admin/urunler',        label: 'Ürünler',         icon: <Package size={16} /> },
  { to: '/admin/yedek-parcalar', label: 'Yedek Parçalar',  icon: <Wrench size={16} /> },
  { to: '/admin/blog',           label: 'Blog',            icon: <BookOpen size={16} /> },
  { to: '/admin/seo',            label: 'SEO Ayarları',    icon: <Search size={16} /> },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div data-admin style={{ display: 'flex', minHeight: '100vh', background: '#f5f7fa' }}>
      {/* Sidebar */}
      <aside style={{ width: 230, background: '#fff', borderRight: '1px solid #e8e8e8', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: '1.25rem 1.25rem', borderBottom: '1px solid #f0f0f0' }}>
          <img src="/logo-dark.png" alt="Trambolinpark" style={{ height: 32, objectFit: 'contain' }} />
          <p style={{ color: '#aaa', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '6px 0 0' }}>Yönetim Paneli</p>
        </div>

        <nav style={{ flex: 1, padding: '1rem 0.75rem' }}>
          {NAV.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 8, marginBottom: 2,
                color: isActive ? '#3a7500' : '#666',
                background: isActive ? '#f0f7e6' : 'transparent',
                textDecoration: 'none', fontSize: 13, fontWeight: 600,
                transition: 'all .15s',
              })}>
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '0.75rem', borderTop: '1px solid #f0f0f0' }}>
          <button onClick={logout}
            style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 12px', borderRadius: 8, background: 'transparent', border: 'none', color: '#aaa', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
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
    <div style={{ padding: '1.25rem 2rem', borderBottom: '1px solid #ebebeb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
      <div>
        <h1 style={{ color: '#1a1a1a', fontSize: 18, fontWeight: 800, margin: 0, letterSpacing: '-.02em' }}>{title}</h1>
        {sub && <p style={{ color: '#aaa', fontSize: 12, margin: '2px 0 0' }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function AdminBreadcrumb({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#aaa', fontSize: 12 }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {i > 0 && <ChevronRight size={12} />}
          <span style={{ color: i === items.length - 1 ? '#555' : '#aaa' }}>{item}</span>
        </span>
      ))}
    </div>
  );
}
