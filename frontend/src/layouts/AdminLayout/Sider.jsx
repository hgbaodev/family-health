import { useEffect, useState } from "react";
import { Layout, Drawer, Grid, Space, Typography } from "antd";
import MenuCustom from "./Menu";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;
const { useBreakpoint } = Grid;

function ResponsiveSider({ collapsed, setCollapsed }) {
  const [isMobile, setIsMobile] = useState(false);
  const screens = useBreakpoint();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMobile(!screens.lg);
  }, [screens]);

  return (
    <>
      {isMobile ? (
        <Drawer
          open={collapsed}
          onClose={() => setCollapsed(false)}
          placement="left"
          styles={{ header: { display: "none" }, body: { padding: "10px" } }}
          width={300}
        >
          <MenuCustom
            mode="inline"
            isMobile={isMobile}
            theme="light"
            onClose={() => setCollapsed(false)}
          />
        </Drawer>
      ) : (
        <Sider
          theme="light"
          trigger={null}
          className="overflow-y-auto h-screen !sticky top-0 left-0 bottom-0 px-1 border-r-[1px] border-gray-200"
          collapsed={collapsed}
          width="240"
        >
          <>
            <Space
              className="flex flex-col items-center justify-center p-4 cursor-pointer"
              onClick={() => {
                navigate("/manager");
              }}
            >
              <img src={logo} className="w-20 h-20 object-fill" />
              <Typography.Title level={4} color="text-green-600">
                FamilyHealth
              </Typography.Title>
            </Space>
            <MenuCustom
              mode="inline"
              theme="light"
              isMobile={isMobile}
              onClose={() => setCollapsed(false)}
            />
          </>
        </Sider>
      )}
    </>
  );
}

export default ResponsiveSider;
