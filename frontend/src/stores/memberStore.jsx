import { create } from "zustand";

export const useMembersStore = create((set) => ({
  memberDetail: {
    id: 1,
    user: {
      id: 2,
      firstName: null,
      lastName: null,
    },
    fullName: "Nguyễn Văn Mười",
    dateOfBirth: "1990-06-23",
    gender: "Nam",
    relationship: "Cha",
    bloodType: "O",
    height: 175.5,
    weight: 70.0,
  },
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
