import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import APIPATH from '../APIPATH';
import { apiFetch } from '../../lib/fetch';

type Role = 'learner' | 'admin';

interface AuthContext {
  token: string | null;
  role: Role | null;
  login: (email: string, password: string) => Promise<Role>;
  logout: () => void;
}

const Ctx = createContext<AuthContext>(null as unknown as AuthContext);
export const useAuth = () => useContext(Ctx);
export const getToken = () => localStorage.getItem('jwt');

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem('jwt')
  );
  const [role, setRole] = useState<Role | null>(() =>
    localStorage.getItem('role') as Role | null
  );

  /** sign in – return the role so caller can redirect immediately */
  async function login(email: string, password: string): Promise<Role> {
    const { token, user } = await apiFetch<{
      token: string;
      user: { role: Role };
    }>(APIPATH.AUTH.LOGIN(), {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    localStorage.setItem('jwt', token);
    localStorage.setItem('role', user.role);
    setToken(token);
    setRole(user.role);
    return user.role;
  }

  function logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
  }

  /** keep context in sync with tab refresh (optional) */
  useEffect(() => {
    setToken(localStorage.getItem('jwt'));
    setRole(localStorage.getItem('role') as Role | null);
  }, []);

  return (
    <Ctx.Provider value={{ token, role, login, logout }}>
      {children}
    </Ctx.Provider>
  );
}
