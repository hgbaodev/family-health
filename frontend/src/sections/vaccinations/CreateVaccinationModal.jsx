import { Button, Form, Input, Modal, DatePicker, Row, Col, Select, message } from "antd";
import { Flex } from "antd";
import { useMembersByUser } from "~/api/members/get-members";
import { useVaccinationsStore } from "~/stores/vaccinationStore";
import { useEffect } from "react";
import { useCreateVaccination } from "~/api/vaccinations/create-vaccinaion";

const { Option } = Select;

const CreateVaccinationModal = () => {
  const [form] = Form.useForm();

  const { openCreateModal, setOpenCreateModal } = useVaccinationsStore();

  const { data: members } = useMembersByUser();

  useEffect(() => {
    if (openCreateModal) {
      form.resetFields();
    }
  }, [openCreateModal, form]);

  const mutation = useCreateVaccination({
    onSuccess: () => {
      setOpenCreateModal(false);
      message.success("Vaccination created successfully");
    },
    onFinish: () => {
      message.error("Failed to create vaccination");
    },
  });

  const onFinish = (values) => {
    mutation.mutate(values);
  };

  return (
    <Modal
      title="Create Vaccination"
      open={openCreateModal}
      onCancel={() => setOpenCreateModal(false)}
      footer={null}
    >
      <Form
        form={form}
        onFinish={onFinish}
        className="pt-4"
        layout="vertical"
        variant="filled"
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Member"
              name="memberId"
              rules={[{ required: true, message: "Please select member" }]}
            >
              <Select placeholder="Select member...">
                {members?.map((member) => (<Option key={member.id} value={member.id}>{member.fullName}</Option>))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Vaccination Name"
              name="vaccineName"
              rules={[
                { required: true, message: "Please enter vaccination name" },
              ]}
            >
              <Input placeholder="Enter vaccination name..." />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Date Administered"
              name="dateAdministered"
              rules={[
                { required: true, message: "Please enter vaccination date" },
              ]}
            >
              <DatePicker showTime className="w-full" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className="pt-4 m-0">
          <Flex justify="end" className="gap-3">
            <Button loading={false} type="default" htmlType="reset">
              Reset
            </Button>
            <Button loading={false} type="primary" htmlType="submit">
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateVaccinationModal;