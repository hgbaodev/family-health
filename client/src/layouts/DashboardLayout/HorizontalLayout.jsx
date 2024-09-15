import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import FooterLayout from "~/layouts/DashboardLayout/Footer";
import HeaderLayout from "~/layouts/DashboardLayout/Header";
import ResponsiveSider from "~/layouts/DashboardLayout/Sider";

const HorizontalLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout hasSider>
      <ResponsiveSider collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <HeaderLayout collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="px-6 py-6">
          <Outlet />
        </Content>
        <FooterLayout />
      </Layout>
    </Layout>
  );
};

export default HorizontalLayout;
