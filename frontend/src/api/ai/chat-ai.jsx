import { useMutation } from "@tanstack/react-query";
import { api } from "~/config/api";

export const chatAi = ({
  question,
}) => {
  return api.post(`/openai/ask`, {
    question,
  });
}

export const useChatAi = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  return useMutation({
    mutationFn: chatAi,
    onSuccess: (data, ...args) => {
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};