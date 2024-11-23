import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import ResponsiveSider from "./Sider";
import HeaderLayout from "./Header";
// import FooterLayout from "./Footer";


const HorizontalLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout hasSider className="h-screen">
      <ResponsiveSider collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <HeaderLayout collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="px-3 py-3 content overflow-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HorizontalLayout;
