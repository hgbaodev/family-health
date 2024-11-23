import { create } from "zustand";
import { message } from "antd";

export const useMedicalRecordsStore = create((set) => ({
  medicalRecord: null,
  openCreateModal: false,
  openUpdateModal: false,
  openDeleteModal: false,
  listMedication: [],
  listDocument: [],
  
  setMedicalRecord: (medicalRecord) => set({ medicalRecord }),
  setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
  setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
  setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),
  setListDocument: (listDocument) => set({ listDocument }),
  clearListDocument: () => set({ listDocument: [] }),
  setListMedication: (listMedication) => set({ listMedication }),
  clearListMedication: () => set({ listMedication: [] }),
  addMedication: () => set((state) => ({
    listMedication: [
      ...state.listMedication,
      {
        position: state.listMedication.length + 1,
        name: "",
        frequency: "",
        startDate: "",
        endDate: "",
      },
    ],
  })),

  removeMedication: (position) => set((state) => ({
    listMedication: state.listMedication.filter((form) => form.position !== position),
  })),

  handleInputMedicationChange: (position, field, value) => set((state) => ({
    listMedication: state.listMedication.map((form) =>
      form.position === position ? { ...form, [field]: value } : form
    ),
  })),

  handleFileChange: (position, file) => set((state) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      message.error("File không được vượt quá 5MB");
      return;
    }

    return {
      listDocument: state.listDocument.map((document) =>
        document.position === position
          ? {
              ...document,
              name: file.name,
              type: file.type,
              size: file.size,
              path: URL.createObjectURL(file),
            }
          : document
      ),
    };
  }),

  handleUrlFileChange: (position, url) => set((state) => ({
    listDocument: state.listDocument.map((document) =>
      document.position === position ? { ...document, path: url } : document
    ),
  })),

  handleInputDocumentChange: (position, field, value) => set((state) => ({
    listDocument: state.listDocument.map((document) =>
      document.position === position ? { ...document, [field]: value } : document
    ),
  })),
  addDocument: () => set((state) => ({
    listDocument: [
      ...state.listDocument,
      {
        position: state.listDocument.length + 1,
        name: "",
        type: "",
        size: 0,
        path: "",
      },
    ],
  })),
  removeDocument: (position) => set((state) => ({
    listDocument: state.listDocument.filter((doc) => doc.position !== position),
  })),

}));