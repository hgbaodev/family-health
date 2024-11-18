import { Button, Col, Form, Input, message, Row, Space } from "antd";
import Title from "antd/es/typography/Title";
import { ReloadOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useSendOTP } from "~/api/auth/sendOTP";
import { useSendNewPassword } from "~/api/auth/sendNewPassword";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  return <EnterEmail />;
};

const EnterEmail = () => {
  const [form] = Form.useForm();
  const [otpForm] = Form.useForm();
  const navigate = useNavigate();
  const [otpValues, setOtpValues] = useState(Array(6).fill("")); // Khởi tạo giá trị OTP
  const [loading, setLoading] = useState(false);
  const [loadingComfirm, setLoadingComfirm] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // State để hiển thị form OTP
  const [emailCurrent, setEmailCurrent] = useState("");
  const firstInputRef = useRef(null); // Tạo ref cho ô nhập đầu tiên

  const sendOTPMutation = useSendOTP({
    onSuccess: () => {
      message.success("OTP has been sent! Please check your email.");
      form.resetFields();
      setOtpSent(true); // Bật form OTP khi gửi thành công
      setLoading(false); // Reset loading khi thành công
    },
    onError: (error) => {
      message.error(error.message || "Your email is invalid!");
      setLoading(false); // Reset loading khi có lỗi
    },
  });

  const sendNewPasswordMutation = useSendNewPassword({
    onSuccess: () => {
      message.success("New password has been sent! Please check your email.");
      form.resetFields();
      navigate(`/auth/login`);
    },
    onError: (error) => {
      message.error(error.message || "Your email is invalid!");
      setLoadingComfirm(false); // Reset loading khi có lỗi
    },
  });

  const onEmailSubmit = (values) => {
      setEmailCurrent(values);
      setLoading(true); // Bắt đầu loading cho email submit
      sendOTPMutation.mutate(values);
  };

  const onSubmitOTP = () => {
    const email = emailCurrent.email;
    const otp = otpValues.join(""); 
    setLoadingComfirm(true);
    sendNewPasswordMutation.mutate({ email, otp});
  };

  // Focus vào ô nhập đầu tiên khi OTP form mount
  useEffect(() => {
    if (otpSent && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [otpSent]);

  // Xử lý nhập mã OTP
  const onInputChange = (index, value) => {
    const newOtpValues = [...otpValues];

    if (/^\d?$/.test(value)) {
      newOtpValues[index] = value.slice(0, 1);
      setOtpValues(newOtpValues);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  // Xử lý button gửi lại mã OTP
  const handleResendOtp = () => {
    setOtpValues(Array(6).fill("")); // Reset giá trị OTP
    console.log("OTP has been resent.");
    // Đặt lại focus vào ô nhập đầu tiên sau khi gửi lại OTP
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
    setLoading(true); // Bắt đầu loading cho email submit
    sendOTPMutation.mutate(emailCurrent);
  };

  return (
    <Space direction="vertical" className="p-8 rounded-[8px] w-[90%] md:w-[460px] bg-white border shadow-lg">
      <Title level={3}>{otpSent ? "Enter OTP" : "Forgot Password"}</Title>
      <p>
        {otpSent
          ? "OTP takes effect within 60s."
          : "Please enter your email address. A verification code will be sent to reset your password."}
      </p>

      {/* Form nhập email */}
      {!otpSent && (
        <Form
          form={form}
          layout="vertical"
          requiredMark="optional"
          validateTrigger="onBlur"
          onFinish={onEmailSubmit}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Enter your account email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      )}

      {/* Form nhập OTP (hiện khi OTP đã gửi thành công) */}
      {otpSent && (
        <Form form={otpForm} layout="vertical" requiredMark="optional" onFinish={onSubmitOTP}>
          <Form.Item required>
            <Space>
              {otpValues.map((value, index) => (
                <Input
                  key={index}
                  id={`otp-input-${index}`}
                  maxLength={1}
                  value={value}
                  onChange={(e) => onInputChange(index, e.target.value)}
                  style={{ width: "50px", textAlign: "center" }}
                  ref={index === 0 ? firstInputRef : null} // Gán ref cho ô nhập đầu tiên
                />
              ))}
            </Space>
          </Form.Item>

          <Row gutter={16} justify="center">
            <Col>
              <Button
                type="default"
                onClick={handleResendOtp}
                icon={<ReloadOutlined />}
                style={{
                  width: 160,
                  backgroundColor: "#f0f2f5",
                  color: "#36a851",
                  border: "1px solid #36a851",
                }}
                loading={loading}
              >
                Resend OTP
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                icon={<CheckCircleOutlined />}
                style={{
                  width: 160,
                  backgroundColor: "#1890ff",
                  border: "none",
                }}
                loading={loadingComfirm}
              >
                Confirm
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Space>
  );
};

export default ForgotPasswordPage;
