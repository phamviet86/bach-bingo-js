# Generate Frontend Tab Page from SQL Table

## Instructions

Generate complete frontend tab page file from SQL table structure following established patterns.

## Reference Examples

**MANDATORY**: Review these files COMPLETELY before generating any code:

- **SQL Input**: [`.github/prompts/examples/table-structure-sample.sql`](./examples/table-structure-sample.sql)
- **Tab Page Output**: [`.github/prompts/examples/frontend-page-tab-sample.js`](./examples/frontend-page-tab-sample.js)

## Critical Requirements

- **File Location**: Save in `src/app/(front)/app/dev/`
- **File Naming**: Create 1 tab page file per table following kebab-case convention
  - `{tableName}-tab/page.js` - for tab view with table operations
- **Coding Style**: Follow camelCase for variables/functions, PascalCase for component names, kebab-case for file names
- **ABSOLUTE ADHERENCE**: Copy the EXACT structure from sample files - do NOT modify any patterns
- **NO CUSTOM CHANGES**: Use ONLY the patterns shown in sample files - do NOT create your own variations
- **EXACT COPY**: Follow every detail of the sample files including component structure, imports, hooks, and naming

## Template Structure

**CRITICAL**: You MUST copy the EXACT structure from sample files. Do NOT create simplified versions.

### Tab Page Template (COPY EXACTLY from frontend-page-tab-sample.js)

```javascript
// path: @/app/(front)/app/dev/{tableName}-tab/page.js
"use client";

import { Space } from "antd";
import {
  SettingOutlined,
  InfoCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
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

export default function Page() {…}
```

## Implementation Guidelines

1. **MANDATORY SAMPLE READING**: Read and understand EVERY LINE of the sample file before coding
2. **EXACT COPY REQUIREMENT**: Copy the complete structure from sample file - do NOT simplify or modify
3. **Component Integration**: Import and use corresponding components from `{tableName}-component.js`
4. **State Management**: Use EXACT hook patterns from sample: `useTable, useDesc, useForm`
5. **Page Structure**:
   - **Tab Page**: MUST have all CRUD operations in tab format
6. **EXACT PATTERNS**:
   - Use `leftColumns` with render function for InfoCircleOutlined button
   - Use `rightColumns` with render function for EditOutlined button
7. **Icons**: Import and use exact icons from sample: `SettingOutlined, InfoCircleOutlined, EditOutlined`
8. **Vietnamese Labels**: Use Vietnamese table name from SQL comment for page titles
9. **Navigation**: Use exact navigation patterns with `items` array and proper paths
10. **Variable Naming**: Use table-specific naming for logic objects (e.g., `useRooms` for rooms table, `useUsers` for users table, NOT generic `useOptions`)

## CRITICAL SAMPLE ADHERENCE

### Tab Page File MUST:

- Use exact import structure from sample
- Have `pageButton` array (empty in sample)
- Have `pageContent` variable with empty ProCard
- Use `use{TableName}` object with ALL properties: `table`, `create`, `desc`, `edit`, `columns`, `fields` (replace {TableName} with actual table name)
- Use `{tableName}Button` variable with exact Space and AntButton structure
- Use `{tableName}Content` variable with ProCard wrapper and all CRUD components
- Use `{tableName}Tab` object with `key`, `label`, `children` properties
- Use exact AntPage structure with `items`, `title`, `extra`, `content`, `tabList` props

## Page Structure Details

### Tab Page Requirements

- **MUST** import all required icons: `SettingOutlined, InfoCircleOutlined, EditOutlined`
- **MUST** import all required components: table, desc, create, edit, columns, fields
- **MUST** import all required hooks: `useTable, useDesc, useForm`
- **MUST** use `use{TableName}` object containing ALL properties from sample
- **MUST** use button variable with exact naming pattern: `{tableName}Button`
- **MUST** use content variable with exact naming pattern: `{tableName}Content`
- **MUST** use tab object with exact naming pattern: `{tableName}Tab`
- **MUST** use ProCard with `boxShadow bordered` props for content wrapper
- **MUST** use ProCard with `boxShadow bordered extra` props for table wrapper
- **MUST** include ALL CRUD components: Table, Create, Desc, Edit
- **MUST** use exact column configurations: `leftColumns` and `rightColumns`
- **MUST** use exact button configurations in Space component
- **MUST** use exact hook integrations and callback patterns
- **MUST** use Vietnamese labels for buttons and titles
- **MUST** use exact AntPage props structure with tabList

## Button and Column Structure

### Button Requirements

- **MUST** use exact reload button with `useOptions.table.reload()` callback
- **MUST** use exact create button with `useOptions.create.open()` callback
- **MUST** use exact info button in leftColumns with InfoCircleOutlined icon
- **MUST** use exact edit button in rightColumns with EditOutlined icon
- **MUST** use exact button configurations: color, variant, onClick patterns

### Column Requirements

- **MUST** use leftColumns array with width: 56, align: "center", search: false
- **MUST** use rightColumns array with width: 56, align: "center", search: false
- **MUST** use exact render functions for both column types
- **MUST** use exact hook integrations: setParams, open, setRequestParams, setDeleteParams

## Component Integration

### CRUD Component Requirements

- **MUST** use exact prop patterns for all components
- **MUST** use exact hook integrations: tableHook, formHook, descHook
- **MUST** use exact callback patterns: onSubmitSuccess, onDeleteSuccess
- **MUST** use exact variant configurations: drawer
- **MUST** use exact column configurations for desc component
- **MUST** use Vietnamese titles for all components

## Breadcrumb and Navigation

- **CRITICAL**: Use `items` prop in AntPage with exact structure from sample
- **MUST** use Space component with SettingOutlined icon and "Hệ thống" text
- **MUST** use Vietnamese table name for second breadcrumb item
- **MUST** use tabList prop with single tab object

## File Naming Convention

- **CRITICAL**: File must be named `{tableName}-tab/page.js` (NOT `{tableName}/tab/page.js`)
- **MUST** use kebab-case for folder name: `options-tab`, `rooms-tab`, `users-tab`
- **MUST** place in `src/app/(front)/app/dev/` directory
