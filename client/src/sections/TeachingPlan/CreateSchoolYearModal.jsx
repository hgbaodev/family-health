import { Form, Modal, InputNumber, App, Col, Row } from "antd";
import { useSelector } from "react-redux";
import { dispatch } from "~/store";
import { createSchoolYear } from "~/store/slices/TeachingPlanSlice";
import { formatErrors } from "~/utils/formatErrors";

const CreateSchoolYearModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const { loadingForm } = useSelector((state) => state.teachingPlan);
  const handleSave = async (values) => {
    try {
      await dispatch(createSchoolYear(values)).unwrap();
      onCancel();
      message.success("Thêm năm học thành công !");
    } catch (error) {
      console.log(error);
      form.setFields(formatErrors(error));
    }
  };

  return (
    <Modal
      title="Tạo năm học"
      open={open}
      onOk={form.submit}
      onCancel={onCancel}
      confirmLoading={loadingForm}
      destroyOnClose
    >
      <Form
        form={form}
        onFinish={handleSave}
        layout="vertical"
        validateTrigger="onBlur"
        variant="filled"
        clearOnDestroy
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="start_year"
              label="Năm bắt đầu"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc !",
                  type: "number",
                },
              ]}
            >
              <InputNumber min={1} className="w-full" autoFocus changeOnWheel />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Năm kết thúc"
              name="end_year"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc !",
                  type: "number",
                },
                {
                  validator: (_, value) => {
                    if (value && value <= form.getFieldValue("start_year")) {
                      return Promise.reject("Năm kết thúc lớn hơn năm bắt đầu");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputNumber min={1} className="w-full" changeOnWheel />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateSchoolYearModal;
