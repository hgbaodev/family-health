import { useMutation } from '@tanstack/react-query';
import { api } from '~/config/api';

const createPayment = () => {
  return api('/payments/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export const useCreatePayment = ({ mutaconfig }) => {
  return useMutation({
    mutationFn: createPayment,
    ...mutaconfig
  })
};