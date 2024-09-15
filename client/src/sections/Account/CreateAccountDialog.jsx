import { useEffect, useState } from "react";
import { App, Flex, Form, Input, Modal, Select, Spin, Switch, Tag } from "antd";
import { useSelector } from "react-redux";
import { fetchLecturers } from "~/store/slices/LecturerSlice";
import { formatErrors } from "~/utils/formatErrors";
import { useDebounce } from "~/hooks/useDebounce";
import { createAccount } from "~/store/slices/AccountSlice";
import { dispatch } from "~/store";

const CreateAccountDialog = ({ open, onCancel }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { loadingForm } = useSelector((state) => state.account);
  const { items, loadingFetch } = useSelector((state) => state.lecturer);
  const [searchText, setSearchText] = useState("");

  const debouncedSearchText = useDebounce(searchText, 300);

  const onFinish = async (values) => {
    try {
      await dispatch(createAccount(values)).unwrap();
      onCancel();
      message.success("Tạo tài khoản thành công !");
    } catch (error) {
      console.log(error);
      form.setFields(formatErrors(error));
    }
  };

  useEffect(() => {
    if (open) {
      dispatch(
        fetchLecturers({
          search: debouncedSearchText,
          filters: {
            hasAccount: false,
          },
        })
      );
    }
  }, [debouncedSearchText, open]);

  const handleClose = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      title="Tạo tài khoản"
      open={open}
      onOk={form.submit}
      onCancel={handleClose}
      width={440}
      okText="Lưu"
      cancelText="Hủy bỏ"
      confirmLoading={loadingForm}
      destroyOnClose
    >
      <Form
        form={form}
        initialValues={{
          lecturer_id: null,
          email: "",
          password: "",
          is_active: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        validateTrigger="onBlur"
      >
        <Form.Item
          label="Giảng viên liên kết"
          name="lecturer_id"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn giảng viên liên kết !",
            },
          ]}
        >
          <Select
            placeholder="Chọn giảng viên liên kết"
            options={items}
            fieldNames={{ label: "fullname", value: "id" }}
            optionRender={(option) => {
              const { code, fullname, type } = option.data;
              return (
                <Flex justify="space-between" align="center">
                  <span>{`${code} - ${fullname}`}</span>
                  <Tag color="cyan">{type}</Tag>
                </Flex>
              );
            }}
            notFoundContent={
              loadingFetch ? <Spin size="small" /> : "Không tìm thấy giảng viên"
            }
            defaultActiveFirstOption={false}
            suffixIcon={null}
            onSearch={(value) => setSearchText(value)}
            filterOption={false}
            showSearch
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email !",
            },
            {
              type: "email",
              message: "Email không hợp lệ !",
            },
          ]}
        >
          <Input placeholder="email@domain.com" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Vui lòng nhập mật khẩu !",
            },
            {
              min: 6,
              message: "Mật khẩu phải có ít nhất 6 ký tự !",
            },
          ]}
        >
          <Input.Password
            placeholder="Vui lòng nhập mật khẩu"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          label="Trạng thái"
          name="is_active"
          layout="horizontal"
        >
          <Switch checkedChildren="Hoạt động" unCheckedChildren="Khoá" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAccountDialog;
