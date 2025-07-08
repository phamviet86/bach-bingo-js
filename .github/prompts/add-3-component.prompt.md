# Generate Frontend Components from SQL Table

## Instructions

Generate complete frontend component files from SQL table structure following established patterns.

## Reference Examples

**MANDATORY**: Review these files COMPLETELY before generating any code:

- **SQL Input**: [`.github/prompts/examples/table-structure-sample.sql`](./examples/table-structure-sample.sql)
- **Component Output**: [`.github/prompts/examples/frontend-component-sample.js`](./examples/frontend-component-sample.js)

## Critical Requirements

- **File Location**: Save in `src/component/custom/`
- **File Naming**: Create 1 component file per table following kebab-case convention
  - `{tableName}-component.js` - for all CRUD components and field definitions
- **Coding Style**: Follow camelCase for variables/functions, PascalCase for component names, kebab-case for file names
- **Modern Patterns**: Use ES6+ features, functional components, and consistent code structure
- **ABSOLUTE ADHERENCE**: Copy the EXACT structure from sample files - do NOT modify any patterns
- **NO CUSTOM CHANGES**: Use ONLY the patterns shown in sample files - do NOT create your own variations
- **EXACT COPY**: Follow every detail of the sample files including component structure, imports, API patterns, and field definitions

## Template Structure

**CRITICAL**: You MUST copy the EXACT structure from sample files. Do NOT create simplified versions.

### Component Template (COPY EXACTLY from frontend-component-sample.js)

```javascript
// path: @/component/custom/{tableName}-component.js

import { AntTable, AntForm, AntDescriptions } from "@/component/common";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/lib/util/fetch-util";
import { ProForm, ProFormText } from "@ant-design/pro-form";

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

export function {TableName}Columns(params) {
  const {} = params || {};

  return [
    {
      title: "Field Title",
      dataIndex: "field_name",
      valueType: "text",
    },
    // ...more columns
  ];
}

export function {TableName}Fields(params) {
  const {} = params || {};

  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="field_name"
          label="Field Label"
          placeholder="Enter field value"
          rules={[{ required: true }]}
        />
        // ...more fields
      </ProForm.Group>
    </>
  );
}
```

## Implementation Guidelines

1. **MANDATORY SAMPLE READING**: Read and understand EVERY LINE of the sample files before coding
2. **EXACT COPY REQUIREMENT**: Copy the complete structure from sample files - do NOT simplify or modify
3. **API Integration**: Use the EXACT patterns from sample:
   - `onRequest={(params, sort, filter) => fetchList("/api/{tableName}", params, sort, filter)}`
   - `onRequest={(params) => fetchGet(\`/api/{tableName}/${params?.id}\`)}`
   - `onSubmit={(values) => fetchPost("/api/{tableName}", values)}`
   - `onSubmit={(values) => fetchPut(\`/api/{tableName}/${values?.id}\`, values)}`
   - `onDelete={(params) => fetchDelete(\`/api/{tableName}/${params?.id}\`)}`
4. **Form Validation**: Add validation rules based on NOT NULL constraints in SQL
5. **Field Mapping**:
   - Required fields: Add `rules={[{ required: true }]}` for NOT NULL columns
   - Optional fields: No validation rules for nullable columns
   - System fields: Include `id` as hidden/disabled, exclude `created_at`, `updated_at`, `deleted_at`
6. **Vietnamese Labels**: Use Vietnamese table name from SQL comment and appropriate Vietnamese field labels
7. **Component Naming**: Use PascalCase with table name prefix (e.g., `OptionsTable`, `OptionsCreate`)
8. **ProForm Components**:
   - Use EXACT JSX structure: `return (<> <ProForm.Group>...</ProForm.Group> </>)`
   - DO NOT use array return with filter(Boolean)
   - Group related fields using `ProForm.Group`
   - Add meaningful placeholders with Vietnamese text
9. **Table Columns**:
   - Use `const {} = params || {};` pattern exactly as shown in sample
   - Use appropriate `valueType` based on column data type
   - Provide Vietnamese column titles
   - Include all non-system fields
10. **Function Parameters**:
    - Use `(params)` for Columns and Fields functions exactly as in sample
    - Use destructuring patterns exactly as shown in sample

## CRITICAL SAMPLE ADHERENCE

### Component Functions MUST:

- Use EXACT import statements from sample: `import { AntTable, AntForm, AntDescriptions } from "@/component/common";`
- Use EXACT fetch imports: `import { fetchList, fetchGet, fetchPost, fetchPut, fetchDelete } from "@/lib/util/fetch-util";`
- Use EXACT ProForm imports: `import { ProForm, ProFormText } from "@ant-design/pro-form";`
- Use EXACT component structure with props spreading: `<AntTable {...props} onRequest={...} />`
- Use EXACT API endpoint patterns: `/api/{tableName}` and `/api/{tableName}/${params?.id}`

### Columns Function MUST:

- Use `const {} = params || {};` exactly as shown
- Return array of objects with exact structure: `{ title: "", dataIndex: "", valueType: "" }`
- Use Vietnamese titles for all columns
- Include all non-system database fields

### Fields Function MUST:

- Use `const {} = params || {};` exactly as shown
- Return JSX with `<> <ProForm.Group>...</ProForm.Group> </>` structure
- Include hidden/disabled ID field in first ProForm.Group
- Group all other fields in second ProForm.Group
- Use snake_case for field names (matching database columns)
- Add `rules={[{ required: true }]}` for NOT NULL fields
- Use Vietnamese labels and placeholders

### Variable Naming MUST:

- Use snake_case for database field names (NOT camelCase conversion)
- Use Vietnamese labels and placeholders consistently
- Use exact component naming patterns from sample

## Field Type Mapping

- **VARCHAR/TEXT**: `ProFormText` with `valueType: "text"`
- **INT/SERIAL**: `ProFormDigit` with `valueType: "digit"`
- **BOOLEAN**: `ProFormSwitch` with `valueType: "switch"`
- **DATE/TIMESTAMP**: `ProFormDatePicker` with `valueType: "date"`
- **ENUM**: `ProFormSelect` with `valueType: "select"`

## Validation Checklist

- ✅ **MANDATORY SAMPLE READING**: Completely reviewed frontend-component-sample.js
- ✅ **File location**: `src/component/custom/{tableName}-component.js`
- ✅ **File naming**: kebab-case convention
- ✅ **Components**: All 6 functions (Table, Desc, Create, Edit, Columns, Fields)
- ✅ **Imports**: Correct import statements for components and utilities
- ✅ **EXACT API PATTERNS**: Uses exact `onRequest`, `onSubmit`, `onDelete` patterns from sample
- ✅ **EXACT FIELDS PATTERN**: Uses JSX return with `ProForm.Group`, NOT arrays
- ✅ **EXACT FUNCTION SIGNATURES**: Uses `(params)` parameter exactly as shown
- ✅ **EXACT DESTRUCTURING**: Uses `const {} = params || {};` pattern exactly as shown
- ✅ **Validation**: Required field validation based on SQL NOT NULL constraints
- ✅ **Vietnamese**: Proper Vietnamese labels and placeholders
- ✅ **Variable naming**: snake_case for database fields (NOT camelCase)
- ✅ **Index Export**: Add component exports to `src/component/custom/index.js`

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

**Export Pattern**: EXACT pattern from sample

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
**Sample Adherence**: ✅ EXACT copy of sample patterns - no modifications made
**Validation**: ✅ All requirements met exactly as specified in sample
**Exports**: ✅ Added to index.js file
**Next Steps**: Frontend components ready for use in pages and forms
