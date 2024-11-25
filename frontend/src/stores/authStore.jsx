import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLoaded: false,
  isAuthenticated: false,
  user: null,
  setIsLoaded: (isLoaded) => set({ isLoaded }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setUser: (user) => set({ user }),
  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
