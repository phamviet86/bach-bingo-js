"use client";

import dynamic from "next/dynamic";
import { AppSpin, AntProvider } from "@/component/common";
import { getProviderConfig, MENU_CONFIG } from "@/component/config";
import { useTheme } from "@/component/hook";
import { AppProvider } from "./provider";

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
      <LayoutContent>{children}</LayoutContent>
    </AppProvider>
  );
}

function LayoutContent({ children }) {
  // Sử dụng useTheme hook trực tiếp trong layout
  const { isDarkTheme, themeMode, setTheme } = useTheme("auto");

  const providerConfig = getProviderConfig(isDarkTheme);

  return (
    <AntProvider {...providerConfig}>
      <AntLayout menu={MENU_CONFIG} themeMode={themeMode} setTheme={setTheme}>
        {children}
      </AntLayout>
    </AntProvider>
  );
}
