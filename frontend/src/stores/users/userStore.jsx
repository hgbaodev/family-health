import { create } from 'zustand';

export const useUsersStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }), 
}));