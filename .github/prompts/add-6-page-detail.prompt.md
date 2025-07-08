````prompt
# Generate Frontend Detail Page from SQL Table

## Instructions

Generate detail page file for edit/delete operations from SQL table structure following established patterns.

## Reference Examples

**MANDATORY**: Review these files COMPLETELY before generating any code:

- **SQL Input**: [`.github/prompts/examples/table-structure-sample.sql`](./examples/table-structure-sample.sql)
- **Detail Page Output**: [`.github/prompts/examples/frontend-page-detail-sample.js`](./examples/frontend-page-detail-sample.js)

## Critical Requirements

- **File Location**: Save in `src/app/(front)/app/dev/`
- **File Naming**: Create detail page file following kebab-case convention
  - `{tableName}/[id]/page.js` - for detail view with edit/delete operations
- **Coding Style**: Follow camelCase for variables/functions, PascalCase for component names, kebab-case for file names
- **ABSOLUTE ADHERENCE**: Copy the EXACT structure from sample files - do NOT modify any patterns
- **NO CUSTOM CHANGES**: Use ONLY the patterns shown in sample files - do NOT create your own variations
- **EXACT COPY**: Follow every detail of the sample files including component structure, imports, hooks, and naming

## Template Structure

**CRITICAL**: You MUST copy the EXACT structure from sample files. Do NOT create simplified versions.

### Detail Page Template (COPY EXACTLY from frontend-page-detail-sample.js)

```javascript
// path: @/app/(front)/app/dev/{tableName}/[id]/page.js
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
  // COPY EXACT STRUCTURE FROM SAMPLE
  // IMPORTANT: Replace 'useOptions' with 'use{TableName}' (e.g., useRooms, useUsers, etc.)
}
```

## Implementation Guidelines

1. **MANDATORY SAMPLE READING**: Read and understand EVERY LINE of the sample files before coding
2. **EXACT COPY REQUIREMENT**: Copy the complete structure from sample files - do NOT simplify or modify
3. **Component Integration**: Import and use corresponding components from `{tableName}-component.js`
4. **State Management**: Use EXACT hook patterns from samples: `useDesc, useForm, useNav`
5. **Page Structure**:
   - **Detail Page**: MUST have separate `PageContent` component with `use(params)` pattern
6. **EXACT PATTERNS**:
   - Use `items` prop in AntPage (NOT `breadcrumb`)
   - Use `ProCard boxShadow bordered` for detail page
   - Use `pageButton` and `pageContent` variables
7. **Icons**: Import and use exact icons from samples: `SettingOutlined`
8. **Vietnamese Labels**: Use Vietnamese table name from SQL comment for page titles
9. **Navigation**: Use exact navigation patterns with `items` array and proper paths
10. **Variable Naming**: Use table-specific naming for logic objects (e.g., `useRooms` for rooms table, `useUsers` for users table, NOT generic `useOptions`)

## CRITICAL SAMPLE ADHERENCE

### Detail Page MUST:

- Have `PageContent` function component with `{ params }` destructuring
- Use `const { id: {tableName}Id } = use(params);` pattern
- Use `use{TableName}` object with `desc`, `edit`, `columns`, `fields` properties (replace {TableName} with actual table name)
- Use `pageButton` array with BackButton and edit button
- Use `pageContent` variable with component integration
- Use dynamic `pageTitle` with fallback text
- Use proper `items` array with path navigation

## Detail Page Requirements

- **MUST** have separate `PageContent` function with `{ params }` parameter
- **MUST** use `const { id: {tableName}Id } = use(params);` pattern for ID extraction
- **MUST** use `use{TableName}` object containing: `desc: useDesc()`, `edit: useForm()`, `columns`, `fields` (replace {TableName} with actual table name)
- **MUST** use `pageButton` array with BackButton and edit button
- **MUST** use `pageContent` variable wrapping components in `ProCard boxShadow bordered`
- **MUST** use dynamic `pageTitle` with proper fallback
- **MUST** use `items` prop with path navigation including parent page link
- **MUST** import all required hooks: `useDesc, useForm, useNav`

## Component Structure

The detail page should follow this exact structure:

```javascript
function PageContent({ params }) {
  // Context
  const {} = usePageContext();

  // Hooks
  const { navBack } = useNav();
  const { id: {tableName}Id } = use(params);

  // {TableName} logic hooks
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
        title="Sửa {vietnamese_table_name}"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle = use{TableName}.desc?.dataSource?.{display_field} || "Chi tiết";

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
        { title: "{Vietnamese Table Name}", path: "/app/system/{tableName}" },
        { title: pageTitle },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
```

## Breadcrumb and Navigation

- **CRITICAL**: Use `items` prop in AntPage, NOT `breadcrumb` prop
- **Detail Page**: Add detail title as third level with proper path navigation
- **Icons**: Use `SettingOutlined` for category icons exactly as shown in samples
- **Navigation**: Use path property for clickable navigation items
- **Path Structure**: Follow pattern `/app/system/{tableName}` for parent page navigation

## Page Title and Display Field

- Use dynamic `pageTitle` based on record data with fallback to "Chi tiết"
- Select appropriate display field from table structure (typically name, title, or label field)
- Use Vietnamese table name from SQL comment for navigation breadcrumb

## CRITICAL WARNINGS

⚠️ **ABSOLUTE REQUIREMENTS**:

- Copy EVERY LINE of structure from sample files
- Do NOT create simplified or custom versions
- Do NOT use `breadcrumb` prop - use `items` prop only
- Do NOT skip the separate PageContent component
- Do NOT skip the use{TableName} object structure (table-specific naming)
- Do NOT skip the pageButton and pageContent variables
- Do NOT use different hook patterns than shown in samples

⚠️ **FORBIDDEN ACTIONS**:

- Creating simplified page structures
- Using different prop names than samples
- Skipping component separation (PageContent)
- Using different hook initialization patterns
- Modifying the sample's component organization
- Using breadcrumb prop instead of items prop

⚠️ **MANDATORY ACTIONS**:

- Read sample file completely before coding
- Copy exact import statements from samples
- Copy exact component structure from samples
- Copy exact hook usage patterns from samples
- Copy exact navigation patterns from samples
- Use Vietnamese labels appropriate for table context

## Validation Checklist

- ✅ File location: `src/app/(front)/app/dev/{tableName}/[id]/page.js`
- ✅ File naming: kebab-case convention
- ✅ **CRITICAL**: Exact sample structure copied completely
- ✅ **CRITICAL**: All sample imports included (icons, ProCard, hooks)
- ✅ **CRITICAL**: PageContent component separation maintained
- ✅ **CRITICAL**: use{TableName} object structure maintained (table-specific naming)
- ✅ **CRITICAL**: pageButton and pageContent variables maintained
- ✅ **CRITICAL**: items prop used instead of breadcrumb prop
- ✅ **CRITICAL**: All hook patterns match samples exactly
- ✅ Templates: Follow exact structure and naming patterns from samples
- ✅ Vietnamese: Proper Vietnamese labels and page titles
- ✅ Navigation: Proper items array and page navigation with paths
- ✅ State: Hook implementation matching samples

## Response Format

### Task Completion Summary

**Files Generated**:

- `src/app/(front)/app/dev/{tableName}/[id]/page.js`

**Detail Page**: ✅ Edit/delete operations ready
**Validation**: ✅ All requirements met
**Next Steps**: Detail page ready for use with complete edit/delete functionality
````
