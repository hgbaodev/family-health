import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useMedicalRecordColumn from "./MedialRecordColumns";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useMedicalRecords } from "~/api/medical-records/get-medical-records";

export const MedicalRecordTable = () => {
  const columns = useMedicalRecordColumn();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(ROW_PER_PAGE);
  const [keyword, setKeyword] = useState("");

  const { data, isLoading } = useMedicalRecords({
    page,
    size: pageSize,
    keyword,
  });
  return (
    <>
      <Table
        columns={columns}
        dataSource={data?.items || []}
        size="small"
        rowKey={(record) => record.id}
        pagination={{
          current: data?.meta?.current_page,
          pageSize: data?.meta?.per_page,
          total: data?.meta?.total_elements,
          showSizeChanger: true,
          pageSizeOptions: ["8", "10", "20", "50", "100"],
          onShowSizeChange: (current, size) => {
            setPageSize(size);
            setPage(1);
          },
          onChange: (newPage) => setPage(newPage),
        }}
        loading={isLoading}
        scroll={{ x: "max-content" }}
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
