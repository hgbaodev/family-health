import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "~/store";
import Cookies from "js-cookie";
import LoaderScreen from "~/components/LoaderScreen";

const GuestGuard = () => {
  const { user, isInitialized } = useSelector((state) => state.auth);
  const cookies = Cookies.get("access_token");
  if (cookies && !isInitialized) return <LoaderScreen />;
  if (user) return <Navigate to="/" />;
  return <Outlet />;
};

export default GuestGuard;
