import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  isLoaded: false,
  user: null,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setIsLoaded: (isLoaded) => set({ isLoaded }),
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));