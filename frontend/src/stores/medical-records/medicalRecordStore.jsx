import { create } from "zustand";

export const useMedicalRecordsStore = create((set) => ({
  medicalRecord: null,
  openCreateModal: false,
  openUpdateModal: false,
  openDeleteModal: false,
  setMedicalRecord: (medicalRecord) => set({ medicalRecord }),
  setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
  setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
  setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),
}));
