import { Button, Form, Input, Modal, Select, Row, Col, message,DatePicker} from "antd";
import { Flex } from "antd";
import { useCreateDocument } from "~/api/documents/create-documents";
import { useDocumentsStore } from "~/stores/documents/documentStore";

const { Option } = Select;

const CreateDocumentModal = () => {
  const [form] = Form.useForm();

  const { openCreateModal, setOpenCreateModal } = useDocumentsStore();

  const mutation = useCreateDocument({
    onSuccess: () => {
      form.resetFields();
      setOpenCreateModal(false);
      message.success("Document added successfully");
    },
    onFinish: () => {
      message.error("Failed to add new document");
    },
  });

  const onFinish = (values) => {
    mutation.mutate(values);
  };

  return (
    <Modal
      title="Add document"
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
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Record ID"
              name="recordID"
              rules={[{ required: true, message: "Please enter record id" }]}
            >
              <Input placeholder="Enter record id..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="File name"
              name="fileName"
              rules={[{ required: true, message: "Please enter file name" }]}
            >
              <Input placeholder="Enter file name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="File type"
              name="fileType"
              rules={[
                { required: true, message: "Please choose type of file" },
              ]}
            >
              <Input placeholder="Choose type of file..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="File content"
              name="fileContent"
              rules={[{ required: true, message: "Please enter file content" }]}
            >
              <Input placeholder="Enter file content..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Upload date"
              name="uploadDate"
              rules={[{ required: true, message: "Please select date" }]}
            >
              <DatePicker
                placeholder="Select date..."
                style={{ width: "100%" }}
              />
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

export default CreateDocumentModal;
