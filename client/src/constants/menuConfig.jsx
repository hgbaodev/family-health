import {
  IdcardOutlined,
  DatabaseOutlined,
  TeamOutlined,
  FileTextOutlined,
  ScheduleOutlined,
  SignatureOutlined,
} from "@ant-design/icons";

const menuItems = [
  {
    key: "1",
    icon: <SignatureOutlined />,
    label: "Đăng ký giảng dạy",
    path: "/",
  },
  {
    key: "2",
    icon: <DatabaseOutlined />,
    label: "Danh mục",
    children: [
      {
        key: "3",
        label: "Ngành",
        path: "/categories/majors",
      },
      {
        key: "4",
        label: "Chuyên ngành",
        path: "/categories/specialties",
      },
      {
        key: "5",
        label: "Bộ môn",
        path: "/categories/departments",
      },
      {
        key: "6",
        label: "Học phần",
        path: "/categories/subjects",
      },
      {
        key: "7",
        label: "Chu kỳ",
        path: "/categories/cycles",
      },
    ],
  },
  {
    key: "8",
    icon: <IdcardOutlined />,
    label: "Giảng viên",
    path: "/lecturers",
  },
  {
    key: "9",
    icon: <TeamOutlined />,
    label: "Tài khoản",
    path: "/accounts",
  },
  {
    key: "10",
    icon: <FileTextOutlined />,
    label: "Chương trình đào tạo",
    path: "/training-programs/create",
  },
  {
    key: "11",
    icon: <ScheduleOutlined />,
    label: "Kế hoạch giảng dạy",
    path: "/teaching-plans",
  },
];

export default menuItems;
