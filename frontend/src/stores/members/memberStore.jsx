import { create } from 'zustand';

export const useMembersStore = create((set) => ({
  member: null,
  openCreateModal: false,
  openUpdateModal: false,
  openDeleteModal: false,
  setMember: (member) => set({ member }), 
  setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
  setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
  setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),
}));