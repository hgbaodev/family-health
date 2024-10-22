export const fileExtensions = [
  {
    value: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    label: "Word (.docx)",
  },
  {
    value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    label: "Excel (.xlsx)",
  },
  {
    value: "application/pdf",
    label: "PDF (.pdf)",
  },
  {
    value: "image/jpeg",
    label: "JPEG Image (.jpg)",
  },
  {
    value: "image/png",
    label: "PNG Image (.png)",
  },
  {
    value: "text/plain",
    label: "Text (.txt)",
  },
  {
    value: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    label: "PowerPoint (.pptx)",
  },
  {
    value: "application/zip",
    label: "ZIP Archive (.zip)",
  },
];
export const getFileExtension = (mimeType) => {
  const fileExt = fileExtensions.find(ext => ext.value === mimeType);
  return fileExt ? fileExt.label : "Unknown";
};
