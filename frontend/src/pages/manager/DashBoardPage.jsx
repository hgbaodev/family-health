import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import CustomBarChart from "~/sections/dashboards/CustomBarChart";
import CustomLineChart from "~/sections/dashboards/CustomLineChart";


const { Content } = Layout;

const DashBoardPage = () => {
  const { t } = useTranslation();

  return (
    <Content className="flex flex-col p-4 bg-gray-100 content overflow-auto">
      <div className="bg-white p-6 shadow rounded-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">{t("DashBoardPage.Welcome")}</h2>
        <p>{t("DashBoardPage.Description")}</p>
      </div>
      <div className="bg-white p-6 shadow rounded-lg mb-6">
        <h3 className="text-xl font-bold mb-4">Line Chart</h3>
        <CustomLineChart />
      </div>
      <div className="bg-white p-6 shadow rounded-lg">
        <h3 className="text-xl font-bold mb-4">Bar Chart</h3>
        <CustomBarChart />
      </div>
    </Content>
  );
};

export default DashBoardPage;