import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Row className="h-screen overflow-hidden justify-center">
      <div className="absolute inset-0 z-[-1] blur-[70px] overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-100 rounded-full opacity-100" />
        <div className="absolute bottom-[180px] w-[250px] h-[250px] bg-yellow-100 rounded-full ml-20 opacity-100" />
        <div className="absolute bottom-0 left-[-50px] w-[200px] h-[200px] bg-red-200 rounded-full opacity-100" />
      </div>
      <Col xs={22} md={12} xl={8} className="flex items-center justify-center">
        <Outlet />
      </Col>
    </Row>
  );
};

export default AuthLayout;
