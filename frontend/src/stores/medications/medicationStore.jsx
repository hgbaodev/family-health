import { create } from 'zustand';

export const useMedicationsStore = create((set) => ({
  medication: null,
  openCreateModal: false,
  openUpdateModal: false,
  openDeleteModal: false,
  setMedication: (medication) => set({ medication }),
  setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
  setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
  setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),
}));