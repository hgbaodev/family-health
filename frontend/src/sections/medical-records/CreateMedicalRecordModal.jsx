import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Row,
  DatePicker,
  Col,
  message,
} from "antd";
import { Flex } from "antd";
import { useCreateMedicalRecord } from "~/api/medicalRecords/create-medical-records";
import { useMedicalRecordsStore } from "~/stores/medical-records/medicalRecordStore";
import { useMembers } from "../../api/members/get-members";
import { useMemo } from "react";

const CreateMedicalRecordModal = () => {
  const [form] = Form.useForm();
  const { data: members } = useMembers({});
  const { openCreateModal, setOpenCreateModal } = useMedicalRecordsStore();
  const memberOptions = useMemo(() => {
    return members
      ? members.map(({ memberID,fullName }) => ({
          value: memberID,
          label: `${fullName}`,
        }))
      : [];
  }, [members]);

  const mutation = useCreateMedicalRecord({
    onSuccess: () => {
      form.resetFields();
      setOpenCreateModal(false);
      message.success("New medical record added successfully");
    },
    onFinish: () => {
      message.error("Failed to add new medical record");
    },
  });

  const onFinish = (values) => {
    mutation.mutate(values);
  };

  return (
    <Modal
      title="Add medical record"
      open={openCreateModal}
      onCancel={() => setOpenCreateModal(false)}
      footer={null}
    >
      <Form
        form={form}
        onFinish={onFinish}
        className="pt-4"
        layout="vertical"
        variant="filled"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Member"
              name="memberID"
              rules={[{ required: true, message: "Please choose a member" }]}
            >
              <Select
                showSearch
                placeholder="Choose a member..."
                optionFilterProp="label"
                options={memberOptions} 
                notFoundContent="Loading members..."
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select date" }]}
            >
              <DatePicker
                placeholder="Select date..."
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Doctor"
              name="doctor"
              rules={[{ required: true, message: "Please enter doctor" }]}
            >
              <Input placeholder="Enter doctor name..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Symptoms"
              name="symptoms"
              rules={[{ required: true, message: "Please describe symptoms" }]}
            >
              <Input placeholder="Describe symptoms..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Diagnosis"
              name="diagnosis"
              rules={[{ required: true, message: "Please enter diagnosis" }]}
            >
              <Input placeholder="Enter diagnosis ..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Treatment"
              name="treatment"
              rules={[{ required: true, message: "Please describe treatment" }]}
            >
              <Input placeholder="Describe treatment..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Facility name"
              name="facilityName"
              rules={[
                { required: true, message: "Please enter facility name" },
              ]}
            >
              <Input placeholder="Enter facility name..." />
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

export default CreateMedicalRecordModal;
