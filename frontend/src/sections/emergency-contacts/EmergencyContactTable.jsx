import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useEmergencyContactColumns from "./EmergencyContactColumn";
import { useEmergencyContacts } from "~/api/emergency-contacts/get-emergencyContacts";
import { useTable } from "~/hooks/useTable";
import { ROW_PER_PAGE } from "../../config/constants";

export const EmergencyContactTable = () => {
  const columns = useEmergencyContactColumns();

  const {
    data: emergencyContacts,
    isLoading,
    pagination,
    setKeyword,
  } = useTable(useEmergencyContacts, ROW_PER_PAGE, columns);

  console.log("emergencyContacts", emergencyContacts);

  return (
    <Table
      columns={columns}
      dataSource={emergencyContacts}
      size="small"
      rowKey={(record) => record.id}
      pagination={pagination}
      loading={isLoading}
      scroll={{ x: "max-content" }}
      title={() => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input.Search
            placeholder="Search emergency contact..."
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
