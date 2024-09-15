import { Navigate, Outlet } from "react-router-dom";
import LoaderScreen from "~/components/LoaderScreen";
import { useSelector } from "~/store";

const AuthGuard = () => {
  const { user, isInitialized } = useSelector((state) => state.auth);
  if (!isInitialized) return <LoaderScreen />;
  if (!user) return <Navigate to="/auth/login" />;
  return <Outlet />;
};

export default AuthGuard;
