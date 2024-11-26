import { create } from "zustand";

export const useMembersStore = create((set) => ({
  memberDetail: null,
  setMemberDetail: (memberDetail) => set({ memberDetail }),
  clearMemberDetail: () => set({ memberDetail: null }),
  member: null,
  openCreateModal: false,
  openUpdateModal: false,
  openDeleteModal: false,
  setMember: (member) => set({ member }),
  setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
  setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
  setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),
}));
