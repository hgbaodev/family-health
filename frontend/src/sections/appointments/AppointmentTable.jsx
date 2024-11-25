import { ExportOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Space, Table, Tag } from "antd";
import useAppointmentColumns from "./AppointmentColumn";
import { ROW_PER_PAGE } from "../../config/constants";
import { useAppointments } from "~/api/appointments/get-appointment";
import { useTable } from "~/hooks/useTable";

export const AppointmentTable = () => {
  const columns = useAppointmentColumns();

  const {
    data,
    isLoading,
    pagination,
    setKeyword,
  } = useTable(useAppointments, ROW_PER_PAGE, columns);

  return (
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      rowKey={(record) => record.id}
      pagination={pagination}
      scroll={{ x: "max-content" }}
      loading={isLoading}
      title={() => (
        <Flex justify="space-between">
          <Space size={"middle"}>
            <Input.Search
              placeholder="Search appointment..."
              className="w-[250px]"
              allowClear
              onSearch={setKeyword}
            />
          </Space>
          <Button icon={<ExportOutlined />}>
            Export <Tag color="blue">Coming Soon</Tag>
          </Button>
        </Flex>
      )}
    />
  );
};
