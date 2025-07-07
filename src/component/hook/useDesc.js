// path: @/component/hook/useDesc.js

import { useRef, useState } from "react";

export function useDesc() {
  // Refs
  const descRef = useRef();

  // State
  const [dataSource, setDataSource] = useState({});
  const [params, setParams] = useState({});
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");

  // Actions
  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setDataSource({});
    setParams({});
    setTitle("");
  };

  const reload = () => {
    descRef?.current?.reload();
  };

  // Expose API
  return {
    descRef,
    dataSource,
    setDataSource,
    params,
    setParams,
    visible,
    setVisible,
    title,
    setTitle,
    open,
    close,
    reload,
  };
}
