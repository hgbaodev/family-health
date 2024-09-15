import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Tree,
} from "antd";
import HeaderBreadcrumbs from "~/components/HeaderBreadcrumbs";
import { SaveOutlined, PlusOutlined, ImportOutlined } from "@ant-design/icons";
import { mergeNodeIntoTreeData } from "~/utils/findNodeById";
import { useState } from "react";
import GroupDetailsForm from "~/sections/TrainingProgram/GroupDetailsForm";

const AddTrainingProgramPageOldVersion = () => {
  const [form] = Form.useForm();
  const [listCategories, setListCategories] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const onSubmit = () => {
    form.submit();
    form.validateFields().then((values) => {
      console.log(values);
    });
  };

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
          if (name === "detailsForm") {
            const { mainForm } = forms;
            const newCategories = mergeNodeIntoTreeData(listCategories, values);
            setListCategories(newCategories);
            mainForm.setFieldsValue({
              categories: newCategories,
            });
          }
        }}
      >
        <Form variant="filled" form={form} name="mainForm" layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={24}>
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
            </Col>
          </Row>
          <Form.Item name="categories" noStyle />
        </Form>
        <Row className="mt-4" gutter={[16, 16]}>
          <Col span={7}>
            <Card title="Danh sách nhóm học phần">
              <Button
                className="mb-3"
                type="link"
                icon={<PlusOutlined />}
                onClick={() => {
                  setSelectedNode(null);
                  setSelectedKeys([]);
                }}
              >
                Thêm nhóm học phần
              </Button>
              <Tree.DirectoryTree
                treeData={listCategories}
                autoExpandParent={true}
                defaultExpandAll={true}
                selectedKeys={selectedKeys}
                fieldNames={{
                  label: "title",
                  key: "id",
                  children: "children",
                }}
                onSelect={(selectedKeys, info) => {
                  const { node } = info;
                  const nodeData = {
                    id: node.id,
                    title: node.title,
                    parent_id: node.parent_id,
                    subjects: node.subjects,
                    min_credits: node.min_credits,
                  };
                  setSelectedKeys(selectedKeys);
                  setSelectedNode(nodeData);
                }}
              />
            </Card>
          </Col>
          <Col span={17}>
            <GroupDetailsForm
              listCategories={listCategories}
              selectedNode={selectedNode}
            />
          </Col>
        </Row>
      </Form.Provider>
    </>
  );
};

export default AddTrainingProgramPageOldVersion;
