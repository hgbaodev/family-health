import { Button, Form, Input, Modal } from "antd";

const UpdateMemberModal= ({ open, handleCancel, selectedMember }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Modal
      title="Update employee"
      open={open}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        className="pt-4"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{}}
      >
        <Form.Item label="ID" name="id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input placeholder="Enter employee name..." />
        </Form.Item>
        <Form.Item label="Username" name="username">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>
        <Form.Item className="pt-4 m-0">
          <div style={{ display: 'flex', justifyContent: 'end', gap: '12px' }}>
            <Button
              loading={false}
              type="default"
              htmlType="reset"
            >
              Reset
            </Button>
            <Button
              loading={false}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateMemberModal;
