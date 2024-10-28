import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useMedicationColumns from "./MedicationColum";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useMedications } from "~/api/medications/get-medications";

const MedicationTable = () => {
  const columns = useMedicationColumns();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { data: medications, isLoading } = useMedications({ page, size: ROW_PER_PAGE, keyword });

  return (
    <>
      <Table
        columns={columns}
        dataSource={medications}
        size="middle"
        rowKey={(record) => record.medicationID}
        pagination={{
          current: page,
          pageSize: ROW_PER_PAGE,
          total: medications?.length || 0,
          onChange: (newPage) => setPage(newPage),
        }}
        loading={isLoading}
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input.Search
              placeholder="Search medication..."
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

export default MedicationTable;