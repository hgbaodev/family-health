import { Button, Card, Empty, Flex, Form, Modal, Select, Space } from "antd";
import HeaderBreadcrumbs from "~/components/HeaderBreadcrumbs";
import { SettingOutlined, ContainerOutlined } from "@ant-design/icons";
import { useBoolean } from "~/hooks/useBoolean";
import { useEffect } from "react";
import { dispatch } from "~/store";
import { getCurrentTeachingRegistration } from "~/store/slices/TeachingRegistrationSlice";
import { useSelector } from "react-redux";
import TeachingRegistrationCard from "~/sections/TeachingRegistration/TeachingRegistrationCard";

const ListTeachingRegistrationPage = () => {
  const {
    value: openSetting,
    setFalse: setCloseSetting,
    setTrue: setOpenSetting,
  } = useBoolean();
  const { data } = useSelector((state) => state.teachingRegistration);

  useEffect(() => {
    dispatch(getCurrentTeachingRegistration());
  }, []);


  return (
    <>
      <Flex align="center" justify="space-between" className="mb-5">
        <HeaderBreadcrumbs
          heading="Đăng ký giảng dạy"
          links={[{ title: "Home", href: "/" }, { title: "Đăng ký giảng dạy" }]}
        />
        <Button
          type="primary"
          icon={<SettingOutlined />}
          onClick={setOpenSetting}
        >
          Cấu hình
        </Button>
      </Flex>
      <Card
        title={`Đăng ký giảng dạy năm học ${data.start_year ?? ""} - ${
          data?.end_year ?? ""
        }`}
        extra={
          <Button icon={<ContainerOutlined />}>
            Xem tất cả các môn đã đăng ký
          </Button>
        }
      >
        <Space direction="vertical" className="w-full">
          {data.program_assignment && data.program_assignment.length > 0 ? (
            data.program_assignment.map((program) => (
              <TeachingRegistrationCard
                key={program.id}
                id={program.id}
                majors={program.majors}
                isHighQuality={program.is_high_quality}
                plans={program.teaching_plans}
              />
            ))
          ) : (
            <Flex justify="center" align="center" className="h-[465px]">
              <Empty description="Chưa có học kỳ" />
            </Flex>
          )}
        </Space>
      </Card>
      <SettingTeachingRegistrationPage
        open={openSetting}
        onCancel={setCloseSetting}
      />
    </>
  );
};

const SettingTeachingRegistrationPage = ({ open, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Mở đăng ký kế hoạch giảng dạy"
      width={400}
      onOk={form.submit}
    >
      <Form form={form} layout="vertical" variant="filled" onFinish={onFinish}>
        <Form.Item
          label="Chọn năm học mở đăng ký"
          name="schoolYearId"
          rules={[{ required: true, message: "Vui lòng chọn năm học" }]}
        >
          <Select
            options={[
              { value: "2021-2022", label: "2021-2022" },
              { value: "2022-2023", label: "2022-2023" },
              { value: "2023-2024", label: "2023-2024" },
            ]}
            placeholder="Chọn năm học"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ListTeachingRegistrationPage;
