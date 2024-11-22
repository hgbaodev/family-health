import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Flex, Space } from "antd";
import ConfirmModal from "~/components/modals/ConfirmModal";
import PageHeader from "~/components/page-header";
import CreateEmergencyContactModal from "~/sections/emergency-contacts/CreateEmergencyContactModal";
import { EmergencyContactTable } from "~/sections/emergency-contacts/EmergencyContactTable";
import UpdateEmergencyContactModal from "~/sections/emergency-contacts/UpdateEmergencyContactModal";
import { useEmergencyContactStore } from "~/stores/emergencyContactStore";
import { useTranslation } from "react-i18next";



const EmergencyContactPage = () => {
  const {t} = useTranslation();

    const { openDeleteModal, openCreateModal, openUpdateModal, setOpenDeleteModal, setOpenCreateModal, setOpenUpdateModal } = useEmergencyContactStore((state) => state);

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
            heading={t("Emergency Contacts")}
            links={[{ title: t("Dashboard"), href: "/emergencyContacts" }, { title: t("Emergency Contacts") }]}
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
          <EmergencyContactTable/>
        </div>
        <ConfirmModal
          title={`Are you sure to delete emergency contact ?`}
          content={'Coming Soon'}
          open={openDeleteModal}
          handleCancel={handleDeleteCancel}
          handleOk={() => {}}
        />
        <CreateEmergencyContactModal
          open={openCreateModal}
          handleCancel={handleCreateCancel}
        />
        <UpdateEmergencyContactModal
          open={openUpdateModal}
          handleCancel={handleUpdateCancel}
          selectedMember={null}
        />
      </>
    );
  };
  export default EmergencyContactPage;
