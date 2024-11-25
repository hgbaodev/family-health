import { Form, message, Modal, Tabs } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useUpdateMedicalRecord } from "~/api/medical-records/update-medical-records";
import DocumentList from "~/sections/medical-records/DocumenList";
import FooterButtons from "~/sections/medical-records/FooterButtons";
import MedicationList from "~/sections/medical-records/MedicationList";
import MemberInfoForm from "~/sections/medical-records/MemberInfoForm";
import { useMedicalRecordsStore } from "~/stores/medicalRecordStore";

const UpdateMedicalRecordModal = () => {
  const [form] = Form.useForm();
  const [ tab, setTab ] = useState("0");
  const {
    medicalRecord,
    setMedicalRecord,
    openUpdateModal,
    setOpenUpdateModal,
    listDocument,
    listMedication,
    setListMedication,
    setListDocument,
    clearListMedication,
    clearListDocument
  } = useMedicalRecordsStore();

  const mute = useUpdateMedicalRecord({
    onSuccess: (data) => {
      console.log("Update success", data);
      setOpenUpdateModal(false);
      message.success("Cập nhật hồ sơ y tế thành công");
    },
    onError: (error) => {
      console.log("Update error", error);
      message.error("Cập nhật hồ sơ y tế thất bại");
    },
  })

  useEffect(() => {
    if(medicalRecord){
      setTab("0");
      form.setFieldValue("memberId", medicalRecord?.member.id);
      form.setFieldValue("facilityName", medicalRecord?.facilityName);
      form.setFieldValue("date", moment(medicalRecord?.date));
      form.setFieldValue("doctor", medicalRecord?.doctor);
      form.setFieldValue("symptoms", medicalRecord?.symptoms);
      form.setFieldValue("diagnosis", medicalRecord?.diagnosis);
      form.setFieldValue("treatment", medicalRecord?.treatment);
      setListMedication(medicalRecord?.medications);
      setListDocument(medicalRecord?.documents);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicalRecord]);

  const onFinish = (values) => {
    values["medications"] = listMedication;
    values["documents"] = listDocument;
    console.log("Values", values);
    mute.mutate({id: medicalRecord.id, data: values});
  };

  const items = [
    { key: "0", label: "Thông tin", children: <MemberInfoForm form={form} /> },
    { key: "1", label: "Thuốc", children: <MedicationList /> },
    { key: "2", label: "Tài liệu", children: <DocumentList /> },
  ];

  return (
    <Modal
      title="Cập nhật hồ sơ y tế"
      width={1000}
      open={openUpdateModal}
      centered={true}
      onCancel={() => {
        setOpenUpdateModal(false),
        setMedicalRecord(null),
        clearListMedication();
        clearListDocument();
      }}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} className="pt-4" layout="vertical">
        <Tabs activeKey={tab} items={items} onChange={(e) => setTab(e)} />
        <FooterButtons />
      </Form>
    </Modal>
  );
};

export default UpdateMedicalRecordModal;
