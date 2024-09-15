import {
  App,
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Space,
  Table,
} from "antd";
import HeaderBreadcrumbs from "~/components/HeaderBreadcrumbs";
import {
  SaveOutlined,
  ProfileOutlined,
  DeleteOutlined,
  AimOutlined,
} from "@ant-design/icons";
import { useBoolean } from "~/hooks/useBoolean";
import SelectOpenCourseDrawer from "~/sections/TeachingPlan/SelectOpenCourseDrawer";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getTeachingPlanTitle } from "~/utils/getTeachingPlanTitle";
import { dispatch } from "~/store";
import { updateSubjectTeachingPlan } from "~/store/slices/TeachingPlanSlice";

const CreateTeachingPlanPage = () => {
  const teachingPlans = useLoaderData();
  const { semester, id, program_assignment, subjects } = teachingPlans;
  const { school_year, majors } = program_assignment;
  const [selectedSubjects, setSelectedSubjects] = useState(subjects);
  const { value, setTrue, setFalse } = useBoolean();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const handleSave = () => {
    form.submit();
  };

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      await dispatch(
        updateSubjectTeachingPlan({ id, subjects: values.subjects })
      );
      message.success("Lưu thành công");
    } catch (error) {
      console.log("🚀 ~ CreateTeachingPlanPage ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = (error) => {
    message.error("Vui lòng điền đầy đủ thông tin");
    console.log("Validate Failed:", error);
  };

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        className="mb-5"
        gap={20}
        wrap
      >
        <HeaderBreadcrumbs
          heading={`Kế hoạch mở nhóm học kì ${semester} năm ${school_year.start_year} - ${school_year.end_year}`}
          links={[
            { title: "Home", href: "/" },
            { title: "Kế hoạch giảng dạy", href: "/teaching-plans" },
            { title: "Mở học phần" },
          ]}
        />
        <Space>
          <Button icon={<AimOutlined />} onClick={setTrue}>
            Chọn từ khung chương trình
          </Button>
          <Button icon={<ProfileOutlined />} onClick={setTrue}>
            Chọn thủ công
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={isLoading}
            onClick={handleSave}
          >
            Lưu
          </Button>
        </Space>
      </Flex>
      <Form
        form={form}
        component={false}
        initialValues={{
          subjects: selectedSubjects.map((subject) => subject.pivot),
        }}
        validateMessages={{
          required: "",
          types: {
            number: "",
          },
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.List name="subjects">
          {(subjects, { remove }) => (
            <Table
              dataSource={subjects}
              rowKey="key"
              scroll={{ x: 1500 }}
              pagination={false}
              title={() => `Ngành ${getTeachingPlanTitle(majors)}`}
              size="middle"
              bordered
            >
              <Table.Column
                title="STT"
                width={70}
                align="center"
                render={(text, record, index) => index + 1}
              />
              <Table.Column
                title="Mã HP"
                width={90}
                render={(text, record, index) => selectedSubjects[index]?.code}
              />
              <Table.Column
                title="Tên HP"
                width={300}
                render={(text, record, index) => selectedSubjects[index]?.name}
              />
              <Table.Column
                title="Số TC"
                align="center"
                width={100}
                render={(text, record, index) =>
                  selectedSubjects[index]?.credits
                }
              />
              <Table.Column
                title="Số tiết LT"
                width={100}
                align="center"
                render={(text, record, index) =>
                  selectedSubjects[index]?.theory_hours
                }
              />
              <Table.Column
                title="Số tiết TH"
                width={100}
                align="center"
                render={(text, record, index) =>
                  selectedSubjects[index]?.lab_hours
                }
              />
              <Table.Column
                title="Số tiết BT"
                width={100}
                align="center"
                render={(text, record, index) =>
                  selectedSubjects[index]?.exercise_hours
                }
              />
              <Table.Column
                title="Hệ số"
                width={100}
                align="center"
                render={(text, record, index) =>
                  selectedSubjects[index]?.coefficient
                }
              />
              <Table.Column
                title="Khoá"
                dataIndex="applies_to_course"
                width={150}
                fixed="right"
                render={(text, record, index) => (
                  <Form.Item
                    name={[index, "applies_to_course"]}
                    rules={[{ required: true, whitespace: true }]}
                    className="mb-0"
                  >
                    <Input />
                  </Form.Item>
                )}
              />
              <Table.Column
                title="Số nhóm"
                dataIndex="group_counts"
                width={94}
                fixed="right"
                render={(text, record, index) => (
                  <Form.Item
                    name={[index, "group_counts"]}
                    rules={[
                      { required: true, whitespace: true, type: "number" },
                    ]}
                    className="mb-0"
                  >
                    <InputNumber min={0} className="w-16" changeOnWheel />
                  </Form.Item>
                )}
              />
              <Table.Column
                title="SLSV/LT"
                dataIndex="theory_group_student_count"
                width={94}
                fixed="right"
                render={(text, record, index) => (
                  <Form.Item
                    name={[index, "theory_group_student_count"]}
                    rules={[
                      { required: true, whitespace: true, type: "number" },
                    ]}
                    className="mb-0"
                  >
                    <InputNumber min={0} className="w-16" changeOnWheel />
                  </Form.Item>
                )}
              />
              <Table.Column
                title="SLSV/TH"
                dataIndex="lab_group_student_count"
                width={94}
                fixed="right"
                render={(text, record, index) => (
                  <Form.Item
                    name={[index, "lab_group_student_count"]}
                    rules={[
                      {
                        required: selectedSubjects[index]?.lab_hours > 0,
                        whitespace: true,
                        type: "number",
                      },
                    ]}
                    className="mb-0"
                  >
                    <InputNumber
                      min={0}
                      className="w-16"
                      changeOnWheel
                      disabled={selectedSubjects[index]?.lab_hours == 0}
                    />
                  </Form.Item>
                )}
              />
              <Table.Column
                dataIndex="action"
                key="action"
                align="center"
                fixed="right"
                render={(text, record, index) => (
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      setSelectedSubjects((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                      remove(record.name);
                    }}
                    danger
                  />
                )}
              />
            </Table>
          )}
        </Form.List>
      </Form>
      <SelectOpenCourseDrawer
        open={value}
        onClose={setFalse}
        selectedSubjects={selectedSubjects}
        setValue={(newSubjects) => {
          const pivot = newSubjects.map((subject) => ({
            subject_id: subject.id,
            teaching_plan_id: id,
          }));
          setSelectedSubjects([...selectedSubjects, ...newSubjects]);
          const subjects = form.getFieldValue("subjects") || [];
          form.setFieldsValue({
            subjects: [...subjects, ...pivot],
          });
        }}
      />
    </>
  );
};
export default CreateTeachingPlanPage;
