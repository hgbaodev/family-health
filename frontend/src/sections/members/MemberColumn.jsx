/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteMember } from "~/api/members/delete-member";
import { useMembersStore } from "~/stores/memberStore";
import { useTranslation } from "react-i18next";

const useMemberColumns = () => {
  const { memberDetail } = useMembersStore((state) => state);

  const {t} = useTranslation();

  const { setOpenUpdateModal, setMember } = useMembersStore((state) => state);

  const mutateDelete = useDeleteMember({
    onSuccess: () => {
      message.success("Delete member successfully");
    },
    onError: (error) => {
      console.log("Error:", error);
      message.error(`This member that is in use cannot be deleted`);
    },
  });

  const handleEdit = (member) => {
    setMember(member);
    setOpenUpdateModal(true);
  };

  const handleDelete = (id) => {
    mutateDelete.mutate(id);
  };

  if(memberDetail) {
    return useMemo(
      () => [
        {
          title: t("ID"),
          dataIndex: "id",
          key: "id",
          align: "center",
        },
        {
          title: t("MemberPage.FullName"),
          dataIndex: "fullName",
          key: "fullName",
          align: "center",
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
                onConfirm={() => handleDelete(member.id)}
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
      ], [t, memberDetail]);
  }

  return useMemo(
    () => [
      {
        title: t("ID"),
        dataIndex: "id",
        key: "id",
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
              onConfirm={() => handleDelete(member.id)}
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
    [t, memberDetail]
  );
};

export default useMemberColumns;
