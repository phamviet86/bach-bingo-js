# Generate Frontend Pages from SQL Table

## Instructions

Generate complete frontend page files from SQL table structure following established patterns.

## Reference Examples

**MANDATORY**: Review these files COMPLETELY before generating any code:

- **SQL Input**: [`.github/prompts/examples/table-structure-sample.sql`](./examples/table-structure-sample.sql)
- **Provider Output**: [`.github/prompts/examples/frontend-provider-sample.js`](./examples/frontend-provider-sample.js)
- **List Page Output**: [`.github/prompts/examples/frontend-page-list-sample.js`](./examples/frontend-page-list-sample.js)
- **Detail Page Output**: [`.github/prompts/examples/frontend-page-detail-sample.js`](./examples/frontend-page-detail-sample.js)

## Critical Requirements

- **File Location**: Save in `src/app/(front)/app/dev/`
- **File Naming**: Create 3 page files per table following kebab-case convention
  - `{tableName}/provider.js` - for page context and state management
  - `{tableName}/page.js` - for list/table view with CRUD operations
  - `{tableName}/[id]/page.js` - for detail view with edit/delete operations
- **Coding Style**: Follow camelCase for variables/functions, PascalCase for component names, kebab-case for file names
- **ABSOLUTE ADHERENCE**: Copy the EXACT structure from sample files - do NOT modify any patterns
- **NO CUSTOM CHANGES**: Use ONLY the patterns shown in sample files - do NOT create your own variations
- **EXACT COPY**: Follow every detail of the sample files including component structure, imports, hooks, and naming

## Template Structure

**CRITICAL**: You MUST copy the EXACT structure from sample files. Do NOT create simplified versions.

### Provider Template (COPY EXACTLY from frontend-provider-sample.js)

```javascript
// path: @/app/(front)/app/dev/{tableName}/provider.js
import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "../../provider";
import { convertSelection } from "@/lib/util/convert-util";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const { optionData } = useAppContext();
  // Use the sample pattern with appropriate option conversions

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

### List Page Template (COPY EXACTLY from frontend-page-list-sample.js)

```javascript
// path: @/app/(front)/app/dev/{tableName}/page.js
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
  // COPY EXACT STRUCTURE FROM SAMPLE
  // IMPORTANT: Replace 'useOptions' with 'use{TableName}' (e.g., useRooms, useUsers, etc.)
}
```

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
4. **State Management**: Use EXACT hook patterns from samples: `useTable, useForm, useNav, useDesc`
5. **Page Structure**:
   - **Provider**: MUST use `{ optionData }` destructuring from `useAppContext()` exactly as shown
   - **List Page**: MUST have separate `PageContent` component with all sample logic including `use{TableName}` object (table-specific naming)
   - **Detail Page**: MUST have separate `PageContent` component with `use(params)` pattern
6. **EXACT PATTERNS**:
   - Use `items` prop in AntPage (NOT `breadcrumb`)
   - Use `ProCard boxShadow bordered` for list page
   - Use `ProCard boxShadow bordered` for detail page
   - Use `pageButton` and `pageContent` variables
   - Use `leftColumns` with render function for DetailButton
7. **Icons**: Import and use exact icons from samples: `SettingOutlined, InfoCircleOutlined`
8. **Vietnamese Labels**: Use Vietnamese table name from SQL comment for page titles
9. **Navigation**: Use exact navigation patterns with `items` array and proper paths
10. **Variable Naming**: Use table-specific naming for logic objects (e.g., `useRooms` for rooms table, `useUsers` for users table, NOT generic `useOptions`)

## CRITICAL SAMPLE ADHERENCE

### Provider File MUST:

- Use `const { optionData } = useAppContext();` exactly as shown
- Include sample comment structure for option conversion
- Use `contextValue` variable with proper memoization

### List Page MUST:

- Have `PageContent` function component separate from main Page
- Use `use{TableName}` object with `table`, `create`, `columns`, `fields` properties (replace {TableName} with actual table name)
- Use `pageButton` array with reload and create buttons
- Use `pageContent` variable with ProCard wrapper
- Use `leftColumns` array with DetailButton render function
- Use proper `items` array for AntPage navigation

### Detail Page MUST:

- Have `PageContent` function component with `{ params }` destructuring
- Use `const { id: {tableName}Id } = use(params);` pattern
- Use `use{TableName}` object with `desc`, `edit`, `columns`, `fields` properties (replace {TableName} with actual table name)
- Use `pageButton` array with BackButton and edit button
- Use `pageContent` variable with component integration
- Use dynamic `pageTitle` with fallback text
- Use proper `items` array with path navigation

## Page Structure Details

### Provider File Requirements

- **MUST** destructure `{ optionData }` from `useAppContext()` exactly as shown in sample
- **MUST** include sample comment structure for option conversion examples
- **MUST** use `contextValue` variable with proper memoization pattern
- **MUST** follow exact import and export structure from sample

### List Page Requirements

- **MUST** have separate `PageContent` function component
- **MUST** use `use{TableName}` object containing: `table: useTable()`, `create: useForm()`, `columns`, `fields` (replace {TableName} with actual table name)
- **MUST** use `pageButton` array with proper button configurations
- **MUST** use `pageContent` variable wrapping table in `ProCard boxShadow bordered`
- **MUST** use `leftColumns` array with DetailButton render function
- **MUST** use `items` prop (NOT `breadcrumb`) in AntPage with proper icon structure
- **MUST** import all icons used in sample: `SettingOutlined, InfoCircleOutlined`

### Detail Page Requirements

- **MUST** have separate `PageContent` function with `{ params }` parameter
- **MUST** use `const { id: {tableName}Id } = use(params);` pattern for ID extraction
- **MUST** use `use{TableName}` object containing: `desc: useDesc()`, `edit: useForm()`, `columns`, `fields` (replace {TableName} with actual table name)
- **MUST** use `pageButton` array with BackButton and edit button
- **MUST** use `pageContent` variable wrapping components in `ProCard boxShadow bordered`
- **MUST** use dynamic `pageTitle` with proper fallback
- **MUST** use `items` prop with path navigation including parent page link
- **MUST** import all required hooks: `useDesc, useForm, useNav`

## Breadcrumb and Navigation

- **CRITICAL**: Use `items` prop in AntPage, NOT `breadcrumb` prop
- **List Page**: Use exact pattern from sample with icon and title structure
- **Detail Page**: Add detail title as third level with proper path navigation
- **Icons**: Use `SettingOutlined` for category icons exactly as shown in samples
- **Navigation**: Use path property for clickable navigation items

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

- Read each sample file completely before coding
- Copy exact import statements from samples
- Copy exact component structure from samples
- Copy exact hook usage patterns from samples
- Copy exact navigation patterns from samples
- Use Vietnamese labels appropriate for table context

## Validation Checklist

- ✅ File location: `src/app/(front)/app/dev/{tableName}/provider.js`, `src/app/(front)/app/dev/{tableName}/page.js`, `src/app/(front)/app/dev/{tableName}/[id]/page.js`
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
- ✅ State: Context provider and hook implementation matching samples

## Response Format

### Task Completion Summary

**Files Generated**:

- `src/app/(front)/app/dev/{tableName}/provider.js`
- `src/app/(front)/app/dev/{tableName}/page.js`
- `src/app/(front)/app/dev/{tableName}/[id]/page.js`

**Pages**: ✅ Provider, List, Detail
**Validation**: ✅ All requirements met
**Next Steps**: Frontend pages ready for use with complete CRUD functionality
