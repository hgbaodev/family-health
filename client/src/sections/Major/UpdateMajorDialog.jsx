import { App, Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { dispatch, useSelector } from "~/store";
import { updateMajor } from "~/store/slices/MajorSlice";
import { formatErrors } from "~/utils/formatErrors";

const UpdateMajorDialog = ({ record, open, onCancel }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { loadingForm } = useSelector((state) => state.major);

  useEffect(() => {
    if (open) {
      form.setFieldsValue(record);
    }
  }, [form, open, record]);

  const onFinish = async (values) => {
    try {
      await dispatch(updateMajor(values)).unwrap();
      onCancel();
      message.success("Sửa ngành thành công !");
    } catch (error) {
      form.setFields(formatErrors(error));
    }
  };

  return (
    <Modal
      title="Sửa ngành"
      open={open}
      onOk={form.submit}
      onCancel={onCancel}
      width={440}
      okText="Lưu"
      cancelText="Hủy bỏ"
      confirmLoading={loadingForm}
      destroyOnClose={true}
    >
      <Form
        form={form}
        initialValues={record}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item name="id" noStyle hidden />
        <Form.Item
          label="Mã ngành"
          name="code"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Vui lòng nhập mã ngành !",
            },
          ]}
        >
          <Input placeholder="7480201" />
        </Form.Item>

        <Form.Item
          label="Tên ngành"
          name="name"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Vui lòng nhập tên ngành !",
            },
          ]}
        >
          <Input placeholder="Công nghệ thông tin" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateMajorDialog;
