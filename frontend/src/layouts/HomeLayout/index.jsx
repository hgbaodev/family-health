import { Button, Layout, Space, Typography } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import logo from "../../assets/logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  GithubOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const HomeLayout = () => {

  const navigate = useNavigate();

  return (
    <Layout className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Header className="flex justify-between items-center bg-white shadow-md">
        <div className="flex items-center">
          <img
            src={logo}
            alt="logo"
            className="w-12 h-12 transition-transform duration-300 hover:scale-110"
          />
          <span className="text-2xl font-bold ml-2 text-green-600">
            FamilyHealth
          </span>
        </div>
        <div>
          <Space>
            <Button
              type="primary"
              className="bg-green-500 hover:bg-green-600 transition-colors duration-300"
              onClick={() => navigate("/auth/login")}   
            >
              Login
            </Button>
          </Space>
        </div>
      </Header>
      <Content className="p-8 md:p-16">
        <Outlet />
      </Content>
      <Footer className="text-center bg-white py-8">
        <div className="mb-4">
          <Space size="large">
            <Link to="https://github.com/hgbaodev">
              <GithubOutlined className="text-2xl hover:text-blue-500 transition-colors duration-300 cursor-pointer" />
            </Link>
            <Link to="https://x.com/hgbaodev">
              <TwitterOutlined className="text-2xl hover:text-blue-500 transition-colors duration-300 cursor-pointer" />
            </Link>
            <Link to="https://www.facebook.com/fanpage.hgbaodev">
              <FacebookOutlined className="text-2xl hover:text-blue-500 transition-colors duration-300 cursor-pointer" />
            </Link>
          </Space>
        </div>
        <Typography.Text className="text-gray-600">
          Ant Design ©{new Date().getFullYear()} Created by{" "}
          <span className="font-bold">hgbaodev</span>
        </Typography.Text>
      </Footer>
    </Layout>
  );
};

export default HomeLayout;
