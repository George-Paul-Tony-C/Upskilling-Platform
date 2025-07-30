import { mockUsers } from '../mockData';
import { User } from '../../types';

export const userRepo = {
  findById: (id: string): User | undefined => mockUsers.find(u => u.id === id),
  findByEmail: (email: string): User | undefined => mockUsers.find(u => u.email === email),
  findAll: (): User[] => mockUsers
};