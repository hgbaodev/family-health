import { Typography, Card, Row, Col } from "antd";
import {
  HeartOutlined,
  RobotOutlined,
  SafetyOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import SphereCanvas from "~/components/SphereCanvas";
import { useTranslation } from "react-i18next"; // Correct import

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Row gutter={[32, 32]} align="middle">
        <Col xs={24} md={12}>
          <Title className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {t("LandingPage.Title")}
          </Title>
          <Paragraph className="text-lg text-gray-600 mb-8">
            {t("LandingPage.Description")}
          </Paragraph>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <FeatureItem
                icon={
                  <HeartOutlined
                    style={{ fontSize: "2rem", color: "#16a34a" }}
                  />
                }
                title={t("LandingPage.HealthTracking")}
              />
            </Col>
            <Col xs={24} sm={8}>
              <FeatureItem
                icon={
                  <SafetyOutlined
                    style={{ fontSize: "2rem", color: "#2563eb" }}
                  />
                }
                title={t("LandingPage.DataSecurity")}
              />
            </Col>
            <Col xs={24} sm={8}>
              <FeatureItem
                icon={
                  <TeamOutlined
                    style={{ fontSize: "2rem", color: "#7c3aed" }}
                  />
                }
                title={t("LandingPage.Family")}
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
        <Col xs={24} md={6}>
          <FeatureCard
            title={t("LandingPage.HealthTracking")}
            description={t("LandingPage.HealthTrackingDescription")}
            icon={
              <HeartOutlined style={{ fontSize: "3rem", color: "#16a34a" }} />
            }
          />
        </Col>
        <Col xs={24} md={6}>
          <FeatureCard
            title={t("LandingPage.DataSecurity")}
            description={t("LandingPage.DataSecurityDescription")}
            icon={
              <SafetyOutlined style={{ fontSize: "3rem", color: "#2563eb" }} />
            }
          />
        </Col>
        <Col xs={24} md={6}>
          <FeatureCard
            title={t("LandingPage.FamilyManagement")}
            description={t("LandingPage.FamilyManagementDescription")}
            icon={
              <TeamOutlined style={{ fontSize: "3rem", color: "#7c3aed" }} />
            }
          />
        </Col>
        <Col xs={24} md={6}>
          <FeatureCard
            title={t("LandingPage.AISupport")}
            description={t("LandingPage.AISupportDescription")}
            icon={
              <RobotOutlined style={{ fontSize: "3rem", color: "#ff5722" }} />
            }
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
      title={
        <span className="text-xl font-semibold text-gray-800">{title}</span>
      }
      description={<span className="text-gray-600">{description}</span>}
    />
  </Card>
);

export default HomePage;
