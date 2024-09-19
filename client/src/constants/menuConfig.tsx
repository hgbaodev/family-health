import {
  DashboardOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

const menuItems = [
  {
    key: "0",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    path: "/management",
  },
  {
    key: "1",
    icon: <HistoryOutlined />,
    label: "History",
    path: "/history",
  }
];

export default menuItems;
