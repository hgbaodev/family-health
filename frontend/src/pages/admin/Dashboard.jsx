import React from 'react';
import { Box, Card, Typography, Grid } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { useCountContactsReceivedToday } from '~/api/contacts/count-contacts-received-today';
import { useCountUsersCreatedToday } from '~/api/users/count-users-created-today';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const Dashboard = () => {
  // Data for the bar chart (Website Views)
  const barData = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S'],
    datasets: [
      {
        label: 'Website Views',
        data: [50, 20, 10, 22, 60, 40],
        backgroundColor: '#3498db',
      },
    ],
  };

  // Data for the line chart (Monthly Website Feedback)
  const feedbackData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Tháng trong năm
    datasets: [
      {
        label: 'Monthly Website Feedback',
        data: [120, 150, 180, 200, 220, 250, 280, 300, 350, 400, 420, 450], // Lượng phản hồi hàng tháng
        borderColor: '#FF6347',  // Màu đường biểu đồ
        backgroundColor: 'rgba(255, 99, 71, 0.2)',  // Màu nền biểu đồ
        tension: 0.4,  // Độ cong của đường biểu đồ
      },
    ],
  };
  // Gọi API cho số lượng người dùng tạo hôm nay
  const { data: userData } = useCountUsersCreatedToday();
  // Gọi API cho số lượng liên hệ hôm nay
  const { data: contactData } = useCountContactsReceivedToday();

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Today's Users</Typography>
            <Typography variant="h4">+{userData}</Typography>
            <Typography>Just updated</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Today's Contacts</Typography>
            <Typography variant="h4">+{contactData}</Typography>
            <Typography>Just updated</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Followers</Typography>
            <Typography variant="h4">2,300</Typography>
            <Typography color="green">+3% than last month</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Bookings</Typography>
            <Typography variant="h4">281</Typography>
            <Typography color="green">+55% than last week</Typography>
          </Card>
        </Grid>        

        {/* Charts */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Website Views</Typography>
            <Typography color="textSecondary">Last Campaign Performance</Typography>
            <Bar data={barData} />
            <Typography color="textSecondary" mt={1}>
              Campaign sent 2 days ago
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Website Feedback</Typography>
            <Typography color="green">(+15%) increase in feedback this month</Typography>
            <Line data={feedbackData} />
            <Typography color="textSecondary" mt={1}>
              Updated 4 min ago
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
