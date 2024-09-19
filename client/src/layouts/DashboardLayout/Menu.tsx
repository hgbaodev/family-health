import { ConfigProvider, Menu, MenuProps } from "antd";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import menuItems from "../../constants/menuConfig";

interface MenuItem {
  key: string;
  path?: string;
  children?: MenuItem[];
}

interface MenuCustomProps extends MenuProps {
  mode: "horizontal" | "vertical" | "inline";
  isMobile: boolean;
  onClose: () => void;
  theme?: "light" | "dark";
}

const MenuCustom: React.FC<MenuCustomProps> = ({ isMobile, onClose, theme = "light", ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log("location", location);

  const findItemByPath = useCallback((items: MenuItem[], path: string): MenuItem | undefined => {
    for (const item of items) {
      if (item.path && item.path.includes(path)) {
        return item;
      }
      if (item.children) {
        const child = findItemByPath(item.children, path);
        if (child) return child;
      }
    }
  }, []);

  console.log('findItemByPath', findItemByPath(menuItems, location.pathname));

  const selectedKeys = useMemo(() => {
    const item = findItemByPath(menuItems, location.pathname);
    return item ? [item.key] : [];
  }, [location.pathname, findItemByPath]);

  const handleMenuClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      if (isMobile) {
        onClose();
      }
      navigate(e.item.props.path);
    },
    [isMobile, onClose, navigate]
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          controlHeight: 32,
        },
      }}
    >
      <SimpleBar style={{ maxHeight: "calc(100vh - 80px)" }}>
        <Menu
          theme={theme}
          selectedKeys={selectedKeys}
          items={menuItems}
          rootClassName="!border-none"
          onClick={handleMenuClick}
          {...props}
        ></Menu>
      </SimpleBar>
    </ConfigProvider>
  );
};


export default MenuCustom;
