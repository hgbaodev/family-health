import { create } from 'zustand';

export const useMembersStore = create((set) => ({
  members: [],
  isLoading: false,
  error: null,
  setMembers: (members) => set({ members }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  openCreateModal: false,
  openUpdateModal: false,
  openDeleteModal: false,
  setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
  setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
  setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),
}));