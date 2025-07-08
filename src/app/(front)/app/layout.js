"use client";

import dynamic from "next/dynamic";
import { Dropdown } from "antd";
import {
  SunOutlined,
  MoonOutlined,
  UserOutlined,
  DesktopOutlined,
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
        return <DesktopOutlined />;
      default:
        return <DesktopOutlined />;
    }
  };

  const getThemeLabel = (mode) => {
    switch (mode) {
      case "light":
        return "Chế độ sáng";
      case "dark":
        return "Chế độ tối";
      case "auto":
        return "Tự động";
      default:
        return "Chế độ tối";
    }
  };

  const themeMenuItems = [
    {
      key: "light",
      icon: <SunOutlined />,
      label: "Chế độ sáng",
      onClick: () => setTheme("light"),
    },
    {
      key: "dark",
      icon: <MoonOutlined />,
      label: "Chế độ tối",
      onClick: () => setTheme("dark"),
    },
    {
      key: "auto",
      icon: <DesktopOutlined />,
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
                      label: `Giao diện: ${getThemeLabel(themeMode)}`,
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
