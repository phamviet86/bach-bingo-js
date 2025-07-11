---
mode: "agent"
model: GPT-4.1
tools: ['changes', 'codebase', 'editFiles', 'githubRepo', 'problems', 'search', 'searchResults']
description: "Generate React/Next.js frontend page list component and provider from SQL table structure using template code"
---

# Generate Frontend Page List from SQL Table

## Instructions

Generate React/Next.js page list component from SQL table structure using the template code.

## Reference Examples

Review these files for input/output pattern:

- **SQL Input**: [`.github/prompts/examples/table-structure-sample.sql`](./examples/table-structure-sample.sql)
- **Page Output**: [`.github/prompts/examples/frontend-page-list-sample.js`](./examples/frontend-page-list-sample.js)

## Template

Use this exact template code:

```javascript
// {TABLE_NAME_UPPER} LIST PAGE

"use client";

import { Space } from "antd";
import { SettingOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, DetailButton } from "@/component/common";
import {
  {TableName}Table,
  {TableName}Create,
  {TableName}Columns,
  {TableName}Fields,
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

  // {vnTableName} logic hooks
  const use{TableName} = {
    table: useTable(),
    create: useForm(),
    columns: {TableName}Columns(),
    fields: {TableName}Fields(),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => use{TableName}.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => use{TableName}.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <{TableName}Table
        tableHook={use{TableName}.table}
        columns={use{TableName}.columns}
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
      <{TableName}Create
        formHook={use{TableName}.create}
        fields={use{TableName}.fields}
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

## Placeholder Mapping

Replace template placeholders with your table data:

### Naming Placeholders

- **{TABLE_NAME_UPPER}**: UPPERCASE table name for comments (e.g., `OPTIONS`, `USER_ROLES`)
- **{TableName}**: PascalCase table name (e.g., `Options`, `UserRoles`)
- **{vnTableName}**: Vietnamese table description (e.g., `tùy chọn`, `vai trò người dùng`)

### Template Structure

- Use **PascalCase** for component imports and usage
- Use **Vietnamese** labels for all user-facing text
- Keep all component structure, imports, and hooks exactly as shown

## Provider Template

Create a provider file alongside the page with this exact content:

```javascript
// PROVIDER

import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "../../provider";
import { convertSelection } from "@/lib/util/convert-util";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const { optionData } = useAppContext();

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({}), []);

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
```

## Quick Steps

1. **Page File**: Create `src/app/(front)/app/dev/{table-name}/page.js`
2. **Provider File**: Create `src/app/(front)/app/dev/{table-name}/provider.js`
3. **Copy Templates**: Use the exact template structures above
4. **Replace Names**: Fill in table naming placeholders for page.js only
5. **Provider Content**: Use provider template exactly as shown (no modifications)
6. **Validate**: Ensure all imports and component usage are correct

## Critical Rules

- ✅ **File naming**: kebab-case folder with `page.js` and `provider.js` (e.g., `options/page.js`, `options/provider.js`)
- ✅ **Component structure**: Exact Provider and PageContent pattern
- ✅ **Component imports**: Import custom components from `@/component/custom`
- ✅ **Hook usage**: Use exact hook patterns (useTable, useForm, useNav)
- ✅ **Vietnamese text**: Use Vietnamese for all user-facing labels
- ✅ **Template structure**: Keep all component structure unchanged
- ✅ **Provider pattern**: Use PageProvider and usePageContext exactly as shown

## Component Integration

### Required Components:

- **{TableName}Table**: For data display
- **{TableName}Create**: For creating new records
- **{TableName}Columns**: For table column definitions
- **{TableName}Fields**: For form field definitions

### Required Hooks:

- **useTable()**: For table state management
- **useForm()**: For form state management
- **useNav()**: For navigation functionality

### Page Structure:

- **AntPage**: Main page wrapper with breadcrumbs and title
- **ProCard**: Content wrapper with shadow and border
- **PageProvider**: Context provider for page state
- **Action buttons**: Reload and Create buttons

## Navigation Setup

The page uses a standard navigation pattern:

- **Breadcrumbs**: Hệ thống → {vnTableName}
- **Page title**: Quản lý {vnTableName}
- **Detail navigation**: Click info icon to view details
- **Create success**: Navigate to detail page after creation

## Validation Checklist

- ✅ **Page file location**: `src/app/(front)/app/dev/{table-name}/page.js`
- ✅ **Provider file location**: `src/app/(front)/app/dev/{table-name}/provider.js`
- ✅ **File naming**: kebab-case folder convention
- ✅ **Template structure**: Exact Provider and PageContent pattern
- ✅ **Imports**: All required components and hooks imported
- ✅ **Component usage**: Custom components properly integrated
- ✅ **Hook usage**: useTable, useForm, useNav properly used
- ✅ **Vietnamese labels**: Proper Vietnamese text for all user-facing elements
- ✅ **Navigation**: Breadcrumbs and title properly configured
- ✅ **Action buttons**: Reload and Create buttons properly implemented
- ✅ **Table integration**: Table with detail button and proper columns
- ✅ **Form integration**: Create form with drawer variant
- ✅ **Success handling**: Navigation to detail page after successful creation
- ✅ **Provider template**: Exact provider.js content without modifications

## Output Location

Generated files:

- `src/app/(front)/app/dev/{table-name}/page.js`
- `src/app/(front)/app/dev/{table-name}/provider.js`
