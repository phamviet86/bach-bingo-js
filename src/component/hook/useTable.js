// path: @/component/hook/useTable.js

import { useRef, useState } from "react";

export function useTable() {
  // Refs
  const tableRef = useRef();

  // State
  const [dataSource, setDataSource] = useState({});

  // Actions
  const reload = () => {
    tableRef?.current?.reload();
  };

  // Expose API
  return {
    tableRef,
    reload,
    dataSource,
    setDataSource,
  };
}
