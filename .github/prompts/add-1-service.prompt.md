---
mode: "agent"
tools: ["githubRepo", "codebase"]
description: "Generate a backend service file from a SQL table definition using template code"
---

# Generate Service File from SQL Table

## Instructions

Generate a service file from SQL table structure using the template below.

## Reference Examples

Review these files for input/output pattern:

- **SQL Input**: [`.github/prompts/examples/table-structure-sample.sql`](./examples/table-structure-sample.sql)
- **Service Output**: [`.github/prompts/examples/backend-service-sample.js`](./examples/backend-service-sample.js)

## Template

Use this exact template code:

```javascript
// path: @/lib/service/{table-name}-service.js

import { neonDB } from "@/lib/db/neon-db";
import { parseSearchParams } from "@/lib/util/query-util";

// Initialize database client
const sql = neonDB();

// READ operations
export async function get{TableNamePlural}(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const {
      whereClause,
      orderByClause,
      limitClause,
      queryValues,
    } = parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT {alias}.*, COUNT(*) OVER() AS total
      FROM {tableName} {alias}
      WHERE {alias}.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY {alias}.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function get{TableNameSingular}(id) {
  try {
    return await sql`
      SELECT {alias}.*
      FROM {tableName} {alias}
      WHERE {alias}.deleted_at IS NULL
        AND {alias}.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operation
export async function create{TableNameSingular}(data) {
  try {
    const {
      {column1},
      {column2},
      /* …other fields… */
    } = data;

    return await sql`
      INSERT INTO {tableName} (
        {column1}, {column2} /*, …other fields… */
      ) VALUES (
        ${column1}, ${column2} /*, ${otherField}… */
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operation
export async function update{TableNameSingular}(id, data) {
  try {
    const {
      {column1},
      {column2},
      /* …other fields… */
    } = data;

    return await sql`
      UPDATE {tableName}
      SET
        {column1} = ${column1},
        {column2} = ${column2}
        /*, …otherField = ${otherField}… */
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operation
export async function delete{TableNameSingular}(id) {
  try {
    return await sql`
      UPDATE {tableName}
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}
```

## Placeholder Mapping

Replace template placeholders with your table data:

### Naming Placeholders

- **{table-name}**: kebab-case table name (e.g., `users`, `user-roles`)
- **{tableName}**: SQL table name (e.g., `users`, `user_roles`)
- **{TableNamePlural}**: PascalCase plural (e.g., `Users`, `UserRoles`)
- **{TableNameSingular}**: PascalCase singular (e.g., `User`, `UserRole`)
- **{alias}**: Short table alias (e.g., `u` for users, `ur` for user_roles)

### Column Placeholders

- **{column1}, {column2}, ...**: Replace with actual column names from your SQL table
- Use **snake_case** for database field names (do NOT convert to camelCase)
- Skip columns: `id`, `created_at`, `updated_at`, `deleted_at` (auto-managed)

## Quick Steps

1. **File Path**: Create `src/lib/service/{table-name}-service.js`
2. **Copy Template**: Use the exact template structure above
3. **Replace Names**: Fill in table naming placeholders
4. **Map Columns**: Replace `{column1}, {column2}...` with your table's columns
5. **Validate**: Ensure all 5 functions are present and use correct SQL patterns

## Critical Rules

- ✅ **File naming**: kebab-case (e.g., `users-service.js`)
- ✅ **Functions**: 5 required (getList, getSingle, create, update, delete)
- ✅ **SQL patterns**: getList uses `sql.query()`, others use tagged templates
- ✅ **Soft delete**: Use `deleted_at IS NULL` and `SET deleted_at = NOW()`
- ✅ **Error handling**: All functions wrapped in try-catch
- ✅ **Field naming**: Use snake_case for database fields
- ✅ **Return data**: Always include `RETURNING *` for mutations

## Validation Checklist

- ✅ **File location**: `src/lib/service/{table-name}-service.js`
- ✅ **File naming**: kebab-case convention
- ✅ **Functions**: All 5 required functions (get list, get single, create, update, delete)
- ✅ **Imports**: neonDB and parseSearchParams utilities imported
- ✅ **Database client**: `const sql = neonDB();` initialized
- ✅ **SQL patterns**: getList uses `sql.query()`, others use tagged templates
- ✅ **Soft delete**: All queries check `deleted_at IS NULL`
- ✅ **Delete operation**: Uses `SET deleted_at = NOW()` instead of hard delete
- ✅ **Error handling**: All functions wrapped in try-catch blocks
- ✅ **Field naming**: snake_case for database fields (NOT camelCase)
- ✅ **Return data**: RETURNING \* included in all mutation operations
- ✅ **Search functionality**: parseSearchParams used for filtering and pagination
- ✅ **Column mapping**: All table columns properly mapped (excluding system fields)

## Output Location

Generated file: `src/lib/service/{table-name}-service.js`
