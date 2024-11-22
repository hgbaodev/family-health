import { Button, Form, Input, Modal, Select, DatePicker, Row, Col, message } from "antd";
import { Flex } from "antd";
import { useUpdateMember } from "~/api/members/update-member";
import { useMembersStore } from "~/stores/memberStore";
import moment from "moment";
import { useEffect } from "react";

const { Option } = Select;

const UpdateMemberModal = () => {
  const [form] = Form.useForm();
  const { openUpdateModal, setOpenUpdateModal, member } = useMembersStore((state) => state);

  const mutation = useUpdateMember({
    onSuccess: () => {
      form.resetFields();
      message.success("Member updated successfully");
    },
    onError: () => {
      message.error("Failed to update member");
    },
  });

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format("YYYY-MM-DD") : null,
    };
    mutation.mutate({
      id: member.id,
      data: formattedValues,
    });
    setOpenUpdateModal(false);
  };

  useEffect(() => {
    if (member) {
      form.setFieldsValue({
        ...member,
        dateOfBirth: member.dateOfBirth ? moment(member.dateOfBirth) : null,
      });
    }
  }, [member, form]);

  return (
    <Modal
    width={800}
      title="Update Member"
      open={openUpdateModal}
      onCancel={() => setOpenUpdateModal(false)}
      footer={null}
    >
      <Form
        className="pt-4"
        layout="vertical"
        variant="filled"
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Please enter full name" }]}
            >
              <Input placeholder="Enter full name..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Date of Birth"
              name="dateOfBirth"
              rules={[{ required: true, message: "Please select date of birth" }]}
            >
              <DatePicker placeholder="Select date of birth..." style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <Select placeholder="Select gender...">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Relationship"
              name="relationship"
              rules={[{ required: true, message: "Please enter relationship" }]}
            >
              <Input placeholder="Enter relationship..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Blood Type"
              name="bloodType"
              rules={[{ required: true, message: "Please select blood type" }]}
            >
              <Select placeholder="Select blood type...">
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="AB">AB</Option>
                <Option value="O">O</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Height (m)"
              name="height"
              rules={[{ required: true, message: "Please enter height" }]}
            >
              <Input type="number" step="0.01" placeholder="Enter height in meters..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Weight (kg)"
              name="weight"
              rules={[{ required: true, message: "Please enter weight" }]}
            >
              <Input type="number" step="0.1" placeholder="Enter weight in kilograms..." />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className="pt-4 m-0">
          <Flex justify="end" className="gap-3">
            <Button
              loading={false}
              type="default"
              htmlType="reset"
            >
              Reset
            </Button>
            <Button
              loading={false}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateMemberModal;