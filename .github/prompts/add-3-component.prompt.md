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
- **Strict Adherence**: Follow the exact template structure provided - do not modify or create additional patterns
- **No Custom Changes**: Use only the specified component patterns and import structure shown in the template

## Template Structure

```javascript
// path: @/component/custom/{tableName}-component.js

// import for components
import { AntTable, AntForm, AntDescriptions } from "@/component/common";
import { fetchList, fetchGet, fetchPost, fetchPut, fetchDelete } from "@/lib/util/fetch-util";

// import for ProForm components
import { ProForm, ProFormText } from "@ant-design/pro-form";

// Component definitions
export function {TableName}Table(props) { /* table component with data fetching */ }
export function {TableName}Desc(props) { /* description component for viewing record details */ }
export function {TableName}Create(props) { /* form component for creating new records */ }
export function {TableName}Edit(props) { /* form component for editing existing records */ }

// Columns and fields
export function {TableName}Columns(params) { /* table column definitions */ }
export function {TableName}Fields(params) { /* form field definitions */ }
```

## Implementation Guidelines

1. **Component Structure**: Create 6 exported functions for complete CRUD operations
2. **API Integration**: Use fetch utilities with corresponding API endpoints `/api/{tableName}`
3. **Form Validation**: Add validation rules based on NOT NULL constraints in SQL
4. **Field Mapping**:
   - Required fields: Add `rules={[{ required: true }]}` for NOT NULL columns
   - Optional fields: No validation rules for nullable columns
   - System fields: Include `id` as hidden/disabled, exclude `created_at`, `updated_at`, `deleted_at`
5. **Vietnamese Labels**: Use Vietnamese table name from SQL comment and appropriate Vietnamese field labels
6. **Component Naming**: Use PascalCase with table name prefix (e.g., `OptionsTable`, `OptionsCreate`)
7. **ProForm Components**:
   - Use appropriate ProForm components based on data type
   - Group related fields using `ProForm.Group`
   - Add meaningful placeholders with Vietnamese text
8. **Table Columns**:
   - Use appropriate `valueType` based on column data type
   - Provide Vietnamese column titles
   - Include all non-system fields

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
- ✅ Templates: Follow exact structure and naming patterns
- ✅ Validation: Required field validation based on SQL NOT NULL constraints
- ✅ Vietnamese: Proper Vietnamese labels and placeholders

## Response Format

### Task Completion Summary

**Files Generated**:

- `src/component/custom/{tableName}-component.js`

**Components**: ✅ Table, Desc, Create, Edit, Columns, Fields
**Validation**: ✅ All requirements met
**Next Steps**: Frontend components ready for use in pages and forms
