import { Footer } from "antd/es/layout/layout";

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
