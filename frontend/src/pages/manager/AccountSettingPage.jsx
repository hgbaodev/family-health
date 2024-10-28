import React, { useEffect } from "react";
import { Button, Form, Input, Modal, Space, message } from "antd";
import PageHeader from "~/components/page-header";
import { useUserStore } from "~/stores/users/userStore";
import { fetchUser } from "~/api/users/userService"; // Đảm bảo hàm này tồn tại

const AccountSettingPage = () => {
  const { user, openUpdateModal, setOpenUpdateModal, updateUser, setUser } = useUserStore();
  const [form] = Form.useForm();

  // Function to fetch user data from the database
  const fetchUserData = async () => {
    try {
      const response = await fetchUser();
      console.log("Dữ liệu user từ API:", response); // Kiểm tra dữ liệu từ API
      setUser(response);
      form.setFieldsValue(response);
    } catch (error) {
      message.error("Failed to load user data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const showModal = () => {
    setOpenUpdateModal(true);
    form.setFieldsValue(user);
  };

  const handleCancel = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdate = async (values) => {
    try {
      await updateUser(values);
      message.success("User information updated successfully");
      setOpenUpdateModal(false);
      fetchUserData();
    } catch (error) {
      message.error("Failed to update user information");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        <div className="mb-2">
          <PageHeader
            heading="Account Settings"
            links={[{ title: "Dashboard", href: "/user" }, { title: "Account Settings" }]}
          />
        </div>

        <Form layout="horizontal" className="pt-4" form={form} initialValues={user}>
          <Form.Item label="User ID" name="id" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="First Name" name="firstName" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Phone Number" name="phoneNumber" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Email" name="email" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Input disabled />
          </Form.Item>
        </Form>

        <Space>
          <Button type="primary" onClick={showModal}>
            Update Information
          </Button>
        </Space>

        <Modal
          title="Update Information"
          open={openUpdateModal}
          onCancel={handleCancel}
          footer={null}
        >
          <Form layout="vertical" form={form} onFinish={handleUpdate}>
            <Form.Item
              label="First Name"
              name="firstName"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              rules={[{ required: true, message: "Please enter your first name" }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              rules={[{ required: true, message: "Please enter your last name" }]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              rules={[{ required: true, message: "Please enter your phone number" }]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Chiều cao toàn bộ màn hình
    backgroundColor: '#f0f2f5', // Màu nền nhẹ
  },
  inner: {
    width: '100%',
    maxWidth: '600px', // Chiều rộng tối đa của form
    background: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
};

export default AccountSettingPage;
