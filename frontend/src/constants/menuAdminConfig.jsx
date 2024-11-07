import {
  DashboardOutlined,
  UserOutlined,
  ContactsOutlined
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
      key: "3",
      icon: <ContactsOutlined />,
      label: "Contacts",
      path: "/admin/contacts",
    }
  ];
  return menuItems;
}

export default MenuAdminConfig;