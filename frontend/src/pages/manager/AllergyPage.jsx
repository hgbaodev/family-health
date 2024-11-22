import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Flex, Space } from "antd";
import ConfirmModal from "~/components/modals/ConfirmModal";
import PageHeader from "~/components/page-header";
import CreateAllergyModal from "~/sections/allergies/CreateAllergyModal";
import { AllergyTable } from "~/sections/allergies/AllergyTable";
import UpdateAllergyModal from "~/sections/allergies/UpdateAllergyModal";
import { useAllergiesStore } from "~/stores/allergyStore";
import { useTranslation } from "react-i18next";


const AllergyPage = () => {
  const {t} = useTranslation();
  const { openDeleteModal, openCreateModal, openUpdateModal, setOpenDeleteModal, setOpenCreateModal, setOpenUpdateModal } = useAllergiesStore((state) => state);

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
          heading={t("Allergies")}
          links={[{ title: t("Dashboard"), href: "/manager" }, { title: t("Allergies") }]}
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
        <AllergyTable/>
      </div>
      <ConfirmModal
        title={`Are you sure to delete allergy ?`}
        content={'Coming Soon'}
        open={openDeleteModal}
        handleCancel={handleDeleteCancel}
        handleOk={() => {}}
      />
      <CreateAllergyModal
        open={openCreateModal}
        handleCancel={handleCreateCancel}
      />
      <UpdateAllergyModal
        open={openUpdateModal}
        handleCancel={handleUpdateCancel}
        selectedMember={null}
      />
    </>
  );
};
export default AllergyPage;
