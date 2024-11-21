import { ExportOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Select, Space, Table, Tag } from "antd";
import useAllergyColumns from "./AllergyColumns";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useAllergies } from "../../api/allergies/get-allergies";
import { useMembersByUser } from "~/api/members/get-members";

const { Option } = Select;  

export const AllergyTable = () => {
  const columns = useAllergyColumns();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(ROW_PER_PAGE);
  const [keyword, setKeyword] = useState("");
  const [memberId, setMemberId] = useState("");

  const { data: members } = useMembersByUser();

  const { data, isLoading } = useAllergies({
    page,
    size: pageSize,
    keyword,
    memberId
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
          <Flex justify="space-between">
            <Space>
              <Input.Search
                placeholder="Search employee..."
                className="w-[250px]"
                allowClear
                onSearch={(value) => {
                  setKeyword(value);
                  setPage(1);
                }}
              />
              <Select className="w-[250px]" placeholder="Select member..." value={memberId} onChange={(e) => setMemberId(e)}>
                <Option value="">All Members</Option>
                {members?.map((member) => (<Option key={member.id} value={member.id}>{member.fullName}</Option>))}
              </Select>
            </Space>
            <Button icon={<ExportOutlined />}>
              Export <Tag color="blue">Coming Soon</Tag>
            </Button>
          </Flex>
        )}
      />
    </>
  );
};
