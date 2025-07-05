# Generate Service File from SQL Table

## Instructions

Generate a complete service file from a given SQL table structure following modern coding practices and established patterns.

## Requirements

- **File Location**: Save in `src/lib/service/`
- **File Naming**: Use `{tableName}-service.js` format (e.g., `options-service.js` for `options` table)
- **Coding Style**: Follow camelCase for variables/functions, PascalCase for classes, kebab-case for file names
- **Return Data**: Always return `*` (all columns) for all functions
- **Error Handling**: Wrap all database operations in try-catch blocks
- **Modern Patterns**: Use ES6+ features, async/await, and consistent code structure
- **Strict Adherence**: Follow the exact template structure provided - do not modify or create additional patterns
- **No Custom Changes**: Use only the specified functions and naming conventions shown in the template

## Service Functions to Include

1. **getRecords(searchParams)** - Get paginated list with search/filter support
2. **getRecord(id)** - Get single record by ID
3. **createRecord(data)** - Create new record
4. **updateRecord(id, data)** - Update existing record
5. **deleteRecord(id)** - Soft delete record (set deleted_at)

## Template Structure

```javascript
// path: @/lib/service/{tableName}-service.js

import { neonDB } from "@/lib/db/neon-db";
import { parseSearchParams } from "@/lib/util/query-util";

// Database initialization
const sql = neonDB();

// READ operations
export async function get{TableNames}(searchParams) {
  // Implementation with pagination, search, and filtering
}

export async function get{TableName}(id) {
  // Implementation for single record retrieval
}

// CREATE operations
export async function create{TableName}(data) {
  // Imp
// UPDATE operationslementation for record creation
}

export async function update{TableName}(id, data) {
  // Implementation for record update
}

// DELETE operations
export async function delete{TableName}(id) {
  // Implementation for soft delete
}
```

## Sample Input (SQL Table Structure)

```sql
-- table: tuỳ chọn

DROP TABLE IF EXISTS options CASCADE;
CREATE TABLE options (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,
  option_table VARCHAR(255) NOT NULL,
  option_column VARCHAR(255) NOT NULL,
  option_label VARCHAR(255) NOT NULL,
  option_color VARCHAR(255) DEFAULT NULL,
  option_group VARCHAR(255) DEFAULT NULL
);
CREATE TRIGGER update_record BEFORE
UPDATE ON options FOR EACH ROW EXECUTE FUNCTION set_updated_at();
```

## Sample Output (Generated Service File)

```javascript
// path: @/lib/service/options-service.js

import { neonDB } from "@/lib/db/neon-db";
import { parseSearchParams } from "@/lib/util/query-util";

// Database initialization
const sql = neonDB();

// READ operations
export async function getOptions(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT o.*, COUNT(*) OVER() AS total
      FROM options o
      WHERE o.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY o.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getOption(id) {
  try {
    return await sql`
      SELECT o.*
      FROM options o
      WHERE o.deleted_at IS NULL AND o.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operations
export async function createOption(data) {
  try {
    const {
      option_table,
      option_column,
      option_label,
      option_color,
      option_group,
    } = data;

    return await sql`
      INSERT INTO options (
        option_table, option_column, option_label, option_color, option_group
      ) VALUES (
        ${option_table}, ${option_column}, ${option_label}, ${option_color}, ${option_group}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operations
export async function updateOption(id, data) {
  try {
    const {
      option_table,
      option_column,
      option_label,
      option_color,
      option_group,
    } = data;

    return await sql`
      UPDATE options
      SET option_table = ${option_table}, option_column = ${option_column}, option_label = ${option_label}, option_color = ${option_color}, option_group = ${option_group}
      WHERE deleted_at IS NULL AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operations
export async function deleteOption(id) {
  try {
    return await sql`
      UPDATE options
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}
```

## Key Implementation Notes

1. **Table Alias**: Use first letter of table name as alias (e.g., `o` for `options`)
2. **Function Naming**:
   - Plural for list functions: `getOptions()`
   - Singular for single record: `getOption()`
   - Create/Update/Delete use singular: `createOption()`, `updateOption()`, `deleteOption()`
3. **Soft Delete**: Always check `deleted_at IS NULL` and use `SET deleted_at = NOW()` for deletion
4. **Data Extraction**: Use destructuring for input data in create/update functions
5. **Error Handling**: Consistent try-catch with `throw new Error(error.message)`
6. **SQL Patterns**:
   - Use template literals for complex queries with dynamic clauses
   - Use tagged template literals for simple queries
   - Always include `RETURNING *` for INSERT/UPDATE operations
7. **Search Integration**: Include pagination and search support using `parseSearchParams` utility

## Validation Process

After generating the service file, perform these validation checks:

1. **File Structure Compliance**:

   - ✅ File saved in correct location: `src/lib/service/{tableName}-service.js`
   - ✅ File name follows kebab-case convention
   - ✅ Contains exactly 5 required functions (get[TableNames], get[TableName], create[TableName], update[TableName], delete[TableName])

2. **Code Standards Validation**:

   - ✅ All functions use camelCase naming
   - ✅ All database operations wrapped in try-catch blocks
   - ✅ All functions return `*` (all columns)
   - ✅ Soft delete implemented correctly with `deleted_at IS NULL` checks

3. **Template Adherence Check**:
   - ✅ Imports match template exactly
   - ✅ Function signatures match template pattern
   - ✅ Error handling follows template structure
   - ✅ SQL query patterns follow template guidelines

## Response Format

After generating the service file, provide a summary response in this format:

### Task Completion Summary

**File Generated**: `src/lib/service/{tableName}-service.js`

**Functions Implemented**:

- ✅ `get{TableNames}(searchParams)` - Paginated list with search/filter
- ✅ `get{TableName}(id)` - Single record retrieval
- ✅ `create{TableName}(data)` - New record creation
- ✅ `update{TableName}(id, data)` - Record update
- ✅ `delete{TableName}(id)` - Soft delete operation

**Validation Results**:

- ✅ File structure compliant
- ✅ Naming conventions followed
- ✅ Template adherence verified
- ✅ All requirements met

**Next Steps**: The service file is ready for use and can be imported in API routes or other service layers.
