---
mode: "agent"
tools: ["githubRepo", "codebase"]
description: "Generate a frontend page tab component from a SQL table definition using template code"
---

# Generate Frontend Page Tab from SQL Table

## Instructions

Generate React/Next.js page tab component from SQL table structure using the template code.

## Reference Examples

Review these files for input/output pattern:

- **SQL Input**: [`.github/prompts/examples/table-structure-sample.sql`](./examples/table-structure-sample.sql)
- **Page Output**: [`.github/prompts/examples/frontend-page-tab-sample.js`](./examples/frontend-page-tab-sample.js)

## Template

Use this exact template code:

```javascript
// {TABLE_NAME_UPPER} TAB OF PAGE

"use client";

import { Space } from "antd";
import { SettingOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/component/common";
import {
  {TableName}Table,
  {TableName}Desc,
  {TableName}Create,
  {TableName}Edit,
  {TableName}Columns,
  {TableName}Fields,
} from "@/component/custom";
import { useTable, useDesc, useForm } from "@/component/hook";

export default function Page() {
  // Page header buttons (optional)
  const pageButton = [];
  const pageContent = <ProCard boxShadow bordered />;

  // {vnTableName} logic hooks
  const use{TableName} = {
    table: useTable(),
    create: useForm(),
    desc: useDesc(),
    edit: useForm(),
    columns: {TableName}Columns(),
    fields: {TableName}Fields(),
  };

  // Tab action buttons
  const {tableName}Button = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => use{TableName}.table.reload()}
      />
      <AntButton
        key="create-button"
        label="Tạo mới"
        color="primary"
        variant="solid"
        onClick={() => use{TableName}.create.open()}
      />
    </Space>
  );

  // Tab content
  const {tableName}Content = (
    <ProCard boxShadow bordered extra={{tableName}Button}>
      <{TableName}Table
        tableHook={use{TableName}.table}
        columns={use{TableName}.columns}
        leftColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => (
              <AntButton
                icon={<EyeOutlined />}
                color="primary"
                variant="link"
                onClick={() => {
                  use{TableName}.desc.setParams({ id: record?.id });
                  use{TableName}.desc.open();
                }}
              />
            ),
          },
        ]}
        rightColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => (
              <AntButton
                icon={<EditOutlined />}
                color="primary"
                variant="link"
                onClick={() => {
                  use{TableName}.edit.setRequestParams({ id: record?.id });
                  use{TableName}.edit.setDeleteParams({ id: record?.id });
                  use{TableName}.edit.open();
                }}
              />
            ),
          },
        ]}
      />
      <{TableName}Create
        formHook={use{TableName}.create}
        fields={use{TableName}.fields}
        onSubmitSuccess={() => use{TableName}.table.reload()}
        title="Tạo {vnTableName}"
        variant="drawer"
      />
      <{TableName}Desc
        descHook={use{TableName}.desc}
        columns={use{TableName}.columns}
        requestParams={use{TableName}.desc.params}
        title="Thông tin {vnTableName}"
        variant="drawer"
        column={1}
      />
      <{TableName}Edit
        formHook={use{TableName}.edit}
        fields={use{TableName}.fields}
        requestParams={use{TableName}.edit.requestParams}
        deleteParams={use{TableName}.edit.deleteParams}
        onSubmitSuccess={() => use{TableName}.table.reload()}
        onDeleteSuccess={() => use{TableName}.table.reload()}
        title="Sửa {vnTableName}"
        variant="drawer"
      />
    </ProCard>
  );

  // Tab definition
  const {tableName}Tab = {
    key: "{tableName}",
    label: "{vnTableName}",
    children: {tableName}Content,
  };

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
      tabList={[{tableName}Tab]}
    />
  );
}
```

## Placeholder Mapping

Replace template placeholders with your table data:

### Naming Placeholders

- **{TABLE_NAME_UPPER}**: UPPERCASE table name for comments (e.g., `OPTIONS`, `USER_ROLES`)
- **{TableName}**: PascalCase table name (e.g., `Options`, `UserRoles`)
- **{tableName}**: camelCase table name (e.g., `options`, `userRoles`)
- **{vnTableName}**: Vietnamese table description (e.g., `tùy chọn`, `vai trò người dùng`)

