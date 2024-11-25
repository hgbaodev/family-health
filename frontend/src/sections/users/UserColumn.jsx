/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { LockOutlined, UnlockOutlined} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useUpdateBlockStateUser } from "~/api/users/update-block-state-user";


const useUserColumns = () => {
  const {t} = useTranslation();

  const mutateUpdateBlockStateUser = useUpdateBlockStateUser({
    onSuccess: () => {
      message.success("Update block state user successfully");
    },
    onError: (error) => {
      message.error(`Update block state user failed. Reason: ${error.message}`);
    },
  });

  const handleUpdateBlockStateUser = (id) => {
    mutateUpdateBlockStateUser.mutate(id);
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
        title: t("First name"),
        dataIndex: "firstname",
        key: "firstname",
        align: "center",
      },
      {
        title: t("Last name"),
        dataIndex: "lastname",
        key: "lastname",
        align: "center",
      },
      {
        title: t("Email"),
        dataIndex: "email",
        key: "email",
        align: "center",
      },
      {
        title: t("Verified"),
        dataIndex: "_verify",
        key: "is_verify",
        align: "center",
        render: (isVerify) => (isVerify ? t("Yes") : t("No")),
      },
      {
        title: t("Status"),
        dataIndex: "_block",
        key: "is_block",
        align: "center",
        render: (isBlock) => (isBlock ? t("Block") : t("Active")),
      },
      {
        title: t("Action"),
        key: "action",
        render: (_, user) => (
          <Space>
            <Popconfirm
              title={t("Change block state of user")}
              description={t("Are you sure to change user?")}
              onConfirm={() => handleUpdateBlockStateUser(user.id)}
              okText={t("Yes")}
              cancelText={t("No")}
            >
              <Button
                type={user._block ? "primary" : "default"} // Xanh lá cây khi active
                danger={!user._block}
                icon={user._block ? <UnlockOutlined /> : <LockOutlined />} // Đổi biểu tượng
              />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [t]
  );
};

export default useUserColumns;
