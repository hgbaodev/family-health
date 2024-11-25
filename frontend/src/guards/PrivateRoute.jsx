import { Navigate } from "react-router-dom";
import { useAuthStore } from "~/stores/authStore";

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated } = useAuthStore((state) => state);
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  return <Component />;
};

export default PrivateRoute;