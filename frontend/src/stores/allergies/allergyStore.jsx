import { create } from "zustand";

export const useAllergiesStore = create((set) => ({
  allergy: null,
  openCreateModal: false,
  openUpdateModal: false,
  openDeleteModal: false,
  setAllergy: (allergy) => set({ allergy }),
  setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
  setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
  setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),
}));
