import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  ExclamationCircleOutlined,
  FileSearchOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  HeartOutlined,
  SolutionOutlined,
  RobotOutlined,
  BookOutlined,
  HeatMapOutlined
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const MenuDashboardConfig = () => {
  const { t } = useTranslation();

  const menuItems = [
    {
      key: "a",
      icon: <DashboardOutlined />,
      label: t("Dashboard"),
      path: "/manager",
    },
    {
      key: "b",
      label: "Quản lý",
      icon: <HeatMapOutlined />,
      children: [
        {
          key: "1",
          icon: <UserOutlined />,
          label: t("Members"),
          path: "/manager/members",
        },
        {
          key: "3",
          icon: <FileTextOutlined />,
          label: t("Medical Records"),
          path: "/manager/medical-records",
        },
        {
          key: "4",
          icon: <SolutionOutlined />,
          label: t("Documents"),
          path: "/manager/documents",
        },
        {
          key: "5",
          icon: <CalendarOutlined />,
          label: t("Appointments"),
          path: "/manager/appointments",
        },
        {
          key: "6",
          icon: <MedicineBoxOutlined />,
          label: t("Medications"),
          path: "/manager/medications",
        },
        {
          key: "8",
          icon: <FileSearchOutlined />,
          label: t("Allergies"),
          path: "/manager/allergies",
        },
        {
          key: "9",
          icon: <CalendarOutlined />,
          label: t("Vaccinations"),
          path: "/manager/vaccinations",
        },
    
        {
          key: "12",
          icon: <HeartOutlined />,
          label: t("Health Stats"),
          path: "/manager/health-stats",
        },
      ],
    },
    {
      key: "13",
      icon: <BookOutlined />,
      label: "Notes",
      path: "/manager/notes",
    },
    {
      key: "14",
      icon: <RobotOutlined />,
      label: t("ChatAi"),
      path: "/manager/chat-ai",
    },
    {
      key: "7",
      icon: <ExclamationCircleOutlined />,
      label: t("Emergency Contacts"),
      path: "/manager/emergency-contacts",
    },
    {
      key: "10",
      icon: <SettingOutlined />,
      label: t("Account Settings"),
      path: "/manager/account-settings",
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
