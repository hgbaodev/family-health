import { Form, Input, Space, Button, message } from "antd";
import Title from "antd/es/typography/Title";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useLogin } from "~/api/auth/login";
import { useAuthStore } from "~/stores/auth/authStore";

const LoginPage = () => {
  const [form] = Form.useForm();
  const { user, isAuthenticated } = useAuthStore((state) => state); 
  console.log({
    user,
    isAuthenticated,
  });
  const navigate = useNavigate();
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
        Welcome to{" "}
        <span className="text-1xl font-bold ml-2 text-green-600">
          FamilyHealth
        </span>
      </Title>
      <Title level={3}>Login</Title>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        requiredMark="optional"
        validateTrigger="onBlur"
        initialValues={{ code: "", password: "" }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please enter your email!",
            },
          ]}
        >
          <Input variant="filled" placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your password!" },
            {
              min: 6,
              message: "Password must be at least 6 characters",
            },
          ]}
        >
          <Input.Password variant="filled" placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button loading={mutation.isPending} type="primary" htmlType="submit" className="w-full">
            Login
          </Button>
        </Form.Item>
      </Form>
      <p className="mb-2 flex justify-between">
        <Link className="text-primary" to="/auth/forgot-password">
          Forgot password
        </Link>
        <Link className="text-primary" to="/auth/register">
          Register
        </Link>
      </p>
    </Space>
  );
};

export default LoginPage;