import { create } from "zustand";

export const useNotesStore = create((set) => ({
  note: null,
  openCreateModal: false,
  openUpdateModal: false,
  openDeleteModal: false,
  setNote: (note) => set({ note }),
  setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
  setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
  setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),
}));
