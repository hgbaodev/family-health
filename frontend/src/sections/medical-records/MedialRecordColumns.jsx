import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteMedicalRecord } from "~/api/medical-records/delete-medical-contacts";
import { useMedicalRecordsStore } from "~/stores/medicalRecordStore";
import { useTranslation } from "react-i18next";

const useMedicalRecordColumns = () => {
  const { setOpenUpdateModal, setMedicalRecord } = useMedicalRecordsStore(
    (state) => state
  );

  const t = useTranslation();

  const mutateDelete = useDeleteMedicalRecord({
    onSuccess: () => {
      message.success("Deleted medical record successfully");
    },
    onError: (error) => {
      message.error(
        `Failed to delete medical record. Reason: ${error.message}`
      );
    },
  });

  const handleEdit = (medicalRecord) => {
    setMedicalRecord(medicalRecord);
    setOpenUpdateModal(true);
  };

  const handleDelete = (id) => {
    mutateDelete.mutate(id);
  };

  return useMemo(
    () => [
      {
        title: "#ID",
        dataIndex: "recordID",
        key: "recordID",
        align: "center",
      },
      {
        title: "Member name",
        dataIndex: "memberName",
        key: "memberName"
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        align: "center",
      },
      {
        title: "Doctor",
        dataIndex: "doctor",
        key: "doctor",
      },
      {
        title: "Symptoms",
        dataIndex: "symptoms",
        key: "symptoms",
      },
      {
        title: "Diagnosis",
        dataIndex: "diagnosis",
        key: "diagnosis",
      },
      {
        title: "Treatment",
        dataIndex: "treatment",
        key: "treatment",
      },
      {
        title: "Facility name",
        dataIndex: "facilityName",
        key: "facilityName",
      },
      {
        title: "Action",
        key: "action",
        render: (_, medicalRecord) => (
          <Space>
            <Button
              onClick={() => handleEdit(medicalRecord)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Remove medical record"
              description="Are you sure to remove this medical record ?"
              onConfirm={() => handleDelete(medicalRecord.recordID)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  );
};

export default useMedicalRecordColumns;
