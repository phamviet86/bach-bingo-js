// path: @/component/common/page-container.js

import Link from "next/link";
import { PageContainer as AntPageContainer } from "@ant-design/pro-components";
import { toUpperCase } from "@/lib/util/format-util";

// Helper function to render breadcrumb items
function renderBreadcrumbItem(item) {
  return item.path ? <Link href={item.path}>{item.title}</Link> : item.title;
}

export function PageContainer({ items = [], title = undefined, ...props }) {
  const uppercaseTitle = title ? toUpperCase(title) : undefined;

  return (
    <AntPageContainer
      {...props}
      header={{
        title: uppercaseTitle,
        breadcrumb: {
          items: items,
          itemRender: renderBreadcrumbItem,
        },
      }}
    />
  );
}
