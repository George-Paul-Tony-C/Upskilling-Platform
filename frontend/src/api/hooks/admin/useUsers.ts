/*================================================================
  1. src/api/hooks/admin/useUsers.ts
================================================================*/
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import APIPATH from '../../APIPATH';
import { apiFetch } from '../../../lib/fetch';
import type { User } from '../../../types';

export function useUsers() {
  const qc = useQueryClient();

  const list = useQuery({
    queryKey: ['adminUsers'],
    queryFn: () => apiFetch<User[]>(APIPATH.ADMIN.USERS())
  });

  const create = useMutation({
    mutationFn: (u: Partial<User>) =>
      apiFetch<User>(APIPATH.ADMIN.USERS(), {
        method: 'POST',
        body: JSON.stringify(u)
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['adminUsers'] })
});

const update = useMutation({
    mutationFn: (u: Partial<User> & { id: string }) =>
        apiFetch<User>(APIPATH.ADMIN.USER(u.id), {
            method: 'PUT',
            body: JSON.stringify(u)
        }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['adminUsers'] })
});

const remove = useMutation({
    mutationFn: (id: string) =>
        apiFetch<void>(APIPATH.ADMIN.USER(id), { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['adminUsers'] })
  });

  return { list, create, update, remove };
}