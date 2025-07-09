// path: @/component/common/layout.js

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dropdown } from "antd";
import {
  UserOutlined,
  SunOutlined,
  MoonOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { LAYOUT_CONFIG } from "@/component/config";

// Helper function to render menu items
function renderMenuItem(item, dom) {
  return <Link href={item.path}>{dom}</Link>;
}

// Function to get the theme icon based on the mode
function getThemeIcon(mode) {
  switch (mode) {
    case "light":
      return <SunOutlined />;
    case "dark":
      return <MoonOutlined />;
    case "auto":
      return <ThunderboltOutlined />;
    default:
      return <ThunderboltOutlined />;
  }
}

export function AntLayout({ menu = [], themeMode, setTheme, ...props }) {
  const pathname = usePathname();

  // Theme menu items
  const themeMenuItems = [
    {
      key: "light",
      icon: <SunOutlined />,
      label: "Giao diện sáng",
      onClick: () => setTheme?.("light"),
    },
    {
      key: "dark",
      icon: <MoonOutlined />,
      label: "Giao diện tối",
      onClick: () => setTheme?.("dark"),
    },
    {
      key: "auto",
      icon: <ThunderboltOutlined />,
      label: "Tự động",
      onClick: () => setTheme?.("auto"),
    },
  ];

  return (
    <ProLayout
      {...props}
      {...LAYOUT_CONFIG}
      route={{ path: "/", routes: menu }}
      menuItemRender={renderMenuItem}
      location={{ pathname }}
      selectedKeys={[pathname]}
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
                    label: "Hiển thị",
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
    />
  );
}
