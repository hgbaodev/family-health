import { create } from 'zustand';

export const useContactsStore = create((set) => ({
  contact: null,
  setContact: (contact) => set({ contact }), 
}));