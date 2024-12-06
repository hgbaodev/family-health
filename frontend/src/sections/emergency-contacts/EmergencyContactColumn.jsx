/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEmergencyContactStore } from "~/stores/emergencyContactStore";
import { useDeleteEmergencyContact } from "~/api/emergency-contacts/delete-emergencyContact";
import { useTranslation } from "react-i18next";

const useEmergencyContactColumns = () => {
  const { t } = useTranslation();

  const { setOpenUpdateModal, setEmergencyContact } = useEmergencyContactStore(
    (state) => state
  );

  const mutateDelete = useDeleteEmergencyContact({
    onSuccess: () => {
      message.success("Delete emergency Contact successfully");
    },
    onError: (error) => {
      message.error(
        `Delete emergency contact failed. Reason: ${error.message}`
      );
    },
  });

  const handleEdit = (emergency) => {
    setEmergencyContact(emergency);
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
        title: "Name",
        dataIndex: "name",
        key: "name",
        align: "center",
      },

      {
        title: t("EmergencyContactPage.Relationship"),
        dataIndex: "relationship",
        key: "relationship",
      },

      {
        title: t("EmergencyContactPage.Phone Number"),
        dataIndex: "phoneNumber",
        key: "phoneNumber",
      },
      {
        title: t("Action"),
        key: "action",
        render: (_, emergencyContact) => (
          <Space>
            <Button
              onClick={() => handleEdit(emergencyContact)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Delete the emergency contact"
              description="Are you sure to delete this emergency contact?"
              onConfirm={() => handleDelete(emergencyContact.contactID)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [t]
  );
};

export default useEmergencyContactColumns;
