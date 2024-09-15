import { Descriptions, Drawer } from "antd";

const LecturerDetailDrawer = ({ record, open, onClose }) => {
  const items = [
    {
      key: "1",
      label: "Mã giảng viên",
      children: record?.code,
    },
    {
      key: "2",
      label: "Họ tên",
      children: record?.fullname,
    },
    {
      key: "3",
      label: "Năm sinh",
      children: record?.birthyear,
    },
    {
      key: "4",
      label: "Học hàm / Học vị",
      children: record?.academic_title,
    },
    {
      key: "5",
      label: "Email",
      children: record?.email,
    },
    {
      key: "6",
      label: "Số điện thoại",
      children: record?.phone,
    },
    {
      key: "7",
      label: "Đơn vị công tác",
      children: record?.work_unit,
    },
    {
      key: "8",
      label: "Loại giảng viên",
      children: record?.type,
    },
  ];
  return (
    <Drawer
      title="Thông tin giảng viên"
      onClose={onClose}
      open={open}
      destroyOnClose
    >
      <Descriptions items={items} column={1} layout="vertical" />
    </Drawer>
  );
};

export default LecturerDetailDrawer;
