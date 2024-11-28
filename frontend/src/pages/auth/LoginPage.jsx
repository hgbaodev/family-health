import {
  Form,
  Input,
  Space,
  Button,
  message,
  Divider,
  Flex,
  Row,
  Col,
} from "antd";
import Title from "antd/es/typography/Title";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useGoogleLoginMutation, useLogin } from "~/api/auth/login";
import { useVerify } from "~/api/auth/verify";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";

const LoginPage = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const verifyMutation = useVerify({
    onSuccess: () => {
      form.setFieldsValue({ email: username });
      message.success(
        "Your account verified. Please enter your password to login."
      );
    },
    onError: () => {
      message.error("Verification failed. Please try again.");
    },
  });

  const googleLoginMutation = useGoogleLoginMutation({
    onSuccess: () => {
      message.success("Login successful");
      form.resetFields();
      navigate("/manager");
    },
    onError: (error) => {
      console.log("Error:", error);
      message.error("Email or password is incorrect");
    },
  });

  const handleGoogleLogin = (credential) => {
    googleLoginMutation.mutate({ data: credential });
  };

  useEffect(() => {
    if (username) {
      verifyMutation.mutate(username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const mutation = useLogin({
    onSuccess: () => {
      message.success("Login successful");
      form.resetFields();
      navigate("/manager");
    },
    onError: (error) => {
      console.log("Error:", error);
      message.error("Email or password is incorrect");
    },
  });

  const onFinish = (values) => {
    console.log("Form values:", values); // Debugging log
    mutation.mutate(values);
  };

  return (
    <Space
      direction="vertical"
      className="p-8 rounded-[8px] w-[90%] md:w-[460px] bg-white border shadow-lg"
    >
      <Link to="/" className="cursor-pointer">
        <img src={logo} alt="logo" className="w-40 mx-auto" />
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
              message: t("LoginPage.PleaseEnterYourEmail"),
            },
            {
              type: "email",
              message: t("LoginPage.PleaseEnterAValidEmail"),
            },
          ]}
        >
          <Input variant="filled" placeholder={t("LoginPage.EnterYourEmail")} />
        </Form.Item>

        <Form.Item
          label={t("LoginPage.Password")}
          name="password"
          rules={[
            { required: true, message: t("LoginPage.PleaseEnterYourPassword") },
            {
              min: 6,
              message: t("LoginPage.PasswordMustBeAtLeast6Characters"),
            },
          ]}
        >
          <Input.Password
            variant="filled"
            placeholder={t("LoginPage.EnterYourPassword")}
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={mutation.isPending}
            type="primary"
            htmlType="submit"
            className="w-full"
          >
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
      <Divider></Divider>
      <Flex justify="center" align="center"></Flex>
      <Row gutter={16}>
        <Col span={12}>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </Col>
        <Col span={12}>
          <FacebookLogin
            appId="1550119078967031"
            style={{
              backgroundColor: "#4267b2",
              color: "#fff",
              fontSize: "16px",
              padding: "6px 12px",
              border: "none",
              borderRadius: "4px",
            }}
            onSuccess={(response) => {
              console.log("Login Success!", response);
            }}
            onFail={(error) => {
              console.log("Login Failed!", error);
            }}
            onProfileSuccess={(response) => {
              console.log("Get Profile Success!", response);
            }}
          />
        </Col>
      </Row>
    </Space>
  );
};

export default LoginPage;
