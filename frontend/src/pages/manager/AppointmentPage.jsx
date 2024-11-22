import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Flex, Space } from "antd";
import ConfirmModal from "~/components/modals/ConfirmModal";
import PageHeader from "~/components/page-header";
import { useTranslation } from "react-i18next";
import { useAppointmentsStore } from "~/stores/appointmentStore";
import CreateAppointmentModal from "~/sections/appointments/CreateAppointmentModal";
import UpdateAppointmentModal from "~/sections/appointments/UpdateAppointmentModal";
import { AppointmentTable } from "~/sections/appointments/AppointmentTable";

const AppointmentPage = () => {
  const {t} = useTranslation();

  const { openDeleteModal, openCreateModal, openUpdateModal, setOpenDeleteModal, setOpenCreateModal, setOpenUpdateModal } = useAppointmentsStore((state) => state);

  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };

  const handleCreate = () => {
    setOpenCreateModal(true);
  };

  const handleCreateCancel = () => {
    setOpenCreateModal(false);
  };

  const handleUpdateCancel = () => {
    setOpenUpdateModal(false);
  };

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading={t("Appointments")}
          links={[{ title: t("Dashboard"), href: "/manager" }, { title: t("Appointments") }]}
        />
        <Space>
          <Button
            onClick={handleCreate}
            type="primary"
            icon={<PlusSquareOutlined />}
          >
            Add
          </Button>
        </Space>
      </Flex>
      <div style={{ paddingTop: 20 }}>
        <AppointmentTable/>
      </div>
      <ConfirmModal
        title={`Are you sure to delete Member ?`}
        content={'Coming Soon'}
        open={openDeleteModal}
        handleCancel={handleDeleteCancel}
        handleOk={() => {}}
      />
      <CreateAppointmentModal
        open={openCreateModal}
        handleCancel={handleCreateCancel}
      />
      <UpdateAppointmentModal
        open={openUpdateModal}
        handleCancel={handleUpdateCancel}
        selectedMember={null}
      />
    </>
  );
};

export default AppointmentPage;