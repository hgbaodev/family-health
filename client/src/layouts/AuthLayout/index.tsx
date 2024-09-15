import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Row className="h-screen overflow-hidden justify-center bg-gradient-to-b from-green-50 to-blue-50">
      <Col xs={22} md={12} xl={8} className="flex items-center justify-center">
        <Outlet />
      </Col>
    </Row>
  );
};

export default AuthLayout;
