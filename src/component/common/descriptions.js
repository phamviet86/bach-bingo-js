// path: @/component/common/pro-descriptions.js

import { useCallback } from "react";
import { message, Modal, Drawer } from "antd";
import { ProDescriptions as AntProDescriptions } from "@ant-design/pro-components";

export function AntDescriptions({
  variant = "page", // 'modal' or 'drawer'
  onRequest = undefined,
  onRequestError = undefined,
  onRequestSuccess = undefined,
  requestParams = undefined,
  column = { xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 },
  descHook = {},
  ...props
}) {
  const { descRef, visible, close } = descHook;
  const [messageApi, contextHolder] = message.useMessage();

  // Handlers
  const handleDataRequest = useCallback(
    async (params) => {
      if (!onRequest) {
        messageApi.error("Data request handler not provided");
        return false;
      }

      try {
        const result = await onRequest(params);
        // result: { success, message, data: array }
        onRequestSuccess?.(result);
        return { success: true, data: result?.data?.[0] || {} };
      } catch (error) {
        messageApi.error(error?.message || "Đã xảy ra lỗi");
        onRequestError?.(error);
        return false;
      }
    },
    [onRequest, onRequestSuccess, onRequestError, messageApi]
  );

  // Render the component
  return (
    <>
      {contextHolder}
      <AntProDescriptions
        {...props}
        actionRef={descRef}
        request={onRequest ? handleDataRequest : undefined}
        params={requestParams}
        column={column}
      />
    </>
  );
}
