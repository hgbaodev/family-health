import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const DeletePopconfirm = ({
  title,
  description,
  placement = "topRight",
  okText = "Yes",
  cancelText = "No",
  onConfirm = null,
  size = "small",
}) => {
  return (
    <Popconfirm
      title={title}
      description={description}
      placement={placement}
      onConfirm={onConfirm}
      okText={okText}
      cancelText={cancelText}
    >
      <Button icon={<DeleteOutlined />} size={size} danger />
    </Popconfirm>
  );
};

export default DeletePopconfirm;
