import { useLayoutEffect } from "react";
import { useMe } from "~/api/auth/me";
import { useAuthStore } from "~/stores/auth/authStore";

const Root = ({ children }) => {
  const { isLoaded } = useAuthStore((state) => state);
  const mutation = useMe();

  useLayoutEffect(() => {
    if (!isLoaded) {
      const fetchUser = async () => {
        await mutation.mutate();
      };
      fetchUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoaded) {
    return null;
  }

  return children;
};

export default Root;