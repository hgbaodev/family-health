import { Button, Flex, Form, Input, Modal } from "antd";

const CreateMemberModal = ({ open, handleCancel }: {open: any, handleCancel: any}) => {

  const [form] = Form.useForm();

  return (
    <Modal
      title="Create employee"
      open={open}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} className="pt-4" layout="vertical" variant="filled">
        <Flex vertical>
          <Form.Item label="Name" name="name">
            <Input placeholder="Enter employee name..." />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
          >
            <Input placeholder="Enter username..." />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
          >
            <Input placeholder="Enter email address..." />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
          >
            <Input.Password placeholder="Enter password..." />
          </Form.Item>
        </Flex>
        <Form.Item className="pt-4 m-0">
          <Flex justify="end" className="gap-3">
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
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateMemberModal;
