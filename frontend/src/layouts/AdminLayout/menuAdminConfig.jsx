import {
  DashboardOutlined,
  UserOutlined,
  ContactsOutlined,
  SettingOutlined,
  FileOutlined,
  BarChartOutlined,
  TeamOutlined,
  ShopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const MenuAdminConfig = () => {
  const menuItems = [
    {
      key: "0",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/admin",
    },
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Users",
      path: "/admin/users",
    },
    {
      key: "2",
      icon: <ContactsOutlined />,
      label: "Contacts",
      path: "/admin/contacts",
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: "Settings",
      path: "/admin",
    },
    {
      key: "4",
      icon: <FileOutlined />,
      label: "Documents",
      path: "/admin",
    },
    {
      key: "5",
      icon: <BarChartOutlined />,
      label: "Reports",
      path: "/admin",
    },
    {
      key: "6",
      icon: <TeamOutlined />,
      label: "Teams",
      path: "/admin",
    },
    {
      key: "7",
      icon: <ShopOutlined />,
      label: "Products",
      path: "/admin",
    },
    {
      key: "8",
      icon: <NotificationOutlined />,
      label: "Notifications",
      path: "/admin",
    },
  ];
  return menuItems;
};

export default MenuAdminConfig;