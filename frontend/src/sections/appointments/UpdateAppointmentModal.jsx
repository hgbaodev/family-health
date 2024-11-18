import { Button, Form, Input, Modal, Select, DatePicker, Row, Col, message } from "antd";
import { Flex } from "antd";
import { useEffect } from "react";
import { useMembersByUser } from "~/api/members/get-members";
import moment from "moment";
import { useAppointmentsStore } from "~/stores/appointments/appointmentStore";
import { useUpdateAppointment } from "~/api/appointments/update-appointment";

const { Option } = Select;

const UpdateAppointmentModal = () => {
  const [form] = Form.useForm();
  const { openUpdateModal, setOpenUpdateModal, appointment } = useAppointmentsStore((state) => state);
  const { data: members } = useMembersByUser();

  const mutation = useUpdateAppointment({
    onSuccess: () => {
      message.success("Appointment updated successfully");
      setOpenUpdateModal(false);
    },
    onError: () => {
      message.error("Failed to update appointment");
    },
  });

  const onFinish = (values) => {
    mutation.mutate({ id: appointment.appointmentID, data: values });
  };

  useEffect(() => {
    form.resetFields();
    if (appointment) {
      form.setFieldsValue({
        ...appointment,
        time: appointment.time ? moment(appointment.time) : null,
        memberID: appointment.member.memberID,
      });
    }
  }, [appointment, form]);

  return (
    <Modal
      title="Update Member"
      open={openUpdateModal}
      onCancel={() => setOpenUpdateModal(false)}
      footer={null}
    >
      <Form
        form={form}
        onFinish={onFinish}
        className="pt-4"
        layout="vertical"
        variant="filled"
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Member"
              name="memberID"
              rules={[{ required: true, message: "Please select member" }]}
            >
              <Select placeholder="Select member...">
                {members?.map((member) => (<Option key={member.memberID} value={member.memberID}>{member.fullName}</Option>))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Time"
              name="time"
              rules={[
                { required: true, message: "Please enter appointment time" },
              ]}
            >
              <DatePicker showTime className="w-full" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Doctor"
              name="doctor"
              rules={[
                { required: true, message: "Please enter doctor name" },
              ]}
            >
              <Input placeholder="Enter doctor name..." />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Location"
              name="location"
              rules={[
                { required: true, message: "Please enter location" },
              ]}
            >
              <Input placeholder="Enter location..." />
            </Form.Item>  
          </Col>
        </Row>
        <Form.Item className="pt-4 m-0">
          <Flex justify="end" className="gap-3">
            <Button loading={false} type="default" htmlType="reset">
              Reset
            </Button>
            <Button loading={false} type="primary" htmlType="submit">
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateAppointmentModal;