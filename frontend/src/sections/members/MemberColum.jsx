/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteMember } from "~/api/members/delete-member";
import { useMembersStore } from "~/stores/members/memberStore";
import { useTranslation } from "react-i18next";

const useMemberColumns = () => {
  const {t} = useTranslation();

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
        title: t("ID"),
        dataIndex: "memberID",
        key: "memberID",
        align: "center",
      },
      {
        title: t("MemberPage.FullName"),
        dataIndex: "fullName",
        key: "fullName",
        align: "center",
      },
      {
        title: t("MemberPage.DateOfBirth"),
        dataIndex: "dateOfBirth",
        key: "dateOfBirth",
      },
      {
        title:  t("MemberPage.Gender"),
        dataIndex: "gender",
        key: "gender",
      },
      {
        title:  t("MemberPage.Relationship"),
        dataIndex: "relationship",
        key: "relationship",
      },
      {
        title:t("MemberPage.BloodType"),
        dataIndex: "bloodType",
        key: "bloodType",
      },
      {
        title: t("MemberPage.Height"),
        dataIndex: "height",
        key: "height",
      },
      {
        title: t("MemberPage.Weight"),
        dataIndex: "weight",
        key: "weight",
      },
      {
        title: t("Action"),
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
