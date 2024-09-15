import { App, Form, Modal, Select, Switch } from "antd";
import { useState } from "react";
import { dispatch } from "~/store";
import { createProgramAssignment } from "~/store/slices/TeachingPlanSlice";
import { formatErrors } from "~/utils/formatErrors";

const CreateProgramAssignmentModal = ({ schoolYearId, open, onCancel }) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      await dispatch(createProgramAssignment(values)).unwrap();
      onCancel();
      message.success("Tạo kế hoạch thành công !");
    } catch (error) {
      console.log(error);
      form.setFields(formatErrors(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Tạo kế hoạch giảng dạy"
      open={open}
      onOk={form.submit}
      onCancel={onCancel}
      confirmLoading={isLoading}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          majors: [],
        }}
        variant="filled"
        onFinish={onFinish}
        clearOnDestroy
      >
        <Form.Item name="school_year_id" initialValue={schoolYearId} noStyle />
        <Form.Item
          name="majors"
          label="Ngành"
          rules={[
            {
              required: true,
              message: "Trường này là bắt buộc !",
            },
          ]}
        >
          <Select
            options={[
              { label: "Công nghệ thông tin", value: 1 },
              { label: "Kỹ thuật phần mềm", value: 2 },
              { label: "Công nghệ thông tin CLC", value: 3 },
              { label: "Trí tuệ nhân tạo", value: 4 },
            ]}
            placeholder="Chọn ngành"
            mode="multiple"
          />
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          label="Chất lượng cao"
          name="is_hight_quality"
          layout="horizontal"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProgramAssignmentModal;
