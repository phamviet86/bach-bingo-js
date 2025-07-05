// path: @/component/common/pro-layout.js

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProLayout as AntProLayout } from "@ant-design/pro-components";
import { LAYOUT_CONFIG } from "@/component/config";

// Helper function to render menu items
function renderMenuItem(item, dom) {
  return <Link href={item.path}>{dom}</Link>;
}

export function ProLayout({ menu = [], ...props }) {
  const pathname = usePathname();

  return (
    <AntProLayout
      {...props}
      {...LAYOUT_CONFIG}
      route={{ path: "/", routes: menu }}
      menuItemRender={renderMenuItem}
      location={{ pathname }}
      selectedKeys={[pathname]}
    />
  );
}
