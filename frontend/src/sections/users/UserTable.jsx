import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useUserColumns from "./UserColumn";
import { useUsers } from "~/api/users/get-users";
import { useTable } from "~/hooks/useTable";
import { ROW_PER_PAGE } from "../../config/constants";

export const UserTable = () => {
  const columns = useUserColumns();

  const {
    data: users,
    isLoading,
    pagination,
    setKeyword,
  } = useTable(useUsers, ROW_PER_PAGE, columns);

  return (
    <Table
      columns={columns}
      dataSource={users}
      size="small"
      rowKey={(record) => record.id}
      pagination={pagination}
      loading={isLoading}
      scroll={{ x: "max-content" }}
      title={() => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input.Search
            placeholder="Search user..."
            className="w-[250px]"
            allowClear
            onSearch={setKeyword}
          />
          <Button icon={<ExportOutlined />}>
            Export <Tag color="blue">Coming Soon</Tag>
          </Button>
        </div>
      )}
    />
  );
};
