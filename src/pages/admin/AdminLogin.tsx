import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError('E-posta veya şifre hatalı.');
    setLoading(false);
  };

  return (
    <div data-admin style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 400, padding: '0 1rem' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '2.5rem', border: '1px solid #e8e8e8', boxShadow: '0 4px 24px rgba(0,0,0,.06)' }}>
          <div className="text-center mb-4">
            <img src="/logo-dark.png" alt="Trambolinpark" style={{ height: 40, objectFit: 'contain', marginBottom: 12 }} />
            <p style={{ color: '#888', fontSize: 13, margin: 0 }}>Yönetim Paneli</p>
          </div>

          {error && (
            <div className="alert mb-3" style={{ background: '#fff5f5', border: '1px solid #fecaca', color: '#dc2626', borderRadius: 8, fontSize: 13 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label style={{ color: '#555', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>E-POSTA</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="form-control" style={{ borderRadius: 8, fontSize: 14 }}
                placeholder="admin@trambolinpark.com" />
            </div>
            <div className="mb-4">
              <label style={{ color: '#555', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>ŞİFRE</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                className="form-control" style={{ borderRadius: 8, fontSize: 14 }}
                placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading} className="btn w-100 fw-black"
              style={{ background: '#c3e92d', color: '#0a0a0a', borderRadius: 8, padding: '10px', border: 'none' }}>
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
