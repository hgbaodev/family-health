import React, { useEffect } from 'react';
import { useUserStore } from "~/stores/users/userStore";
import { useUpdateInfo } from "~/api/accountSettings/update-info";
import { useGetInfo } from "~/api/accountSettings/get-info";
import { Form, Input, message, Skeleton, Modal, Button, Typography } from 'antd';
import { UserOutlined, PhoneOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const UpdateUserModal = ({ openUpdateModal, setOpenUpdateModal }) => {
  const { user: userFromStore, setUser } = useUserStore();
  const { data: userData, isLoading } = useGetInfo();
  const [form] = Form.useForm();

  const mutation = useUpdateInfo({
    onSuccess: (data) => {
      setUser(data.data);
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
    mutation.mutate(values);
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
      title={
        <div className="flex items-center space-x-2">
          <CheckCircleOutlined className="text-blue-500 text-lg" />
          <Title level={3} className="text-blue-600">
            Update User Information
          </Title>
        </div>
      }
      open={openUpdateModal}
      onCancel={() => setOpenUpdateModal(false)}
      footer={null}
      centered
      bodyStyle={{ padding: '24px', background: 'linear-gradient(to right, #f0f9ff, #e0f2fe)' }}
      width={500}
    >
      <Skeleton loading={isLoading} active>
        <Text className="block mb-4 text-gray-700 text-center">
          Please update your information below.
        </Text>
        <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-4">
          <Form.Item
            label={
              <span className="font-semibold text-gray-700">
                First Name <span className="text-red-500">*</span>
              </span>
            }
            name="firstname"
            rules={[{ required: true, message: 'Please enter your first name!' }]}
          >
            <Input
              placeholder="John"
              prefix={<UserOutlined className="text-blue-500" />}
              className="rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-semibold text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </span>
            }
            name="lastname"
            rules={[{ required: true, message: 'Please enter your last name!' }]}
          >
            <Input
              placeholder="Doe"
              prefix={<UserOutlined className="text-blue-500" />}
              className="rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-semibold text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </span>
            }
            name="phoneNumber"
            rules={[{ required: true, message: 'Please enter your phone number!' }]}
          >
            <Input
              placeholder="123-456-7890"
              prefix={<PhoneOutlined className="text-blue-500" />}
              className="rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </Form.Item>

          <Form.Item className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 rounded-md shadow-lg"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Skeleton>
    </Modal>
  );
};

export default UpdateUserModal;
