import {
  DashboardOutlined,
  HistoryOutlined,
  UserOutlined
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
  }
];

export default menuItems;
