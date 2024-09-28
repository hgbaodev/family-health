import { Spin } from 'antd';

const useLoading = ({ isLoading, children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {isLoading ? (
        <Spin size="large" />
      ) : (
        children
      )}
    </div>
  );
};

export default useLoading;