import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useVaccinationColumns from "./VaccinationColum";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useVaccinations } from "~/api/vaccinations/get-vaccination";

export const VaccinationTable = () => {
  const columns = useVaccinationColumns();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { data: vaccinations, isLoading } = useVaccinations({ page, size: ROW_PER_PAGE, keyword });

  return (
    <>
      <Table
        columns={columns}
        dataSource={vaccinations}
        size="middle"
        pagination={{
          current: page,
          pageSize: ROW_PER_PAGE,
          total: vaccinations?.length || 0,
          onChange: (newPage) => setPage(newPage),
        }}
        loading={isLoading}
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input.Search
              placeholder="Search employee..."
              className="w-[250px]"
              allowClear
              onSearch={(value) => {
                setKeyword(value);
                setPage(1);
              }}
            />
            <Button icon={<ExportOutlined />}>
              Export <Tag color="blue">Coming Soon</Tag>
            </Button>
          </div>
        )}
      />
    </>
  );
};
