import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useUserStore } from '~/stores/users/userStore';
import { useChangePassword } from '~/api/users/changePassword'; // Giả sử bạn có hook API để thay đổi mật khẩu

const ChangePasswordForm = () => {
  const { user } = useUserStore((state) => state); // Lấy thông tin người dùng từ store
  const [form] = Form.useForm(); // Khởi tạo form từ Ant Design

  const mutateChangePassword = useChangePassword({
    onSuccess: () => {
      message.success('Đổi mật khẩu thành công!');
      form.resetFields(); // Reset form sau khi thành công
    },
    onError: (error) => {
      message.error(`Đổi mật khẩu thất bại. Lý do: ${error.message}`);
    },
  });

  const handleFinish = (values) => {
    // Gọi API để thay đổi mật khẩu
    mutateChangePassword.mutate({
      userId: user.id, // Giả sử có ID người dùng
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      style={{ maxWidth: 600, margin: '0 auto' }} // Căn giữa form
    >
      <Form.Item
        label="Mật khẩu hiện tại"
        name="currentPassword"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Mật khẩu mới"
        name="newPassword"
        rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
          { min: 6, message: 'Mật khẩu mới phải có ít nhất 6 ký tự!' }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Xác nhận mật khẩu mới"
        name="confirmPassword"
        dependencies={['newPassword']} // Phụ thuộc vào trường mật khẩu mới
        rules={[
          { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đổi mật khẩu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordForm;
