import { Layout, Button, Input, Form, message, Card, Typography } from "antd";
import { MailOutlined, InfoCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import  { useState } from "react";
const { Content } = Layout;
const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const SupportRequestForm = ({ supportRequest, setSupportRequest, handleSendSupportRequest }) => (

  <Form layout="vertical">
    <Form.Item
      label={<span className="font-semibold text-lg">Nội dung yêu cầu hỗ trợ <InfoCircleOutlined /></span>}
      rules={[{ required: true, message: "Vui lòng nhập nội dung yêu cầu" }]}
    >
      <TextArea
        rows={4}
        value={supportRequest}
        onChange={(e) => setSupportRequest(e.target.value)}
        placeholder="Vui lòng mô tả vấn đề bạn gặp phải..."
        className="w-full p-3 border border-gray-300 rounded"
      />
    </Form.Item>
    <Form.Item>
      <Button
        type="primary"
        onClick={handleSendSupportRequest}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-semibold"
        icon={<MailOutlined />}
      >
        Gửi yêu cầu
      </Button>
    </Form.Item>
  </Form>
);

const HelpPage = () => {
  const [supportRequest, setSupportRequest] = useState("");

  const handleSendSupportRequest = async () => {
    try {
      const response = await fetch("/api/support-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ request: supportRequest }),
      });

      if (response.ok) {
        message.success(<span><CheckCircleOutlined /> Yêu cầu hỗ trợ đã được gửi thành công</span>);
        setSupportRequest("");
      } else {
        throw new Error("Gửi yêu cầu thất bại");
      }
    } catch (error) {
      message.error(<span><ExclamationCircleOutlined /> Đã có lỗi xảy ra: {error.message}</span>);
    }
  };

  return (
    <Content className="p-6 bg-gray-50 min-h-screen">
      {/* Card for user guide */}
      <Card className="mb-6 bg-white shadow-lg p-6 rounded-lg">
        <Title level={2} className="text-3xl font-bold text-blue-600">Hướng Dẫn Sử Dụng Hệ Thống</Title>
        <Paragraph className="text-lg text-gray-700 mt-4">
          Chào mừng bạn đến với hệ thống <b>FamilyHealth</b>. Hệ thống giúp bạn quản lý hồ sơ sức khỏe cho cả gia đình một cách dễ dàng và hiệu quả. Dưới đây là một số chức năng chính của hệ thống:
        </Paragraph>

        <ul className="list list-inside space-y-4 list-none pl-0">
          <li><b>1. Trang Members:</b> Quản lý thành viên gia đình</li>
                      <p>Cho phép người dùng tạo và lưu thông tin y tế của từng thành viên trong gia đình, bao gồm tên, tuổi, giới tính, và các thông tin y tế quan trọng khác. Từ đây, bạn có thể xem, chỉnh sửa, và thêm các thành viên mới.</p>

                      <li><b>2. Trang History:</b> Xem lịch sử khám bệnh</li>
                      <p>Hiển thị lịch sử khám bệnh của từng thành viên, bao gồm các lần khám trước đó, bác sĩ phụ trách, ngày giờ, và các ghi chú liên quan. Chức năng này giúp người dùng dễ dàng theo dõi quá trình chăm sóc sức khỏe.</p>

                      <li><b>3. Medical Records:</b> Quản lý hồ sơ bệnh án</li>
                      <p>Quản lý toàn bộ hồ sơ bệnh án của các thành viên trong gia đình, bao gồm kết quả xét nghiệm, đơn thuốc và chẩn đoán. Người dùng có thể tải lên hoặc lưu các tài liệu liên quan đến sức khỏe.</p>

                      <li><b>4. Appointments:</b> Quản lý cuộc hẹn khám bệnh</li>
                      <p>Giúp người dùng lên lịch và theo dõi các cuộc hẹn với bác sĩ, bao gồm ngày giờ, địa điểm, và lý do khám. Bạn có thể nhận nhắc nhở trước mỗi cuộc hẹn.</p>

                      <li><b>5. Medications:</b> Theo dõi thuốc</li>
                      <p>Chức năng này giúp bạn quản lý các loại thuốc đã được kê đơn, lịch uống thuốc, và nhắc nhở khi đến giờ uống thuốc. Nó đảm bảo rằng các thành viên trong gia đình tuân thủ đúng liệu trình điều trị.</p>

                      <li><b>6. Emergency Contacts:</b> Liên lạc khẩn cấp</li>
                      <p>Lưu trữ thông tin liên lạc của các bác sĩ hoặc người thân để sử dụng trong trường hợp khẩn cấp. Tính năng này giúp liên hệ nhanh chóng trong tình huống cần thiết.</p>

                      <li><b>7. Allergies:</b> Quản lý dị ứng</li>
                      <p>Cho phép người dùng lưu trữ thông tin về các loại dị ứng của từng thành viên, giúp các bác sĩ nắm rõ tiền sử y tế để tránh kê đơn thuốc gây phản ứng dị ứng.</p>

                      <li><b>8. Vaccinations:</b> Quản lý tiêm chủng</li>
                      <p>Theo dõi lịch sử tiêm chủng của các thành viên trong gia đình, giúp người dùng nhớ và lên kế hoạch cho các lần tiêm chủng tiếp theo.</p>

                      <li><b>9. Account Settings:</b> Cài đặt tài khoản</li>
                      <p>Quản lý thông tin cá nhân và bảo mật tài khoản của bạn. Tại đây, bạn có thể thay đổi mật khẩu, email hoặc cập nhật các thông tin khác liên quan đến tài khoản.</p>

                      <li><b>10. Reports & Stats:</b> Báo cáo và thống kê</li>
                      <p>Cung cấp các báo cáo và thống kê về sức khỏe của từng thành viên, bao gồm tình trạng hiện tại, lịch sử khám bệnh và các xu hướng quan trọng để dễ dàng theo dõi.</p>

                       <li><b>11. Help & Support:</b> Trợ giúp và hỗ trợ</li>
                       <p> Nhằm hướng dẫn người dùng hiểu rõ các tính năng của hệ thống và gửi yêu cầu hỗ trợ tới quản trị hệ thống.</p>

        </ul>
      </Card>

      {/* Card for support request */}
      <Card className="bg-white shadow-lg p-6 rounded-lg">
        <Title level={2} className="text-3xl font-bold text-blue-600">Gửi yêu cầu hỗ trợ</Title>
        <Paragraph className="text-gray-700 mb-4">
          Nếu bạn gặp phải bất kỳ vấn đề nào trong quá trình sử dụng, vui lòng mô tả chi tiết vấn đề của bạn và chúng tôi sẽ hỗ trợ sớm nhất có thể.
        </Paragraph>
        <SupportRequestForm
          supportRequest={supportRequest}
          setSupportRequest={setSupportRequest}
          handleSendSupportRequest={handleSendSupportRequest}
        />
      </Card>
    </Content>
  );
};

export default HelpPage;
