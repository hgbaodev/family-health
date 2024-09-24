import { Modal } from "antd";
import Title from "antd/es/typography/Title";

interface ConfirmModalProps {
  title: string;
  content: string;
  open: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ title, content, open, handleOk, handleCancel }) => {
  return (
    <Modal open={open} title={title} onOk={handleOk} onCancel={handleCancel}>
      <Title level={4}>{content}</Title>
    </Modal>
  );
};

export default ConfirmModal;
