import { useState } from "react";
import UpdateUserModal from "~/sections/users/UpdateUserModal";
import UserProfileForm from "~/sections/users/UserProfileForm";
import PageHeader from "~/components/page-header";
import { Button } from "antd";
import { EditOutlined, KeyOutlined } from "@ant-design/icons"; // Import icon từ Ant Design
import ChangePasswordForm from "~/sections/users/ChangePasswordForm";

const AccountSettingPage = () => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

  return (
    <>
      {/* Header */}
      <PageHeader
        heading="Account Settings"
        links={[
          { title: "Dashboard", href: "/account-settings" },
          { title: "Account Settings" },
        ]}
      />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg border border-gray-200">

          {/* User Profile Form */}
          <UserProfileForm />

          {/* Buttons */}
          <div className="flex justify-center mt-6 space-x-6">
            {/* Update Info Button */}
            <Button
              type="primary"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold flex items-center rounded-md shadow-md"
              icon={<EditOutlined />}
              onClick={() => setOpenUpdateModal(true)}
            >
              Update Information
            </Button>

            {/* Change Password Button */}
            <Button
              type="default"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold flex items-center rounded-md shadow-md"
              icon={<KeyOutlined />}
              onClick={() => setOpenChangePasswordModal(true)}
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UpdateUserModal
        openUpdateModal={openUpdateModal}
        setOpenUpdateModal={setOpenUpdateModal}
      />
      <ChangePasswordForm
        openChangePasswordModal={openChangePasswordModal}
        setOpenChangePasswordModal={setOpenChangePasswordModal}
      />
    </>
  );
};

export default AccountSettingPage;
