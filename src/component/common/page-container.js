// @/component/common/page-container.js

import Link from "next/link";
import { PageContainer as AntPageContainer } from "@ant-design/pro-components";

// Helper function to render breadcrumb items
function renderBreadcrumbItem(item) {
  return item.path ? <Link href={item.path}>{item.title}</Link> : item.title;
}

export function PageContainer({ items = [], ...props }) {
  return (
    <AntPageContainer
      {...props}
      header={{
        breadcrumb: {
          items: items,
          itemRender: renderBreadcrumbItem,
        },
      }}
    />
  );
}
