import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    try { setUser(await api('/profile')); } catch { setUser(null); } finally { setLoading(false); }
  };
  useEffect(() => { refreshProfile(); }, []);
  const logout = async () => { await api('/logout'); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, refreshProfile, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
