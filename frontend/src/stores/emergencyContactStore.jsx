import { create } from 'zustand';

export const useEmergencyContactStore = create((set) => ({
  emergencyContact: null,
  openCreateModal: false,
  openUpdateModal: false,
  openDeleteModal: false,
  setEmergencyContact: (emergencyContact) => set({ emergencyContact }),
  setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
  setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
  setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),
}));