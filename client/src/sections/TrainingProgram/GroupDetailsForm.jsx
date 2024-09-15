import {
  App,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Table,
  TreeSelect,
} from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchSubjects } from "~/store/slices/SubjectSlice";
import { dispatch } from "~/store";
import { v4 as uuidv4 } from "uuid";
import {
  SearchOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";

const GroupDetailsForm = ({ listCategories, selectedNode }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [listSubjects, setListSubjects] = useState([]);
  const { items } = useSelector((state) => state.subject);
  const [searchText, setSearchText] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  const initDefault = {
    id: uuidv4(),
    title: "",
    min_credits: null,
    parent_id: null,
    subjects: [],
  };

  const initialValues = selectedNode ?? initDefault;

  const setFieldsValue = (selectedNode) => {
    if (selectedNode) {
      form.setFieldsValue(selectedNode);
      setListSubjects(selectedNode.subjects);
    } else {
      console.log("reset");
      form.setFieldsValue(initDefault);
      setListSubjects([]);
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Lưu thành công");
    setFieldsValue(selectedNode);
  };

  useEffect(() => {
    dispatch(fetchSubjects({}));
  }, [searchText]);

  useEffect(() => {
    setFieldsValue(selectedNode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, selectedNode]);

  const onSelect = (value, option) => {
    const isExist = listSubjects.some(
      (subject) => subject.code === option.code
    );
    if (!isExist) {
      form.setFieldsValue({
        subjects: [...listSubjects, option],
      });
      setListSubjects([...listSubjects, option]);
      setSelectedValue(null);
    } else {
      message.error("Học phần đã tồn tại trong danh sách");
    }
  };

  const handleDeleteSubject = (record) => {
    const newSubjects = listSubjects.filter(
      (subject) => subject.code !== record.code
    );
    setListSubjects(newSubjects);
    form.setFieldsValue({
      subjects: newSubjects,
    });
  };

  return (
    <Card
      title="Chi tiết nhóm"
      extra={
        <Button
          icon={<SaveOutlined />}
          type="primary"
          onClick={() => form.submit()}
        >
          Lưu
        </Button>
      }
    >
      <Form
        form={form}
        variant="filled"
        name="detailsForm"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={initialValues}
      >
        <Form.Item name="id" noStyle />
        <Form.Item name="subjects" noStyle />
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="title"
              required
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
            >
              <Input placeholder="Tiêu đề" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="min_credits">
              <InputNumber
                className="w-full"
                placeholder="Số tín chỉ tối thiểu"
                min={0}
                changeOnWheel
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item name="parent_id">
              <TreeSelect
                showSearch
                dropdownStyle={{
                  maxHeight: 400,
                  overflow: "auto",
                }}
                placeholder="Chọn nhóm cha"
                allowClear
                treeDefaultExpandAll
                treeData={listCategories}
                fieldNames={{
                  label: "title",
                  value: "id",
                  children: "children",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Space direction="vertical" className="w-full">
              <Table
                dataSource={listSubjects}
                size="small"
                rowKey="code"
                pagination={false}
                scroll={{ x: true }}
                bordered
                showHeader
              >
                <Table.Column
                  title="Mã HP"
                  dataIndex="code"
                  key="code"
                  align="left"
                />
                <Table.Column
                  title="Tên học phần"
                  dataIndex="name"
                  key="name"
                />
                <Table.Column
                  title="Số TC"
                  align="center"
                  dataIndex="credits"
                  key="credits"
                />
                <Table.Column
                  title="Số tiết LT"
                  align="center"
                  dataIndex="theory_hours"
                  key="theory_hours"
                />
                <Table.Column
                  title="Số tiết TH"
                  align="center"
                  dataIndex="lab_hours"
                  key="lab_hours"
                />
                <Table.Column
                  title="Số tiết BT"
                  align="center"
                  dataIndex="exercise_hours"
                  key="exercise_hours"
                />
                <Table.Column
                  title="Hệ số"
                  align="center"
                  dataIndex="coefficient"
                  key="coefficient"
                />
                <Table.Column
                  title="Thao tác"
                  key="action"
                  fixed="right"
                  align="center"
                  width={80}
                  render={(text, record) => (
                    <Button
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => handleDeleteSubject(record)}
                      size="small"
                    />
                  )}
                />
              </Table>
              <Select
                variant="filled"
                options={items}
                value={selectedValue}
                fieldNames={{ label: "name", value: "id" }}
                placeholder="Tìm kiếm học phần để thêm vào danh sách"
                className="w-full mt-2"
                defaultActiveFirstOption={false}
                filterOption={false}
                suffixIcon={<SearchOutlined />}
                onSearch={(value) => setSearchText(value)}
                onSelect={onSelect}
                optionRender={(option) => {
                  const { data } = option;
                  return (
                    <span>
                      {data.code} - {data.name}
                    </span>
                  );
                }}
                showSearch
                allowClear
              />
            </Space>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default GroupDetailsForm;
