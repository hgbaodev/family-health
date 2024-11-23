import { ConfigProvider, App as AntApp } from "antd";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeRoutes } from "./routes";
import "./i18n";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_OAUTH_CLIENT_ID } from "~/config/env";
import { useMe } from "~/api/auth/me";
import { useAuthStore } from "~/stores/authStore";
import { useEffect } from "react";

// Cấu hình QueryClient với options phù hợp
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1,
//       refetchOnWindowFocus: false,
//       staleTime: 5 * 60 * 1000, // 5 phút
//     },
//   },
// });

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(ThemeRoutes);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Inter",
          borderRadius: 6,
          controlHeight: 34,
          colorPrimary: "#00A76F",
          colorLinkHover: "#007867",
        },
        components: {
          Table: {
            defaultProps: {
              size: "middle",
              bordered: true,
            },
          },
        },
        hashed: false,
      }}
    >
      <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AntApp>
              <RouterProvider router={router} />
            </AntApp>
          </AuthProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </ConfigProvider>
  );
}

const AuthProvider = ({ children }) => {
  const { data, isSuccess, isFetching } = useMe();

  const { setIsAuthenticated, setUser } = useAuthStore((state) => state);

  useEffect(() => {
    if (isSuccess && data) {
      setIsAuthenticated(true);
      setUser(data.user);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [isSuccess, data, setIsAuthenticated, setUser]);

  if (isFetching) {
    return null;
  }

  return children;
};

export default App;