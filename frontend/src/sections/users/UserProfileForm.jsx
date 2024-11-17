import { useEffect } from "react";
import { Button, Form, Input, Skeleton } from "antd";
import { useGetInfo } from "~/api/accountSettings/get-info";

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
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-2xl mx-auto my-10">
        <Form form={form} layout="vertical" name="userProfileForm">
          <Form.Item label="First Name" name="firstname">
            <Input  style={{ fontWeight: "bold", color: "#000" }} disabled />
          </Form.Item>

          <Form.Item label="Last Name" name="lastname">
            <Input  style={{ fontWeight: "bold", color: "#000" }} disabled />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input  style={{ fontWeight: "bold", color: "#000" }} disabled/>
          </Form.Item>

          <Form.Item label="Phone Number" name="phoneNumber">
            <Input  style={{ fontWeight: "bold", color: "#000" }} disabled />
          </Form.Item>
        </Form>
      </div>
    </Skeleton>
  );
};

export default UserProfileForm;
