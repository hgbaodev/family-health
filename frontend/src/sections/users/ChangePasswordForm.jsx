import React from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import { useChangePassword } from '~/api/accountSettings/changePassword';

const ChangePasswordForm = ({ openChangePasswordModal, setOpenChangePasswordModal }) => {
    const [form] = Form.useForm();
  
    const mutation = useChangePassword({
      onSuccess: () => {
        form.resetFields();
        message.success("Change password successfully");
      },
      onError: () => {
        message.error("Failed to change password");
      },
    });
  
    const onFinish = (values) => {
      mutation.mutate({ data: values }); 
      setOpenChangePasswordModal(false)
    };
    

  return (
    <Modal
      title="Update Member"
      open={openChangePasswordModal}
      onCancel={() => setOpenChangePasswordModal(false)}
      footer={null}
    >
      <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
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
        name="confirmationPassword"
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
    </Modal>
    
  );
};

export default ChangePasswordForm;
