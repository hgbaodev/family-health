import { Button, Form, Input, Modal, Row, Col, message } from "antd";
import { useUpdateEmergencyContact } from "~/api/emergency-contacts/update-emergencyContact";
import { useEmergencyContactStore } from "~/stores/emergencyContactStore";
import { useEffect } from "react";
import { Flex } from "antd";

// const { Option } = Select;

const UpdateEmergencyContactModal = () => {
  const [form] = Form.useForm();
  const { openUpdateModal, setOpenUpdateModal, emergencyContact } = useEmergencyContactStore((state) => state);

  const mutation = useUpdateEmergencyContact({
    onSuccess: () => {
      form.resetFields();  // Reset form sau khi cập nhật thành công
      message.success("Emergency contact updated successfully");
      // setOpenUpdateModal(false); // Đóng modal
    },
    onError: () => {
      message.error("Failed to update emergency contact");
    },
  });

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
    };
    mutation.mutate({
      id: emergencyContact.contactID,
      data: formattedValues,
    });
    setOpenUpdateModal(false);
  };

  useEffect(() => {
    if (emergencyContact) {
      form.setFieldsValue({
        ...emergencyContact,
      });
    }
  }, [emergencyContact, form]);

  return (
    <Modal
      title="Update Emergency Contact"
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
          <Col span={24}>
            <Form.Item
              label="User ID"
              name="userID"
              rules={[{ required: true, message: "Please enter userID" }]}
            >
              <Input placeholder="Enter userID..." />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input placeholder="Enter name..." />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Relationship"
              name="relationship"
              rules={[{ required: true, message: "Please enter relationship" }]}
            >
              <Input placeholder="Enter relationship..." />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input placeholder="Enter phone number..." />
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

export default UpdateEmergencyContactModal;