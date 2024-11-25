import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useMedicalRecordColumn from "./MedialRecordColumns";
import { useMedicalRecords } from "~/api/medical-records/get-medical-records";
import { useTable } from "~/hooks/useTable";
import { ROW_PER_PAGE } from "../../config/constants";

export const MedicalRecordTable = () => {
  const columns = useMedicalRecordColumn();

  const {
    data: medicalRecords,
    isLoading,
    pagination,
    setKeyword,
  } = useTable(useMedicalRecords, ROW_PER_PAGE, columns);

  return (
    <Table
      columns={columns}
      dataSource={medicalRecords}
      size="small"
      rowKey={(record) => record.id}
      pagination={pagination}
      loading={isLoading}
      scroll={{ x: "max-content" }}
      title={() => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input.Search
            placeholder="Search medical record..."
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
