import { Button, Card, Col, Empty, Flex, Row, Space } from "antd";
import HeaderBreadcrumbs from "~/components/HeaderBreadcrumbs";
import { PlusOutlined, PlusSquareOutlined } from "@ant-design/icons";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useBoolean } from "~/hooks/useBoolean";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { dispatch } from "~/store";
import {
  fetchSchoolYear,
  fetchSchoolYears,
  setSelectedSchoolYear,
} from "~/store/slices/TeachingPlanSlice";
import Loader from "~/components/Loader";
import SchoolYearItem from "~/sections/TeachingPlan/YearItem";
import CreateSchoolYearModal from "~/sections/TeachingPlan/CreateSchoolYearModal";
import TeachingPlanCard from "~/sections/TeachingPlan/TeachingPlanCard";
import CreateProgramAssignmentModal from "~/sections/TeachingPlan/CreateProgramAssignmentModal";
import { getTeachingPlanTitle } from "~/utils/getTeachingPlanTitle";

const TeachingPlanPage = () => {
  const {
    value: openSchoolYear,
    setFalse: setCloseSchoolYear,
    setTrue: setOpenSchoolYear,
  } = useBoolean();

  const { items, loadingFetch, selectedSchoolYear } = useSelector(
    (state) => state.teachingPlan
  );

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchSchoolYears());
    }
  }, [items]);

  return (
    <>
      <HeaderBreadcrumbs
        heading="Kế hoạch giảng dạy"
        links={[{ title: "Home", href: "/" }, { title: "Kế hoạch giảng dạy" }]}
        className="mb-5"
      />
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card
            title="Năm học"
            extra={
              <Button
                type="primary"
                size="small"
                onClick={setOpenSchoolYear}
                icon={<PlusOutlined />}
              />
            }
          >
            <SimpleBar
              forceVisible="y"
              autoHide={true}
              className="h-[calc(67vh_-_35px)] overflow-auto"
            >
              {loadingFetch ? (
                <Loader />
              ) : items.length > 0 ? (
                items.map((item) => (
                  <SchoolYearItem
                    key={item.id}
                    id={item.id}
                    startYear={item.start_year}
                    endYear={item.end_year}
                    active={selectedSchoolYear?.id === item.id}
                    onClick={() => dispatch(setSelectedSchoolYear(item))}
                  />
                ))
              ) : (
                <Empty />
              )}
            </SimpleBar>
          </Card>
        </Col>
        <Col span={18}>
          <MainContent selectedItem={selectedSchoolYear} />
        </Col>
      </Row>
      <CreateSchoolYearModal
        open={openSchoolYear}
        onCancel={setCloseSchoolYear}
      />
    </>
  );
};

const MainContent = ({ selectedItem }) => {
  const {
    value: openSemester,
    setTrue: setOpenSemester,
    setFalse: setCloseSemester,
  } = useBoolean();
  const { programAssignments, loadingFetchDetails } = useSelector(
    (state) => state.teachingPlan
  );

  console.log(programAssignments);

  useEffect(() => {
    if (selectedItem) {
      dispatch(fetchSchoolYear(selectedItem.id));
    }
  }, [selectedItem]);

  if (loadingFetchDetails)
    return (
      <Card>
        <Loader height={500} />
      </Card>
    );

  if (!selectedItem)
    return (
      <Card className="h-[570px] flex items-center justify-center">
        <Empty description="Chọn năm học để xem" />
      </Card>
    );

  return (
    <>
      <Card>
        <Flex className="mb-4" align="center" justify="space-between" gap={10}>
          <h3 className="text-base font-bold">{`Năm học ${selectedItem?.start_year} - ${selectedItem?.end_year}`}</h3>
          <Space>
            <Button
              type="primary"
              icon={<PlusSquareOutlined />}
              onClick={setOpenSemester}
            >
              Tạo kế hoạch cho ngành
            </Button>
          </Space>
        </Flex>
        <Space direction="vertical" className="w-full">
          {programAssignments && programAssignments.length > 0 ? (
            programAssignments.map((program) => (
              <TeachingPlanCard
                key={program.id}
                id={program.id}
                title={getTeachingPlanTitle(program.majors)}
                isHighQuality={program.is_high_quality}
                plans={program.teaching_plans}
              />
            ))
          ) : (
            <Flex justify="center" align="center" className="h-[465px]">
              <Empty description="Chưa có kế hoạch" />
            </Flex>
          )}
        </Space>
      </Card>
      <CreateProgramAssignmentModal
        schoolYearId={selectedItem.id}
        open={openSemester}
        onCancel={setCloseSemester}
      />
    </>
  );
};

export default TeachingPlanPage;
