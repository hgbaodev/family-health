import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loader = ({ height = 200 }) => {
  return (
    <Flex align="center" justify="center" style={{ height: `${height}px` }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
    </Flex>
  );
};

export default Loader;
