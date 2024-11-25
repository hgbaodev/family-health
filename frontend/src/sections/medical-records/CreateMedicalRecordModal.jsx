import { Button, Flex, Form, message, Modal, Tabs } from "antd";
import { useMedicalRecordsStore } from "~/stores/medicalRecordStore";
import MemberInfoForm from "./MemberInfoForm";
import MedicationList from "./MedicationList";
import DocumenList from "./DocumenList";
import { useCreateMedicalRecord } from "~/api/medical-records/create-medical-records";
import { useEffect, useState } from "react";

const CreateMedicalRecordModal = () => {
  const [form] = Form.useForm();
  const [tab, setTab] = useState("0");

  const {
    openCreateModal,
    setOpenCreateModal,
    listDocument,
    listMedication,
    clearListMedication,
    clearListDocument,
  } = useMedicalRecordsStore();
  const mutation = useCreateMedicalRecord({
    onSuccess: () => {
      setOpenCreateModal(false);
      message.success("Tạo hồ sơ y tế thành công");
    },
    onError: (error) => {
      message.success("Tạo hồ sơ y tế thất bại " + error);
    },
  });

  const onFinish = (values) => {
    values["medications"] = listMedication;
    values["documents"] = listDocument;
    mutation.mutate(values);
  };

  const items = [
    { key: "0", label: "Thông tin", children: <MemberInfoForm form={form} /> },
    { key: "1", label: "Thuốc", children: <MedicationList /> },
    { key: "2", label: "Tài liệu", children: <DocumenList /> },
  ];

  useEffect(() => {
    setTab("0");
    form.resetFields();
    clearListMedication();
    clearListDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateModal]);

  return (
    <Modal
      title="Thêm hồ sơ y tế"
      width={1000}
      open={openCreateModal}
      centered={true}
      onCancel={() => setOpenCreateModal(false)}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} className="pt-4" layout="vertical">
        <Tabs activeKey={tab} items={items} onChange={(e) => setTab(e)} />
        <Flex justify="end" className="mt-4">
          <Button type="default" htmlType="reset">
            Reset
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default CreateMedicalRecordModal;
