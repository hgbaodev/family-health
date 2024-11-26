import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Table, Tag } from "antd";
import useMedicalRecordColumn from "./MedialRecordColumns";
import { useTable } from "~/hooks/useTable";
import { ROW_PER_PAGE } from "../../config/constants";
import { useMembersByUser } from "~/api/members/get-members";
import { useMedicalRecords } from "~/api/medical-records/get-medical-records";

const { Option } = Select;

export const MedicalRecordTable = () => {
  const columns = useMedicalRecordColumn();
  const { data: members } = useMembersByUser();

  const {
    data: medicalRecords,
    isLoading,
    pagination,
    setKeyword,
    setFilters
  } = useTable(useMedicalRecords, ROW_PER_PAGE, columns);

  return (
    <Table
      columns={columns}
      dataSource={medicalRecords}
      size="small"
      rowKey={(record) => record.id}
      pagination={pagination}
      loading={isLoading}
      scroll={{ x: "max-content" }}
      title={() => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
        </div>
      )}
    />
  );
};
