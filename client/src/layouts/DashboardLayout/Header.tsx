import { Button, Input, Space } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import UserDropdown from "./UserDropdown";

interface HeaderLayoutProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ collapsed, setCollapsed }) => {
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
