import { create } from 'zustand';

export const useVaccinationsStore = create((set) => ({
  vaccination: null,
  openCreateModal: false,
  openUpdateModal: false,
  openDeleteModal: false,
  setVaccination: (vaccination) => set({ vaccination }), 
  setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
  setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
  setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),
}));