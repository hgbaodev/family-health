import { Card, Typography, Row, Col } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import { useCountContactsReceivedToday } from '~/api/contacts/count-contacts-received-today';
import { useCountUsersCreatedToday } from '~/api/users/count-users-created-today';

const { Title, Text } = Typography;

const Dashboard = () => {
  // Data for the bar chart (Website Views)
  const barData = [
    { name: 'M', views: 50 },
    { name: 'T', views: 20 },
    { name: 'W', views: 10 },
    { name: 'T', views: 22 },
    { name: 'F', views: 60 },
    { name: 'S', views: 40 },
  ];

  // Data for the line chart (Monthly Website Feedback)
  const feedbackData = [
    { name: 'Jan', feedback: 120 },
    { name: 'Feb', feedback: 150 },
    { name: 'Mar', feedback: 180 },
    { name: 'Apr', feedback: 200 },
    { name: 'May', feedback: 220 },
    { name: 'Jun', feedback: 250 },
    { name: 'Jul', feedback: 280 },
    { name: 'Aug', feedback: 300 },
    { name: 'Sep', feedback: 350 },
    { name: 'Oct', feedback: 400 },
    { name: 'Nov', feedback: 420 },
    { name: 'Dec', feedback: 450 },
  ];

  // Gọi API cho số lượng người dùng tạo hôm nay
  const { data: userData } = useCountUsersCreatedToday();
  // Gọi API cho số lượng liên hệ hôm nay
  const { data: contactData } = useCountContactsReceivedToday();

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Title level={4}>Today Users</Title>
            <Title level={2}>+{userData}</Title>
            <Text>Just updated</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Title level={4}>Today Contacts</Title>
            <Title level={2}>+{contactData}</Title>
            <Text>Just updated</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Title level={4}>Followers</Title>
            <Title level={2}>2,300</Title>
            <Text type="success">+3% than last month</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Title level={4}>Bookings</Title>
            <Title level={2}>281</Title>
            <Text type="success">+55% than last week</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <Title level={4}>Website Views</Title>
            <Text type="secondary">Last Campaign Performance</Text>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#3498db" />
              </BarChart>
            </ResponsiveContainer>
            <Text type="secondary" style={{ marginTop: '8px', display: 'block' }}>
              Campaign sent 2 days ago
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <Title level={4}>Website Feedback</Title>
            <Text type="success">(+15%) increase in feedback this month</Text>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={feedbackData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="feedback" stroke="#FF6347" fill="rgba(255, 99, 71, 0.2)" />
              </LineChart>
            </ResponsiveContainer>
            <Text type="secondary" style={{ marginTop: '8px', display: 'block' }}>
              Updated 4 min ago
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;