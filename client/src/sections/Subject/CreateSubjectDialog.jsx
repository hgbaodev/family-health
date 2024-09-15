import { App, Col, Form, Input, InputNumber, Modal, Row, Select } from "antd";
import { dispatch, useSelector } from "~/store";
import { createSubject } from "~/store/slices/SubjectSlice";
import { formatErrors } from "~/utils/formatErrors";

const CreateSubjectDialog = ({ open, onCancel }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { loadingForm } = useSelector((state) => state.subject);
  const { items } = useSelector((state) => state.department);

  const onFinish = async (values) => {
    try {
      await dispatch(createSubject(values)).unwrap();
      onCancel();
      message.success("Thêm học phần thành công !");
    } catch (error) {
      console.log(error);
      form.setFields(formatErrors(error));
    }
  };

  return (
    <Modal
      title="Thêm học phần"
      open={open}
      onOk={form.submit}
      onCancel={onCancel}
      okText="Lưu"
      cancelText="Hủy bỏ"
      confirmLoading={loadingForm}
      destroyOnClose
    >
      <Form
        form={form}
        initialValues={{
          code: "",
          name: "",
          credits: "",
          theory_hours: "",
          lab_hours: "",
          exercise_hours: "",
          coefficient: "",
          department_id: null,
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        clearOnDestroy
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Mã học phần"
              name="code"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Vui lòng nhập mã học phần !",
                },
              ]}
            >
              <Input placeholder="Nhập mã học phần" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tên học phần"
              name="name"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Vui lòng nhập tên học phần !",
                },
              ]}
            >
              <Input placeholder="Nhập tên học phần" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Số tín chỉ"
              name="credits"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số tín chỉ !",
                },
              ]}
            >
              <InputNumber
                min={0}
                max={100}
                className="w-full"
                placeholder="Nhập số tín chỉ"
                changeOnWheel
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số tiết lý thuyết"
              name="theory_hours"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số tiết lý thuyết !",
                },
              ]}
            >
              <InputNumber
                min={0}
                max={100}
                className="w-full"
                placeholder="Nhập số tiết lý thuyết"
                changeOnWheel
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Số tiết thực hành"
              name="lab_hours"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số tiết thực hành !",
                },
              ]}
            >
              <InputNumber
                min={0}
                max={100}
                className="w-full"
                placeholder="Nhập số tiết thực hành"
                changeOnWheel
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số tiết bài tập"
              name="exercise_hours"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số tiết bài tập !",
                },
              ]}
            >
              <InputNumber
                min={0}
                max={100}
                className="w-full"
                placeholder="Nhập số tiết bài tập"
                changeOnWheel
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Hệ số"
              name="coefficient"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập hệ số !",
                },
              ]}
            >
              <InputNumber
                min={0}
                max={1}
                step={0.1}
                className="w-full"
                placeholder="Nhập hệ số"
                changeOnWheel
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Bộ môn" name="department_id">
              <Select
                placeholder="Chọn bộ môn"
                options={items.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateSubjectDialog;
