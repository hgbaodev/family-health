import { Layout } from "antd";

const { Content } = Layout;

const DashBoardPage = () => {
  return (
    <Content className="p-4 bg-gray-100">
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h2>
        <p>Here you can manage your content and settings.</p>
      </div>
    </Content>
  );
};

export default DashBoardPage;
