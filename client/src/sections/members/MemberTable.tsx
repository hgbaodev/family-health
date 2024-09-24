import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Button, Flex, Input, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table"; // Import the correct type for columns
import { useMemo } from "react";

interface Member {
  id: string;
  name: string;
  username: string;
  email: string;
}

export const MemberTable = () => {

  const columns: ColumnsType<Member> = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        align: "center", // align is now correctly typed
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Action",
        key: "action",
        render: () => (
          <Space>
            <Button
              icon={<EditOutlined />}
            />
            <Button
              icon={<DeleteOutlined />}
            />
          </Space>
        ),
      },
    ],
    []
  );

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
