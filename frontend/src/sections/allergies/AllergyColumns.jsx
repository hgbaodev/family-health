import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteAllergy } from "~/api/allergies/delete-allergies";
import { useAllergiesStore } from "~/stores/allergyStore";
import { useTranslation } from "react-i18next";

const useAllergyColumns = () => {
  const { t } = useTranslation();

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
        title: t("ID"),
        dataIndex: "id",
        key: "id",
        align: "center",
      },
      {
        title: "Member",
        key: "memberName",
        align: "center",
        render: (_, vaccination) => vaccination.member.fullName,
      },
      {
        title: t("AllergyPage.AllergyType"),
        dataIndex: "allergyType",
        key: "allergyType", 
      },
      {
        title: t("AllergyPage.Severity"),
        dataIndex: "severity",
        key: "severity",
      },
      {
        title: t("AllergyPage.Symptoms"),
        dataIndex: "symptoms",
        key: "symptoms",
      },
      {
        title: t("Action"),
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
              onConfirm={() => handleDelete(allergy.id)}
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

export default useAllergyColumns;
