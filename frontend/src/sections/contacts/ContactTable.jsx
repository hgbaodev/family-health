import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useContactColumns from "./ContactColumn";
import { useContacts } from "~/api/contacts/get-contacts";
import { useTable } from "~/hooks/useTable";
import { ROW_PER_PAGE } from "../../config/constants";

export const ContactTable = () => {
  const columns = useContactColumns();

  const {
    data,
    isLoading,
    pagination,
    setKeyword,
  } = useTable(useContacts, ROW_PER_PAGE, columns);

  return (
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      rowKey={(record) => record.contactID}
      pagination={pagination}
      loading={isLoading}
      scroll={{ x: "max-content" }}
      title={() => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input.Search
            placeholder="Search contact..."
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
