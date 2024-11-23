import { Form, Modal, Tabs } from "antd";
import { useMedicalRecordsStore } from "~/stores/medicalRecordStore";
import MemberInfoForm from "./MemberInfoForm";
import MedicationList from "./MedicationList";
import DocumenList from "./DocumenList";
import FooterButtons from "./FooterButtons";
import { useCreateMedicalRecord } from "~/api/medical-records/create-medical-records";

const CreateMedicalRecordModal = () => {
  const [form] = Form.useForm();
  const { openCreateModal, setOpenCreateModal, listDocument, listMedication } =
    useMedicalRecordsStore();
  const mutation = useCreateMedicalRecord({
    onSuccess: {},
    onError: {},
  });

  const onFinish = (values) => {
    values["medications"] = listMedication;
    values["documents"] = listDocument;
    console.log("Values", values);
    mutation.mutate(values);
  };

  const items = [
    { key: "0", label: "Thông tin", children: <MemberInfoForm form={form} /> },
    { key: "1", label: "Thuốc", children: <MedicationList /> },
    { key: "2", label: "Tài liệu", children: <DocumenList /> },
  ];

  return (
    <Modal
      title="Hồ sơ y tế"
      width={1000}
      open={openCreateModal}
      centered={true}
      onCancel={() => setOpenCreateModal(false)}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} className="pt-4" layout="vertical">
        <Tabs defaultActiveKey="0" items={items} />
        <FooterButtons />
      </Form>
    </Modal>
  );
};

export default CreateMedicalRecordModal;
