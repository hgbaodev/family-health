/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEmergencyContactStore } from "~/stores/emergencyContacts/emergencyContactStore";
import { useDeleteEmergencyContact } from "~/api/emergencyContacts/delete-emergencyContact";

const useEmergencyContactColumns= () => {

  const { setOpenUpdateModal, setEmergencyContact } = useEmergencyContactStore((state) => state);

  const mutateDelete = useDeleteEmergencyContact({
    onSuccess: () => {
      message.success("Delete emergency Contact successfully");
    },
    onError: (error) => {
      message.error(`Delete emergency contact failed. Reason: ${error.message}`);
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
        title: "#ID",
        dataIndex: "contactid",
        key: "contactid",
        align: "center",
      },


      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        align: "center",
      },

      {
        title: "Relationship",
        dataIndex: "relationship",
        key: "relationship",
      },

      {
        title: "Phone Number",
        dataIndex: "phone_number",
        key: "phone_number",
      },

    {
        title: "User ID",
        dataIndex: "user_id",
        key: "user_id",
        },

      {
        title: "Action",
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
              onConfirm={() => handleDelete(emergencyContact.emergencyContactID)}
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

export default useEmergencyContactColumns;