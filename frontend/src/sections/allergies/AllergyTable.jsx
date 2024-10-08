import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useAllergyColumns from "./AllergyColumns";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useAllergies } from "../../api/allergies/get-allergies";

export const AllergyTable = () => {
  const columns = useAllergyColumns();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { data: allergies, isLoading } = useAllergies({
    page,
    size: ROW_PER_PAGE,
    keyword,
  });

  return (
    <>
      <Table
        columns={columns}
        dataSource={allergies}
        size="middle"
        pagination={{
          current: page,
          pageSize: ROW_PER_PAGE,
          total: allergies?.length || 0,
          onChange: (newPage) => setPage(newPage),
        }}
        loading={isLoading}
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input.Search
              placeholder="Search allergy..."
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
