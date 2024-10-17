import {
  DashboardOutlined,
  HistoryOutlined,
  UserOutlined,
  FileTextOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  ExclamationCircleOutlined,
  FileSearchOutlined,
  SettingOutlined,
  BarChartOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";

const menuItems = [
  {
    key: "0",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    path: "/manager",
  },
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Members",
    path: "/manager/members",
  },
  {
    key: "2",
    icon: <HistoryOutlined />,
    label: "History",
    path: "/manager/history",
  },
  {
    key: "3",
    icon: <FileTextOutlined />,
    label: "Medical Records",
    path: "/manager/medical-records",
  },
  {
    key: "4",
    icon: <CalendarOutlined />,
    label: "Appointments",
    path: "/manager/appointments",
  },
  {
    key: "5",
    icon: <MedicineBoxOutlined />,
    label: "Medications",
    path: "/manager/medications",
  },
  {
    key: "6",
    icon: <ExclamationCircleOutlined />,
    label: "Emergency Contacts",
    path: "/manager/emergencyContacts",

  },
  {
    key: "7",
    icon: <FileSearchOutlined />,
    label: "Allergies",
    path: "/manager/allergies",
  },
  {
    key: "8",
    icon: <CalendarOutlined />,
    label: "Vaccinations",
    path: "/manager/vaccinations",
  },
  {
    key: "9",
    icon: <SettingOutlined />,
    label: "Account Settings",
    path: "/manager/account-settings",
  },
  {
    key: "10",
    icon: <BarChartOutlined />,
    label: "Reports & Stats",
    path: "/manager/reports-stats",
  },
  {
    key: "11",
    icon: <QuestionCircleOutlined />,
    label: "Help & Support",
    path: "/manager/help-support",
  }
];

export default menuItems;
