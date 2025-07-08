"use client";

import dynamic from "next/dynamic";
import { Dropdown } from "antd";
import {
  UserOutlined,
  SunOutlined,
  MoonOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { AppSpin, AntProvider } from "@/component/common";
import { getProviderConfig, MENU_CONFIG } from "@/component/config";
import { AppProvider, useAppContext } from "./provider";

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
  const { isDarkTheme, themeMode, setTheme } = useAppContext();

  const providerConfig = getProviderConfig(isDarkTheme);

  const getThemeIcon = (mode) => {
    switch (mode) {
      case "light":
        return <SunOutlined />;
      case "dark":
        return <MoonOutlined />;
      case "auto":
        return <SyncOutlined />;
      default:
        return <SyncOutlined />;
    }
  };

  const getThemeLabel = (mode) => {
    switch (mode) {
      case "light":
        return "Giao diện sáng";
      case "dark":
        return "Giao diện tối";
      case "auto":
        return "Tự động";
      default:
        return "Tự động";
    }
  };

  const themeMenuItems = [
    {
      key: "light",
      icon: <SunOutlined />,
      label: "Giao diện sáng",
      onClick: () => setTheme("light"),
    },
    {
      key: "dark",
      icon: <MoonOutlined />,
      label: "Giao diện tối",
      onClick: () => setTheme("dark"),
    },
    {
      key: "auto",
      icon: <SyncOutlined />,
      label: "Tự động",
      onClick: () => setTheme("auto"),
    },
  ];

  return (
    <AntProvider {...providerConfig}>
      <AntLayout
        menu={MENU_CONFIG}
        avatarProps={{
          icon: <UserOutlined />,
          size: "small",
          title: "Người dùng",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "theme-submenu",
                      icon: getThemeIcon(themeMode),
                      label: getThemeLabel(themeMode),
                      children: themeMenuItems,
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
      >
        {children}
      </AntLayout>
    </AntProvider>
  );
}
