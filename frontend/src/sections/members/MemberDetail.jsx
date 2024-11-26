import { Col, Row, Space, Divider, Flex, Button } from "antd";
import MemberAllergies from "~/sections/members/MemberAllergies";
import MemberAppointment from "~/sections/members/MemberAppointment";
import MemberVaccination from "~/sections/members/MemberVaccination";
import { useMembersStore } from "~/stores/memberStore";
import { CloseOutlined } from "@ant-design/icons";

const MemberDetail = () => {
  const { memberDetail, clearMemberDetail } = useMembersStore((state) => state);

  const handleClearMemeberDetail = () => {
    clearMemberDetail();
  }

  return (
    <Col
      span={12}
      className="bg-white p-6 rounded-lg shadow-md overflow-y-scroll"
      style={{
        maxHeight: "calc(100vh - 100px)",
      }}
    >
      <Row justify="center" className="mb-4">
        <Col span={20}>
          <Flex justify="space-between" align="center">
            <Space>
              <h2 className="text-xl font-bold text-primary">
                Thông tin chi tiết
              </h2>
            </Space>
            <Button icon={<CloseOutlined />} onClick={handleClearMemeberDetail}></Button>
          </Flex>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Space direction="vertical" size="middle" className="w-full">
            <div className="flex">
              <span className="font-bold w-[120px]">Họ tên:</span>
              <span>{memberDetail?.fullName || "Chưa cập nhật"}</span>
            </div>
            <div className="flex">
              <span className="font-bold w-[120px]">Giới tính:</span>
              <span>{memberDetail?.gender || "Chưa cập nhật"}</span>
            </div>
            <div className="flex">
              <span className="font-bold w-[120px]">Ngày sinh:</span>
              <span>{memberDetail?.dateOfBirth || "Chưa cập nhật"}</span>
            </div>
            <div className="flex">
              <span className="font-bold w-[120px]">Mối quan hệ:</span>
              <span>{memberDetail?.relationship || "Chưa cập nhật"}</span>
            </div>
          </Space>
        </Col>
        <Col span={12}>
          <Space direction="vertical" size="middle" className="w-full">
            <div className="flex">
              <span className="font-bold w-[120px]">Nhóm máu:</span>
              <span>{memberDetail?.bloodType || "Chưa cập nhật"}</span>
            </div>
            <div className="flex">
              <span className="font-bold w-[120px]">Chiều cao:</span>
              <span>
                {memberDetail?.height
                  ? `${memberDetail.height} cm`
                  : "Chưa cập nhật"}
              </span>
            </div>
            <div className="flex">
              <span className="font-bold w-[120px]">Cân nặng:</span>
              <span>
                {memberDetail?.weight
                  ? `${memberDetail.weight} kg`
                  : "Chưa cập nhật"}
              </span>
            </div>
          </Space>
        </Col>
      </Row>
      <Divider />
      <MemberVaccination />
      <Divider />
      <MemberAppointment />
      <Divider />
      <MemberAllergies />
    </Col>
  );
};

export default MemberDetail;
