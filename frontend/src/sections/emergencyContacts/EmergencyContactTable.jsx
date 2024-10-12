import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useEmergencyContactColumns from "./EmergencyContactColum";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useEmergencyContacts } from "~/api/emergencyContacts/get-emergencyContacts";

export const EmergencyContactTable = () => {
  const columns = useEmergencyContactColumns();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { data: emergencyContacts, isLoading, error } = useEmergencyContacts({ page, size: ROW_PER_PAGE, keyword });
if (error) {
    console.error("Error fetching emergency contacts:", error);
}

  return (
    <>
      <Table
        columns={columns}
        dataSource={emergencyContacts}
        size="middle"
        pagination={{
          current: page,
          pageSize: ROW_PER_PAGE,
          total: emergencyContacts?.length || 0,
          onChange: (newPage) => setPage(newPage),
        }}
        loading={isLoading}
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input.Search
              placeholder="Search emergency Contact..."
              className="w-[250px]"
              allowClear
              onSearch={(value) => {
                setKeyword(value);
                setPage(1);
              }}
            />
            <Button icon={<ExportOutlined />}>
              Export <Tag color="blue">Coming Soon</Tag>
            </Button>
          </div>
        )}
      />
    </>
  );
};
