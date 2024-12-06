import { useState } from "react";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Flex, Select, Space } from "antd";
import PageHeader from "~/components/page-header";
import BloodPressureContainer from "~/sections/health-stats/BloodPressureContainer";
import BloodGlucoseContainer from "~/sections/health-stats/BloodGlucoseContainer";
import HeartRateContainer from "~/sections/health-stats/HeartRateContainer";
import ConfirmModal from "~/components/modals/ConfirmModal";
import CreateHealthStatModal from "~/sections/health-stats/CreateHealthStatModal";
import { useHealthStatsStore } from "~/stores/healthStatStore";
import UpdateHealthStatModal from "~/sections/health-stats/UpdateHealthStatModal";
import { useMembersByUser } from "~/api/members/get-members";

const { Option } = Select;

const HealthStatsPage = () => {
  const {
    openDeleteModal,
    openCreateModal,
    openUpdateModal,
    setOpenDeleteModal,
    setOpenCreateModal,
    setOpenUpdateModal,
  } = useHealthStatsStore();

  const { data: members } = useMembersByUser();
  const [selectedMemberId, setSelectedMemberId] = useState(members?.[0]?.id);

  const handleMemberChange = (memberId) => {
    setSelectedMemberId(memberId);
  };

  const handleCreate = () => setOpenCreateModal(true);
  const handleDeleteCancel = () => setOpenDeleteModal(false);
  const handleCreateCancel = () => setOpenCreateModal(false);
  const handleUpdateCancel = () => setOpenUpdateModal(false);

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading={"Thống kê sức khoẻ"}
          links={[
            { title: "Dashboard", href: "/manager" },
            { title: "Thóng kê sức khoẻ" },
          ]}
        />
        <Space>
          <Select
            className="w-[250px]"
            placeholder="Chọn thành viên..."
            value={selectedMemberId}
            onChange={handleMemberChange}
          >
            <Option value="">All Members</Option>
            {members?.map((member) => (
              <Option key={member.id} value={member.id}>
                {member.fullName}
              </Option>
            ))}
          </Select>
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
        <BloodPressureContainer selectedMemberId={selectedMemberId} />
      </div>
      <div style={{ paddingTop: 20 }}>
        <BloodGlucoseContainer selectedMemberId={selectedMemberId} />
      </div>
      <div style={{ paddingTop: 20 }}>
        <HeartRateContainer selectedMemberId={selectedMemberId} />
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
