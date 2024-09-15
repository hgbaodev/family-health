import { Button, Space, Table, Input, Flex, App } from "antd";
import { PlusSquareOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import HeaderBreadcrumbs from "~/components/HeaderBreadcrumbs";
import DeletePopconfirm from "~/components/DeletePopconfirm";
import { useBoolean } from "~/hooks/useBoolean";
import { useTable } from "~/hooks/useTable";
import {
  deleteSubject,
  fetchSubjects,
  importSubjects,
} from "~/store/slices/SubjectSlice";
import CreateSubjectDialog from "~/sections/Subject/CreateSubjectDialog";
import UpdateSubjectDialog from "~/sections/Subject/UpdateSubjectDialog";
import { fetchDepartments } from "~/store/slices/DepartmentSlice";
import { dispatch } from "~/store";
const { Column } = Table;

const SubjectPage = () => {
  const { items, loadingFetch, pagination } = useSelector(
    (state) => state.subject
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
  const [record, setRecord] = useState(null);

  const { tableParams, handleSearchChange, handleTableChange } =
    useTable(fetchSubjects);

  const inputRef = useRef(null);
  const { message } = App.useApp();

  const handleUpdate = (record) => {
    setRecord(record);
    openUpdateModal();
  };

  useEffect(() => {
    dispatch(fetchDepartments());
  }, []);

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await dispatch(importSubjects(formData)).unwrap();
        message.success("Import học phần thành công !");
        dispatch(fetchSubjects());
      } catch (error) {
        message.error("Xảy ra lỗi khi import học phần !");
        console.log(error);
      }
    }
  };

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-5">
        <HeaderBreadcrumbs
          heading="Quản lý học phần"
          links={[{ title: "Home", href: "/" }, { title: "Học phần" }]}
        />
        <Button
          type="primary"
          icon={<PlusSquareOutlined />}
          onClick={openCreateModal}
        >
          Thêm mới
        </Button>
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
              placeholder="Tìm kiếm học phần"
              onChange={handleSearchChange}
              className="w-[250px]"
              allowClear
            />
            <Button
              onClick={() => {
                inputRef.current.click();
              }}
            >
              Import
            </Button>
            <input
              type="file"
              ref={inputRef}
              onChange={handleImport}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              hidden
            />
          </Flex>
        )}
      >
        <Column title="ID" dataIndex="id" key="id" align="center" sorter />
        <Column title="Mã HP" dataIndex="code" key="code" sorter />
        <Column title="Tên HP" dataIndex="name" key="name" sorter />
        <Column
          title="Số tín chỉ"
          dataIndex="credits"
          key="credits"
          align="center"
          sorter
        />
        <Column
          title="Số tiết LT"
          dataIndex="theory_hours"
          key="theory_hours"
          align="center"
        />
        <Column
          title="Số tiết TH"
          dataIndex="lab_hours"
          key="lab_hours"
          align="center"
        />
        <Column
          title="Số tiết BT"
          dataIndex="exercise_hours"
          key="exercise_hours"
          align="center"
        />
        <Column
          title="Hệ số"
          dataIndex="coefficient"
          key="coefficient"
          align="center"
        />
        {/* <Column
          title="Bộ môn"
          dataIndex={["department", "name"]}
          key="department"
        /> */}
        <Column
          title="Thao tác"
          key="action"
          width="10%"
          fixed="right"
          render={(text, record) => (
            <Space>
              <Button
                icon={<EditOutlined />}
                type="primary"
                onClick={() => handleUpdate(record)}
                size="small"
              />
              <DeletePopconfirm
                title="Xoá học phần"
                description="Bạn có chắc chắn muốn xoá học phần này ?"
                placement="topRight"
                onConfirm={() => dispatch(deleteSubject(record.id))}
              />
            </Space>
          )}
        />
      </Table>
      <CreateSubjectDialog open={openCreate} onCancel={closeCreate} />
      <UpdateSubjectDialog
        record={record}
        open={openUpdate}
        onCancel={closeUpdate}
      />
    </>
  );
};

export default SubjectPage;
