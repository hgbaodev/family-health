import { ConfigProvider, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import menuItems from "~/constants/menuConfig";
import { findItemByKey, findItemByPath } from "~/utils/findMenuItem";

const MenuCustom = ({ mode, isMobile, onClose, theme = "light", ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentItem = findItemByPath(menuItems, location.pathname);
  const handleMenuClick = (e) => {
    const item = findItemByKey(menuItems, e.key);
    if (item && item.path) {
      navigate(item.path);
      if (isMobile) {
        onClose();
      }
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          controlHeight: 32,
        },
      }}
    >
      <Menu
        mode={mode}
        theme={theme}
        defaultSelectedKeys={["1"]}
        selectedKeys={[currentItem?.key]}
        items={menuItems.map((item) => ({
          ...item,
          onClick: handleMenuClick,
        }))}
        rootClassName="!border-none"
        {...props}
      />
    </ConfigProvider>
  );
};

export default MenuCustom;