### Template Structure

- Use **PascalCase** for component imports and usage
- Use **camelCase** for variable naming
- Use **Vietnamese** labels for all user-facing text
- Keep all component structure, imports, and hooks exactly as shown

## Quick Steps

1. **File Path**: Create `src/app/(front)/app/dev/{table-name}-tab/page.js`
2. **Copy Template**: Use the exact template structure above
3. **Replace Names**: Fill in table naming placeholders
4. **Vietnamese Labels**: Use appropriate Vietnamese descriptions
5. **Validate**: Ensure all imports and component usage are correct

## Critical Rules

- ✅ **File naming**: kebab-case folder with `-tab` suffix and `page.js` (e.g., `options-tab/page.js`)
- ✅ **Component structure**: Exact tab pattern with all CRUD operations
- ✅ **Component imports**: Import all 6 custom components (Table, Desc, Create, Edit, Columns, Fields)
- ✅ **Hook usage**: Use exact hook patterns (useTable, useDesc, useForm)
- ✅ **Vietnamese text**: Use Vietnamese for all user-facing labels
- ✅ **Template structure**: Keep all component structure unchanged
- ✅ **Variable naming**: Follow exact naming patterns for variables

## Component Integration

### Required Components:

- **{TableName}Table**: For data display
- **{TableName}Desc**: For viewing record details
- **{TableName}Create**: For creating new records
- **{TableName}Edit**: For editing records
- **{TableName}Columns**: For table column definitions
- **{TableName}Fields**: For form field definitions

### Required Hooks:

- **useTable()**: For table state management
- **useDesc()**: For description state management
- **useForm()**: For form state management (used twice: create and edit)

### Page Structure:

- **AntPage**: Main page wrapper with breadcrumbs and tabs
- **ProCard**: Content wrapper with shadow and border
- **Tab integration**: Single tab with complete CRUD operations
- **Action buttons**: Reload and Create buttons in tab header

## Tab Structure

The page uses a tab-based interface pattern:

- **Page level**: Empty pageButton array and placeholder pageContent
- **Tab level**: All functionality contained within the tab
- **Tab buttons**: Reload and Create buttons in tab header
- **Table columns**: Left column for view (EyeOutlined), right column for edit (EditOutlined)
- **CRUD operations**: All operations (Create, Read, Update, Delete) in drawer format

## Variable Naming Patterns

Follow exact naming patterns from template:

- **use{TableName}**: Object containing all hooks and component props
- **{tableName}Button**: Action buttons for tab header
- **{tableName}Content**: Tab content with all CRUD components
- **{tableName}Tab**: Tab definition object

## Table Column Configuration

### Left Column (View):

- Width: 56, align: "center", search: false
- EyeOutlined icon button
- onClick: setParams and open description drawer

### Right Column (Edit):

- Width: 56, align: "center", search: false
- EditOutlined icon button
- onClick: setRequestParams, setDeleteParams, and open edit drawer

## Validation Checklist

- ✅ **File location**: `src/app/(front)/app/dev/{table-name}-tab/page.js`
- ✅ **File naming**: kebab-case folder with `-tab` suffix
- ✅ **Template structure**: Exact tab pattern with all variables
- ✅ **Imports**: All required components, icons, and hooks imported
- ✅ **Component usage**: All 6 custom components properly integrated
- ✅ **Hook usage**: useTable, useDesc, useForm (x2) properly used
- ✅ **Vietnamese labels**: Proper Vietnamese text for all user-facing elements
- ✅ **Navigation**: Breadcrumbs and title properly configured
- ✅ **Tab structure**: Single tab with complete CRUD operations
- ✅ **Action buttons**: Reload and Create buttons in tab header
- ✅ **Table integration**: Table with view and edit columns
- ✅ **CRUD integration**: All 4 components with drawer variants
- ✅ **Success handling**: Proper table reload after operations
- ✅ **Variable naming**: Exact naming patterns followed

## Output Location

Generated file: `src/app/(front)/app/dev/{table-name}-tab/page.js`
