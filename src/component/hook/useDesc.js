// path: @/component/hook/useDesc.js

import { useRef, useState } from "react";

export function useDesc() {
  const descRef = useRef();
  const [dataSource, setDataSource] = useState({});
  const [visible, setVisible] = useState(false);

  // Actions
  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setDataSource({});
  };

  const reload = () => {
    if (descRef.current) {
      descRef.current.reload();
    }
  };

  return {
    descRef,
    dataSource,
    setDataSource,
    visible,
    setVisible,
    open,
    close,
    reload,
  };
}
