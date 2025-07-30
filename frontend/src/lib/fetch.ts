import { getToken } from '../api/hooks/useAuth';

export async function apiFetch<T>(input: RequestInfo, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...(init.headers || {})
    }
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json() as Promise<T>;
}