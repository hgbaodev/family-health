import { Flex } from "antd";
import ConfirmModal from "~/components/modals/ConfirmModal";
import PageHeader from "~/components/page-header";
import { useTranslation } from "react-i18next";
import { ContactTable } from "~/sections/contacts/ContactTable";
import { useContactsStore } from "~/stores/contactStore";

const ContactPage = () => {
  const {
    openUpdateSeenStateContactModal,
    setOpenUpdateSeenStateContactModal,
  } = useContactsStore((state) => state);
  const { t } = useTranslation();
  const handleUpdateSeenStateContact = () => {
    setOpenUpdateSeenStateContactModal(false);
  };


  return (
    <>
      <Flex align="center" justify="space-between" className="mb-1">
        <PageHeader
          heading={t("Contacts")}
          links={[
            { title: t("Dashboard"), href: "/admin" },
            { title: t("Contacts") },
          ]}
        />
      </Flex>
      <ContactTable />
      <ConfirmModal
        title={'t("warning_change.User")'}
        content={"Coming Soon"}
        open={openUpdateSeenStateContactModal}
        handleCancel={handleUpdateSeenStateContact}
        handleOk={() => {}}
      />
    </>
  );
};
export default ContactPage;
