import { create } from 'zustand';

export const useHealthStatsStore = create((set) => ({
  healthStat: null,
  openCreateModal: false,
  openUpdateModal: false,
  openDeleteModal: false,
  setHealthStat:(healthStat) => set({ healthStat }),
  setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
  setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
  setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),
}));