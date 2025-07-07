"use client";

import dynamic from "next/dynamic";
import { AppProvider } from "./provider";
import { AppSpin } from "@/component/common";
import { MENU_CONFIG } from "@/component/config";

const AntLayout = dynamic(
  () => import("@/component/common/layout").then((mod) => mod.AntLayout),
  {
    loading: () => <AppSpin />,
    ssr: false,
  }
);

export default function Layout({ children }) {
  return (
    <AppProvider>
      <AntLayout menu={MENU_CONFIG}>{children}</AntLayout>
    </AppProvider>
  );
}
