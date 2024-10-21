import { create } from "zustand";

export const useDocumentsStore = create((set) => ({
  document: null,
  openCreateModal: false,
  openUpdateModal: false,
  openDeleteModal: false,
  setDocument: (document) => set({ document }),
  setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
  setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
  setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),
}));
