import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "~/hooks/useDebounce";

const defaultParams = {
  search: "",
  sortBy: "id",
  sortOrder: "asc",
  page: 1,
  perPage: 10,
  filters: {},
};

export const useTable = (fetchFunction, initialParams = defaultParams) => {
  const dispatch = useDispatch();
  const [tableParams, setTableParams] = useState({
    ...defaultParams,
    ...initialParams,
  });
  const debouncedSearch = useDebounce(tableParams.search, 500);

  const [selection, setSelection] = useState({
    selectedRow: [],
    selectedRowKeys: [],
  });

  const onSelectChange = useMemo(
    () => ({
      selectedRowKeys: selection.selectedRowKeys,
      onChange: (newSelectedRowKeys, newSelectedRow) => {
        setSelection({
          selectedRow: newSelectedRow,
          selectedRowKeys: newSelectedRowKeys,
        });
      },
    }),
    [selection]
  );

  const removeSelectedRow = useCallback((record) => {
    setSelection((prev) => ({
      selectedRow: prev.selectedRow.filter((row) => row.id !== record.id),
      selectedRowKeys: prev.selectedRowKeys.filter((key) => key !== record.id),
    }));
  }, []);

  useEffect(() => {
    dispatch(fetchFunction({ ...tableParams, search: debouncedSearch }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedSearch,
    tableParams.sortBy,
    tableParams.sortOrder,
    tableParams.page,
    tableParams.perPage,
    tableParams.filters,
    dispatch,
    fetchFunction,
  ]);

  const updateTableParams = useCallback((newParams) => {
    setTableParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  }, []);

  const handleSearchChange = useCallback(
    (e) => {
      updateTableParams({ search: e.target.value, page: 1 });
    },
    [updateTableParams]
  );

  const handleTableChange = useCallback(
    (pagination, filters, sorter) => {
      updateTableParams({
        page: pagination.current,
        perPage: pagination.pageSize,
        sortBy: sorter.field || "id",
        sortOrder: sorter.order === "descend" ? "desc" : "asc",
        filters: filters,
      });
    },
    [updateTableParams]
  );

  return {
    tableParams,
    selection,
    removeSelectedRow,
    setSelection,
    onSelectChange,
    handleSearchChange,
    handleTableChange,
  };
};
