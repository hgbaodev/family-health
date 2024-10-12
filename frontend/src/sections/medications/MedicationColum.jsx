/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteMedication } from "~/api/medications/delete-medication";
import { useMedicationsStore} from "~/stores/medications/medicationStore";

const useMedicationColumns = () => {

  const { setOpenUpdateModal, setMedication } = useMedicationsStore((state) => state);

  const mutateDelete = useDeleteMedication({
    onSuccess: () => {
      message.success("Delete medication successfully");
    },
    onError: (error) => {
      message.error(`Delete medication failed. Reason: ${error.message}`);
    },
  });

  const handleEdit = (medication) => {
    setMedication(medication);
    setOpenUpdateModal(true);
  };

  const handleDelete = (id) => {
    mutateDelete.mutate(id);
  };

  return useMemo(
    () => [
      {
        title: "#ID",
        dataIndex: "medicationID",
        key: "medicationID",
        align: "center",
      },
      {
        title: "Medication Name",
        dataIndex: "name",
        key: "name",
        align: "center",
      },
      {
        title: "Frequency",
        dataIndex: "frequency",
        key: "frequency",
      },
      {
        title: "Start Date",
        dataIndex: "startDate",
        key: "startDate",
      },
      {
        title: "End Date",
        dataIndex: "endDate",
        key: "endDate",
        render: (text) => text || "None",
      },
      {
        title: "Note",
        dataIndex: "note",
        key: "note",
        render: (text) => text || "None",
      },
      {
        title: "Action",
        key: "action",
        render: (_, medication) => (
          <Space>
            <Button
              onClick={() => handleEdit(medication)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Delete the medication"
              description="Are you sure to delete this medication?"
              onConfirm={() => handleDelete(medication.medicationID)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                danger
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    []
  );
};

export default useMedicationColumns;