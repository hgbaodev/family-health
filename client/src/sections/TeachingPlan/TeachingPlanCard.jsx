import {
  App,
  Button,
  Card,
  Dropdown,
  Empty,
  List,
  Space,
  Tag,
  Tooltip,
} from "antd";
import { useBoolean } from "~/hooks/useBoolean";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  MoreOutlined,
  ControlOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import DeletePopconfirm from "~/components/DeletePopconfirm";
import { dispatch } from "~/store";
import {
  deleteProgramAssignment,
  deleteTeachingPlan,
  exportTeachingPlan,
} from "~/store/slices/TeachingPlanSlice";
import { useNavigate } from "react-router-dom";
import CreateTeachingPlanModal from "~/sections/TeachingPlan/CreateTeachingPlanModal";
import { saveAs } from "file-saver";

const TeachingPlanCard = ({ id, title, isHighQuality, plans = [] }) => {
  const {
    value: open,
    setFalse: setCloseModal,
    setTrue: setOpenModal,
  } = useBoolean();

  const handleExport = () => {
    dispatch(exportTeachingPlan(id)).then((response) => {
      const blob = new Blob([response.payload], {
        type: "application/octet-stream",
      });
      saveAs(blob, "ke-hoach-giang-day.xlsx");
    });
  };

  return (
    <>
      <Card
        title={
          <Space>
            <span>Ngành {title}</span>
            {isHighQuality == 1 && <Tag color="blue">Chất lượng cao</Tag>}
          </Space>
        }
        type="inner"
        extra={
          <Space>
            <Tooltip title="Tạo học kỳ" placement="top">
              <Button
                size="small"
                icon={<PlusOutlined />}
                onClick={setOpenModal}
              />
            </Tooltip>
            <Tooltip title="Xuất excel" placement="top">
              <Button
                size="small"
                icon={<FileExcelOutlined />}
                onClick={handleExport}
              />
            </Tooltip>
            <DeletePopconfirm
              title="Bạn có chắc chắn muốn xoá kế hoạch này không ?"
              description="Tất cả dữ liệu liên quan sẽ bị xoá và không thể hoàn tác !"
              placement="topRight"
              onConfirm={() => dispatch(deleteProgramAssignment(id))}
            />
          </Space>
        }
      >
        {plans?.length != 0 ? (
          <List
            dataSource={plans}
            renderItem={(item) => (
              <TeachingPlanItem id={item.id} semester={item.semester} />
            )}
          />
        ) : (
          <Empty description="Chưa có kế hoạch giảng dạy" />
        )}
      </Card>
      <CreateTeachingPlanModal
        programAssignmentId={id}
        open={open}
        onCancel={setCloseModal}
      />
    </>
  );
};

const TeachingPlanItem = ({ id, semester }) => {
  const { modal } = App.useApp();
  const navigate = useNavigate();
  const handleDelete = async () => {
    await dispatch(deleteTeachingPlan(id)).unwrap();
  };

  const items = [
    {
      label: "Phân công",
      icon: <ControlOutlined />,
      onClick: () => navigate(`/teaching-plans/${id}/assign`),
    },
    { label: "Chỉnh sửa", icon: <EditOutlined /> },
    {
      label: "Xóa kế hoạch",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => {
        modal.confirm({
          title: "Bạn có chắc chắn muốn xoá kế hoạch này không ?",
          icon: <ExclamationCircleFilled />,
          okText: "Đồng ý",
          okType: "danger",
          okButtonProps: { type: "primary" },
          cancelText: "Hủy",
          content:
            "Kế hoạch này và tất cả dữ liệu liên quan sẽ bị xoá khỏi hệ thống và không thể khôi phục lại được.",
          onOk() {
            return handleDelete();
          },
        });
      },
    },
  ];

  return (
    <List.Item
      actions={[
        <Tooltip key={1} title="Xem chi tiết" placement="top">
          <Button
            type="text"
            size="small"
            shape="circle"
            onClick={() => navigate(`/teaching-plans/${id}`)}
            icon={<EyeOutlined />}
          />
        </Tooltip>,
        <Dropdown
          key={2}
          menu={{
            items,
            onClick: (e) => e.domEvent.stopPropagation(),
          }}
          placement="bottomRight"
          trigger={["click"]}
          onClick={(e) => e.stopPropagation()}
          arrow
        >
          <Button
            type="text"
            size="small"
            shape="circle"
            icon={<MoreOutlined />}
          />
        </Dropdown>,
      ]}
    >
      {`Học kỳ ${semester}`}
    </List.Item>
  );
};

export default TeachingPlanCard;
