// path: @/component/common/drawer-form.js

import { useCallback } from "react";
import { message, Popconfirm } from "antd";
import { DrawerForm as AntDrawerForm } from "@ant-design/pro-components";
import { Button } from "@/component/common";
import { FORM_CONFIG, DRAWER_CONFIG } from "@/component/config";
import { DeleteOutlined } from "@ant-design/icons";

export function DrawerForm({
  // Data request handlers
  onDataRequest = undefined,
  onDataRequestSuccess = undefined,
  onDataRequestError = undefined,
  requestParams = undefined,

  // Data submit handlers
  onDataSubmit = undefined,
  onDataSubmitSuccess = undefined,
  onDataSubmitError = undefined,

  // Data delete handlers
  onDataDelete = undefined,
  onDataDeleteSuccess = undefined,
  onDataDeleteError = undefined,
  deleteParams = undefined,

  // Form configuration
  fields = null,

  // Form reference hook
  formHook = {},

  // Other props
  ...props
}) {
  // Extract form reference from hook
  const { formRef, reset, visible, setVisible } = formHook;

  // Initialize message API for error/success notifications
  const [messageApi, contextHolder] = message.useMessage();

  // Data request handler with error handling
  const handleDataRequest = useCallback(
    async (params) => {
      if (!onDataRequest) {
        messageApi.error("Data request handler not provided");
        return false;
      }

      try {
        const result = await onDataRequest(params);
        // result: { success, message, data: array }
        onDataRequestSuccess?.(result);
        return result.data[0] || {};
      } catch (error) {
        const errorMessage = error?.message || "Đã xảy ra lỗi";
        messageApi.error(errorMessage);
        onDataRequestError?.(error);
        return false;
      }
    },
    [onDataRequest, onDataRequestSuccess, onDataRequestError, messageApi]
  );

  // Data submit handler with error handling
  const handleDataSubmit = useCallback(
    async (values) => {
      if (!onDataSubmit) {
        messageApi.error("Data submit handler not provided");
        return false;
      }
      if (!values) return false;

      try {
        const result = await onDataSubmit(values);
        // result: { success, message, data: array }
        messageApi.success(result.message);
        onDataSubmitSuccess?.(result);
        return true;
      } catch (error) {
        const errorMessage = error?.message || "Đã xảy ra lỗi";
        messageApi.error(errorMessage);
        onDataSubmitError?.(error);
        return false;
      }
    },
    [onDataSubmit, onDataSubmitSuccess, onDataSubmitError, messageApi]
  );

  // Data delete handler with error handling
  const handleDataDelete = useCallback(
    async () => {
      if (!onDataDelete) {
        messageApi.error("Data delete handler not provided");
        return false;
      }

      try {
        const result = await onDataDelete(deleteParams);
        // result: { success, message, data: array }
        messageApi.success(result.message);
        onDataDeleteSuccess?.(result);
        return true;
      } catch (error) {
        const errorMessage = error?.message || "Đã xảy ra lỗi";
        messageApi.error(errorMessage);
        onDataDeleteError?.(error);
        return false;
      }
    },
    [onDataDelete, onDataDeleteSuccess, onDataDeleteError, deleteParams, messageApi]
  );

  // Configure submitter buttons based on available handlers
  const submitterConfig = {
    render: (_, defaultDoms) => {
      return [
        onDataDelete ? (
          <Popconfirm
            key="delete-button"
            title="Xác nhận xóa?"
            description="Bạn có chắc chắn muốn xóa?"
            onConfirm={handleDataDelete}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              color="danger"
              variant="solid"
              label="Xoá"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        ) : (
          []
        ),
        <Button
          key="reset-button"
          onClick={() => reset?.()}
          label="Khôi phục"
        />,
        ...defaultDoms,
      ];
    },
  };

  // Render component
  return (
    <>
      {contextHolder}
      <AntDrawerForm
        {...props}
        {...FORM_CONFIG}
        formRef={formRef}
        request={onDataRequest ? handleDataRequest : undefined}
        params={requestParams}
        onFinish={onDataSubmit ? handleDataSubmit : undefined}
        open={visible}
        onOpenChange={setVisible}
        drawerProps={DRAWER_CONFIG}
        submitter={submitterConfig}
      >
        {fields}
      </AntDrawerForm>
    </>
  );
}
