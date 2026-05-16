import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import { User as UserIcon, Lock, LogOut, Check } from 'lucide-react';

export default function Hesabim() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameSuccess, setNameSuccess] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [nameError, setNameError] = useState('');
  const [pwError, setPwError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { navigate('/giris'); return; }
      setUser(data.user);
      setFullName(data.user.user_metadata?.full_name ?? '');
    });
  }, []);

  const updateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setNameError(''); setNameSuccess(false);
    const { error } = await supabase.auth.updateUser({ data: { full_name: fullName } });
    if (error) setNameError(error.message);
    else setNameSuccess(true);
    setLoading(false);
  };

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(''); setPwSuccess(false);
    if (newPassword !== confirmPassword) { setPwError('Şifreler eşleşmiyor.'); return; }
    if (newPassword.length < 6) { setPwError('Şifre en az 6 karakter olmalı.'); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) setPwError(error.message);
    else { setPwSuccess(true); setNewPassword(''); setConfirmPassword(''); }
    setLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', paddingTop: 'calc(76px + 2rem)', paddingBottom: '3rem' }}>
      <div className="container" style={{ maxWidth: 640 }}>

        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.15em', color: '#5c9200', marginBottom: 4 }}>Hesabım</p>
            <h1 style={{ fontSize: 24, fontWeight: 900, fontFamily: 'Poppins, sans-serif', color: '#1a1a1a', margin: 0 }}>
              {user.user_metadata?.full_name || 'Profilim'}
            </h1>
            <p style={{ fontSize: 13, color: '#aaa', margin: 0 }}>{user.email}</p>
          </div>
          <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 100, border: '1.5px solid #e0e0e0', background: '#fff', color: '#888', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#dc2626'; (e.currentTarget as HTMLElement).style.color = '#dc2626'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e0e0e0'; (e.currentTarget as HTMLElement).style.color = '#888'; }}>
            <LogOut size={14} /> Çıkış
          </button>
        </div>

        {/* Ad Soyad */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #ebebeb', padding: '1.75rem', marginBottom: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,.04)' }}>
          <div className="d-flex align-items-center gap-2 mb-4">
            <span style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(92,146,0,.08)', border: '1px solid rgba(92,146,0,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserIcon size={15} color="#5c9200" />
            </span>
            <h2 style={{ fontSize: 15, fontWeight: 800, margin: 0, color: '#1a1a1a' }}>Profil Bilgileri</h2>
          </div>

          {nameError && <div style={{ background: '#fff5f5', border: '1px solid #fecaca', color: '#dc2626', borderRadius: 8, padding: '8px 12px', fontSize: 13, marginBottom: 12 }}>{nameError}</div>}
          {nameSuccess && <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', borderRadius: 8, padding: '8px 12px', fontSize: 13, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}><Check size={14} /> Profil güncellendi.</div>}

          <form onSubmit={updateName}>
            <div className="mb-3">
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6 }}>Ad Soyad</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required
                className="form-control" style={{ borderRadius: 10, fontSize: 14, padding: '10px 14px' }} />
            </div>
            <div className="mb-1">
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6 }}>E-posta</label>
              <input type="email" value={user.email} readOnly
                className="form-control" style={{ borderRadius: 10, fontSize: 14, padding: '10px 14px', background: '#fafafa', color: '#aaa' }} />
            </div>
            <p style={{ fontSize: 11, color: '#bbb', marginBottom: '1.25rem' }}>E-posta adresi değiştirilemez.</p>
            <button type="submit" disabled={loading}
              style={{ padding: '10px 24px', borderRadius: 10, border: 'none', background: '#c3e92d', color: '#0a0a0a', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>
              Kaydet
            </button>
          </form>
        </div>

        {/* Şifre değiştir */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #ebebeb', padding: '1.75rem', boxShadow: '0 2px 12px rgba(0,0,0,.04)' }}>
          <div className="d-flex align-items-center gap-2 mb-4">
            <span style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(92,146,0,.08)', border: '1px solid rgba(92,146,0,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={15} color="#5c9200" />
            </span>
            <h2 style={{ fontSize: 15, fontWeight: 800, margin: 0, color: '#1a1a1a' }}>Şifre Değiştir</h2>
          </div>

          {pwError && <div style={{ background: '#fff5f5', border: '1px solid #fecaca', color: '#dc2626', borderRadius: 8, padding: '8px 12px', fontSize: 13, marginBottom: 12 }}>{pwError}</div>}
          {pwSuccess && <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', borderRadius: 8, padding: '8px 12px', fontSize: 13, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}><Check size={14} /> Şifre güncellendi.</div>}

          <form onSubmit={updatePassword}>
            <div className="mb-3">
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6 }}>Yeni Şifre</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={6}
                className="form-control" style={{ borderRadius: 10, fontSize: 14, padding: '10px 14px' }}
                placeholder="En az 6 karakter" />
            </div>
            <div className="mb-4">
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6 }}>Şifre Tekrar</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required
                className="form-control" style={{ borderRadius: 10, fontSize: 14, padding: '10px 14px' }}
                placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading}
              style={{ padding: '10px 24px', borderRadius: 10, border: 'none', background: '#1a1a1a', color: '#fff', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>
              Şifreyi Güncelle
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
