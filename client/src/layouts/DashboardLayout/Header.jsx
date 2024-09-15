import { Button, Input, Space } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import UserDropdown from "~/layouts/DashboardLayout/UserDropdown";

const HeaderLayout = ({ collapsed, setCollapsed }) => {
  return (
    <Header className="sticky top-0 z-50 p-5 flex items-center justify-between bg-white">
      <Space>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
        <Input
          placeholder="Tìm kiếm..."
          variant="filled"
          suffix={<SearchOutlined />}
        />
      </Space>
      <Space>
        <UserDropdown />
      </Space>
    </Header>
  );
};

export default HeaderLayout;
