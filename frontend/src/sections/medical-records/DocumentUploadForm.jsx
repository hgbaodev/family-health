import { Form, Input } from "antd";

const DocumentUploadForm = () => {
  return (
    <Form.Item
      label="Tài liệu"
      name="documents"
      rules={[{ required: true, message: "Please upload documents" }]}
    >
      <Input type="file" />
    </Form.Item>
  );
};

export default DocumentUploadForm;
