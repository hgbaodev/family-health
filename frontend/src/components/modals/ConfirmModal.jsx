import { Modal } from "antd";
import Title from "antd/es/typography/Title";
import PropTypes from "prop-types";

const ConfirmModal = ({ title, content, open, handleOk, handleCancel }) => {
  return (
    <Modal open={open} title={title} onOk={handleOk} onCancel={handleCancel}>
      <Title level={4}>{content}</Title>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  open: PropTypes.bool,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default ConfirmModal;
