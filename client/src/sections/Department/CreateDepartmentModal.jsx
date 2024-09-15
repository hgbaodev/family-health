import { App, Form, Input, Modal } from "antd";
import { dispatch, useSelector } from "~/store";
import { createMajor } from "~/store/slices/MajorSlice";
import { formatErrors } from "~/utils/formatErrors";

const CreateDepartmentModal = ({ open, onCancel }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { loadingForm } = useSelector((state) => state.major);
  const onFinish = async (values) => {
    try {
      await dispatch(createMajor(values)).unwrap();
      onCancel();
      message.success("Thêm bộ môn thành công !");
    } catch (error) {
      console.log(error);
      form.setFields(formatErrors(error));
    }
  };

  return (
    <Modal
      title="Thêm bộ môn"
      open={open}
      onOk={form.submit}
      onCancel={onCancel}
      width={440}
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
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        clearOnDestroy
      >
        <Form.Item
          label="Tên bộ môn"
          name="name"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Vui lòng nhập tên bộ môn !",
            },
          ]}
        >
          <Input placeholder="Khoa học máy tính" autoComplete="off" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateDepartmentModal;
