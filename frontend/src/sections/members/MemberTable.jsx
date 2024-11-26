import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useMemberColumns from "./MemberColumn";
import { ROW_PER_PAGE } from "../../config/constants";
import { useMembers } from "../../api/members/get-members";
import { useTable } from "~/hooks/useTable";
import { useMembersStore } from "~/stores/memberStore";

export const MemberTable = () => {
  const columns = useMemberColumns();
  const  { setMemberDetail } = useMembersStore((state) => state);
  const {
    data,
    isLoading,
    pagination,
    setKeyword,
  } = useTable(useMembers, ROW_PER_PAGE, columns);

  return (
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      rowKey={(record) => record.id}
      pagination={pagination}
      loading={isLoading}
      scroll={{ x: "max-content" }}
      onRow={(record) => {
        return {
          onClick: () => {
            setMemberDetail(record);
          },
        };
      }}
      title={() => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input.Search
            placeholder="Tìm kiếm thành viên..."
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
