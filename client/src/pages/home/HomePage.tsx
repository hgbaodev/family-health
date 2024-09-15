import { Typography, Card } from 'antd';
import { HeartOutlined, SafetyOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
    <Title className="text-center text-4xl md:text-5xl font-bold text-gray-800 mb-8">
      Family Medical Diary
    </Title>
    <Paragraph className="text-center text-lg text-gray-600 mb-12">
      Manage and track your family's health records in a secure and convenient digital space.
    </Paragraph>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <FeatureCard
        title="Health Tracking"
        description="Record and manage health information for each family member."
        icon={<HeartOutlined style={{ fontSize: '3rem', color: '#16a34a' }} />}
      />
      <FeatureCard
        title="Data Security"
        description="Your family's health data is encrypted and securely protected."
        icon={<SafetyOutlined style={{ fontSize: '3rem', color: '#2563eb' }} />}
      />
      <FeatureCard
        title="Family Management"
        description="Easily add and manage health profiles for multiple family members."
        icon={<TeamOutlined style={{ fontSize: '3rem', color: '#7c3aed' }} />}
      />
    </div>
  </div>
  );
};

const FeatureCard = ({ title, description, icon } : { title: string, description: string, icon: JSX.Element }) => (
  <Card 
    className="text-center hover:shadow-lg transition-shadow duration-300"
    cover={<div className="py-6">{icon}</div>}
  >
    <Card.Meta
      title={<span className="text-xl font-semibold text-gray-800">{title}</span>}
      description={<span className="text-gray-600">{description}</span>}
    />
  </Card>
);

export default HomePage;