import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoaderScreen = () => {
  return (
    <Flex align="center" justify="center" className="w-screen h-screen">
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </Flex>
  );
};

export default LoaderScreen;
