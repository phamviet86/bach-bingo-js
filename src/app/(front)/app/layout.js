"use client";

import dynamic from "next/dynamic";
// import { AppProvider } from "./provider";
import { AppSpin } from "@/component/common";
import { MENU_CONFIG } from "@/component/config";

const ProLayout = dynamic(
  () => import("@/component/common/pro-layout").then((mod) => mod.ProLayout),
  {
    loading: () => <AppSpin />,
    ssr: false,
  }
);

export default function Layout({ children }) {
  return (
    // <AppProvider>
    //   <ProLayout menu={MENU_CONFIG}>{children}</ProLayout>
    // </AppProvider>

    <ProLayout menu={MENU_CONFIG}>{children}</ProLayout>
  );
}
