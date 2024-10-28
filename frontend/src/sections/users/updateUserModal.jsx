import React, { useEffect } from "react";
import { Button, Form, Input, Modal, Row, Col, message } from "antd";
import { useUserStore } from "~/stores/users/userStore"; // Giả sử đây là nơi lưu trạng thái user và modal
import { useUpdateUser } from "~/api/users/update-userInfo"; // Giả sử đây là hook API cập nhật thông tin user

const UpdateUserModal = () => {
  const [form] = Form.useForm();
  const { openUpdateModal, setOpenUpdateModal, user } = useUserStore((state) => state);

  const mutation = useUpdateUser({
    onSuccess: () => {
      form.resetFields();
      message.success("User updated successfully");
    },
    onError: () => {
      message.error("Failed to update user");
    },
  });

  const onFinish = (values) => {
    mutation.mutate({
      id: user.id,
      data: values,
    });
    setOpenUpdateModal(false);
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
      });
    }
  }, [user, form]);

  return (
    <Modal
      title="Update User"
      open={openUpdateModal}
      onCancel={() => setOpenUpdateModal(false)}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Please enter first name" }]}
            >
              <Input placeholder="Enter first name..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Please enter last name" }]}
            >
              <Input placeholder="Enter last name..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please enter phone number" },
                { pattern: /^\d+$/, message: "Phone number must be numeric" }
              ]}
            >
              <Input placeholder="Enter phone number..." />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className="pt-4 m-0">
          <div style={{ display: 'flex', justifyContent: 'end', gap: '12px' }}>
            <Button
              type="default"
              htmlType="reset"
              onClick={() => form.resetFields()}
            >
              Reset
            </Button>
            <Button
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

export default UpdateUserModal;
