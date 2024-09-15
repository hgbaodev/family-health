import { Button, Space, Table, Input, Flex, Tag } from "antd";
import { PlusSquareOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import HeaderBreadcrumbs from "~/components/HeaderBreadcrumbs";
import DeletePopconfirm from "~/components/DeletePopconfirm";
import { useBoolean } from "~/hooks/useBoolean";
import { useTable } from "~/hooks/useTable";
import { deleteAccount, fetchAccounts } from "~/store/slices/AccountSlice";
import CreateAccountDialog from "~/sections/Account/CreateAccountDialog";
import UpdateAccountDialog from "~/sections/Account/UpdateAccountDialog";

const AccountPage = () => {
  const dispatch = useDispatch();
  const { items, loadingFetch, pagination } = useSelector(
    (state) => state.account
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

  const { tableParams, onSelectChange, handleSearchChange, handleTableChange } =
    useTable(fetchAccounts);

  const handleUpdate = (record) => {
    setRecord(record);
    openUpdateModal();
  };

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-5">
        <HeaderBreadcrumbs
          heading="Quản lý tài khoản"
          links={[{ title: "Home", href: "/" }, { title: "Tài khoản" }]}
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
        rowSelection={onSelectChange}
        dataSource={items}
        rowKey="id"
        loading={loadingFetch}
        pagination={{
          current: tableParams.page,
          pageSize: tableParams.perPage,
          total: pagination.total,
        }}
        size="middle"
        onChange={handleTableChange}
        title={() => (
          <Input.Search
            placeholder="Tìm kiếm tài khoản"
            onChange={handleSearchChange}
            className="w-[250px]"
            allowClear
          />
        )}
        scroll={{ x: true }}
      >
        <Table.Column title="ID" dataIndex="id" key="id" align="center" sorter />
        <Table.Column
          title="Mã GV"
          dataIndex={["profile", "code"]}
          key="profile_code"
        />
        <Table.Column
          title="Tên GV"
          dataIndex={["profile", "fullname"]}
          key="profile_name"
          sorter
        />
        <Table.Column title="Email liên kết" dataIndex="email" key="email" />
        <Table.Column
          title="Trạng thái"
          dataIndex="is_active"
          key="is_active"
          render={(text, record) => (
            <Tag color={`${record.is_active ? "cyan" : "red"}`}>
              {record.is_active ? "Hoạt động" : "Khóa"}
            </Tag>
          )}
        />
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
                title="Xoá tài khoản"
                description="Bạn có chắc chắn muốn xoá tài khoản này ?"
                placement="topRight"
                onConfirm={() => dispatch(deleteAccount(record.id))}
              />
            </Space>
          )}
        />
      </Table>
      <CreateAccountDialog open={openCreate} onCancel={closeCreate} />
      <UpdateAccountDialog
        record={record}
        open={openUpdate}
        onCancel={closeUpdate}
      />
    </>
  );
};

export default AccountPage;
