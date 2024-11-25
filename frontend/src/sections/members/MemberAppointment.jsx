import { Col, Flex, Input, Row, Space, Table } from "antd";
import { useAppointments } from "~/api/appointments/get-appointment";
import { ROW_PER_PAGE } from "~/config/constants";
import { useTable } from "~/hooks/useTable";
import useVaccinationColumns from "~/sections/vaccinations/VaccinationColumn";
import { useMembersStore } from "~/stores/memberStore";

const MemberAppointment = () => {
  const columns = useVaccinationColumns();
  const { memberDetail } = useMembersStore((state) => state);

  const {
    data,
    isLoading,
    pagination,
    setKeyword,
  } = useTable(useAppointments, ROW_PER_PAGE, columns, { memberId: memberDetail?.id });
  return (
    <Row>
      <Col span={24}>
        <Flex vertical>
          <h2 className="text-lg font-bold text-primary">Cuộc hẹn</h2>
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
                </Space>
              </Flex>
            )}
          />
        </Flex>
      </Col>
    </Row>
  );
};

export default MemberAppointment;
