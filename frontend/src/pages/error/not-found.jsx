import { Button, Result, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Row justify="center" align="middle" className="h-screen">
      <Col>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button
              type="primary"
              onClick={() => navigate("/")}
            >
              Back Home
            </Button>
          }
        />
      </Col>
    </Row>
  );
};

export default NotFoundPage;
