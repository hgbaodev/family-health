import { App, Button, Form, Input, Space } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dispatch } from "~/store";
import { login } from "~/store/slices/AuthSlice";
import { formatErrors } from "~/utils/formatErrors";
import Title from "antd/es/typography/Title";

const ForgotPasswordPage = () => {
  return <EnterOTP></EnterOTP>;
};

const EnterEmail = () => {
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
      <Title level={3}>Quên mật khẩu</Title>
      <p>
        Vui lòng nhập địa chỉ email của bạn, hệ thống sẽ gửi một mã xác thực để
        khôi phục mật khẩu.
      </p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark="optional"
        validateTrigger="onBlur"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Vui lòng nhập email!",
            },
          ]}
        >
          <Input variant="filled" placeholder="Nhập email tài khoản " />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Đặt lại mật khẩu
          </Button>
        </Form.Item>
      </Form>
      <p className="mb-2">
        <Link className="text-primary" to="/auth/login">
          Đăng nhập
        </Link>
      </p>
    </Space>
  );
};

const EnterOTP = () => {
  const onChange = (text) => {
    console.log("onChange:", text);
  };
  const sharedProps = {
    onChange,
  };
  return (
    <Space direction="vertical" className="p-10 w-full">
      <Title level={3}>Nhập mã OTP</Title>
      <p>
        Mã OTP gồm 7 ký tự đã được gửi đến email của bạn. Vui lòng nhập mã OTP
        để xác nhận
      </p>
      <Form layout="vertical" requiredMark="optional">
        <Form.Item
          className="text-center"
          label="Mã OTP"
          name="otp"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Vui lòng nhập mã OTP!",
            },
          ]}
        >
          <Input.OTP
            variant="filled"
            size="large"
            length={7}
            formatter={(str) => str.toUpperCase()}
            {...sharedProps}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="w-full">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

const ResetPassword = () => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await dispatch(login(values)).unwrap();
      message.success("Đặt lại mật khẩu thành công !");
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
      form.setFields(formatErrors(error));
    } finally {
      setLoading(false);
    }
  };
  return (
    <Space direction="vertical" className="p-10 w-full">
      <Title level={3}>Đặt lại mật khẩu</Title>
      <p>
        Vui lòng nhập mật khẩu mới của bạn. Mật khẩu phải có ít nhất 6 ký tự
      </p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark="optional"
        validateTrigger="onBlur"
      >
        <Form.Item
          label="Mật khẩu mới"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            {
              min: 6,
              message: "Mật khẩu phải có ít nhất 6 ký tự",
            },
          ]}
        >
          <Input.Password variant="filled" placeholder="Nhập mật khẩu mới" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Đặt lại mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default ForgotPasswordPage;
