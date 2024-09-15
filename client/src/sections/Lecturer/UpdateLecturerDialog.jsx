import { App, Col, Form, Input, InputNumber, Modal, Row, Select } from "antd";
import { dispatch, useSelector } from "~/store";
import { formatErrors } from "~/utils/formatErrors";
import { LECTURER_TYPES } from "~/constants/lecturerTypes";
import { useEffect } from "react";
import { updateLecturer } from "~/store/slices/LecturerSlice";

const UpdateLecturerDialog = ({ record, open, onCancel }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { loadingForm } = useSelector((state) => state.lecturer);

  useEffect(() => {
    if (open) {
      form.setFieldsValue(record);
    }
  }, [form, open, record]);

  const onFinish = async (values) => {
    try {
      await dispatch(updateLecturer(values)).unwrap();
      onCancel();
      message.success("Cập nhật giảng viên thành công !");
    } catch (error) {
      console.log(error);
      form.setFields(formatErrors(error));
    }
  };

  return (
    <Modal
      title="Chỉnh sửa giảng viên"
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
        initialValues={record}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item name="id" noStyle hidden />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Mã giảng viên"
              name="code"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Vui lòng nhập mã giảng viên !",
                },
              ]}
            >
              <Input placeholder="Nhập mã giảng viên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Họ và tên"
              name="fullname"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Vui lòng nhập họ và tên !",
                },
              ]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Vui lòng nhập email !",
                },
                {
                  type: "email",
                  message: "Email không hợp lệ !",
                },
              ]}
            >
              <Input type="email" placeholder="Nhập email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Vui lòng nhập số điện thoại !",
                },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Năm sinh"
              name="birthyear"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập năm sinh !",
                },
              ]}
            >
              <InputNumber
                className="w-full"
                placeholder="Nhập năm sinh"
                changeOnWheel
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Học hàm/Học vị"
              name="academic_title"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Vui lòng nhập học hàm / học vị !",
                },
              ]}
            >
              <Input placeholder="Nhập học hàm / học vị" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Đơn vị công tác"
              name="work_unit"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Vui lòng nhập đơn vị công tác !",
                },
              ]}
            >
              <Input placeholder="Nhập đơn vị công tác" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Loại giảng viên"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại giảng viên !",
                },
              ]}
            >
              <Select
                placeholder="Chọn loại giảng viên"
                options={LECTURER_TYPES}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateLecturerDialog;
