---
mode: "agent"
tools: ['changes', 'codebase', 'editFiles', 'githubRepo', 'problems', 'search', 'searchResults']
description: "Generate a frontend page detail component from a SQL table definition using template code"
---

# Generate Frontend Page Detail from SQL Table

## Instructions

Generate React/Next.js page detail component from SQL table structure using the template code.

## Reference Examples

Review these files for input/output pattern:

- **SQL Input**: [`.github/prompts/examples/table-structure-sample.sql`](./examples/table-structure-sample.sql)
- **Page Output**: [`.github/prompts/examples/frontend-page-detail-sample.js`](./examples/frontend-page-detail-sample.js)

## Template

Use this exact template code:

```javascript
// {TABLE_NAME_UPPER} DETAIL PAGE

"use client";

import { use } from "react";
import { Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, BackButton } from "@/component/common";
import {
  {TableName}Desc,
  {TableName}Edit,
  {TableName}Columns,
  {TableName}Fields,
} from "@/component/custom";
import { useDesc, useForm, useNav } from "@/component/hook";
import { PageProvider, usePageContext } from "../provider";

export default function Page(props) {
  return (
    <PageProvider>
      <PageContent {...props} />
    </PageProvider>
  );
}

function PageContent({ params }) {
  // Context
  const {} = usePageContext();

  // Navigation
  const { navBack } = useNav();
  const { id: {tableName}Id } = use(params);

  // {vnTableName} logic hooks
  const use{TableName} = {
    desc: useDesc(),
    edit: useForm(),
    columns: {TableName}Columns(),
    fields: {TableName}Fields(),
  };

  // Page action buttons
  const pageButton = [
    <BackButton key="back-button" color="default" variant="outlined" />,
    <AntButton
      key="edit-button"
      label="Sửa"
      color="primary"
      variant="solid"
      onClick={() => use{TableName}.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <{TableName}Desc
        descHook={use{TableName}.desc}
        columns={use{TableName}.columns}
        requestParams={{ id: {tableName}Id }}
        onRequestSuccess={(result) =>
          use{TableName}.desc.setDataSource(result?.data?.[0])
        }
      />
      <{TableName}Edit
        formHook={use{TableName}.edit}
        fields={use{TableName}.fields}
        requestParams={{ id: {tableName}Id }}
        deleteParams={{ id: {tableName}Id }}
        onSubmitSuccess={() => use{TableName}.desc.reload()}
        onDeleteSuccess={() => navBack()}
        title="Sửa {vnTableName}"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle =
    use{TableName}.desc?.dataSource?.{titleField} || "Chi tiết";

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
        { title: "{vnTableName}", path: "/app/system/{table-name}" },
        { title: pageTitle },
      ]}
      title={pageTitle}
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
- **{table-name}**: kebab-case table name for paths (e.g., `options`, `user-roles`)
- **{TableName}**: PascalCase table name (e.g., `Options`, `UserRoles`)
- **{tableName}**: camelCase table name for ID param (e.g., `option`, `userRole`)
- **{vnTableName}**: Vietnamese table description (e.g., `tùy chọn`, `vai trò người dùng`)
- **{titleField}**: field for page title display (e.g., `option_label`, `user_name`)

### Template Structure

- Use **PascalCase** for component imports and usage
- Use **camelCase** for ID parameters and variables
- Use **Vietnamese** labels for all user-facing text
- Keep all component structure, imports, and hooks exactly as shown

## Quick Steps

1. **File Path**: Create `src/app/(front)/app/dev/{table-name}/[id]/page.js`
2. **Copy Template**: Use the exact template structure above
3. **Replace Names**: Fill in table naming placeholders
4. **Title Field**: Choose appropriate field for page title display
5. **Vietnamese Labels**: Use appropriate Vietnamese descriptions
6. **Validate**: Ensure all imports and component usage are correct

## Critical Rules

- ✅ **File naming**: kebab-case folder with `[id]/page.js` (e.g., `options/[id]/page.js`)
- ✅ **Component structure**: Exact Provider and PageContent pattern
- ✅ **Component imports**: Import custom components from `@/component/custom`
- ✅ **Hook usage**: Use exact hook patterns (useDesc, useForm, useNav)
- ✅ **Vietnamese text**: Use Vietnamese for all user-facing labels
- ✅ **Template structure**: Keep all component structure unchanged
- ✅ **Provider pattern**: Use PageProvider and usePageContext exactly as shown
- ✅ **Dynamic routing**: Use `use(params)` pattern for accessing route parameters

## Component Integration

### Required Components:

- **{TableName}Desc**: For data display
- **{TableName}Edit**: For editing records
- **{TableName}Columns**: For table column definitions
- **{TableName}Fields**: For form field definitions

### Required Hooks:

- **useDesc()**: For description/detail state management
- **useForm()**: For form state management
- **useNav()**: For navigation functionality

### Page Structure:

- **AntPage**: Main page wrapper with breadcrumbs and title
- **ProCard**: Content wrapper with shadow and border
- **PageProvider**: Context provider for page state (shared with list page)
- **Action buttons**: Back and Edit buttons

## Navigation Setup

The page uses a standard navigation pattern:

- **Breadcrumbs**: Hệ thống → {vnTableName} → Page Title
- **Page title**: Dynamic based on record data or "Chi tiết" fallback
- **Parent navigation**: Link back to list page
- **Edit success**: Reload detail data after successful edit
- **Delete success**: Navigate back to list page

## Page Title Configuration

Choose appropriate field for `{titleField}` placeholder:

- **For options table**: `option_label`
- **For users table**: `user_name` or `user_email`
- **For rooms table**: `room_name`
- **General rule**: Use the most descriptive field (name, title, label)

## Validation Checklist

- ✅ **File location**: `src/app/(front)/app/dev/{table-name}/[id]/page.js`
- ✅ **File naming**: kebab-case folder with [id] dynamic route
- ✅ **Template structure**: Exact Provider and PageContent pattern
- ✅ **Imports**: All required components and hooks imported
- ✅ **Component usage**: Custom components properly integrated
- ✅ **Hook usage**: useDesc, useForm, useNav properly used
- ✅ **Vietnamese labels**: Proper Vietnamese text for all user-facing elements
- ✅ **Navigation**: Breadcrumbs and title properly configured
- ✅ **Action buttons**: Back and Edit buttons properly implemented
- ✅ **Detail integration**: Description component with proper data binding
- ✅ **Form integration**: Edit form with drawer variant and delete functionality
- ✅ **Success handling**: Proper reload and navigation after operations
- ✅ **Dynamic title**: Page title based on record data with fallback
- ✅ **Route parameters**: Proper use of dynamic routing with use(params)

## Output Location

Generated file: `src/app/(front)/app/dev/{table-name}/[id]/page.js`
