
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { getEmergencyContactsQueryOptions } from "~/api/emergency-contacts/get-emergencyContacts";
  import { api } from "~/config/api";

  export const createEmergencyContact = ({
    userID,
    name,
    relationship,
    phoneNumber
  }) => {
    return api.post(`/emergencyContacts`, {
      userID,
      name,
      relationship,
      phoneNumber
    });
  };

  export const useCreateEmergenceContact = (options = {}) => {
    const { onSuccess, onError, ...restConfig } = options;

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createEmergencyContact,
        onSuccess: (data, ...args) => {
          queryClient.invalidateQueries({
            queryKey: getEmergencyContactsQueryOptions.queryKey,
          });
          onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
          onError?.(error, ...args);
        },
        ...restConfig,
            });
  };