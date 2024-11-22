import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useMedicalRecordColumn from "./MedialRecordColumns";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useMedicalRecords } from "~/api/medical-records/get-medical-records";

export const MedicalRecordTable = () => {
  const columns = useMedicalRecordColumn();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { data: medicalRecords, isLoading } = useMedicalRecords({
    page,
    size: ROW_PER_PAGE,
    keyword,
  });
  return (
    <>
      <Table
        columns={columns}
        dataSource={medicalRecords}
        size="middle"
        rowKey={(record) => record.recordID}
        pagination={{
          current: page,
          pageSize: ROW_PER_PAGE,
          total: medicalRecords?.length || 0,
          onChange: (newPage) => setPage(newPage),
        }}
        loading={isLoading}
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input.Search
              placeholder="Search medical record..."
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
