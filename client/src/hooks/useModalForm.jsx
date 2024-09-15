import { useState } from "react";
import { Form } from "antd";

const useModalForm = (initialValues = {}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const showModal = (values) => {
    if (values) {
      form.setFieldsValue(values);
    } else {
      form.resetFields();
    }
  };

  const handleOk = async (onFinish) => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await onFinish(values);
      setLoading(false);
      form.resetFields();
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    showModal,
    handleOk,
  };
};

export default useModalForm;
