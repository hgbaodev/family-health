import {
  UserOutlined,
  FileTextOutlined,
  CalendarOutlined,
  FileSearchOutlined,
  QuestionCircleOutlined,
  HeartOutlined,
  RobotOutlined,
  PhoneOutlined
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const MenuDashboardConfig = () => {
  const { t } = useTranslation();

  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: t("Members"),
      path: "/manager",
    },
    {
      key: "9",
      icon: <CalendarOutlined />,
      label: t("Vaccinations"),
      path: "/manager/vaccinations",
    },
    {
      key: "5",
      icon: <CalendarOutlined />,
      label: t("Appointments"),
      path: "/manager/appointments",
    },
    {
      key: "8",
      icon: <FileSearchOutlined />,
      label: t("Allergies"),
      path: "/manager/allergies",
    },
    {
      key: "12",
      icon: <HeartOutlined />,
      label: t("Health Stats"),
      path: "/manager/health-stats",
    },
    {
      key: "3",
      icon: <FileTextOutlined />,
      label: t("Medical Records"),
      path: "/manager/medical-records",
    },
    {
      key: "7",
      icon: <PhoneOutlined />,
      label: t("Emergency Contacts"),
      path: "/manager/emergency-contacts",
    },
    {
      key: "14",
      icon: <RobotOutlined />,
      label: t("ChatAi"),
      path: "/manager/chat-ai",
    },
    {
      key: "11",
      icon: <QuestionCircleOutlined />,
      label: t("Help & Support"),
      path: "/manager/help-support",
    },
  ];
  return menuItems;
};

export default MenuDashboardConfig;
