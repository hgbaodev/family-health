/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteMember } from "~/api/members/delete-member";
import { useMembersStore } from "~/stores/members/memberStore";

const useMemberColumns = () => {

  const { setOpenUpdateModal, setMember } = useMembersStore((state) => state);

  const mutateDelete = useDeleteMember({
    onSuccess: () => {
      message.success("Delete member successfully");
    },
    onError: (error) => {
      message.error(`Delete member failed. Reason: ${error.message}`);
    },
  });

  const handleEdit = (member) => {
    setMember(member);
    setOpenUpdateModal(true);
  };

  const handleDelete = (id) => {
    mutateDelete.mutate(id);
  };

  return useMemo(
    () => [
      {
        title: "#ID",
        dataIndex: "memberID",
        key: "memberID",
        align: "center",
      },
      {
        title: "Full Name",
        dataIndex: "fullName",
        key: "fullName",
        align: "center",
      },
      {
        title: "Date of Birth",
        dataIndex: "dateOfBirth",
        key: "dateOfBirth",
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
      },
      {
        title: "Relationship",
        dataIndex: "relationship",
        key: "relationship",
      },
      {
        title: "Blood Type",
        dataIndex: "bloodType",
        key: "bloodType",
      },
      {
        title: "Height (m)",
        dataIndex: "height",
        key: "height",
      },
      {
        title: "Weight (kg)",
        dataIndex: "weight",
        key: "weight",
      },
      {
        title: "Action",
        key: "action",
        render: (_, member) => (
          <Space>
            <Button
              onClick={() => handleEdit(member)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Delete the member"
              description="Are you sure to delete this member?"
              onConfirm={() => handleDelete(member.memberID)}
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

export default useMemberColumns;
