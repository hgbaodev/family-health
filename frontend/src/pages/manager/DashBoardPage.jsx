import { Layout } from "antd";
import { useTranslation } from "react-i18next";

const { Content } = Layout;

const DashBoardPage = () => {
  const {t} = useTranslation();

  return (
    <Content className="p-4 bg-gray-100">
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{t("DashBoardPage.Welcome")}</h2>
        <p>{t("DashBoardPage.Description")}</p>
      </div>
    </Content>
  );
};

export default DashBoardPage;
