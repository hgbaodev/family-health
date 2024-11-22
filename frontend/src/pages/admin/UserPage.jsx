import { Flex } from "antd";
import ConfirmModal from "~/components/modals/ConfirmModal";
import PageHeader from "~/components/page-header";
import { useTranslation } from "react-i18next";
import { UserTable } from "~/sections/users/UserTable";
import { useUsersStore } from "~/stores/userStore";

const UserPage = () => {
  const {
    openUpdateBlockStateUserModal,
    setOpenUpdateBlockStateUserModal,
  } = useUsersStore((state) => state);
  const { t } = useTranslation();
  const handleUpdateBlockStateUser = () => {
    setOpenUpdateBlockStateUserModal(false);
  };


  return (
    <>
      <Flex align="center" justify="space-between" className="mb-1">
        <PageHeader
          heading={t("Users")}
          links={[
            { title: t("Dashboard"), href: "/admin" },
            { title: t("Users") },
          ]}
        />
      </Flex>
      <UserTable />
      <ConfirmModal
        title={'t("warning_change.User")'}
        content={"Coming Soon"}
        open={openUpdateBlockStateUserModal}
        handleCancel={handleUpdateBlockStateUser}
        handleOk={() => {}}
      />
    </>
  );
};
export default UserPage;
