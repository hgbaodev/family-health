import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,

  openUpdateModal: false,

  setUser: (user) => set({ user }),

  setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),

}));
// export default useUserStore;

