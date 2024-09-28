import { useMutation } from "@tanstack/react-query";
import { api } from "~/axios/api";

export const createMember = ({
  gender,
  weight,
  fullName,
  dateOfBirth,
  bloodType,
  relationship,
  height
}) => {
  return api.post(`/members`, {
    gender,
    weight,
    fullName,
    dateOfBirth,
    bloodType,
    relationship,
    height
  });
};

export const useCreateMember = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  return useMutation({
    mutationFn: createMember,
    onSuccess: (data, ...args) => {
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};