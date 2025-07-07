// path: @/component/common/modal.js

import { useCallback, useState, cloneElement } from "react";
import { Modal as AntModal, message } from "antd";
import { MODAL_CONFIG } from "@/component/config";

export function Modal({
  // Action handling props
  onOk = undefined,
  onOkError = undefined,
  onOkSuccess = undefined,
  onCancel = undefined,
  onCancelError = undefined,
  onCancelSuccess = undefined,

  // Message configuration
  showOkMessage = false,
  showCancelMessage = false,

  // Modal trigger
  trigger = undefined,

  // Other props
  ...props
}) {
  // ========== Hooks and State ==========
  const [visible, setVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // ========== Event Handlers ==========
  // Modal visibility handlers
  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  // OK button handler with error handling
  const handleOk = useCallback(async () => {
    if (!onOk) {
      messageApi.error("OK handler not provided");
      return false;
    }

    try {
      const result = await onOk();
      closeModal();
      if (showOkMessage && result?.message) {
        messageApi.success(result.message);
      }
      onOkSuccess?.(result);
      return result || true;
    } catch (error) {
      messageApi.error(error.message || "Đã xảy ra lỗi");
      onOkError?.(error);
      return false;
    }
  }, [onOk, onOkSuccess, onOkError, showOkMessage, messageApi, closeModal]);

  // Cancel button handler with error handling
  const handleCancel = useCallback(async () => {
    if (!onCancel) {
      closeModal();
      return false;
    }

    try {
      const result = await onCancel();
      closeModal();
      if (showCancelMessage && result?.message) {
        messageApi.warning(result.message);
      }
      onCancelSuccess?.(result);
      return result || false;
    } catch (error) {
      messageApi.error(error.message || "Đã xảy ra lỗi");
      onCancelError?.(error);
      return false;
    }
  }, [
    onCancel,
    onCancelSuccess,
    onCancelError,
    showCancelMessage,
    messageApi,
    closeModal,
  ]);

  // ========== Render Logic ==========
  return (
    <>
      {contextHolder}
      {trigger ? cloneElement(trigger, { onClick: openModal }) : null}
      <AntModal
        {...props}
        {...MODAL_CONFIG}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
}
