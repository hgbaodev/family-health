import { Button, Flex, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <Flex className="h-screen items-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Back Home
          </Button>
        }
        className="w-screen"
      />
    </Flex>
  );
};

export default Page404;
