# Generate Frontend Pages from SQL Table

## Instructions

Generate complete frontend page files from SQL table structure following established patterns.

## Reference Examples

Review these files before generating code:

- **SQL Input**: [`.github/prompts/examples/table-structure-sample.sql`](./examples/table-structure-sample.sql)
- **Provider Output**: [`.github/prompts/examples/frontend-provider-sample.js`](./examples/frontend-provider-sample.js)
- **List Page Output**: [`.github/prompts/examples/frontend-page-list-sample.js`](./examples/frontend-page-list-sample.js)
- **Detail Page Output**: [`.github/prompts/examples/frontend-page-detail-sample.js`](./examples/frontend-page-detail-sample.js)

## Requirements

- **File Location**: Save in `src/app/(front)/app/dev/`
- **File Naming**: Create 3 page files per table following kebab-case convention
  - `{tableName}/provider.js` - for page context and state management
  - `{tableName}/page.js` - for list/table view with CRUD operations
  - `{tableName}/[id]/page.js` - for detail view with edit/delete operations
- **Coding Style**: Follow camelCase for variables/functions, PascalCase for component names, kebab-case for file names
- **Modern Patterns**: Use ES6+ features, React hooks, context patterns, and consistent code structure
- **Strict Adherence**: Follow the exact template structure provided - do not modify or create additional patterns
- **No Custom Changes**: Use only the specified component patterns and import structure shown in the template

## Template Structure

```javascript
// path: @/app/(front)/app/dev/{tableName}/provider.js
import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "../../provider";
import { convertSelection } from "@/lib/util/convert-util";

const PageContext = createContext(null);
export function PageProvider({ children }) {
  /* context provider setup */
}
export function usePageContext() {
  /* context hook */
}
```

```javascript
// path: @/app/(front)/app/dev/{tableName}/page.js
"use client";

import { Space } from "antd";
import { AntPage, AntButton, DetailButton } from "@/component/common";
import { {TableName}Table, {TableName}Create, {TableName}Columns, {TableName}Fields } from "@/component/custom";

export default function Page(props) { /* list page with table and create functionality */ }
```

```javascript
// path: @/app/(front)/app/dev/{tableName}/[id]/page.js
"use client";

import { use } from "react";
import { Space } from "antd";
import { AntPage, AntButton, BackButton } from "@/component/common";
import { {TableName}Desc, {TableName}Edit, {TableName}Columns, {TableName}Fields } from "@/component/custom";

export default function Page(props) { /* detail page with description and edit functionality */ }
```

## Implementation Guidelines

1. **File Structure**: Create 3 separate page files for complete UI functionality
2. **Component Integration**: Import and use corresponding components from `{tableName}-component.js`
3. **State Management**: Use React hooks and context for state management
4. **Navigation**: Implement proper navigation between list and detail views
5. **Page Structure**:
   - Provider: Context setup with memoized values
   - List Page: Table view with create functionality and navigation to detail
   - Detail Page: Description view with edit/delete functionality
6. **Vietnamese Labels**: Use Vietnamese table name from SQL comment for page titles and breadcrumbs
7. **Icon Integration**: Use appropriate Ant Design icons for visual consistency
8. **Responsive Design**: Use ProCard and proper spacing for responsive layouts
9. **Hook Integration**: Use custom hooks for table, form, navigation, and description functionality

## Page Structure Details

### Provider File

- Create context for shared state and configuration
- Import and process option data from app context
- Use `convertSelection` for dropdown data conversion
- Memoize context values to prevent unnecessary re-renders

### List Page

- Display table with pagination, search, and filtering
- Include action buttons for reload and create new record
- Implement navigation to detail page via DetailButton
- Use breadcrumb navigation with appropriate icons
- Handle create form in drawer/modal variant

### Detail Page

- Display record details using description component
- Include edit functionality in drawer/modal variant
- Implement back navigation and delete functionality
- Dynamic page title based on record data
- Handle form submission and navigation after operations

## Breadcrumb and Navigation

- **List Page**: Use category icon + category name, then table name
- **Detail Page**: Add detail title as third level
- **Icons**: Use appropriate Ant Design icons for visual hierarchy
- **Navigation**: Implement `useNav` hook for navigation between pages

## Validation Checklist

- ✅ File location: `src/app/(front)/app/dev/{tableName}/provider.js`, `src/app/(front)/app/dev/{tableName}/page.js`, `src/app/(front)/app/dev/{tableName}/[id]/page.js`
- ✅ File naming: kebab-case convention
- ✅ Components: All 3 page files (provider, list, detail)
- ✅ Imports: Correct import statements for components and utilities
- ✅ Templates: Follow exact structure and naming patterns
- ✅ Vietnamese: Proper Vietnamese labels and page titles
- ✅ Navigation: Proper breadcrumb and page navigation
- ✅ State: Context provider and hook implementation

## Response Format

### Task Completion Summary

**Files Generated**:

- `src/app/(front)/app/dev/{tableName}/provider.js`
- `src/app/(front)/app/dev/{tableName}/page.js`
- `src/app/(front)/app/dev/{tableName}/[id]/page.js`

**Pages**: ✅ Provider, List, Detail
**Validation**: ✅ All requirements met
**Next Steps**: Frontend pages ready for use with complete CRUD functionality
