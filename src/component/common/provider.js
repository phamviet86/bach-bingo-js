// path: @/component/common/config-provider.js

"use client";

import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import { PROVIDER_CONFIG } from "@/component/config";

export function AntProvider({ children, ...props }) {
  return (
    <ConfigProvider {...props} {...PROVIDER_CONFIG}>
      {children}
    </ConfigProvider>
  );
}
