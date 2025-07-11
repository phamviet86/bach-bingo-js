---
mode: "agent"
model: GPT-4.1
tools: ['changes', 'codebase', 'editFiles', 'githubRepo', 'problems', 'search', 'searchResults']
description: "Generate frontend component files from SQL table structure using template code"
---

# Generate Frontend Components from SQL Table

## Instructions

Generate complete frontend component files from SQL table structure using the template below.

## Reference Examples

Review these files for input/output pattern:

- **SQL Input**: [`.github/prompts/examples/table-structure-sample.sql`](./examples/table-structure-sample.sql)
- **Component Output**: [`.github/prompts/examples/frontend-component-sample.js`](./examples/frontend-component-sample.js)

## Template

Use this exact template code:

```javascript
// path: @/component/custom/{table-name}-component.js

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
        fetchList("/api/{table-name}", params, sort, filter)
      }
    />
  );
}

export function {TableName}Desc(props) {
  return (
    <AntDescriptions
      {...props}
      onRequest={(params) => fetchGet(`/api/{table-name}/${params?.id}`)}
    />
  );
}

export function {TableName}Create(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/{table-name}", values)}
    />
  );
}

export function {TableName}Edit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/{table-name}/${params?.id}`)}
      onSubmit={(values) =>
        fetchPut(`/api/{table-name}/${values?.id}`, values)
      }
      onDelete={(params) =>
        fetchDelete(`/api/{table-name}/${params?.id}`)
      }
    />
  );
}

export function {TableName}Columns(params) {
  const {} = params || {};
  return [
    {
      title: "{Column Header}",
      dataIndex: "{column_name}",
      valueType: "text",
    },
    // Repeat the above object for each column...
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
        {/* Repeat this <ProFormText> block for each field */}
        <ProFormText
          name="{field_name}"
          label="{Field Label}"
          placeholder="Nhập {Field Label}"
          rules={[{ required: true }]}
        />
      </ProForm.Group>
    </>
  );
}
```

## Placeholder Mapping

Replace template placeholders with your table data:

### Naming Placeholders

- **{table-name}**: kebab-case table name (e.g., `options`, `user-roles`)
- **{TableName}**: PascalCase table name (e.g., `Options`, `UserRoles`)
- **{ProFormImports}**: comma-separated ProForm field components (e.g., `ProFormText`, `ProFormDigit`)

### Field Placeholders

- **{column_name}**: Database column names in snake_case (e.g., `option_table`, `user_name`)
- **{Column Header}**: Vietnamese column titles for table display
- **{field_name}**: Database field names for form inputs (snake_case)
- **{Field Label}**: Vietnamese labels for form fields
- Use **snake_case** for database field names (do NOT convert to camelCase)
- Skip system columns: `id`, `created_at`, `updated_at`, `deleted_at`

## Quick Steps

1. **File Path**: Create `src/component/custom/{table-name}-component.js`
2. **Copy Template**: Use the exact template structure above
3. **Replace Names**: Fill in table naming placeholders
4. **Map Fields**: Replace field placeholders with your table's columns
5. **Update Index**: Add component exports to `src/component/custom/index.js`
6. **Validate**: Ensure all 6 functions are present with correct patterns

## Critical Rules

- ✅ **File naming**: kebab-case (e.g., `options-component.js`)
- ✅ **Functions**: 6 required (Table, Desc, Create, Edit, Columns, Fields)
- ✅ **API patterns**: Use exact fetch utility patterns from template
- ✅ **JSX structure**: Fields function returns JSX with ProForm.Group, NOT arrays
- ✅ **Field validation**: Add `rules={[{ required: true }]}` for NOT NULL fields
- ✅ **Field naming**: Use snake_case for database fields
- ✅ **Vietnamese labels**: Use Vietnamese text for all user-facing labels
- ✅ **Component naming**: Use PascalCase with table name prefix

## Field Type Mapping

Map SQL column types to appropriate ProForm components:

- **VARCHAR/TEXT**: `ProFormText` with `valueType: "text"`
- **INT/SERIAL**: `ProFormDigit` with `valueType: "digit"`
- **BOOLEAN**: `ProFormSwitch` with `valueType: "switch"`
- **DATE/TIMESTAMP**: `ProFormDatePicker` with `valueType: "date"`
- **ENUM**: `ProFormSelect` with `valueType: "select"`

## Component Function Patterns

### Table Function MUST:

- Use exact pattern: `onRequest={(params, sort, filter) => fetchList("/api/{table-name}", params, sort, filter)}`
- Use props spreading: `<AntTable {...props} onRequest={...} />`

### Description Function MUST:

- Use exact pattern: `onRequest={(params) => fetchGet(\`/api/{table-name}/${params?.id}\`)}`
- Use props spreading: `<AntDescriptions {...props} onRequest={...} />`

### Create Function MUST:

- Use exact pattern: `onSubmit={(values) => fetchPost("/api/{table-name}", values)}`
- Use props spreading: `<AntForm {...props} onSubmit={...} />`

### Edit Function MUST:

- Use exact patterns for all three operations:
  - `onRequest={(params) => fetchGet(\`/api/{table-name}/${params?.id}\`)}`
  - `onSubmit={(values) => fetchPut(\`/api/{table-name}/${values?.id}\`, values)}`
  - `onDelete={(params) => fetchDelete(\`/api/{table-name}/${params?.id}\`)}`

### Columns Function MUST:

- Use `const {} = params || {};` exactly as shown
- Return array of column objects with `title`, `dataIndex`, `valueType`
- Use Vietnamese titles for all columns
- Include all non-system database fields

### Fields Function MUST:

- Use `const {} = params || {};` exactly as shown
- Return JSX with `<> <ProForm.Group>...</ProForm.Group> </>`
- Include hidden/disabled ID field in first ProForm.Group
- Group all other fields in second ProForm.Group
- Use snake_case for field names (matching database columns)
- Add validation rules for NOT NULL fields
- Use Vietnamese labels and placeholders

## Export to Index File

After creating the component file, add exports to the main index file:

**File Location**: `src/component/custom/index.js`

**Export Pattern**:

```javascript
// Export all components from {table-name}-component.js
export * from "./{table-name}-component";
```

## Validation Checklist

- ✅ **File location**: `src/component/custom/{table-name}-component.js`
- ✅ **File naming**: kebab-case convention
- ✅ **Functions**: All 6 required functions (Table, Desc, Create, Edit, Columns, Fields)
- ✅ **Imports**: Correct import statements for components and utilities
- ✅ **API patterns**: Uses exact fetch utility patterns from template
- ✅ **JSX structure**: Fields function uses JSX return with ProForm.Group
- ✅ **Function signatures**: Uses `(params)` parameter for Columns and Fields
- ✅ **Destructuring**: Uses `const {} = params || {};` pattern exactly as shown
- ✅ **Field validation**: Required field validation based on SQL NOT NULL constraints
- ✅ **Vietnamese labels**: Proper Vietnamese labels and placeholders
- ✅ **Field naming**: snake_case for database fields (NOT camelCase)
- ✅ **ProForm imports**: Includes all needed ProForm components in import statement
- ✅ **Component naming**: PascalCase with table name prefix
- ✅ **Index export**: Added component exports to `src/component/custom/index.js`
- ✅ **Column mapping**: All table columns properly mapped (excluding system fields)
- ✅ **Field types**: Appropriate ProForm components based on SQL column types

## Output Location

Generated files:

- `src/component/custom/{table-name}-component.js`
- Updated `src/component/custom/index.js` with component exports
