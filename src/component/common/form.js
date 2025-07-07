// path: @/component/common/drawer-form.js

import { useCallback } from "react";
import { message, Popconfirm, Flex } from "antd";
import { DrawerForm, ModalForm, ProForm } from "@ant-design/pro-components";
import { Button } from "@/component/common";
import { FORM_CONFIG, DRAWER_CONFIG, MODAL_CONFIG } from "@/component/config";
import { DeleteOutlined } from "@ant-design/icons";

export function AntForm({
  variant = "page",
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
  extra = [],

  // Form reference hook
  formHook = {},

  // Other props
  ...props
}) {
  // Extract form reference from hook
  const { formRef, close, visible, setVisible } = formHook;

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
  const handleDataDelete = useCallback(async () => {
    if (!onDataDelete) {
      messageApi.error("Data delete handler not provided");
      return false;
    }

    try {
      const result = await onDataDelete(deleteParams);
      // result: { success, message, data: array }
      messageApi.success(result.message);
      if (variant) close(); // Close drawer/modal if variant is set
      onDataDeleteSuccess?.(result);
      return true;
    } catch (error) {
      const errorMessage = error?.message || "Đã xảy ra lỗi";
      messageApi.error(errorMessage);
      onDataDeleteError?.(error);
      return false;
    }
  }, [
    onDataDelete,
    onDataDeleteSuccess,
    onDataDeleteError,
    deleteParams,
    messageApi,
    variant,
    close,
  ]);

  // Configure submitter buttons based on available handlers
  const submitterConfig = {
    searchConfig: { resetText: "Khôi phục", submitText: "Lưu" },
    resetButtonProps: {
      style: {
        display: "none",
      },
    },
    render: (props, defaultDoms) => (
      <Flex
        justify="space-between"
        align="middle"
        style={{ width: "100%" }}
        gap="small"
        wrap
      >
        {/* Left: delete */}
        {onDataDelete ? (
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
              variant="outlined"
              label="Xoá"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        ) : (
          <div />
        )}

        {/* Right: reset + submit */}

        <Flex justify="flex-end" gap="small" wrap>
          {extra}
          <Button
            key="reset-button"
            label="Khôi phục"
            onClick={() => props.form?.resetFields()}
          />
          {defaultDoms}
        </Flex>
      </Flex>
    ),
  };

  // Default case: render ProForm
  if (variant === "page") {
    return (
      <>
        {contextHolder}
        <ProForm
          {...props}
          {...FORM_CONFIG}
          formRef={formRef}
          request={onDataRequest ? handleDataRequest : undefined}
          params={requestParams}
          onFinish={onDataSubmit ? handleDataSubmit : undefined}
          submitter={submitterConfig}
        >
          {fields}
        </ProForm>
      </>
    );
  }

  // If variant is "drawer", render DrawerForm
  if (variant === "drawer") {
    return (
      <>
        {contextHolder}
        <DrawerForm
          {...props}
          {...FORM_CONFIG}
          formRef={formRef}
          request={onDataRequest ? handleDataRequest : undefined}
          params={requestParams}
          onFinish={onDataSubmit ? handleDataSubmit : undefined}
          submitter={submitterConfig}
          open={visible}
          onOpenChange={setVisible}
          drawerProps={DRAWER_CONFIG}
        >
          {fields}
        </DrawerForm>
      </>
    );
  }

  // If variant is "modal", render ModalForm
  if (variant === "modal") {
    return (
      <>
        {contextHolder}
        <ModalForm
          {...props}
          {...FORM_CONFIG}
          formRef={formRef}
          request={onDataRequest ? handleDataRequest : undefined}
          params={requestParams}
          onFinish={onDataSubmit ? handleDataSubmit : undefined}
          submitter={submitterConfig}
          open={visible}
          onOpenChange={setVisible}
          modalProps={MODAL_CONFIG}
        >
          {fields}
        </ModalForm>
      </>
    );
  }
}
