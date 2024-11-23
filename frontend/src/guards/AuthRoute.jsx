import { Navigate } from "react-router-dom";
import { useAuthStore } from "~/stores/authStore";

const AuthRoute = ({ component: Component }) => {
  const { isAuthenticated } = useAuthStore((state) => state);

  if (isAuthenticated) {
    return <Navigate to="/manager" replace={true} />;
  }
  return <Component />;
};

export default AuthRoute;