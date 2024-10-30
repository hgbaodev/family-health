import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Flex, Space } from "antd";
import ConfirmModal from "~/components/modals/ConfirmModal";
import PageHeader from "~/components/page-header";
import CreateDocumentModal from "~/sections/documents/CreateDocumentModal";
import { DocumentTable } from "~/sections/documents/DocumentTable";
import UpdateDocumentModal from "~/sections/documents/UpdateDocumentModal";
import { useDocumentsStore } from "~/stores/documents/documentStore";

const DocumentPage = () => {
  const { openDeleteModal, openCreateModal, openUpdateModal, setOpenDeleteModal, setOpenCreateModal, setOpenUpdateModal } = useDocumentsStore((state) => state);

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
          heading="Documents" 
          links={[{ title: "DashBoard", href: "/documents" }, { title: "Documents" }]}
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
        <DocumentTable/>
      </div>
      <ConfirmModal
        title={`Are you sure to delete this documents ?`}
        content={'Coming Soon'}
        open={openDeleteModal}
        handleCancel={handleDeleteCancel}
        handleOk={() => {}}
      />
      <CreateDocumentModal
        open={openCreateModal}
        handleCancel={handleCreateCancel}
      />
      <UpdateDocumentModal
        open={openUpdateModal}
        handleCancel={handleUpdateCancel}
        selectedMember={null}
      />
    </>
  );
};
export default DocumentPage;
