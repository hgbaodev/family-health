import { useState } from 'react';
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Flex, Space } from "antd";
import PageHeader from "~/components/page-header";
import BloodPressureContainer from "~/sections/health-stats/BloodPressureContainer";
import BloodGlucoseContainer from "~/sections/health-stats/BloodGlucoseContainer";
import HeartRateContainer from '~/sections/health-stats/HeartRateContainer';
import MemberSelect from "~/sections/health-stats/MemberSelect";
import ConfirmModal from "~/components/modals/ConfirmModal";
import CreateHealthStatModal from "~/sections/health-stats/CreateHealthStatModal";
import { useHealthStatsStore } from "~/stores/health-stats/healthStatStore";
import UpdateHealthStatModal from '~/sections/health-stats/UpdateHealthStatModal';
// import { useTranslation } from "react-i18next";

const HealthStatsPage = () => {
  // const { t } = useTranslation();
  const { 
    openDeleteModal, 
    openCreateModal, 
    openUpdateModal, 
    setOpenDeleteModal, 
    setOpenCreateModal, 
    setOpenUpdateModal 
  } = useHealthStatsStore();
  
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const handleMemberChange = (memberId) => {
    setSelectedMemberId(memberId);
    // Có thể thêm logic gọi API để tải thống kê sức khỏe cho memberId đã chọn
  };

  const handleCreate = () => setOpenCreateModal(true);
  const handleDeleteCancel = () => setOpenDeleteModal(false);
  const handleCreateCancel = () => setOpenCreateModal(false);
  const handleUpdateCancel = () => setOpenUpdateModal(false);

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading={"Health Stats"}
          links={[
            { title: "Dashboard", href: "/manager" }, 
            { title: "Health Stats" }
          ]}
        />
        <Space>
          <MemberSelect onChange={handleMemberChange} />
          <Button
            onClick={handleCreate} // Đảm bảo rằng hàm này được gọi khi nhấn nút
            type="primary"
            icon={<PlusSquareOutlined />}
            disabled={!selectedMemberId} // Vô hiệu hóa nếu không có member nào được chọn
          >
            {"Add"}
          </Button>
        </Space>
      </Flex>
      <div style={{ paddingTop: 20 }}>
        <BloodPressureContainer selectedMemberId={selectedMemberId}/>  
      </div>
      <div style={{ paddingTop: 20 }}>
        <BloodGlucoseContainer selectedMemberId={selectedMemberId}/>  
      </div>
      <div style={{ paddingTop: 20 }}>
        <HeartRateContainer selectedMemberId={selectedMemberId}/>  
      </div>

      <ConfirmModal
        title="Are you sure to delete Health Stat?"
        content="Coming Soon"
        open={openDeleteModal}
        handleCancel={handleDeleteCancel}
        handleOk={() => {}}
      />
      <CreateHealthStatModal
        open={openCreateModal}
        handleCancel={handleCreateCancel}
        selectedMemberId={selectedMemberId} // Truyền selectedMemberId vào đây
      />
      <UpdateHealthStatModal
        open={openUpdateModal}
        handleCancel={handleUpdateCancel}
      />
    </>
  );
};

export default HealthStatsPage;
