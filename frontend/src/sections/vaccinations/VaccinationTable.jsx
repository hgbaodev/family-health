import { ExportOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Select, Space, Table, Tag } from "antd";
import useVaccinationColumns from "./VaccinationColumn";
import { ROW_PER_PAGE } from "../../config/constants";
import { useVaccinations } from "~/api/vaccinations/get-vaccination";
import { useMembersByUser } from "~/api/members/get-members";
import { useTable } from "~/hooks/useTable";

const { Option } = Select;

export const VaccinationTable = () => {
  const columns = useVaccinationColumns();
  const { data: members } = useMembersByUser();

  const {
    data,
    isLoading,
    pagination,
    setKeyword,
    setFilters,
  } = useTable(useVaccinations, ROW_PER_PAGE, columns, { memberId: "" });

  return (
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      rowKey={(record) => record.id}
      pagination={pagination}
      loading={isLoading}
      scroll={{ x: "max-content" }}
      title={() => (
        <Flex justify="space-between">
          <Space>
            <Input.Search
              placeholder="Search vaccination..."
              className="w-[250px]"
              allowClear
              onSearch={setKeyword}
            />
            <Select
              className="w-[250px]"
              placeholder="Select member..."
              onChange={(value) => setFilters({ memberId: value })}
            >
              <Option value="">All Members</Option>
              {members?.map((member) => (
                <Option key={member.id} value={member.id}>
                  {member.fullName}
                </Option>
              ))}
            </Select>
          </Space>
          <Button icon={<ExportOutlined />}>
            Export <Tag color="blue">Coming Soon</Tag>
          </Button>
        </Flex>
      )}
    />
  );
};
