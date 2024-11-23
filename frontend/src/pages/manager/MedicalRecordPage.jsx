import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Flex, Space } from "antd";
import ConfirmModal from "~/components/modals/ConfirmModal";
import PageHeader from "~/components/page-header";
import CreateMedicalRecordModal from "~/sections/medical-records/CreateMedicalRecordModal";
import { MedicalRecordTable } from "~/sections/medical-records/MedicalRecordTable";
import UpdateMedicalRecordModal from "~/sections/medical-records/UpdateMedicalRecordModal";
import { useMedicalRecordsStore } from "~/stores/medicalRecordStore";


const MedicalRecordPage = () => {
  const { openDeleteModal, openCreateModal, openUpdateModal, setOpenDeleteModal, setOpenCreateModal, setOpenUpdateModal } = useMedicalRecordsStore((state) => state);

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
          heading="Hồ sơ y tế"
          links={[{ title: "Thống kê", href: "/medical-records" }, { title: "Hồ sơ y tế" }]}
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
        <MedicalRecordTable/>
      </div>
      <ConfirmModal
        title={`Are you sure to delete this medical record ?`}
        content={'Coming Soon'}
        open={openDeleteModal}
        handleCancel={handleDeleteCancel}
        handleOk={() => {}}
      />
      <CreateMedicalRecordModal
        open={openCreateModal}
        handleCancel={handleCreateCancel}
      />
      <UpdateMedicalRecordModal
        open={openUpdateModal}
        handleCancel={handleUpdateCancel}
        selectedMember={null}
      />
    </>
  );
};
export default MedicalRecordPage;
