// path: @/component/common/table.js

import { useCallback, cloneElement } from "react";
import { message, Modal, Drawer } from "antd";
import { ProTable } from "@ant-design/pro-components";
import { TABLE_CONFIG, DRAWER_CONFIG, MODAL_CONFIG } from "@/component/config";

export function AntTable({
  variant = "page", // Table variant (default, bordered, etc.)
  // Data request handlers
  onDataRequest = undefined,
  onDataRequestSuccess = undefined,
  onDataRequestError = undefined,
  requestParams = undefined,

  // Row selection handlers
  onRowsSelect = undefined,
  onRowsSelectError = undefined,
  selectType = "checkbox",

  // Column configuration
  columns = [],
  leftColumns = [],
  rightColumns = [],

  // Table display options
  showSearch = true,
  showOptions = false,
  showPagination = true,
  syncToUrl = false,

  // Header configuration
  title = undefined,
  extra = undefined,

  // Table reference hook
  tableHook = {},

  modalProps = {},
  drawerProps = {},
  trigger = undefined,

  // Other props
  ...props
}) {
  // Extract table reference from hook
  const { tableRef, visible, open, close } = tableHook;

  // Initialize message API for error/success notifications
  const [messageApi, contextHolder] = message.useMessage();

  // Data request handler with error handling
  const handleDataRequest = useCallback(
    async (params, sort, filter) => {
      if (!onDataRequest) {
        messageApi.error("Data request handler not provided");
        return false;
      }

      try {
        const result = await onDataRequest(params, sort, filter);
        onDataRequestSuccess?.(result);
        return result;
      } catch (error) {
        const errorMessage = error?.message || "An error occurred";
        messageApi.error(errorMessage);
        onDataRequestError?.(error);
        return false;
      }
    },
    [onDataRequest, onDataRequestSuccess, onDataRequestError, messageApi]
  );

  // Row selection handler with error handling
  const handleRowsSelect = useCallback(
    (_, selectedRowsData) => {
      if (!onRowsSelect) return true;

      try {
        onRowsSelect(selectedRowsData);
        return true;
      } catch (error) {
        const errorMessage = error?.message || "An error occurred";
        messageApi.error(errorMessage);
        onRowsSelectError?.(error);
        return false;
      }
    },
    [onRowsSelect, onRowsSelectError, messageApi]
  );

  // Combine all columns in the correct order
  const allColumns = [...leftColumns, ...columns, ...rightColumns];

  // Configure row selection if handler is provided
  const rowSelectionConfig = onRowsSelect
    ? { type: selectType, onChange: handleRowsSelect }
    : undefined;

  // Configure table features based on props
  const searchConfig = showSearch ? TABLE_CONFIG.search : false;
  const paginationConfig = showPagination ? TABLE_CONFIG.pagination : false;
  const optionsConfig = showOptions ? TABLE_CONFIG.options : false;
  const formConfig = syncToUrl
    ? {
        syncToUrl: (values, _) => values,
      }
    : undefined;

  const baseTableProps = {
    // ...props,
    actionRef: tableRef,
    columns: allColumns,
    request: onDataRequest ? handleDataRequest : undefined,
    params: requestParams,
    headerTitle: title,
    toolBarRender: extra ? () => extra : undefined,
    rowSelection: rowSelectionConfig,
    form: formConfig,
    search: searchConfig,
    pagination: paginationConfig,
    options: optionsConfig,
    tableAlertRender: false,
    rowKey: "id",
    bordered: true,
    ghost: true,
  };

  if (variant === "page") {
    return (
      <>
        {contextHolder}
        <ProTable {...baseTableProps} />
      </>
    );
  }

  if (variant === "drawer") {
    return (
      <>
        {contextHolder}
        {trigger && variant === "drawer"
          ? cloneElement(trigger, { onClick: open })
          : null}
        <Drawer
          {...drawerProps}
          {...DRAWER_CONFIG}
          open={visible}
          onClose={close}
        >
          <ProTable {...baseTableProps} />
        </Drawer>
      </>
    );
  }

  if (variant === "modal") {
    return (
      <>
        {contextHolder}
        {trigger && variant === "modal"
          ? cloneElement(trigger, { onClick: open })
          : null}
        <Modal
          {...modalProps}
          {...MODAL_CONFIG}
          open={visible}
          onCancel={close}
        >
          <ProTable {...baseTableProps} />
        </Modal>
      </>
    );
  }
}
