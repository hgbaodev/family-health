import { startTransition } from "react";
import { Navigate } from "react-router-dom";
import { useMe } from "~/api/auth/me";
import { useAuthStore } from "~/stores/auth/authStore";

const PrivateRoute = ({ component: Component }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const { isError } = useMe({
    onSuccess: (data) => {
      startTransition(() => {
        setUser(data.data);
      });   
    },  
  });

  if (isError) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Component />;
};

export default PrivateRoute;