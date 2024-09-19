import { Button, Form, Input, Space } from "antd";
import { Link } from "react-router-dom";
import Title from "antd/es/typography/Title";

const ForgotPasswordPage = () => {
  return <EnterEmail></EnterEmail>;
};

const EnterEmail = () => {
  const [form] = Form.useForm();

  return (
    <Space direction="vertical" className="p-10 w-full bg-white rounded-xl">
      <Title level={3}>Forgot Password</Title>
      <p>
        Please enter your email address, the system will send a verification code to reset your password.
      </p>
      <Form
        form={form}
        layout="vertical"
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
              message: "Please enter your email!",
            },
          ]}
        >
          <Input variant="filled" placeholder="Enter your account email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
      <p className="mb-2">
        <Link className="text-primary" to="/auth/login">
          Login
        </Link>
      </p>
    </Space>
  );
};

// const EnterOTP = () => {
//   const onChange = (text: string) => {
//     console.log("onChange:", text);
//   };
//   const sharedProps = {
//     onChange,
//   };
//   return (
//     <Space direction="vertical" className="p-10 w-full">
//       <Title level={3}>Enter OTP</Title>
//       <p>
//         A 7-character OTP has been sent to your email. Please enter the OTP to confirm.
//       </p>
//       <Form layout="vertical" requiredMark="optional">
//         <Form.Item
//           className="text-center"
//           label="OTP"
//           name="otp"
//           rules={[
//             {
//               required: true,
//               whitespace: true,
//               message: "Please enter the OTP!",
//             },
//           ]}
//         >
//           <Input.OTP
//             variant="filled"
//             size="large"
//             length={7}
//             formatter={(str) => str.toUpperCase()}
//             {...sharedProps}
//           />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" className="w-full">
//             Confirm
//           </Button>
//         </Form.Item>
//       </Form>
//     </Space>
//   );
// };

// const ResetPassword = () => {
//   const [form] = Form.useForm();
  
//   return (
//     <Space direction="vertical" className="p-10 w-full">
//       <Title level={3}>Reset Password</Title>
//       <p>
//         Please enter your new password. The password must be at least 6 characters long.
//       </p>
//       <Form
//         form={form}
//         layout="vertical"
//         requiredMark="optional"
//         validateTrigger="onBlur"
//       >
//         <Form.Item
//           label="New Password"
//           name="password"
//           rules={[
//             { required: true, message: "Please enter the password!" },
//             {
//               min: 6,
//               message: "The password must be at least 6 characters long.",
//             },
//           ]}
//         >
//           <Input.Password variant="filled" placeholder="Enter your new password" />
//         </Form.Item>
//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="w-full"
//           >
//             Reset Password
//           </Button>
//         </Form.Item>
//       </Form>
//     </Space>
//   );
// };

export default ForgotPasswordPage;
