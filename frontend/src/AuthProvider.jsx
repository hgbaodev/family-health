/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Loader from "~/components/Loader";
import { api } from "~/config/api";
import { useAuthStore } from "~/stores/authStore";

const AuthProvider = ({ children }) => {
  const { isLoaded, setUser, setIsLoaded, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/auth/me");
        const userData = response.data;
        setUser(userData?.user);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchUserData();

    return () => {};
  }, []);

  if (!isLoaded) {
    return <Loader />;
  }

  return children;
};

export default AuthProvider;
