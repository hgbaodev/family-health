/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useVaccinationsStore } from "~/stores/vaccinations/vaccinationStore";
import { useDeleteVaccination } from "~/api/vaccinations/delete-vaccination";

const useVaccinationColumns = () => {

  const { setOpenUpdateModal, setVaccination } = useVaccinationsStore((state) => state);

  const mutateDelete = useDeleteVaccination({
    onSuccess: () => {
      message.success("Delete vaccination successfully");
    },
    onError: (error) => {
      message.error(`Delete vaccination failed. Reason: ${error.message}`);
    },
  });

  const handleEdit = (vaccination) => {
    setVaccination(vaccination);
    setOpenUpdateModal(true);
  };

  const handleDelete = (id) => {
    mutateDelete.mutate(id);
  };

  return useMemo(
    () => [
      {
        title: "#ID",
        dataIndex: "vaccinationID",
        key: "vaccinationID",
        align: "center",
      },
      {
        title: "Date Administered",
        dataIndex: "dateAdministered",
        key: "dateAdministered",
        align: "center",
        render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        title: "Member Name",
        key: "memberName",
        align: "center",
        render: (_, vaccination) => vaccination.member.fullName,
      },
      {
        title: "Vaccine Name",
        dataIndex: "vaccineName", 
        key: "vaccineName",
        align: "center",
      },
      {
        title: "Action",
        key: "action",
        render: (_, vaccination) => (
          <Space>
            <Button
              onClick={() => handleEdit(vaccination)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Delete the vaccination"
              description="Are you sure to delete this vaccination?"
              onConfirm={() => handleDelete(vaccination.vaccinationID)}
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

export default useVaccinationColumns;
