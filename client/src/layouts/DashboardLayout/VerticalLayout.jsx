import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import MenuCustom from "~/layouts/DashboardLayout/Menu";
import UserDropdown from "~/layouts/DashboardLayout/UserDropdown";

const VerticalLayout = () => {
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 9,
        }}
        className="shadow-sm"
      >
        <h2 className="font-extrabold text-2xl text-primary d-inline me-4">
          FIT - SGU
        </h2>
        <MenuCustom
          mode="horizontal"
          theme="light"
          className="flex-1 min-w-0"
        />
        <UserDropdown />
      </Header>
      <Content className="px-16 py-6">
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default VerticalLayout;
