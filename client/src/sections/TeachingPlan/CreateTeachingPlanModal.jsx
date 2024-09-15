import { Form, Modal, InputNumber, App } from "antd";
import { useState } from "react";
import { dispatch } from "~/store";
import { createTeachingPlan } from "~/store/slices/TeachingPlanSlice";
import { formatErrors } from "~/utils/formatErrors";

const CreateTeachingPlanModal = ({ programAssignmentId, open, onCancel }) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      await dispatch(createTeachingPlan(values)).unwrap();
      onCancel();
      message.success("Thêm học kỳ thành công !");
    } catch (error) {
      console.log(error);
      form.setFields(formatErrors(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Tạo học kỳ"
      open={open}
      onOk={() => {
        form.submit();
      }}
      onCancel={onCancel}
      confirmLoading={isLoading}
      width={400}
      okText="Lưu"
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish} clearOnDestroy>
        <Form.Item
          name="program_assignment_id"
          initialValue={programAssignmentId}
          noStyle
        />
        <Form.Item
          name="semester"
          label="Học kỳ"
          rules={[
            {
              required: true,
              message: "Trường này là bắt buộc !",
              type: "number",
            },
          ]}
        >
          <InputNumber
            min={1}
            className="w-full"
            placeholder="VD: 1,2,3"
            changeOnWheel
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTeachingPlanModal;
