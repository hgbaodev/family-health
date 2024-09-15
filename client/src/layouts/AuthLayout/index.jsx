import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Row className="h-screen overflow-hidden">
      <Col xs={0} md={12} xl={16}>
        <img
          className="h-full object-cover"
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </Col>
      <Col xs={24} md={12} xl={8} className="flex items-center justify-center">
        <Outlet />
      </Col>
    </Row>
  );
};

export default AuthLayout;
