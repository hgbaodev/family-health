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
      <Title level={3}>Quên mật khẩu</Title>
      <p>
        Vui lòng nhập địa chỉ email của bạn, hệ thống sẽ gửi một mã xác thực để
        khôi phục mật khẩu.
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
              message: "Vui lòng nhập email!",
            },
          ]}
        >
          <Input variant="filled" placeholder="Nhập email tài khoản " />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
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

// const EnterOTP = () => {
//   const onChange = (text: string) => {
//     console.log("onChange:", text);
//   };
//   const sharedProps = {
//     onChange,
//   };
//   return (
//     <Space direction="vertical" className="p-10 w-full">
//       <Title level={3}>Nhập mã OTP</Title>
//       <p>
//         Mã OTP gồm 7 ký tự đã được gửi đến email của bạn. Vui lòng nhập mã OTP
//         để xác nhận
//       </p>
//       <Form layout="vertical" requiredMark="optional">
//         <Form.Item
//           className="text-center"
//           label="Mã OTP"
//           name="otp"
//           rules={[
//             {
//               required: true,
//               whitespace: true,
//               message: "Vui lòng nhập mã OTP!",
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
//             Xác nhận
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
//       <Title level={3}>Đặt lại mật khẩu</Title>
//       <p>
//         Vui lòng nhập mật khẩu mới của bạn. Mật khẩu phải có ít nhất 6 ký tự
//       </p>
//       <Form
//         form={form}
//         layout="vertical"
//         requiredMark="optional"
//         validateTrigger="onBlur"
//       >
//         <Form.Item
//           label="Mật khẩu mới"
//           name="password"
//           rules={[
//             { required: true, message: "Vui lòng nhập mật khẩu!" },
//             {
//               min: 6,
//               message: "Mật khẩu phải có ít nhất 6 ký tự",
//             },
//           ]}
//         >
//           <Input.Password variant="filled" placeholder="Nhập mật khẩu mới" />
//         </Form.Item>
//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="w-full"
//           >
//             Đặt lại mật khẩu
//           </Button>
//         </Form.Item>
//       </Form>
//     </Space>
//   );
// };

export default ForgotPasswordPage;