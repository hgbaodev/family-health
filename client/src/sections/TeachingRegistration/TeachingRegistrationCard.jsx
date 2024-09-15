import { Button, Card, Empty, List, Space, Tag } from "antd";
import { getTeachingPlanTitle } from "~/utils/getTeachingPlanTitle";
import { SignatureOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const TeachingRegistrationCard = ({ majors, isHighQuality, plans = [] }) => {
  return (
    <Card
      title={
        <Space>
          <span>{getTeachingPlanTitle(majors)}</span>
          {isHighQuality == 1 && <Tag color="blue">Chất lượng cao</Tag>}
        </Space>
      }
      type="inner"
    >
      {plans?.length != 0 ? (
        <List
          dataSource={plans}
          renderItem={(item) => (
            <TeachingPlanItem id={item.id} semester={item.semester} />
          )}
        />
      ) : (
        <Empty description="Chưa có kế hoạch giảng dạy" />
      )}
    </Card>
  );
};

const TeachingPlanItem = ({ id, semester }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/teaching-registration/${id}`);
  };
  return (
    <List.Item
      actions={[
        <Button
          key={1}
          type="primary"
          shape="round"
          icon={<SignatureOutlined />}
          onClick={handleClick}
        >
          Đăng ký
        </Button>,
      ]}
    >
      {`Học kỳ ${semester}`}
    </List.Item>
  );
};

export default TeachingRegistrationCard;
