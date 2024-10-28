import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useMedicalRecordColumn from "./MedialRecordColumns";
import { useMembers } from "~/api/members/get-members";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useMedicalRecords } from "~/api/medicalRecords/get-medical-records";

export const MedicalRecordTable = () => {
  const columns = useMedicalRecordColumn();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { data: medicalRecords, isLoading } = useMedicalRecords({
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
  if (medicalRecords !== undefined) {
    dataSource = medicalRecords.map(medicalRecord => ({
      ...medicalRecord,
      memberName: memberMap[medicalRecord.memberID] || "",
    }));
  }
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        size="middle"
        rowKey={(record) => record.recordID}
        pagination={{
          current: page,
          pageSize: ROW_PER_PAGE,
          total: medicalRecords?.length || 0,
          onChange: (newPage) => setPage(newPage),
        }}
        loading={isLoading}
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
