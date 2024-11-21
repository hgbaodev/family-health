import { ExportOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Space, Table, Tag } from "antd";
import useAppointmentColumns from "./AppointmentColumn";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useAppointments } from "~/api/appointments/get-appointment";

export const AppointmentTable = () => {
  const columns = useAppointmentColumns();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(ROW_PER_PAGE);
  const [keyword, setKeyword] = useState("");

  const { data, isLoading } = useAppointments({
    page,
    size: pageSize,
    keyword
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
        scroll={{ x: 'max-content' }}
        loading={isLoading}
        title={() => (
          <Flex justify="space-between">
            <Space size={"middle"}>
              <Input.Search
                placeholder="Search employee..."
                className="w-[250px]"
                allowClear
                onSearch={(value) => {
                  setKeyword(value);
                  setPage(1);
                }}
              />
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
