import { Button, Flex, Table } from "antd";
import { useNavigate } from "react-router-dom";
import HeaderBreadcrumbs from "~/components/HeaderBreadcrumbs";
import { FormOutlined } from "@ant-design/icons";
import { getTeachingPlanTitle } from "~/utils/getTeachingPlanTitle";
import { useSelector } from "react-redux";
import TeachingAsssignmentSection from "~/sections/TeachingAssignment/TeachingAsssignmentSection";

const AssignmentTeachingPlanPage = () => {
  const { data } = useSelector((state) => state.teachingAssignment);
  const { id, semester, program_assignment, subject_teaching_plans } = data;
  const { majors, school_year } = program_assignment;

  const navigate = useNavigate();
  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        className="mb-5"
        gap={20}
        wrap
      >
        <HeaderBreadcrumbs
          heading={`Phân công giảng dạy học kì ${semester} năm ${school_year.start_year} - ${school_year.end_year}`}
          links={[
            { title: "Home", href: "/" },
            { title: "Kế hoạch giảng dạy", href: "/teaching-plans" },
            { title: "Phân công" },
          ]}
        />
        <Button
          type="primary"
          icon={<FormOutlined />}
          onClick={() => navigate(`/teaching-plans/${id}`)}
        >
          Chỉnh sửa kế hoạch
        </Button>
      </Flex>
      <Table
        dataSource={subject_teaching_plans}
        expandable={{
          expandedRowRender: (record) => {
            const { assignments, registrations, subject, id, group_counts } =
              record;
            return (
              <TeachingAsssignmentSection
                assignments={assignments}
                registrations={registrations}
                subject={subject}
                subjectTeachingPlanId={id}
                groupCounts={group_counts}
              />
            );
          },
          indentSize: 0,
        }}
        title={() => `Ngành ${getTeachingPlanTitle(majors)}`}
        rowKey={(record) => record.id}
        pagination={false}
        rootClassName="table-assignment"
        size="middle"
      >
        <Table.Column
          title="STT"
          width={70}
          align="center"
          render={(text, record, index) => index + 1}
        />
        <Table.Column
          title="Mã HP"
          dataIndex={["subject", "code"]}
          key="subject_code"
        />
        <Table.Column
          title="Tên HP"
          dataIndex={["subject", "name"]}
          key="subject_name"
        />
        <Table.Column
          title="Số TC"
          dataIndex={["subject", "credits"]}
          key="subject_credits"
          align="center"
        />
        <Table.Column
          title="Tiết LT"
          dataIndex={["subject", "theory_hours"]}
          key="subject_theory_hours"
          align="center"
        />
        <Table.Column
          title="Tiết TH"
          dataIndex={["subject", "lab_hours"]}
          key="subject_lab_hours"
          align="center"
        />
        <Table.Column
          title="Tiết BT"
          dataIndex={["subject", "exercise_hours"]}
          key="subject_exercise_hours"
          align="center"
        />
        <Table.Column
          title="Hệ số"
          dataIndex={["subject", "coefficient"]}
          key="subject_exercise_hours"
          align="center"
        />
        <Table.Column
          title="Khoá"
          dataIndex="applies_to_course"
          key="applies_to_course"
          align="center"
        />
        <Table.Column
          title="Số nhóm"
          dataIndex="group_counts"
          key="group_counts"
          align="center"
        />
        <Table.Column
          title="SV/LT"
          dataIndex="theory_group_student_count"
          key="theory_group_student_count"
          align="center"
        />
        <Table.Column
          title="SV/TH"
          dataIndex="lab_group_student_count"
          key="theory_group_student_count"
          align="center"
        />
      </Table>
    </>
  );
};

export default AssignmentTeachingPlanPage;
