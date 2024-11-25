import { useState } from "react";

export const useTable = (fetchFunction, defaultPageSize, columns, filters = {}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [keyword, setKeyword] = useState("");

  const [extraFilters, setExtraFilters] = useState(filters);

  const { data, isLoading } = fetchFunction({
    page,
    size: pageSize,
    keyword,
    ...extraFilters,
  });

  const handleSearch = (value) => {
    setKeyword(value);
    setPage(1);
  };

  const handlePaginationChange = (newPage) => setPage(newPage);

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setPage(1);
  };

  const updateFilters = (newFilters) => {
    setExtraFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const pagination = {
    current: data?.meta?.current_page,
    pageSize: data?.meta?.per_page,
    total: data?.meta?.total_elements,
    showSizeChanger: true,
    pageSizeOptions: ["8", "10", "20", "50", "100"],
    onShowSizeChange: handlePageSizeChange,
    onChange: handlePaginationChange,
  };

  return {
    data: data?.items || [],
    isLoading,
    pagination,
    columns,
    keyword,
    setKeyword: handleSearch,
    setFilters: updateFilters,
  };
};
