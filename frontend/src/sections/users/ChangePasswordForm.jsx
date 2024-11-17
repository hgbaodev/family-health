import React from 'react';
import { Form, Input, Button, message, Modal, Typography } from 'antd';
import { LockOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useChangePassword } from '~/api/accountSettings/changePassword';

const { Title, Text } = Typography;

const ChangePasswordForm = ({ openChangePasswordModal, setOpenChangePasswordModal }) => {
  const [form] = Form.useForm();

  const mutation = useChangePassword({
    onSuccess: () => {
      form.resetFields();
      message.success("Password changed successfully!");
      setOpenChangePasswordModal(false);
    },
    onError: () => {
      message.error("Failed to change password.");
    },
  });

  const onFinish = (values) => {
    mutation.mutate({ data: values });
  };

  return (
    <Modal
      title={
        <div className="flex items-center space-x-2">
          <LockOutlined className="text-blue-600 text-lg" />
          <Title level={4} className="text-blue-600 m-0">Change Password</Title>
        </div>
      }
      open={openChangePasswordModal}
      onCancel={() => setOpenChangePasswordModal(false)}
      footer={null}
      centered
      bodyStyle={{
        padding: '24px',
        background: 'linear-gradient(to right, #e0f7fa, #e3f2fd)',
      }}
      width={500}
    >
      <Text className="block mb-6 text-gray-700 text-center">
        Update your password securely by filling out the fields below.
      </Text>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
      >
        {/* Current Password */}
        <Form.Item
          label={
            <span className="font-semibold text-gray-700">
              Current Password <span className="text-red-500">*</span>
            </span>
          }
          name="currentPassword"
          rules={[{ required: true, message: 'Please enter your current password!' }]}
        >
          <Input.Password
            placeholder="Enter current password"
            prefix={<LockOutlined className="text-blue-600" />}
            className="rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </Form.Item>

        {/* New Password */}
        <Form.Item
          label={
            <span className="font-semibold text-gray-700">
              New Password <span className="text-red-500">*</span>
            </span>
          }
          name="newPassword"
          rules={[
            { required: true, message: 'Please enter your new password!' },
            { min: 6, message: 'New password must be at least 6 characters long!' },
          ]}
        >
          <Input.Password
            placeholder="Enter new password"
            prefix={<LockOutlined className="text-green-500" />}
            className="rounded-md shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          label={
            <span className="font-semibold text-gray-700">
              Confirm New Password <span className="text-red-500">*</span>
            </span>
          }
          name="confirmationPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your new password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm new password"
            prefix={<LockOutlined className="text-purple-500" />}
            className="rounded-md shadow-sm border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-600 text-white hover:bg-blue-700 rounded-md shadow-lg"
          >
            <CheckCircleOutlined className="mr-2" />
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordForm;
