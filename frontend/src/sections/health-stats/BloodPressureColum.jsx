/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteHealthStat } from "~/api/health-stats/delete-health-stat";
import { useTranslation } from "react-i18next";
import { useHealthStatsStore } from "~/stores/healthStatStore";

const useBloodPressureColumns = () => {
  const { t } = useTranslation();

  const { setOpenUpdateModal, setHealthStat } = useHealthStatsStore((state) => state);

  const mutateDelete = useDeleteHealthStat({
    onSuccess: () => {
      message.success("Delete health status successfully");
    },
    onError: (error) => {
      message.error(`Delete health status failed. Reason: ${error.message}`);
    },
  });

  const handleEdit = (healthStat) => {
    setHealthStat(healthStat);
    setOpenUpdateModal(true);
  };

  const handleDelete = (id) => {
    mutateDelete.mutate(id);
  };

  return useMemo(
    () => [
      {
        title: t("No."),
        dataIndex: "No.",
        key: "index",
        align: "center",
        width: 60,
        render: (text, record, index) => index + 1, // Tính chỉ mục tự động
      },
      // {
      //   title: t("ID"),
      //   dataIndex: "statID",
      //   key: "statID",
      //   align: "center",
      // },
      {
        title: t("Value"),
        dataIndex: "statValue",
        key: "statValue",
        align: "center",
        render: (value) => `${value} mmHg`, // Thêm đơn vị mmHg sau giá trị
      },      
      {
        title: t("Date"),
        dataIndex: "date",
        key: "date",
      },
      {
        title: t("Action"),
        key: "action",
        align: "center",
        width: 140,
        render: (_, healthStat) => (
          <Space>
            <Button
              onClick={() => handleEdit(healthStat)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Delete the health status"
              description="Are you sure to delete this health status?"
              onConfirm={() => handleDelete(healthStat.id)}
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
    [t]
  );
};

export default useBloodPressureColumns;
