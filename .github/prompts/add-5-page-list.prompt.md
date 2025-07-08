# Generate Frontend Page List from SQL Table Structure

## Purpose

Generate React/Next.js frontend page list component from SQL table structure using a predefined template. Replace only placeholders `{tableName}` and `{vnTableName}` without modifying any other code.

## Requirements

- Follow the exact template structure below
- Only replace `{tableName}` with PascalCase table name (e.g., `Users`, `Options`)
- Only replace `{vnTableName}` with Vietnamese table description
- Do NOT modify any other code outside template placeholders
- Maintain all imports, component structure, and styling exactly as shown

---

## Template Code

```javascript
// {tableName} LIST PAGE

"use client";

import { Space } from "antd";
import { SettingOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, DetailButton } from "@/component/common";
import {
  {tableName}Table,
  {tableName}Create,
  {tableName}Columns,
  {tableName}Fields,
} from "@/component/custom";
import { useTable, useForm, useNav } from "@/component/hook";
import { PageProvider, usePageContext } from "./provider";

export default function Page(props) {
  return (
    <PageProvider>
      <PageContent {...props} />
    </PageProvider>
  );
}

function PageContent() {
  // Context
  const {} = usePageContext();

  // Hooks
  const { navDetail } = useNav();

  // Option logic hooks
  const use{tableName} = {
    table: useTable(),
    create: useForm(),
    columns: {tableName}Columns(),
    fields: {tableName}Fields(),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => use{tableName}.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => use{tableName}.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <{tableName}Table
        tableHook={use{tableName}.table}
        columns={use{tableName}.columns}
        leftColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => (
              <DetailButton
                icon={<InfoCircleOutlined />}
                color="primary"
                variant="link"
                id={record?.id}
              />
            ),
          },
        ]}
      />
      <{tableName}Create
        formHook={use{tableName}.create}
        fields={use{tableName}.fields}
        onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
        title="Tạo {vnTableName}"
        variant="drawer"
      />
    </ProCard>
  );

  // Render
  return (
    <AntPage
      items={[
        {
          title: (
            <Space>
              <SettingOutlined />
              <span>Hệ thống</span>
            </Space>
          ),
        },
        { title: "{vnTableName}" },
      ]}
      title="Quản lý {vnTableName}"
      extra={pageButton}
      content={pageContent}
    />
  );
}
```

---

## AI Prompt Template

Use this exact prompt when requesting GitHub Copilot to generate the page list:

```
Generate a React/Next.js page list component from the following SQL table structure.

**Requirements:**
- Use the exact template code provided above
- Only replace {tableName} with PascalCase table name
- Only replace {vnTableName} with Vietnamese table description
- Do NOT modify any other code

**Input SQL Table:**
[paste your SQL table structure here]

**Expected Output:**
Generate the complete page.js file following the template exactly.
```

## Examples

**Table name:** `users` → **{tableName}:** `Users`, **{vnTableName}:** `Người dùng`
**Table name:** `options` → **{tableName}:** `Options`, **{vnTableName}:** `Tùy chọn`

---

## Key Points

- ✅ Replace only placeholders `{tableName}` and `{vnTableName}`
- ❌ Do NOT modify imports, component structure, or any other code
- ✅ Maintain exact template formatting and indentation
- ✅ Keep all existing props, hooks, and component logic unchanged
