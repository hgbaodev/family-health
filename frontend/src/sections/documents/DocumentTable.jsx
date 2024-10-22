import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useDocumentColumns from "./DocumentColumn";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useDocuments } from "~/api/documents/get-documents";

export const DocumentTable = () => {
  const columns = useDocumentColumns();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { data: documents, isLoading } = useDocuments({
    page,
    size: ROW_PER_PAGE,
    keyword,
  });

  return (
    <>
      <Table
        columns={columns}
        dataSource={documents}
        size="middle"
        pagination={{
          current: page,
          pageSize: ROW_PER_PAGE,
          total: documents?.length || 0,
          onChange: (newPage) => setPage(newPage),
        }}
        rowKey={(record) => record.documentID}
        loading={isLoading}
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input.Search
              placeholder="Search document..."
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
