import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import HeaderBreadcrumbs from "~/components/HeaderBreadcrumbs";
import {
  SaveOutlined,
  ImportOutlined,
  ApartmentOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useBoolean } from "~/hooks/useBoolean";
import { v4 as uuidv4 } from "uuid";

const AddTrainingProgramPage = () => {
  const [form] = Form.useForm();
  const [listCategories, setListCategories] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const {
    value: isOpenAddBlock,
    setFalse: closeAddBlock,
    setTrue: openAddBlock,
  } = useBoolean();

  const onSubmit = () => {
    form.submit();
    form.validateFields().then((values) => {
      console.log(values);
    });
  };

  console.log(listCategories);

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-5">
        <HeaderBreadcrumbs
          heading="Tạo chương trình đào tạo"
          links={[
            { title: "Home", href: "/" },
            { title: "Chương trình đào tạo", href: "/" },
            { title: "Tạo mới" },
          ]}
        />
        <Space>
          <Button icon={<ImportOutlined />}>Import</Button>
          <Button type="primary" icon={<SaveOutlined />} onClick={onSubmit}>
            Lưu
          </Button>
        </Space>
      </Flex>
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          if (name === "addBlock") {
            // const { parent_category_id } = values;
            setListCategories((prevCategories) => {
              if (!selectedNode) {
                return [...prevCategories, values];
              }

              const addToChildren = (categories) => {
                return categories.map((category) => {
                  if (category.key === selectedNode) {
                    return {
                      ...category,
                      children: [...(category.children || []), values],
                    };
                  }
                  if (category.children) {
                    return {
                      ...category,
                      children: addToChildren(category.children),
                    };
                  }
                  return category;
                });
              };

              return addToChildren(prevCategories);
            });
          }
        }}
      >
        <Form variant="filled" form={form} name="mainForm" layout="vertical">
          <Card title="Thông tin chung">
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label="Ngành đào tạo"
                  name="major_id"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn ngành đào tạo !",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn ngành đào tạo"
                    options={[
                      { value: "CNTT", label: "Công nghệ thông tin" },
                      { value: "KT", label: "Kỹ thuật phần mềm" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Trình độ đào tạo"
                  name="level"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập trình độ đào tạo !",
                    },
                  ]}
                >
                  <Input placeholder="Nhập trình độ đào tạo" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Hình thức đào tạo"
                  name="form"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập hình thức đào tạo !",
                    },
                  ]}
                >
                  <Input placeholder="Nhập hình thức đào tạo" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Chu kỳ đào tạo"
                  name="circle_id"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn chu kỳ đào tạo !",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn chu kỳ đào tạo"
                    options={[
                      { value: 1, label: "2016-2020" },
                      { value: 2, label: "2020-2024" },
                      { value: 3, label: "2024-2028" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Thời gian đào tạo"
                  name="duration"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thời gian đào tạo !",
                    },
                  ]}
                >
                  <Input placeholder="Nhập thời gian đào tạo" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Số học kỳ thực hiện"
                  name="semester"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thời gian đào tạo !",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    changeOnWheel
                    className="w-full"
                    placeholder="Nhập thời gian đào tạo"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Ghi chú 1" name="note_1">
                  <Input placeholder="Nhập ghi chú" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Ghi chú 2" name="note_2">
                  <Input placeholder="Nhập ghi chú" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Form.Item name="categories" noStyle />
        </Form>
        <Card
          title="Nội dung chương trình"
          className="mt-3"
          extra={
            <Button
              onClick={() => {
                setSelectedNode(null);
                openAddBlock();
              }}
            >
              Thêm khối kiến thức
            </Button>
          }
        >
          <Table
            size="middle"
            dataSource={listCategories}
            key={listCategories.length}
            expandable={{
              defaultExpandAllRows: true,
              rowExpandable: (record) => record.children.length !== 0,
            }}
            pagination={false}
          >
            <Table.Column title="Tên khối kiến thức" dataIndex="name" />
            <Table.Column title="Số TC bắt buộc" dataIndex="credits" />
            <Table.Column
              title="Thao tác"
              dataIndex="action"
              fixed="right"
              align="right"
              width={100}
              render={(value, record, index) => {
                return (
                  <Space>
                    <Tooltip title="Thêm khối kiến thức con">
                      <Button
                        onClick={() => {
                          setSelectedNode(record.key);
                          openAddBlock();
                        }}
                        size="small"
                        icon={<ApartmentOutlined />}
                      />
                    </Tooltip>
                    {record.children && record.children.length == 0 && (
                      <Tooltip title="Thêm học phần vào khối kiến thức">
                        <Button
                          onClick={() => {
                            setSelectedNode(record.key);
                            openAddBlock();
                          }}
                          size="small"
                          icon={<PlusOutlined />}
                        />
                      </Tooltip>
                    )}
                    <Tooltip title="Xoá khối kiến thức">
                      <Button icon={<DeleteOutlined />} size="small" danger />
                    </Tooltip>
                  </Space>
                );
              }}
            />
          </Table>
        </Card>
        <AddBlockModal
          open={isOpenAddBlock}
          onCancel={closeAddBlock}
          parentId={selectedNode}
        />
      </Form.Provider>
    </>
  );
};

const AddBlockModal = ({ open, onCancel, parentId }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    onCancel();
  };

  return (
    <Modal
      title="Tạo khối kiến thức"
      open={open}
      onCancel={onCancel}
      onOk={form.submit}
      destroyOnClose
    >
      <Form
        form={form}
        name="addBlock"
        layout="vertical"
        onFinish={onFinish}
        clearOnDestroy
      >
        <Form.Item label="Tên khối kiến thức" name="name">
          <Input placeholder="Nhập tên khối kiến thức" />
        </Form.Item>
        <Form.Item name="key" initialValue={uuidv4()} noStyle />
        <Form.Item name="parent_category_id" initialValue={parentId} noStyle />
        <Form.Item name="children" initialValue={[]} noStyle />
      </Form>
    </Modal>
  );
};

const ChildrenTable = ({ dataSource }) => {
  return (
    <Table size="middle" dataSource={dataSource} pagination={false} bordered>
      <Table.Column title="TT" dataIndex="stt" />
      <Table.Column title="Mã HP" dataIndex="code" />
      <Table.Column title="Tên học phần" dataIndex="name" />
      <Table.Column title="Số TC" dataIndex="description" />
      <Table.Column title="Học kỳ" dataIndex="semester">
        <Table.Column title="1" dataIndex="semester_1" align="center" />
        <Table.Column title="2" dataIndex="semester_2" align="center" />
        <Table.Column title="3" dataIndex="semester_3" align="center" />
        <Table.Column title="4" dataIndex="semester_4" align="center" />
        <Table.Column title="5" dataIndex="semester_5" align="center" />
        <Table.Column title="6" dataIndex="semester_6" align="center" />
        <Table.Column title="7" dataIndex="semester_7" align="center" />
        <Table.Column title="8" dataIndex="semester_8" align="center" />
        <Table.Column title="9" dataIndex="semester_9" align="center" />
      </Table.Column>
      <Table.Column title="Mã HP trước" dataIndex="subject_previous_code" />
      <Table.Column title="Thao tác" dataIndex="subject_previous_code" />
    </Table>
  );
};

export default AddTrainingProgramPage;
