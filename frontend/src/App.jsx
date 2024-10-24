import { ConfigProvider, App as AntApp } from "antd";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeRoutes } from "./routes";
import "./i18n";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(ThemeRoutes);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Inter",
          borderRadius: 4,
          controlHeight: 37,
        },
        components: {
          Table: {
            defaultProps: {
              size: "middle",
              bordered: true,
              scroll: { x: 'max-content' },
            },
          },
        },
        hashed: false,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AntApp>
          <RouterProvider router={router} />
        </AntApp>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
