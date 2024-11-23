import { Button, Form, Input, Modal, Select, DatePicker, Row, Col, message } from "antd";
import { Flex } from "antd";
import { useEffect } from "react";
import { useVaccinationsStore } from "~/stores/vaccinationStore";
import { useMembersByUser } from "~/api/members/get-members";
import moment from "moment";
import { useUpdateVaccination } from "~/api/vaccinations/update-vaccination";

const { Option } = Select;

const UpdateVaccinationModal = () => {
  const [form] = Form.useForm();
  const { openUpdateModal, setOpenUpdateModal, vaccination } = useVaccinationsStore((state) => state);

  const { data: members } = useMembersByUser();

  const mutation = useUpdateVaccination({
    onSuccess: () => {
      message.success("Member updated successfully");
      setOpenUpdateModal(false);
    },
    onError: () => {
      message.error("Failed to update member");
    },
  });

  const onFinish = (values) => {
    mutation.mutate({ id: vaccination.id, data: values });
  };

  useEffect(() => {
    form.resetFields();
    if (vaccination) {
      form.setFieldsValue({
        ...vaccination,
        dateAdministered: vaccination.dateAdministered ? moment(vaccination.dateAdministered) : null,
        memberId: vaccination.member.id,
      });
    }
  }, [vaccination, form]);

  return (
    <Modal
      title="Update Member"
      open={openUpdateModal}
      onCancel={() => setOpenUpdateModal(false)}
      footer={null}
    >
      <Form
        className="pt-4"
        layout="vertical"
        variant="filled"
        form={form}
        onFinish={onFinish}
      >
         <Row>
          <Col span={24}>
            <Form.Item
              label="Member"
              name="memberId"
              rules={[{ required: true, message: "Please select member" }]}
            >
              <Select placeholder="Select member...">
                {members?.map((member) => (<Option key={member.id} value={member.id}>{member.fullName}</Option>))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Vaccination Name"
              name="vaccineName"
              rules={[
                { required: true, message: "Please enter vaccination name" },
              ]}
            >
              <Input placeholder="Enter vaccination name..." />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Date Administered"
              name="dateAdministered"
              rules={[
                { required: true, message: "Please enter vaccination date" },
              ]}
            >
              <DatePicker showTime className="w-full" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className="pt-4 m-0">
          <Flex justify="end" className="gap-3">
            <Button
              loading={false}
              type="default"
              htmlType="reset"
            >
              Reset
            </Button>
            <Button
              loading={false}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateVaccinationModal;