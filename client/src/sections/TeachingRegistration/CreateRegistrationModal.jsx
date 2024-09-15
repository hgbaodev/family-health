import { App, Col, Descriptions, Form, InputNumber, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { dispatch } from "~/store";
import { createTeachingRegistration } from "~/store/slices/TeachingRegistrationSlice";

const CreateRegistrationModal = ({ selectedRow, open, closeModal }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const items = [
    {
      key: "1",
      label: "Mã HP",
      children: selectedRow?.code,
      span: 3,
    },
    {
      key: "2",
      label: "Tên HP",
      children: selectedRow?.name,
      span: 3,
    },
    {
      key: "3",
      label: "Số TC",
      children: selectedRow?.credits,
    },
    {
      key: "4",
      label: "Số tiết LT",
      children: selectedRow?.theory_hours,
    },
    {
      key: "5",
      label: "Số tiết BT",
      children: selectedRow?.exercise_hours,
    },
    {
      key: "6",
      label: "Số tiết TH",
      children: selectedRow?.lab_hours,
    },
    {
      key: "7",
      label: "Khoá",
      children: selectedRow?.pivot?.applies_to_course,
    },
    {
      key: "8",
      label: "Số nhóm",
      children: selectedRow?.pivot?.group_counts,
    },
    {
      key: "9",
      label: "Số SV / LT",
      children: selectedRow?.pivot?.theory_group_student_count,
    },
    {
      key: "10",
      label: "Số SV / TH",
      children: selectedRow?.pivot?.lab_group_student_count,
    },
  ];

  useEffect(() => {
    if (open) {
      form.setFieldValue("subject_teaching_plan_id", selectedRow?.pivot.id);
    }
  }, [form, open, selectedRow]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await dispatch(createTeachingRegistration(values)).unwrap();
      form.resetFields();
      closeModal();
      message.success("Đăng ký thành công");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Đăng ký giảng dạy"
      okText="Đăng ký"
      cancelText="Huỷ"
      open={open}
      onOk={form.submit}
      onCancel={closeModal}
      maskClosable={false}
      confirmLoading={loading}
      destroyOnClose
    >
      <Descriptions column={3} items={items} size="small" className="mb-4" />
      <Form
        form={form}
        layout="vertical"
        variant="filled"
        onFinish={onFinish}
        clearOnDestroy
      >
        <Form.Item
          name="subject_teaching_plan_id"
          initialValue={selectedRow?.pivot.id}
          noStyle
        />
        <Row gutter={16}>
          {selectedRow?.theory_hours > 0 && (
            <Col span={24}>
              <Form.Item
                label="Số nhóm lý thuyết"
                name="theory_group_count"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số nhóm lý thuyết",
                  },
                  {
                    type: "number",
                    min: 0,
                    max: selectedRow?.pivot?.group_counts,
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  min={0}
                  max={selectedRow?.pivot?.group_counts}
                  changeOnWheel
                />
              </Form.Item>
            </Col>
          )}
          {selectedRow?.exercise_hours > 0 && (
            <Col span={24}>
              <Form.Item
                label="Số nhóm bài tập"
                name="exercise_group_count"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số nhóm bài tập",
                  },
                  {
                    type: "number",
                    min: 0,
                    max: selectedRow?.pivot?.group_counts,
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  min={0}
                  max={selectedRow?.pivot?.group_counts}
                  changeOnWheel
                />
              </Form.Item>
            </Col>
          )}
          {selectedRow?.lab_hours > 0 && (
            <Col span={24}>
              <Form.Item
                label="Số nhóm thực hành"
                name="lab_group_count"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số nhóm thực hành",
                  },
                  {
                    type: "number",
                    min: 0,
                    max: selectedRow?.pivot?.group_counts,
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  min={0}
                  max={selectedRow?.pivot?.group_counts}
                  changeOnWheel
                />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateRegistrationModal;
