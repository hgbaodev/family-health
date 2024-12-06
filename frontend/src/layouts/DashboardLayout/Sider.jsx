import { useEffect, useState } from "react";
import { Layout, Drawer, Grid, Space, Button, Flex } from "antd";
import MenuCustom from "./Menu";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { api } from "~/config/api";

const { Sider } = Layout;
const { useBreakpoint } = Grid;


function ResponsiveSider({ collapsed, setCollapsed }) {
  const [isMobile, setIsMobile] = useState(false);
  const screens = useBreakpoint();
  const navigate = useNavigate();
  

  useEffect(() => {
    setIsMobile(!screens.lg);
  }, [screens]);

  const handlePayment = async () => {
    try {
      const urlString = await api.post("/payments/create-checkout-session");
      window.location.href = urlString;
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

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
          <Space
            className="flex flex-col items-center justify-center p-4 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} className="w-20 h-20 object-fill" />
            <span className="text-xl font-bold text-primary">FamilyHealth</span>
          </Space>
          <MenuCustom
            mode="inline"
            isMobile={isMobile}
            theme="light"
            onClose={() => setCollapsed(false)}
          />
          <Button onClick={handlePayment}>Nâng cấp</Button>
        </Drawer>
      ) : (
        <Sider
          theme="light"
          trigger={null}
          className="overflow-auto h-screen !sticky top-0 left-0 bottom-0 px-1 border-r-[1px] border-gray-200"
          collapsed={collapsed}
          width="240"
        >
          <>
            <Space
              className="flex flex-col items-center justify-center p-4 cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              <img src={logo} className="w-20 h-20" />
              {!collapsed && (
                <span className="text-xl font-bold text-primary">
                  FamilyHealth
                </span>
              )}
            </Space>
            <Flex vertical justify="space-between">
              <MenuCustom
                mode="inline"
                theme="light"
                isMobile={isMobile}
                onClose={() => setCollapsed(false)}
              />
              <Button onClick={handlePayment} className="bg-green-400 text-white">Nâng cấp</Button>
            </Flex>
          </>
        </Sider>
      )}
    </>
  );
}

export default ResponsiveSider;
