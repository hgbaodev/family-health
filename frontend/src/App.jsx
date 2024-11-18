import { ConfigProvider, App as AntApp } from "antd";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeRoutes } from "./routes";
import "./i18n";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_OAUTH_CLIENT_ID } from "~/config/env";

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
          colorPrimary: '#00A76F',
          colorLinkHover: '#007867',
        },
        components: {
          Table: {
            defaultProps: {
              size: 'middle',
              bordered: true,
            },
          },
        },
        hashed: false,
      }}
    >
    <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <AntApp>
          <RouterProvider router={router} />
        </AntApp>
      </QueryClientProvider>
    </GoogleOAuthProvider>
    </ConfigProvider>
  );
}

export default App;
