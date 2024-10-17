import { Form, Input, Space, Button, message } from "antd";
import Title from "antd/es/typography/Title";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useRegister } from "~/api/auth/register";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  const registerMutation = useRegister({
    onSuccess: () => {
      message.success("Registration successful! Please check your email for verification.");
      form.resetFields();
      window.location.replace("http://localhost:3000/auth/login"); // Redirect to Login page
    },
    onError: (error) => {
      message.error(error.message || "Registration failed");
    },
  });

  const onFinish = (values) => {
    registerMutation.mutate(values);
  };

  return (
    <Space direction="vertical" className="p-10 w-full bg-white rounded-xl">
      <Link to='/' className="cursor-pointer">
        <img src={logo} alt="logo" className="w-24 mx-auto" />
      </Link>
      <Title level={4} className="text-center">
        Welcome to <span className="text-1xl font-bold ml-2 text-green-600">FamilyHealth</span>
      </Title>
      <Title level={3}>
        Register
      </Title>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        requiredMark="optional"
        validateTrigger="onBlur"
        initialValues={{ code: "", password: "" }}
      >
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please enter your first name!",
            },
          ]}
        >
          <Input variant="filled" placeholder="Enter your first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please enter your last name!",
            },
          ]}
        >
          <Input variant="filled" placeholder="Enter your last name" />
        </Form.Item>

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
          <Button type="primary" htmlType="submit" className="w-full">
            Register
          </Button>
        </Form.Item>
      </Form>

      <p className="mb-2 flex justify-between">
        {/* <Link className="text-primary" to="/auth/forgot-password">
          Forgot password
        </Link> */}
        <Link className="text-primary ml-auto" to="/auth/login">
          Login
        </Link>
      </p>
    </Space>
  );
};

export default RegisterPage;
