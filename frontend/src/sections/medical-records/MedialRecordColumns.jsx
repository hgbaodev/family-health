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
        title: "ID",
        dataIndex: "id",
        key: "id",
        align: "center",
      },
      {
        title: "Thành viên",
        dataIndex: "memberName",
        render: (_, medicalRecord) => medicalRecord.member.fullName,
      },
      {
        title: "Tên cơ sở",
        dataIndex: "facilityName",
        key: "facilityName",
      },
      {
        title: "Triệu chứng",
        dataIndex: "symptoms",
        key: "symptoms"
      },
      {
        title: "Ngày",
        dataIndex: "date",
        key: "date",
        align: "center",
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
              onConfirm={() => handleDelete(medicalRecord.id)}
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
