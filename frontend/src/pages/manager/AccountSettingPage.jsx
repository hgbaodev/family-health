import React, { useState } from 'react';
import UpdateUserModal from "~/sections/users/UpdateUserModal";
import UserProfileForm from "~/sections/users/UserProfileForm";
import ChangePasswordForm from "~/sections/users/ChangePasswordForm"; // Import modal ChangePasswordForm
import { useUserStore } from "~/stores/users/userStore";
import PageHeader from "~/components/page-header";
import { Button } from "antd"; // Import các component cần thiết từ Ant Design

const AccountSettingPage = () => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false); // Trạng thái để quản lý hiển thị modal cập nhật thông tin
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false); // Trạng thái để quản lý hiển thị modal đổi mật khẩu

  const handleCreate = () => {
    // Thêm logic cho handleCreate nếu cần
  };

  return (
    <>
      <PageHeader
        heading="Account Settings"
        links={[
          { title: "Dashboard", href: "/account-settings" },
          { title: "Account Settings" }
        ]}
      />

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6">USER INFORMATION</h2>
          <UserProfileForm />
          <div className="flex justify-center mt-4 space-x-4">
            <Button onClick={() => setOpenUpdateModal(true)}>Update information</Button>
            <Button onClick={() => setOpenChangePasswordModal(true)}>Change Password</Button> {/* Nút Change Password */}
          </div>
        </div>
      </div>

      {/* Modal cho việc cập nhật thông tin người dùng */}
      <UpdateUserModal openUpdateModal={openUpdateModal} setOpenUpdateModal={setOpenUpdateModal} />

      {/* Modal cho việc đổi mật khẩu */}
{/*       <ChangePasswordForm open={openChangePasswordModal} setOpen={setOpenChangePasswordModal} />  */}
    </>
  );
};

export default AccountSettingPage;
