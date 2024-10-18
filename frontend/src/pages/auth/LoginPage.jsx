import { Form, Input, Space, Button, message } from "antd";
import Title from "antd/es/typography/Title";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useLogin } from "~/api/auth/login";
import { useVerify } from "~/api/auth/verify";
import { useAuthStore } from "~/stores/auth/authStore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username");
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore((state) => state);

  const { t } = useTranslation();

  // Hook for verification based on username
  const verifyMutation = useVerify({
    onSuccess: () => {
      form.setFieldsValue({ email: username });
      message.success("Your account verified. Please enter your password to login.");
    },
    onError: () => {
      message.error("Verification failed. Please try again.");
    },
  });

  // Call verify mutation if username exists in URL
  useEffect(() => {
    if (username) {
      verifyMutation.mutate(username);
    }
  }, [username, verifyMutation]);

  console.log({
    user,
    isAuthenticated,
  });
  
  const mutation = useLogin({
    onSuccess: () => {
      message.success("Login successful");
      form.resetFields();
      navigate("/manager")
    },
    onError: (error) => {
      message.error(error.message || "Login failed");
    },
  });

  const onFinish = (values) => {
    console.log("Form values:", values); // Debugging log
    mutation.mutate(values);
  };

  return (
    <Space direction="vertical" className="p-10 w-full bg-white rounded-xl">
      <Link to="/" className="cursor-pointer">
        <img src={logo} alt="logo" className="w-24 mx-auto" />
      </Link>
      <Title level={4} className="text-center">
        {t("LoginPage.Welcome")}{" "}
        <span className="text-1xl font-bold ml-2 text-green-600">
        {t("LoginPage.Name")}
        </span>
      </Title>
      <Title level={3}>{t("LoginPage.Login")}</Title>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        requiredMark="optional"
        validateTrigger="onBlur"
        initialValues={{ code: "", password: "" }}
      >
        <Form.Item
          label={t("LoginPage.Email")}
          name="email"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please enter your email!",
            },
          ]}
        >
          <Input variant="filled" placeholder={t("LoginPage.EnterYourEmail")} />
        </Form.Item>

        <Form.Item
          label={t("LoginPage.Password")}
          name="password"
          rules={[
            { required: true, message: "Please enter your password!" },
            {
              min: 6,
              message: "Password must be at least 6 characters",
            },
          ]}
        >
          <Input.Password variant="filled" placeholder={t("LoginPage.EnterYourPassword")} />
        </Form.Item>
        <Form.Item>
          <Button loading={mutation.isPending} type="primary" htmlType="submit" className="w-full">
            {t("LoginPage.Login")}
          </Button>
        </Form.Item>
      </Form>
      <p className="mb-2 flex justify-between">
        <Link className="text-primary" to="/auth/forgot-password">
          {t("LoginPage.ForgotPassword")}
        </Link>
        <Link className="text-primary" to="/auth/register">
          {t("LoginPage.Register")}
        </Link>
      </p>
    </Space>
  );
};

export default LoginPage;
