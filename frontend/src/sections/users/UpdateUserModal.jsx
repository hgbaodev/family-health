import React, { useEffect } from 'react';
import { useUserStore } from "~/stores/users/userStore";
import { useUpdateInfo } from "~/api/accountSettings/update-info";
import { useGetInfo } from "~/api/accountSettings/get-info";
import { Form, Input, message, Skeleton, Modal, Button, Typography } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';

const { Title } = Typography;

const UpdateUserModal = ({ openUpdateModal, setOpenUpdateModal }) => {
  const { user: userFromStore, setUser } = useUserStore();
  const { data: userData, isLoading } = useGetInfo();
  const [form] = Form.useForm();

  // Sử dụng useUpdateInfo
  const mutation = useUpdateInfo({
      onSuccess: (data) => {
          setUser(data.data); // Cập nhật thông tin người dùng trong store
          form.resetFields();
          message.success("User information updated successfully");
          setOpenUpdateModal(false);
      },
      onError: (error) => {
          message.error("Failed to update user information");
          console.error("Error details:", error);
      },
  });

  const onFinish = (values) => {
      mutation.mutate(values); // Gửi dữ liệu trực tiếp dưới dạng { firstname, lastname, phoneNumber }
  };

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        firstname: userData.firstname,
        lastname: userData.lastname,
        phoneNumber: userData.phoneNumber,
      });
    }
  }, [userData, form]);

  return (
    <Modal
      title={<Title level={3} className="text-blue-600">UPDATE USER INFORMATION</Title>}
      open={openUpdateModal}
      onCancel={() => setOpenUpdateModal(false)}
      footer={null}
      centered
      bodyStyle={{ padding: '24px' }}
      width={500}
    >
      <Skeleton loading={isLoading} active>
        <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-4">
          <Form.Item
            label="First name"
            name="firstname"
            rules={[{ required: true, message: 'Please enter first name!' }]}
          >
            <Input
              placeholder="First Name"
              prefix={<UserOutlined />}
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[{ required: true, message: 'Please enter last name!' }]}
          >
            <Input
              placeholder="Last Name"
              prefix={<UserOutlined />}
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: 'Please enter phone number!' }]}
          >
            <Input
              placeholder="Phone Number"
              prefix={<PhoneOutlined />}
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 rounded-md"
            >
              SUBMIT
            </Button>
          </Form.Item>
        </Form>
      </Skeleton>
    </Modal>
  );
};

export default UpdateUserModal;
