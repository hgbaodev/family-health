import { Button, Layout, Space, Typography } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import logo from "../../assets/logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  GithubOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "~/stores/authStore";
import LanguageSwitcher from "~/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const { Header } = Layout;

const HomeLayout = () => {
  const { isAuthenticated } = useAuthStore();
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <Layout className="min-h-screen bg-gradient-to-b">
      <Header className="flex justify-between items-center bg-white shadow-md px-4 md:px-8">
        <div className="flex items-center">
          <img
            src={logo}
            alt="logo"
            className="w-20 h-20 transition-transform duration-300 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <span className="text-xs md:text-2xl font-bold text-primary">
            FamilyHealth
          </span>
        </div>
        <div>
          <Space>
            <LanguageSwitcher />
            {isAuthenticated ? (
              <Button
                type="primary"
                className="transition-colors duration-300"
                onClick={() => navigate("/manager")}
              >
                Dashboard
              </Button>
            ) : (
              <Button
                type="primary"
                className="transition-colors duration-300"
                onClick={() => navigate("/auth/login")}
              >
                {t("LandingPage.Login")}
              </Button>
            )}
          </Space>
        </div>
      </Header>
      <Content className="p-4 md:p-8 lg:p-16">
        <Outlet />
      </Content>
      <Footer className="text-center bg-white py-4 md:py-8">
        <div className="mb-4">
          <Space size="large">
            <Link to="https://github.com/hgbaodev">
              <GithubOutlined className="text-xl md:text-2xl transition-colors duration-300 cursor-pointer" />
            </Link>
            <Link to="https://x.com/hgbaodev">
              <TwitterOutlined className="text-xl md:text-2xl transition-colors duration-300 cursor-pointer" />
            </Link>
            <Link to="https://www.facebook.com/fanpage.hgbaodev">
              <FacebookOutlined className="text-xl md:text-2xl transition-colors duration-300 cursor-pointer" />
            </Link>
          </Space>
        </div>
        <Typography.Text className="text-gray-600 text-sm md:text-base">
          Ant Design ©{new Date().getFullYear()} Created by{" "}
          <span className="font-bold">hgbaodev</span>
        </Typography.Text>
      </Footer>
    </Layout>
  );
};

export default HomeLayout;