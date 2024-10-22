import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteAllergy } from "~/api/allergies/delete-allergies";
import { useAllergiesStore } from "~/stores/allergies/allergyStore";

const useAllergyColumns = () => {
  const { setOpenUpdateModal, setAllergy } = useAllergiesStore(
    (state) => state
  );

  const mutateDelete = useDeleteAllergy({
    onSuccess: () => {
      message.success("Deleted allergy successfully");
    },
    onError: (error) => {
      message.error(`Failed to delete allergy. Reason: ${error.message}`);
    },
  });

  const handleEdit = (allergy) => {
    setAllergy(allergy);
    setOpenUpdateModal(true);
  };

  const handleDelete = (id) => {
    mutateDelete.mutate(id);
  };

  return useMemo(
    () => [
      {
        title: "#ID",
        dataIndex: "allergyID",
        key: "allergyID",
        align: "center",
      },
      {
        title: "Member name",
        dataIndex: "memberName",
        key: "memberName",
      },
      {
        title: "Allergy Type",
        dataIndex: "allergyType",
        key: "allergyType", 
      },
      {
        title: "Severity",
        dataIndex: "severity",
        key: "severity",
      },
      {
        title: "Symptoms",
        dataIndex: "symptoms",
        key: "symptoms",
      },
      {
        title: "Action",
        key: "action",
        render: (_, allergy) => (
          <Space>
            <Button
              onClick={() => handleEdit(allergy)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Remove allergy"
              description="Are you sure to remove this allergy ?"
              onConfirm={() => handleDelete(allergy.allergyID)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    []
  );
};

export default useAllergyColumns;
