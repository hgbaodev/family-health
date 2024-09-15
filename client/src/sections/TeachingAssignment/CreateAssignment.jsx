import {
  App,
  Button,
  Col,
  Divider,
  Empty,
  Flex,
  Form,
  InputNumber,
  Row,
  Select,
  Spin,
  Tag,
} from "antd";
import { PlusSquareOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { dispatch } from "~/store";
import { fetchLecturers } from "~/store/slices/LecturerSlice";
import { useSelector } from "react-redux";
import { useDebounce } from "~/hooks/useDebounce";
import { useBoolean } from "~/hooks/useBoolean";
import CreateLecturerDialog from "~/sections/Lecturer/CreateLecturerDialog";
import { createTeachingAssignment } from "~/store/slices/TeachingAssignmentSlice";
import { formatErrors } from "~/utils/formatErrors";

const CreateAssignment = ({ subjectTeachingPlanId, subject, groupCounts }) => {
  const { items, loadingFetch } = useSelector((state) => state.lecturer);
  const {
    value: isDialogOpen,
    setTrue: openDialog,
    setFalse: closeDialog,
  } = useBoolean();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);
  const { theory_hours, lab_hours, exercise_hours } = subject;
  const [openSelect, setOpenSelect] = useState(false);

  useEffect(() => {
    if (openSelect) {
      dispatch(fetchLecturers({ search: debouncedSearchText, filters: {} }));
    }
  }, [openSelect, debouncedSearchText]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await dispatch(createTeachingAssignment([values])).unwrap();
      form.resetFields();
      message.success("Tạo phân công thành công !");
    } catch (error) {
      console.log(error);
      form.setFields(formatErrors(error));
    } finally {
      setLoading(false);
    }
  };

  console.log("render");

  return (
    <>
      <Form form={form} layout="vertical" variant="filled" onFinish={onFinish}>
        <Form.Item
          name="subject_teaching_plan_id"
          initialValue={subjectTeachingPlanId}
          noStyle
        />
        <Row gutter={16} align="bottom">
          <Col span={8}>
            <Form.Item
              label="Giảng viên"
              name="lecturer_id"
              rules={[
                { required: true, message: "Vui lòng chọn giảng viên !" },
              ]}
            >
              <Select
                placeholder="Chọn giảng viên"
                options={items}
                open={openSelect}
                onDropdownVisibleChange={(value) => setOpenSelect(value)}
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
                  loadingFetch ? (
                    <Spin size="small" />
                  ) : (
                    <Empty description="Không tìm thấy giảng viên" />
                  )
                }
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Button
                      type="text"
                      className="w-full"
                      icon={<PlusOutlined />}
                      onClick={openDialog}
                    >
                      Thêm giảng viên mới
                    </Button>
                  </div>
                )}
                popupClassName="z-0"
                defaultActiveFirstOption={false}
                suffixIcon={null}
                onSearch={(value) => setSearchText(value)}
                filterOption={false}
                showSearch
                allowClear
                virtual
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Số nhóm LT"
              name="theory_group_count"
              rules={[
                {
                  required: theory_hours !== 0,
                  type: "number",
                  message: "Bắt buộc !",
                },
              ]}
            >
              <InputNumber
                placeholder="Số nhóm LT"
                min={0}
                max={groupCounts}
                className="w-full"
                disabled={theory_hours === 0}
                changeOnWheel
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Số nhóm TH"
              name="lab_group_count"
              rules={[
                {
                  required: lab_hours !== 0,
                  type: "number",
                  message: "Bắt buộc !",
                },
              ]}
            >
              <InputNumber
                placeholder="Số nhóm TH"
                min={0}
                max={groupCounts}
                className="w-full"
                disabled={lab_hours === 0}
                changeOnWheel
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Số nhóm BT"
              name="exercise_group_count"
              rules={[
                {
                  required: exercise_hours !== 0,
                  type: "number",
                  message: "Bắt buộc !",
                },
              ]}
            >
              <InputNumber
                placeholder="Số nhóm BT"
                min={0}
                max={groupCounts}
                className="w-full"
                disabled={exercise_hours === 0}
                changeOnWheel
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button
                type="primary"
                icon={<PlusSquareOutlined />}
                loading={loading}
                htmlType="submit"
              >
                Thêm phân công
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <CreateLecturerDialog open={isDialogOpen} onCancel={closeDialog} />
    </>
  );
};

export default CreateAssignment;
