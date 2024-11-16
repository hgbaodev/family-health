import { Layout } from "antd";

const { Footer } = Layout;

const FooterLayout = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      Copyright © {new Date().getFullYear()} Created by <span className="font-bold">hgbaodev</span>
    </Footer>
  );
};

export default FooterLayout;
