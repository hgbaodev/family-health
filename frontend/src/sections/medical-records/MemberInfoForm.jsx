import { Form, Select, Input, DatePicker, Row, Col, Flex } from "antd";
import { useMembersByUser } from "~/api/members/get-members";

const { Option } = Select;
const { TextArea } = Input;

const MemberInfoForm = () => {
  const { data: members, isLoading } = useMembersByUser();

  return (
    <Row gutter={12}>
      <Col span={12}>
        <Form.Item
          label="Thành viên"
          name="memberId"
          rules={[{ required: true, message: "Please choose a member" }]}
        >
          <Select loading={isLoading} placeholder="Select member...">
            {members?.map((member) => (
              <Option key={member.id} value={member.id}>
                {member.fullName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Tên cơ sở"
          name="facilityName"
          rules={[{ required: true, message: "Vui lòng nhập tên cơ sở" }]}
        >
          <Input placeholder="Nhập tên cơ sở..." />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Ngày"
          name="date"
          rules={[{ required: true, message: "Please select date" }]}
        >
          <DatePicker placeholder="Select date..." className="w-full" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Bác sĩ"
          name="doctor"
          rules={[{ required: true, message: "Please enter doctor" }]}
        >
          <Input placeholder="Enter doctor name..." />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Triệu chứng"
          name="symptoms"
          rules={[{ required: true, message: "Please describe symptoms" }]}
        >
          <TextArea rows={8} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Flex className="w-full" vertical>
          <Form.Item
            label="Chuẩn đoán"
            name="diagnosis"
            rules={[{ required: true, message: "Please enter diagnosis" }]}
          >
            <TextArea
              className="w-full"
              placeholder="Enter diagnosis ..."
              rows={2}
            />
          </Form.Item>
          <Form.Item
            label="Điều trị"
            name="treatment"
            rules={[{ required: true, message: "Please describe treatment" }]}
          >
            <TextArea placeholder="Describe treatment..." rows={2} />
          </Form.Item>
        </Flex>
      </Col>
    </Row>
  );
};

export default MemberInfoForm;
