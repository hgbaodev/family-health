import { Layout, Button, Input, Form, message, Card, Typography } from "antd";
import React, { useState } from "react";

const { Content } = Layout;
const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const SupportRequestForm = ({ supportRequest, setSupportRequest, handleSendSupportRequest }) => (
  <Form layout="vertical">
    <Form.Item
      label="Nội dung yêu cầu hỗ trợ"
      rules={[{ required: true, message: "Vui lòng nhập nội dung yêu cầu" }]}
    >
      <TextArea
        rows={4}
        value={supportRequest}
        onChange={(e) => setSupportRequest(e.target.value)}
        placeholder="Nhập nội dung yêu cầu hỗ trợ"
      />
    </Form.Item>
    <Form.Item>
      <Button type="primary" onClick={handleSendSupportRequest}>
        Gửi yêu cầu
      </Button>
    </Form.Item>
  </Form>
);

const HelpPage = () => {
  // State để lưu nội dung yêu cầu hỗ trợ
  const [supportRequest, setSupportRequest] = useState("");

  // Hàm xử lý khi gửi yêu cầu
  const handleSendSupportRequest = async () => {
    try {
      // API giả định để gửi yêu cầu hỗ trợ lên server
      const response = await fetch("/api/support-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ request: supportRequest }),
      });

      if (response.ok) {
        message.success("Yêu cầu hỗ trợ đã được gửi thành công");
        setSupportRequest(""); // Xóa nội dung sau khi gửi
      } else {
        throw new Error("Gửi yêu cầu thất bại");
      }
    } catch (error) {
      message.error("Đã có lỗi xảy ra: " + error.message);
    }
  };

  return (
    <Content className="p-4 bg-gray-100">
      {/* Card for user guide */}
      <Card className="mb-6" bordered={false}>
        <Title level={2}>HƯỚNG DẪN SỬ DỤNG HỆ THỐNG</Title>
        <Paragraph>
          Hệ thống <b>FamilyHealth</b> giúp người dùng lưu trữ hồ sơ khám bệnh và nắm bắt các thông tin y tế quan trọng của từng thành viên trong gia đình. Dưới đây là mô tả về từng chức năng chính của hệ thống:
        </Paragraph>
        <p>  Để sử dụng hệ thống, bạn cần tạo một tài khoản và đăng nhập. Sau khi đăng nhập, các chức năng chính của hệ thống bao gồm:
        </p>

        <ul className="list-disc list-inside">
            <li><b>1. Trang Members:</b> Quản lý thành viên gia đình</li>
                <p>
                Cho phép người dùng tạo và lưu thông tin y tế của từng thành viên
                trong gia đình, bao gồm tên, ngày sinh, giới tính,mối quan hệ, nhóm máu, cân nặng, chiều cao.
                Từ đây, bạn có thể xem, chỉnh sửa, và thêm các thành viên mới.
                </p>

            <li><b>2. Trang History:</b> Xem lịch sử khám bệnh</li>
                <p>
                    Hiển thị lịch sử khám bệnh của từng thành viên,
                     bao gồm các lần khám trước đó, bác sĩ phụ trách,
                      ngày giờ, và các ghi chú liên quan.
                       Chức năng này giúp người dùng dễ dàng theo dõi quá trình
                        chăm sóc sức khỏe.
                </p>

            <li><b>3. Medical Records:</b> Quản lý hồ sơ bệnh án</li>
                <p>
                    Quản lý toàn bộ hồ sơ bệnh án của các thành viên trong gia đình,
                    bao gồm kết quả xét nghiệm, đơn thuốc và chẩn đoán. Người dùng có thể
                    tải lên hoặc lưu các tài liệu liên quan đến sức khỏe.
                </p>

            <li><b>4. Appointments:</b> Quản lý cuộc hẹn khám bệnh</li>
                <p>
                    Giúp người dùng lên lịch và theo dõi các cuộc hẹn với bác sĩ,
                     bao gồm ngày giờ, địa điểm, và lý do khám. Bạn có thể nhận
                     nhắc nhở trước mỗi cuộc hẹn.
                </p>

            <li><b>5. Medications:</b> Theo dõi thuốc</li>
                <p>
                    Chức năng này giúp bạn quản lý các loại thuốc đã được kê đơn,
                    lịch uống thuốc, và nhắc nhở khi đến giờ uống thuốc.
                    Nó đảm bảo rằng các thành viên trong gia đình tuân
                    thủ đúng liệu trình điều trị.
                </p>

            <li><b>6. Emergency Contacts:</b> Liên lạc khẩn cấp</li>
                <p>
                    Lưu trữ thông tin liên lạc của các bác sĩ hoặc người
                    thân để sử dụng trong trường hợp khẩn cấp.
                    Tính năng này giúp liên hệ nhanh chóng
                    trong tình huống cần thiết.
                </p>

            <li><b>7. Allergies:</b> Quản lý dị ứng</li>
                <p>
                    Cho phép người dùng lưu trữ thông tin về
                     các loại dị ứng của từng thành viên,
                     giúp các bác sĩ nắm rõ tiền sử y tế để
                     tránh kê đơn thuốc gây phản ứng dị ứng.
                </p>

            <li><b>8. Vaccinations:</b> Quản lý tiêm chủng</li>
                <p>
                    Theo dõi lịch sử tiêm chủng của các thành viên
                    trong gia đình, giúp người dùng nhớ và lên kế
                    hoạch cho các lần tiêm chủng tiếp theo.
                </p>

            <li><b>9. Account Settings:</b> Cài đặt tài khoản</li>
                <p>
                    Quản lý thông tin cá nhân và bảo mật tài khoản của bạn.
                     Tại đây, bạn có thể thay đổi mật khẩu, email hoặc cập
                      nhật các thông tin khác liên quan đến tài khoản.
                </p>

            <li><b>10. Reports & Stats:</b> Báo cáo và thống kê</li>
                <p>
                    Cung cấp các báo cáo và thống kê về sức khỏe của từng thành viên,
                    bao gồm tình trạng hiện tại, lịch sử khám bệnh và các xu hướng quan trọng
                    để dễ dàng theo dõi.
                </p>

            <li><b>11. Help & Support:</b> Hỗ trợ và giúp đỡ</li>
                <p>
                    Nhằm hướng dẫn người dùng hiểu rõ cách sử dụng hệ thống và gửi yêu cầu hỗ trợ
                </p>
        </ul>
      </Card>

      {/* Card for support request */}
      <Card bordered={false}>
        <Title level={2}>Gửi yêu cầu hỗ trợ</Title>
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
