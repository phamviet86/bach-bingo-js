# Generate Frontend Components from SQL Table

## Instructions

Generate complete frontend component files from SQL table structure following established patterns.

## Reference Examples

Review these files before generating code:

- **SQL Input**: [`.github/prompts/examples/table-structure-sample.sql`](./examples/table-structure-sample.sql)
- **Component Output**: [`.github/prompts/examples/frontend-component-sample.js`](./examples/frontend-component-sample.js)

## Requirements

- **File Location**: Save in `src/component/custom/`
- **File Naming**: Create 1 component file per table following kebab-case convention
  - `{tableName}-component.js` - for all CRUD components and field definitions
- **Coding Style**: Follow camelCase for variables/functions, PascalCase for component names, kebab-case for file names
- **Modern Patterns**: Use ES6+ features, functional components, and consistent code structure
- **MANDATORY TEMPLATE ADHERENCE**: Copy the EXACT structure from `frontend-component-sample.js` - do NOT modify patterns, prop names, or implementation details
- **No Custom Changes**: Use ONLY the patterns shown in the sample file - do not create your own variations
- **Exact API Patterns**: Use `onRequest`, `onSubmit`, `onDelete` exactly as shown in sample
- **Exact Fields Pattern**: Return JSX with `ProForm.Group` structure, NOT arrays

## Template Structure

**IMPORTANT**: Follow this EXACT structure from `frontend-component-sample.js` - do NOT modify any patterns:

```javascript
// path: @/component/custom/{tableName}-component.js

// import for components
import { AntTable, AntForm, AntDescriptions } from "@/component/common";
import { fetchList, fetchGet, fetchPost, fetchPut, fetchDelete } from "@/lib/util/fetch-util";

// import for ProForm components
import { ProForm, ProFormText } from "@ant-design/pro-form";

// Component definitions - USE EXACT PATTERNS FROM SAMPLE
export function {TableName}Table(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/{tableName}", params, sort, filter)
      }
    />
  );
}

export function {TableName}Desc(props) {
  return (
    <AntDescriptions
      {...props}
      onRequest={(params) => fetchGet(`/api/{tableName}/${params?.id}`)}
    />
  );
}

export function {TableName}Create(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/{tableName}", values)}
    />
  );
}

export function {TableName}Edit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/{tableName}/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/{tableName}/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/{tableName}/${params?.id}`)}
    />
  );
}

// Columns and fields - USE EXACT PATTERNS FROM SAMPLE
export function {TableName}Columns(params) {
  const {} = params || {};
  return [/* column definitions */];
}

export function {TableName}Fields(params) {
  const {} = params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        {/* field definitions */}
      </ProForm.Group>
    </>
  );
}
```

## Implementation Guidelines

1. **MANDATORY**: Copy the EXACT component structure from `frontend-component-sample.js`
2. **API Integration**: Use the EXACT patterns from sample:
   - `onRequest={(params, sort, filter) => fetchList("/api/{tableName}", params, sort, filter)}`
   - `onRequest={(params) => fetchGet(\`/api/{tableName}/${params?.id}\`)}`
   - `onSubmit={(values) => fetchPost("/api/{tableName}", values)}`
   - `onSubmit={(values) => fetchPut(\`/api/{tableName}/${values?.id}\`, values)}`
   - `onDelete={(params) => fetchDelete(\`/api/{tableName}/${params?.id}\`)}`
3. **Form Validation**: Add validation rules based on NOT NULL constraints in SQL
4. **Field Mapping**:
   - Required fields: Add `rules={[{ required: true }]}` for NOT NULL columns
   - Optional fields: No validation rules for nullable columns
   - System fields: Include `id` as hidden/disabled, exclude `created_at`, `updated_at`, `deleted_at`
5. **Vietnamese Labels**: Use Vietnamese table name from SQL comment and appropriate Vietnamese field labels
6. **Component Naming**: Use PascalCase with table name prefix (e.g., `OptionsTable`, `OptionsCreate`)
7. **ProForm Components**:
   - Use EXACT JSX structure: `return (<> <ProForm.Group>...</ProForm.Group> </>)`
   - DO NOT use array return with filter(Boolean)
   - Group related fields using `ProForm.Group`
   - Add meaningful placeholders with Vietnamese text
8. **Table Columns**:
   - Use `const {} = params || {};` pattern exactly as shown in sample
   - Use appropriate `valueType` based on column data type
   - Provide Vietnamese column titles
   - Include all non-system fields
9. **Function Parameters**:
   - Use `(params)` for Columns and Fields functions exactly as in sample
   - Use destructuring patterns exactly as shown in sample

## Field Type Mapping

- **VARCHAR/TEXT**: `ProFormText` with `valueType: "text"`
- **INT/SERIAL**: `ProFormDigit` with `valueType: "digit"`
- **BOOLEAN**: `ProFormSwitch` with `valueType: "switch"`
- **DATE/TIMESTAMP**: `ProFormDatePicker` with `valueType: "date"`
- **ENUM**: `ProFormSelect` with `valueType: "select"`

## Validation Checklist

- ✅ File location: `src/component/custom/{tableName}-component.js`
- ✅ File naming: kebab-case convention
- ✅ Components: All 6 functions (Table, Desc, Create, Edit, Columns, Fields)
- ✅ Imports: Correct import statements for components and utilities
- ✅ **CRITICAL**: Use EXACT API patterns from sample (`onRequest`, `onSubmit`, `onDelete`)
- ✅ **CRITICAL**: Use EXACT Fields pattern - JSX return with `ProForm.Group`, NOT arrays
- ✅ **CRITICAL**: Use EXACT function signatures with `(params)` parameter
- ✅ **CRITICAL**: Use EXACT destructuring pattern `const {} = params || {};`
- ✅ Validation: Required field validation based on SQL NOT NULL constraints
- ✅ Vietnamese: Proper Vietnamese labels and placeholders
- ✅ Index Export: Add component exports to `src/component/custom/index.js`

## CRITICAL WARNINGS

⚠️ **DO NOT**:

- Change `onRequest`/`onSubmit`/`onDelete` to other prop names
- Return arrays from Fields function - use JSX with ProForm.Group
- Modify the function signatures or parameter patterns
- Add custom implementations not shown in the sample
- Use different destructuring patterns

⚠️ **MUST DO**:

- Copy the exact structure from `frontend-component-sample.js`
- Use the exact API integration patterns shown
- Use the exact JSX structure for Fields function
- Follow the exact parameter and destructuring patterns

## Export to Index File

After creating the component file, add all component exports to the main index file:

**File Location**: `src/component/custom/index.js`

**Export Pattern**:

```javascript
// Export all components from {tableName}-component.js
export * from "./{tableName}-component";
```

**Implementation**:

- Add the export block to the existing index.js file

## Response Format

### Task Completion Summary

**Files Generated**:

- `src/component/custom/{tableName}-component.js`
- Updated `src/component/custom/index.js` with component exports

**Components**: ✅ Table, Desc, Create, Edit, Columns, Fields
**Exports**: ✅ Added to index.js file
**Validation**: ✅ All requirements met
**Next Steps**: Frontend components ready for use in pages and forms
