import { App, Button, Dropdown, Flex } from "antd";
import { dispatch } from "~/store";
import { deleteSchoolYear } from "~/store/slices/TeachingPlanSlice";
import {
  CopyOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

const SchoolYearItem = ({ id, startYear, endYear, onClick, active }) => {
  const { modal } = App.useApp();

  const handleDelete = async () => {
    await dispatch(deleteSchoolYear(id)).unwrap();
  };

  const items = [
    { label: "Nhân bản", icon: <CopyOutlined /> },
    { label: "Chỉnh sửa", icon: <EditOutlined /> },
    {
      label: "Xóa năm",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => {
        modal.confirm({
          title: "Bạn có chắc chắn muốn xoá năm học này không ?",
          icon: <ExclamationCircleFilled />,
          okText: "Đồng ý",
          okType: "danger",
          okButtonProps: { type: "primary" },
          cancelText: "Hủy",
          content:
            "Năm học này và tất cả dữ liệu liên quan sẽ bị xoá khỏi hệ thống và không thể khôi phục lại được.",
          onOk() {
            return handleDelete();
          },
        });
      },
    },
  ];

  return (
    <Flex
      align="center"
      justify="space-between"
      className={`py-2 px-3 rounded-md mb-2 cursor-pointer hover:bg-gray-100 ${
        active ? "bg-blue-100" : ""
      }`}
      onClick={onClick}
    >
      <span>{`${startYear} - ${endYear}`}</span>
      <Dropdown
        menu={{ items, onClick: (e) => e.domEvent.stopPropagation() }}
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
      </Dropdown>
    </Flex>
  );
};

export default SchoolYearItem;
