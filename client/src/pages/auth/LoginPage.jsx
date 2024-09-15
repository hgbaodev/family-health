import { Form, Input, Space, Button, App } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dispatch } from "~/store";
import { login } from "~/store/slices/AuthSlice";
import { formatErrors } from "~/utils/formatErrors";

const LoginPage = () => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await dispatch(login(values)).unwrap();
      message.success("Đăng nhập thành công !");
      navigate("/");
    } catch (error) {
      console.log(error);
      form.setFields(formatErrors(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space direction="vertical" className="p-10 w-full">
      <Title level={3}>Đăng nhập</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark="optional"
        validateTrigger="onBlur"
        initialValues={{ code: "GV289", password: "password" }}
      >
        <Form.Item
          label="Mã giảng viên"
          name="code"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Vui lòng nhập mã giảng viên!",
            },
          ]}
        >
          <Input variant="filled" placeholder="Nhập mã giảng viên" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            {
              min: 6,
              message: "Mật khẩu phải có ít nhất 6 ký tự",
            },
          ]}
        >
          <Input.Password variant="filled" placeholder="Nhập mật khẩu" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      <p className="mb-2">
        <Link className="text-primary" to="/auth/forgot-password">
          Quên mật khẩu
        </Link>
      </p>
    </Space>
  );
};

export default LoginPage;
