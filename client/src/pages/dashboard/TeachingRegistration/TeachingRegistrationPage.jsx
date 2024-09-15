import { App, Button, Card, Col, Row, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { useBoolean } from "~/hooks/useBoolean";
import { dispatch } from "~/store";
import {
  deleteTeachingRegistration,
  getSubjectRegistered,
} from "~/store/slices/TeachingRegistrationSlice";
import { getTeachingPlanTitle } from "~/utils/getTeachingPlanTitle";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CreateRegistrationModal from "~/sections/TeachingRegistration/CreateRegistrationModal";
import UpdateRegistrationModal from "~/sections/TeachingRegistration/UpdateRegistrationModal";

const TeachingRegistrationPage = () => {
  const { message } = App.useApp();
  const data = useLoaderData();
  const {
    value: createModalOpen,
    setTrue: openCreateModal,
    setFalse: closeCreateModal,
  } = useBoolean();
  const {
    value: updateModalOpen,
    setTrue: openUpdateModal,
    setFalse: closeUpdateModal,
  } = useBoolean();
  const { registered } = useSelector((state) => state.teachingRegistration);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowEdit, setSelectedRowEdit] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { semester, subjects, program_assignment } = data;
  const { majors, school_year } = program_assignment;

  useEffect(() => {
    dispatch(getSubjectRegistered(data.id));
  }, [data]);

  useEffect(() => {
    setSelectedRowKeys(registered.map((item) => item.subject_id));
  }, [registered]);

  const handleSelect = async (record, selected) => {
    if (selected) {
      setSelectedRow(record);
      openCreateModal();
    } else {
      const id = registered.find((item) => item.subject_id === record.id).id;
      await dispatch(deleteTeachingRegistration(id));
      message.success("Huỷ đăng ký thành công");
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onSelect: handleSelect,
    columnTitle: "#",
    hideSelectAll: true,
  };

  const renderActionColumn = (text, record) => (
    <Space>
      <Button
        size="small"
        onClick={() => {
          setSelectedRowEdit(record);
          openUpdateModal();
        }}
        icon={<EditOutlined />}
      />
      <Button
        size="small"
        onClick={async () => {
          await dispatch(deleteTeachingRegistration(record.id));
          message.success("Huỷ đăng ký thành công");
        }}
        icon={<DeleteOutlined />}
        danger
      />
    </Space>
  );

  const renderTotalHours = (text, record) =>
    (record.theory_group_count * record.theory_hours +
      record.lab_group_count * record.lab_hours +
      record.exercise_group_count * record.exercise_hours) *
    record.coefficient;

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title={`Ngành ${getTeachingPlanTitle(
              majors
            )} - Học kỳ ${semester} - Năm học ${school_year.start_year} - ${
              school_year.end_year
            }`}
          >
            <Table
              dataSource={subjects}
              rowSelection={rowSelection}
              scroll={{ x: true, y: 280 }}
              pagination={false}
              size="middle"
              rowKey={(record) => record.id}
              bordered
            >
              <Table.Column
                title="Mã HP"
                dataIndex="code"
                align="center"
                width={100}
              />
              <Table.Column title="Tên HP" dataIndex="name" width={370} />
              <Table.Column title="Số TC" dataIndex="credits" align="center" />
              <Table.Column
                title="Số tiết LT"
                dataIndex="theory_hours"
                align="center"
              />
              <Table.Column
                title="Số tiết BT"
                dataIndex="exercise_hours"
                align="center"
              />
              <Table.Column
                title="Số tiết TH"
                dataIndex="lab_hours"
                align="center"
              />
              <Table.Column
                title="Khoá"
                dataIndex={["pivot", "applies_to_course"]}
                align="center"
              />
              <Table.Column
                title="Số nhóm"
                dataIndex={["pivot", "group_counts"]}
                align="center"
              />
              <Table.Column
                title="Số SV / LT"
                dataIndex={["pivot", "theory_group_student_count"]}
                align="center"
              />
              <Table.Column
                title="Số SV / TH"
                dataIndex={["pivot", "lab_group_student_count"]}
                align="center"
              />
            </Table>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Danh sách đã đăng ký">
            <Table
              dataSource={registered}
              size="middle"
              rowKey={(record) => record.id}
              pagination={false}
            >
              <Table.Column title="Mã MH" dataIndex="code" />
              <Table.Column title="Tên MH" dataIndex="name" />
              <Table.Column title="Số TC" dataIndex="credits" align="center" />
              <Table.Column
                title="Số nhóm LT"
                dataIndex="theory_group_count"
                render={(text) => text ?? "N/A"}
                align="center"
              />
              <Table.Column
                title="Số nhóm TH"
                dataIndex="lab_group_count"
                render={(text) => text ?? "N/A"}
                align="center"
              />
              <Table.Column
                title="Số nhóm BT"
                dataIndex="exercise_group_count"
                render={(text) => text ?? "N/A"}
                align="center"
              />
              <Table.Column
                title="Hệ số"
                dataIndex="coefficient"
                align="center"
              />
              <Table.Column
                title="Tổng số tiết"
                dataIndex="lab_group_student_count"
                align="center"
                render={renderTotalHours}
              />
              <Table.Column title="Thao tác" render={renderActionColumn} />
            </Table>
          </Card>
        </Col>
      </Row>
      <CreateRegistrationModal
        selectedRow={selectedRow}
        open={createModalOpen}
        closeModal={closeCreateModal}
      />
      <UpdateRegistrationModal
        selectedRow={selectedRowEdit}
        open={updateModalOpen}
        closeModal={closeUpdateModal}
      />
    </>
  );
};

export default TeachingRegistrationPage;
