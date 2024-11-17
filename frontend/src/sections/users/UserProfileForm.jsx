import { useEffect } from "react";
import { Form, Input, Skeleton } from "antd";
import { useGetInfo } from "~/api/accountSettings/get-info";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const UserProfileForm = () => {
  const [form] = Form.useForm();
  const { data: user, isLoading } = useGetInfo();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user, form]);

  return (
    <Skeleton loading={isLoading} active>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto my-10 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">USER PROFILE</h2>
        <Form form={form} layout="vertical" name="userProfileForm">
          {/* First Name */}
          <Form.Item label="First Name" name="firstname">
            <Input
              prefix={<UserOutlined className="text-blue-500" />}
              className="rounded-lg border-gray-300 focus:ring focus:ring-blue-100"
              style={{ fontWeight: "bold", color: "#333" }}
              disabled
            />
          </Form.Item>

          {/* Last Name */}
          <Form.Item label="Last Name" name="lastname">
            <Input
              prefix={<UserOutlined className="text-green-500" />}
              className="rounded-lg border-gray-300 focus:ring focus:ring-green-100"
              style={{ fontWeight: "bold", color: "#333" }}
              disabled
            />
          </Form.Item>

          {/* Email */}
          <Form.Item label="Email" name="email">
            <Input
              prefix={<MailOutlined className="text-red-500" />}
              className="rounded-lg border-gray-300 focus:ring focus:ring-red-100"
              style={{ fontWeight: "bold", color: "#333" }}
              disabled
            />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item label="Phone Number" name="phoneNumber">
            <Input
              prefix={<PhoneOutlined className="text-yellow-500" />}
              className="rounded-lg border-gray-300 focus:ring focus:ring-yellow-100"
              style={{ fontWeight: "bold", color: "#333" }}
              disabled
            />
          </Form.Item>
        </Form>
      </div>
    </Skeleton>
  );
};

export default UserProfileForm;
