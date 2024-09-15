import { Button, Space, Table, Input, Flex } from "antd";
import { PlusSquareOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteMajor, fetchMajors } from "~/store/slices/MajorSlice";
import HeaderBreadcrumbs from "~/components/HeaderBreadcrumbs";
import DeletePopconfirm from "~/components/DeletePopconfirm";
import { useBoolean } from "~/hooks/useBoolean";
import { useTable } from "~/hooks/useTable";
import CreateMajorDialog from "~/sections/Major/CreateMajorDialog";
import UpdateMajorDialog from "~/sections/Major/UpdateMajorDialog";

const MajorPage = () => {
  const dispatch = useDispatch();
  const { items, loadingFetch, pagination } = useSelector(
    (state) => state.major
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
    useTable(fetchMajors);

  const handleUpdate = (record) => {
    setRecord(record);
    openUpdateModal();
  };

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-5">
        <HeaderBreadcrumbs
          heading="Quản lý ngành"
          links={[{ title: "Home", href: "/" }, { title: "Ngành" }]}
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
        title={() => (
          <Input.Search
            placeholder="Tìm kiếm ngành"
            onChange={handleSearchChange}
            className="w-[250px]"
            allowClear
          />
        )}
        size="middle"
      >
        <Table.Column title="ID" dataIndex="id" key="id" sorter />
        <Table.Column title="Mã ngành" dataIndex="code" key="code" sorter />
        <Table.Column title="Tên ngành" dataIndex="name" key="name" sorter />
        <Table.Column
          title="Thao tác"
          key="action"
          width="10%"
          render={(text, record) => (
            <Space>
              <Button
                icon={<EditOutlined />}
                type="primary"
                onClick={() => handleUpdate(record)}
                size="small"
              />
              <DeletePopconfirm
                title="Xoá ngành"
                description="Bạn có chắc chắn muốn xoá ngành này ?"
                placement="topRight"
                onConfirm={() => dispatch(deleteMajor(record.id))}
              />
            </Space>
          )}
        />
      </Table>
      <CreateMajorDialog open={openCreate} onCancel={closeCreate} />
      <UpdateMajorDialog
        record={record}
        open={openUpdate}
        onCancel={closeUpdate}
      />
    </>
  );
};

export default MajorPage;
