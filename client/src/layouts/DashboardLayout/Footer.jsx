import { Footer } from "antd/es/layout/layout";

const FooterLayout = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      Copyright © {new Date().getFullYear()} Information Technology Faculty,
      Saigon University
    </Footer>
  );
};

export default FooterLayout;
