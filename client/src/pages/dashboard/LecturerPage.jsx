import { Button, Space, Table, Input, Flex } from "antd";
import {
  PlusSquareOutlined,
  EditOutlined,
  ImportOutlined,
  ExportOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import HeaderBreadcrumbs from "~/components/HeaderBreadcrumbs";
import DeletePopconfirm from "~/components/DeletePopconfirm";
import { useBoolean } from "~/hooks/useBoolean";
import { useTable } from "~/hooks/useTable";
import { deleteLecturer, fetchLecturers } from "~/store/slices/LecturerSlice";
import CreateLecturerDialog from "~/sections/Lecturer/CreateLecturerDialog";
import { LECTURER_TYPES } from "~/constants/lecturerTypes";
import UpdateLecturerDialog from "~/sections/Lecturer/UpdateLecturerDialog";
import LecturerDetailDrawer from "~/sections/Lecturer/LecturerDetailDrawer";
const { Column } = Table;

const LecturerPage = () => {
  const dispatch = useDispatch();
  const { items, loadingFetch, pagination } = useSelector(
    (state) => state.lecturer
  );
  const {
    value: openCreate,
    setFalse: closeCreate,
    setTrue: openCreateModal,
  } = useBoolean();
  const {
    value: openUpdate,
    setFalse: closeUpdate,
    setTrue: openUpdateModal,
  } = useBoolean();

  const {
    value: openDetail,
    setFalse: closeDetail,
    setTrue: openDetailDrawer,
  } = useBoolean();

  const [record, setRecord] = useState(null);

  const { tableParams, handleSearchChange, handleTableChange } =
    useTable(fetchLecturers);

  const handleUpdate = (record) => {
    setRecord(record);
    openUpdateModal();
  };

  const handleDetail = (record) => {
    setRecord(record);
    openDetailDrawer();
  };

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-5">
        <HeaderBreadcrumbs
          heading="Quản lý giảng viên"
          links={[{ title: "Home", href: "/" }, { title: "Giảng viên" }]}
        />
        <Space>
          <Button icon={<ImportOutlined />}>Import</Button>
          <Button
            type="primary"
            icon={<PlusSquareOutlined />}
            onClick={openCreateModal}
          >
            Thêm mới
          </Button>
        </Space>
      </Flex>
      <Table
        dataSource={items}
        rowKey="id"
        loading={loadingFetch}
        pagination={{
          current: tableParams.page,
          pageSize: tableParams.perPage,
          total: pagination.total,
        }}
        onChange={handleTableChange}
        scroll={{
          x: true,
        }}
        size="middle"
        title={() => (
          <Flex justify="space-between">
            <Input.Search
              placeholder="Tìm kiếm giảng viên"
              onChange={handleSearchChange}
              className="w-[250px]"
              allowClear
            />
            <Button icon={<ExportOutlined />}>Export</Button>
          </Flex>
        )}
      >
        <Column title="ID" dataIndex="id" key="id" width={60} align="center" sorter />
        <Column title="Mã CB" dataIndex="code" key="code" sorter />
        <Column title="Tên GV" dataIndex="fullname" key="fullname" sorter />
        <Column
          title="Học vị"
          dataIndex="academic_title"
          key="academic_title"
        />
        <Column title="Năm sinh" dataIndex="birthyear" key="birthyear" sorter />
        <Column title="Đơn vị" dataIndex="work_unit" key="work_unit" />
        <Column
          title="Loại GV"
          dataIndex="type"
          key="type"
          filters={LECTURER_TYPES.map((type) => ({
            text: type.label,
            value: type.value,
          }))}
        />
        <Column
          title="Thao tác"
          key="action"
          fixed="right"
          render={(text, record) => (
            <Space>
              <Button
                size="small"
                icon={<EyeOutlined />}
                onClick={() => handleDetail(record)}
              />
              <Button
                icon={<EditOutlined />}
                onClick={() => handleUpdate(record)}
                size="small"
              />
              <DeletePopconfirm
                title="Xoá giảng viên"
                description="Bạn có chắc chắn muốn xoá giảng viên này ?"
                placement="topRight"
                onConfirm={() => dispatch(deleteLecturer(record.id))}
              />
            </Space>
          )}
        />
      </Table>
      <CreateLecturerDialog open={openCreate} onCancel={closeCreate} />
      <UpdateLecturerDialog
        record={record}
        open={openUpdate}
        onCancel={closeUpdate}
      />
      <LecturerDetailDrawer
        record={record}
        open={openDetail}
        onClose={closeDetail}
      />
    </>
  );
};

export default LecturerPage;
