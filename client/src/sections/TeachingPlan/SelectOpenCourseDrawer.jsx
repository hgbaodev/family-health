import { Button, Drawer, Input, Table } from "antd";
import { useSelector } from "react-redux";
import { useTable } from "~/hooks/useTable";
import { fetchSubjects } from "~/store/slices/SubjectSlice";
import { SaveOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const SelectOpenCourseDrawer = ({
  open,
  onClose,
  selectedSubjects,
  setValue,
}) => {
  const {
    tableParams,
    selection,
    setSelection,
    handleSearchChange,
    handleTableChange,
  } = useTable(fetchSubjects);

  const { items, loadingFetch, pagination } = useSelector(
    (state) => state.subject
  );

  const [initialSelectedRowKeys, setInitialSelectedRowKeys] = useState([]);
  const [initialSelectedRows, setInitialSelectedRows] = useState([]);

  useEffect(() => {
    const initialKeys = selectedSubjects.map((subject) => subject.id);
    setInitialSelectedRowKeys(initialKeys);
    setInitialSelectedRows(selectedSubjects);
    setSelection({
      selectedRow: selectedSubjects,
      selectedRowKeys: initialKeys,
    });
  }, [selectedSubjects, setSelection]);

  const handleSave = () => {
    const newSelectedRows = selection.selectedRow.filter(
      (row) => !initialSelectedRowKeys.includes(row.id)
    );
    setValue(newSelectedRows);
    onClose();
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRows);
      const newSelectedRowKeys = selectedRowKeys.filter(
        (key) => !initialSelectedRowKeys.includes(key)
      );
      const newSelectedRows = selectedRows.filter(
        (row) => !initialSelectedRowKeys.includes(row.id)
      );
      setSelection({
        selectedRow: [...initialSelectedRows, ...newSelectedRows],
        selectedRowKeys: [...initialSelectedRowKeys, ...newSelectedRowKeys],
      });
    },
    selectedRowKeys: [...initialSelectedRowKeys, ...selection.selectedRowKeys],
    getCheckboxProps: (record) => ({
      disabled: initialSelectedRowKeys.includes(record.id),
    }),
  };

  return (
    <Drawer
      title="Chọn danh sách môn học mở"
      onClose={onClose}
      open={open}
      size="large"
      extra={
        <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
          Lưu
        </Button>
      }
      maskClosable={false}
    >
      <Table
        rowSelection={rowSelection}
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
          y: 430,
        }}
        title={() => (
          <Input.Search
            placeholder="Tìm kiếm học phần"
            onChange={handleSearchChange}
            className="w-full"
            allowClear
          />
        )}
      >
        <Table.Column title="Mã HP" dataIndex="code" width={70} />
        <Table.Column title="Tên HP" dataIndex="name" />
        <Table.Column
          title="Số TC"
          dataIndex="credits"
          align="center"
          width={90}
        />
      </Table>
    </Drawer>
  );
};

export default SelectOpenCourseDrawer;
