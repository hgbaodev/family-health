import { create } from 'zustand';

export const useAppointmentsStore = create((set) => ({
  appointment: null,
  openCreateModal: false,
  openUpdateModal: false,
  openDeleteModal: false,
  setAppointment: (appointment) => set({ appointment }), 
  setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
  setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
  setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),
}));