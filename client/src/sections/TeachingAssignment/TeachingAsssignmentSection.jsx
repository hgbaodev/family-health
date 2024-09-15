import { App, Button, Card, Space, Table } from "antd";
import { useBoolean } from "~/hooks/useBoolean";
import { ProductOutlined, EditOutlined } from "@ant-design/icons";
import CreateAssignment from "~/sections/TeachingAssignment/CreateAssignment";
import { calcHours } from "~/utils/calcHours";
import DeletePopconfirm from "~/components/DeletePopconfirm";
import { dispatch } from "~/store";
import { deleteTeachingAssignment } from "~/store/slices/TeachingAssignmentSlice";
import TeachingRegistrationModal from "~/sections/TeachingAssignment/TeachingRegistrationModal";

const TeachingAsssignmentSection = ({
  subjectTeachingPlanId,
  assignments,
  registrations,
  subject,
  groupCounts,
}) => {
  const { message } = App.useApp();
  const {
    value: open,
    setFalse: closeModal,
    setTrue: openModal,
  } = useBoolean();

  return (
    <Card
      title="Danh sách giảng viên được phân công"
      extra={
        <Button icon={<ProductOutlined />} onClick={openModal}>
          Danh sách đăng ký
        </Button>
      }
      type="inner"
    >
      <Table
        size="middle"
        title={() => (
          <CreateAssignment
            subjectTeachingPlanId={subjectTeachingPlanId}
            subject={subject}
            groupCounts={groupCounts}
          />
        )}
        dataSource={assignments}
        rowKey={(record) => record.id}
        pagination={false}
        scroll={{
          x: true,
          y: 250,
        }}
      >
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
        <Table.Column
          title="Số tiết thực hiện"
          render={(text, record) => calcHours(record, subject)}
          align="center"
        />
        <Table.Column
          title="Số tiết thực tế"
          render={(text, record) => {
            const { coefficient } = subject;
            return calcHours(record, subject) * coefficient;
          }}
          align="center"
        />
        <Table.Column
          title="Thao tác"
          align="center"
          width={100}
          render={(text, record) => (
            <Space>
              <Button
                size="small"
                icon={<EditOutlined />}
                onClick={() => {
                  console.log(record);
                }}
              />
              <DeletePopconfirm
                title="Xoá phân công"
                description="Bạn có chắc chắn muốn xoá phân công này ?"
                placement="topRight"
                onConfirm={async () => {
                  await dispatch(deleteTeachingAssignment(record.id));
                  message.success("Xoá phân công thành công");
                }}
              />
            </Space>
          )}
        />
      </Table>
      <TeachingRegistrationModal
        subject={subject}
        registrations={registrations}
        assignments={assignments}
        open={open}
        onCancel={closeModal}
      />
    </Card>
  );
};

export default TeachingAsssignmentSection;
