import { Typography, Card, Row, Col } from "antd";
import { HeartOutlined, SafetyOutlined, TeamOutlined } from "@ant-design/icons";
import SphereCanvas from "~/components/SphereCanvas";

const { Title, Paragraph } = Typography;

const HomePage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Row gutter={[32, 32]} align="middle">
        <Col xs={24} md={12}>
          <Title className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Family Medical Diary
          </Title>
          <Paragraph className="text-lg text-gray-600 mb-8">
            Manage and track your family health records in a secure and convenient
            digital space.
          </Paragraph>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <FeatureItem
                icon={<HeartOutlined style={{ fontSize: "2rem", color: "#16a34a" }} />}
                title="Health Tracking"
              />
            </Col>
            <Col xs={24} sm={8}>
              <FeatureItem
                icon={<SafetyOutlined style={{ fontSize: "2rem", color: "#2563eb" }} />}
                title="Data Security"
              />
            </Col>
            <Col xs={24} sm={8}>
              <FeatureItem
                icon={<TeamOutlined style={{ fontSize: "2rem", color: "#7c3aed" }} />}
                title="Family"
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={12}>
          <div className="h-[400px] md:h-[500px]">
            <SphereCanvas />
          </div>
        </Col>
      </Row>
      <Row gutter={[32, 32]} className="mt-16">
        <Col xs={24} md={8}>
          <FeatureCard
            title="Health Tracking"
            description="Record and manage health information for each family member."
            icon={<HeartOutlined style={{ fontSize: "3rem", color: "#16a34a" }} />}
          />
        </Col>
        <Col xs={24} md={8}>
          <FeatureCard
            title="Data Security"
            description="Your family's health data is encrypted and securely protected."
            icon={<SafetyOutlined style={{ fontSize: "3rem", color: "#2563eb" }} />}
          />
        </Col>
        <Col xs={24} md={8}>
          <FeatureCard
            title="Family Management"
            description="Easily add and manage health profiles for multiple family members."
            icon={<TeamOutlined style={{ fontSize: "3rem", color: "#7c3aed" }} />}
          />
        </Col>
      </Row>
    </div>
  );
};

const FeatureItem = ({ icon, title }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <span className="text-gray-700 font-medium">{title}</span>
  </div>
);

const FeatureCard = ({ title, description, icon }) => (
  <Card
    className="h-full text-center hover:shadow-lg transition-shadow duration-300"
    cover={<div className="py-6">{icon}</div>}
  >
    <Card.Meta
      title={<span className="text-xl font-semibold text-gray-800">{title}</span>}
      description={<span className="text-gray-600">{description}</span>}
    />
  </Card>
);

export default HomePage;