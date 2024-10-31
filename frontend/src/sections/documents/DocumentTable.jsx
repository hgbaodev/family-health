import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useDocumentColumns from "./DocumentColumn";
import DocumentDetail from "./DocumentDetail";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useDocuments } from "~/api/documents/get-documents";

export const DocumentTable = () => {
  const columns = useDocumentColumns();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: documents, isLoading } = useDocuments({
    page,
    size: ROW_PER_PAGE,
    keyword,
  });

  const doubleClickHandler = (item) =>{
    setSelectedItem(item);
    setIsModalVisible(true);
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={documents}
        onRow={(item) => {
          return {
            onDoubleClick: () => {
              doubleClickHandler(item);
            }
          }
        }}
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
      <DocumentDetail
        visible={isModalVisible}
        item={selectedItem}
        onCancel={() => setIsModalVisible(false)}
      /> 
    </>
  );
};
