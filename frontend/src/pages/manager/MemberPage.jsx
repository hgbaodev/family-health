import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Row, Space } from "antd";
import ConfirmModal from "~/components/modals/ConfirmModal";
import PageHeader from "~/components/page-header";
import CreateMemberModal from "~/sections/members/CreateMemberModal";
import { MemberTable } from "~/sections/members/MemberTable";
import UpdateMemberModal from "~/sections/members/UpdateMemberModal";
import { useMembersStore } from "~/stores/memberStore";
import { useTranslation } from "react-i18next";
import MemberDetail from "~/sections/members/MemberDetail";

const MemberPage = () => {
  const {
    openDeleteModal,
    openCreateModal,
    openUpdateModal,
    setOpenDeleteModal,
    setOpenCreateModal,
    setOpenUpdateModal,
    memberDetail,
  } = useMembersStore((state) => state);
  const { t } = useTranslation();

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
      <Row gutter={16}>
        <Col span={memberDetail ? 12 : 24}>
          <Flex align="center" justify="space-between" className="mb-1">
            <PageHeader
              heading={t("Members")}
              links={[
                { title: t("Dashboard"), href: "/manager" },
                { title: t("Members") },
              ]}
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
          <MemberTable />
        </Col>
        {memberDetail && (
          <MemberDetail/>
        )}
      </Row>

      <ConfirmModal
        title={'t("warning_delete.Member")'}
        content={"Coming Soon"}
        open={openDeleteModal}
        handleCancel={handleDeleteCancel}
        handleOk={() => {}}
      />
      <CreateMemberModal
        open={openCreateModal}
        handleCancel={handleCreateCancel}
      />
      <UpdateMemberModal
        open={openUpdateModal}
        handleCancel={handleUpdateCancel}
        selectedMember={null}
      />
    </>
  );
};
export default MemberPage;
