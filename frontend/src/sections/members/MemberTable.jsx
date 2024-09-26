import { ExportOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Table, Tag } from "antd";
import useMemberColumns from "./MemberColum";
import { ROW_PER_PAGE } from "../../config/constants";
import { useMembers } from "../../api/members/get-members";
import { useState } from "react";

export const MemberTable = () => {
  const columns = useMemberColumns();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { data: members, isLoading } = useMembers({
    page,
    keyword,
    size: ROW_PER_PAGE,
  });


  console.log(members, isLoading);

  return (
    <>
      <Table
        columns={columns}
        dataSource={[]}
        size="middle"
        pagination={{
          current: 1,
          pageSize: 8,
          total: 0,
        }}
        loading={false}
        title={() => (
          <Flex justify="space-between">
            <Input.Search
              placeholder="Search employee..."
              className="w-[250px]"
              allowClear
              onSearch={(value) => {
                setKeyword(value);
                setPage(1);
              }}
            />
            <Button icon={<ExportOutlined />}>
              Export<Tag color="blue">Coming Soon</Tag>
            </Button>
          </Flex>
        )}
      />
    </>
  );
};
