import { useEffect, useState } from "react";
import { Layout, Drawer, Grid } from "antd";
import MenuCustom from "~/layouts/DashboardLayout/Menu";
const { Sider } = Layout;
const { useBreakpoint } = Grid;

function ResponsiveSider({ collapsed, setCollapsed }) {
  const [isMobile, setIsMobile] = useState(false);
  const screens = useBreakpoint();

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
          className="overflow-auto h-screen !sticky top-0 left-0 bottom-0 px-1 border-r-[1px] border-gray-200"
          collapsed={collapsed}
          width="240"
        >
          <>
            <h2 className="font-extrabold text-2xl py-5 text-center text-primary">
              {collapsed ? "FIT" : "FIT -SGU"}
            </h2>
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
