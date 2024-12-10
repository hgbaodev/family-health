import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import useMemberColumns from "./MemberColumn";
import { ROW_PER_PAGE } from "../../config/constants";
import { useMembers } from "../../api/members/get-members";
import { useTable } from "~/hooks/useTable";
import { useMembersStore } from "~/stores/memberStore";
import * as XLSX from "xlsx"; // Thư viện xlsx
import { saveAs } from "file-saver"; // Lưu file

const handleExportExcel = (data) => {
  if (!data || data.length === 0) {
    console.warn("Không có dữ liệu để xuất.");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data); // Chuyển mảng dữ liệu thành worksheet
  const workbook = XLSX.utils.book_new(); // Tạo workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Members"); // Thêm worksheet vào workbook

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  saveAs(
    new Blob([excelBuffer], { type: "application/octet-stream" }),
    "Members.xlsx"
  );
};

export const MemberTable = () => {
  const columns = useMemberColumns();
  const  { setMemberDetail } = useMembersStore((state) => state);
  const {
    data,
    isLoading,
    pagination,
    setKeyword,
  } = useTable(useMembers, ROW_PER_PAGE, columns);

  return (
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      rowKey={(record) => record.id}
      pagination={pagination}
      loading={isLoading}
      scroll={{ x: "max-content" }}
      onRow={(record) => {
        return {
          onClick: () => {
            setMemberDetail(record);
          },
        };
      }}
      title={() => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input.Search
            placeholder="Tìm kiếm thành viên..."
            className="w-[250px]"
            allowClear
            onSearch={setKeyword}
          />
          <Button icon={<ExportOutlined />}
          onClick={() => handleExportExcel(data)}
          >
            Export 
          </Button>
        </div>
      )}
    />
  );
};
