import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../api/hooks/useAuth';
import { Mail, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const nav = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const role = await login(email, password);
      nav(role === 'admin' ? '/admin' : '/learner', { replace: true });
    } catch {
      setError('Invalid credentials');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#071135] to-[#021028] p-4">
      {/* card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs sm:max-w-sm bg-[#031236]/40 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-9 text-white"
      >
        {/* logo */}
        <div className="flex flex-col items-center space-y-2">
          
            <div className="relative w-20 h-15 select-none">
              {/* left vertical bar */}
              <span className="absolute left-2 top-0 h-full w-[15%] bg-gradient-to-b from-[#ff445c] from-50% to-blue-800 to-50% rotate-[17deg] origin-bottom rounded-tl-xl rounded-br-xl" />
              {/* horizontal bar */}
              <span className="absolute inset-0 top-1/2 -translate-y-1/2 h-[20%] w-full bg-gradient-to-r from-[#ff445c]  via-[#ffb400] to-[#ff445c] rotate-[0deg] origin-left rounded-tl-xl rounded-br-xl" />
              {/* right vertical bar */}
              <span className="absolute right-6 top-0 h-full w-[15%] bg-[#ffb400] rotate-[17deg] origin-bottom rounded-tl-xl rounded-br-xl" />
            </div>

          <h1 className="text-3xl font-bold tracking-wide">HEXAWARE</h1>
        </div>

        <h2 className="text-4xl font-bold text-center">Login</h2>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {/* email */}
        <label className="relative block">
          <Mail
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-transparent border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            required
          />
        </label>

        {/* password */}
        <label className="relative block">
          <KeyRound
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-transparent border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            required
          />
        </label>

        {/* submit */}
        <button
          type="submit"
          className="w-full text-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:to-blue-600 py-2 rounded-lg font-semibold shadow-md transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-blue-300 hover:text-blue-400 cursor-pointer">
          Forgot password?
        </p>
      </form>
    </div>
  );
}
