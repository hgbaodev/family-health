import { ConfigProvider } from "antd";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeRoutes } from "./routes";
import { App as AntApp } from "antd";
import { dispatch } from "~/store";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { fetchUser, setInitialized } from "~/store/slices/AuthSlice";

function App() {
  const router = createBrowserRouter(ThemeRoutes);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      dispatch(fetchUser());
    } else {
      dispatch(setInitialized(true));
    }
  }, []);

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
              scroll: { x: true },
            },
          },
        },
        hashed: false,
      }}
    >
      <AntApp>
        <RouterProvider router={router} />
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
