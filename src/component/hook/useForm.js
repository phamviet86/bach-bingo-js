// path: @/component/hook/useForm.js

import { useRef, useState } from "react";

export function useForm() {
  // Refs
  const formRef = useRef();

  // State
  const [initialValues, setInitialValues] = useState({});
  const [requestParams, setRequestParams] = useState({});
  const [deleteParams, setDeleteParams] = useState({});
  const [title, setTitle] = useState("");
  const [visible, setVisible] = useState(false);

  // Actions
  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setInitialValues({});
    setRequestParams({});
    setDeleteParams({});
    setTitle("");
  };

  const reset = () => {
    formRef?.current?.resetFields();
  };

  // Expose API
  return {
    formRef,
    initialValues,
    setInitialValues,
    requestParams,
    setRequestParams,
    deleteParams,
    setDeleteParams,
    title,
    setTitle,
    visible,
    setVisible,
    open,
    close,
    reset,
  };
}
