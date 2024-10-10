import { Button, Form, Input, Modal, Select, Row, Col, message } from "antd";
import { Flex } from "antd";
import { useCreateAllergy } from "~/api/allergies/create-allergy";
import { useAllergiesStore } from "~/stores/allergies/allergyStore";

const { Option } = Select;

const CreateAllergyModal = () => {
  const [form] = Form.useForm();

  const { openCreateModal, setOpenCreateModal } = useAllergiesStore();

  const mutation = useCreateAllergy({
    onSuccess: () => {
      form.resetFields();
      setOpenCreateModal(false);
      message.success("Allergy added successfully");
    },
    onFinish: () => {
      message.error("Failed to add new allergy");
    },
  });

  const onFinish = (values) => {
    mutation.mutate(values);
  };

  return (
    <Modal
      title="Add allergy"
      open={openCreateModal}
      onCancel={() => setOpenCreateModal(false)}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} className="pt-4" layout="vertical" variant="filled">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Allergy type"
              name="allergyType"
              rules={[{ required: true, message: "Please enter type of allergy" }]}
            >
              <Input placeholder="Enter allergy type..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Severity"
              name="severity"
              rules={[{ required: true, message: "Please enter severity of allergy" }]}
            >
              <Input placeholder="Enter severity" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Symptoms"
              name="symptoms"
              rules={[{ required: true, message: "Please describe symptoms of the allergy" }]}
            >
               <Input placeholder="Describe symptoms..."/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="MemberId"
              name="memberID"
              rules={[{ required: true, message: "Please enter memberId" }]}
            >
              <Input placeholder="Enter memberId..." />
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

export default CreateAllergyModal;