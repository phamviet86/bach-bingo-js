// path: @/component/hook/useDialog.js

import { useState } from "react";

export function useDialog() {
  // State
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");

  // Actions
  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setTitle("");
  };

  // Expose API
  return {
    visible,
    setVisible,
    title,
    setTitle,
    open,
    close,
  };
}
