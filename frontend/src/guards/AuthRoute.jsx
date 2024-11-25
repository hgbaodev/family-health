import { Navigate } from "react-router-dom";
import { useAuthStore } from "~/stores/authStore";

const AuthRoute = ({ component: Component }) => {
  const { isAuthenticated, user } = useAuthStore((state) => state);

  if (isAuthenticated) {
    if(user.role === 'USER'){
      return <Navigate to="/manager" replace={true} />;
    } 
    if(user.role === 'ADMIN'){
      return <Navigate to="/admin" replace={true} />;
    }
  }
  return <Component />;
};

export default AuthRoute;