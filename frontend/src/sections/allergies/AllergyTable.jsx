import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useAllergyColumns from "./AllergyColumns";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useAllergies } from "../../api/allergies/get-allergies";
import { useMembers } from "~/api/members/get-members";

export const AllergyTable = () => {
  const columns = useAllergyColumns();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { data: allergies, isLoading } = useAllergies({
    page,
    size: ROW_PER_PAGE,
    keyword,
  });
  const {data:members} = useMembers({}) 
  const memberMap = (members || []).reduce((map, member) => {
    map[member.memberID] = member.fullName;
    return map;
  }, {});
  let dataSource = [];
  if (allergies !== undefined) {
    dataSource = allergies.map(allergy => ({
      ...allergy,
      memberName: memberMap[allergy.memberID] || "",
    }));
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        size="middle"
        rowKey={(record) => record.allergyID}
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
