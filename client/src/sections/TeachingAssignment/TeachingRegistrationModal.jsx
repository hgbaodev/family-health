import { App, Descriptions, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { dispatch } from "~/store";
import { createTeachingAssignment } from "~/store/slices/TeachingAssignmentSlice";

const TeachingRegistrationModal = ({
  subject,
  registrations,
  assignments,
  open,
  onCancel,
}) => {
  const [initialSelectedRowKeys, setInitialSelectedRowKeys] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const items = [
    {
      key: "1",
      label: "Mã HP",
      children: subject?.code,
    },
    {
      key: "2",
      label: "Tên HP",
      children: subject?.name,
      span: 3,
    },
    {
      key: "3",
      label: "Số TC",
      children: subject?.credits,
    },
    {
      key: "4",
      label: "Số tiết LT",
      children: subject?.theory_hours,
    },
    {
      key: "5",
      label: "Số tiết BT",
      children: subject?.exercise_hours,
    },
    {
      key: "6",
      label: "Số tiết TH",
      children: subject?.lab_hours,
    },
  ];

  useEffect(() => {
    const initialKeys = assignments.map((item) => item.lecturer_id);
    setInitialSelectedRowKeys(initialKeys);
    setSelectedRowKeys(initialKeys);
  }, [assignments]);

  const handleSave = async () => {
    const newKeys = selectedRowKeys.filter((item) => {
      return !initialSelectedRowKeys.includes(item);
    });

    const newAssignments = registrations
      .filter((item) => {
        return newKeys.includes(item.lecturer_id);
      })
      .map((item) => ({
        subject_teaching_plan_id: item.subject_teaching_plan_id,
        lecturer_id: item.lecturer_id,
        theory_group_count: item.theory_group_count,
        lab_group_count: item.lab_group_count,
        exercise_group_count: item.exercise_group_count,
      }));

    if (newAssignments.length === 0) {
      message.error("Vui lòng chọn giảng viên để phân công !");
      return;
    }

    try {
      setLoading(true);
      await dispatch(createTeachingAssignment(newAssignments)).unwrap();
      message.success("Phân công giảng dạy thành công !");
      onCancel();
    } catch (error) {
      console.log(error);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys: selectedRowKeys,
    getCheckboxProps: (record) => ({
      disabled: initialSelectedRowKeys.includes(record.lecturer_id),
    }),
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      width={900}
      title="Danh sách đăng ký giảng dạy"
      onOk={handleSave}
      confirmLoading={loading}
    >
      <Descriptions column={4} items={items} />
      <Table
        size="middle"
        dataSource={registrations}
        rowKey={(record) => record.lecturer_id}
        rowSelection={rowSelection}
        pagination={false}
        scroll={{
          y: 300,
        }}
      >
        <Table.Column
          title="STT"
          width={50}
          align="center"
          render={(text, record, index) => index + 1}
        />
        <Table.Column
          title="Mã CB"
          width={90}
          dataIndex={["lecturer", "code"]}
          key="code"
        />
        <Table.Column
          title="Tên CB"
          width={255}
          dataIndex={["lecturer", "fullname"]}
          key="fullname"
        />
        <Table.Column
          title="Số nhóm LT"
          dataIndex="theory_group_count"
          key="theory_group_count"
          render={(text) => text ?? "N/A"}
          align="center"
        />
        <Table.Column
          title="Số nhóm TH"
          dataIndex="lab_group_count"
          key="lab_group_count"
          render={(text) => text ?? "N/A"}
          align="center"
        />
        <Table.Column
          title="Số nhóm BT"
          dataIndex="exercise_group_count"
          key="exercise_group_count"
          render={(text) => text ?? "N/A"}
          align="center"
        />
      </Table>
    </Modal>
  );
};

export default TeachingRegistrationModal;
