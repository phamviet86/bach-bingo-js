# Generate Service File from SQL Table

## Instructions

Generate a complete service file from SQL table structure following established patterns.

## Reference Examples

**MANDATORY**: Review these files COMPLETELY before generating any code:

- **SQL Input**: [`.github/prompts/examples/table-structure-sample.sql`](./examples/table-structure-sample.sql)
- **Service Output**: [`.github/prompts/examples/backend-service-sample.js`](./examples/backend-service-sample.js)

## Critical Requirements

- **File Location**: `src/lib/service/{tableName}-service.js`
- **File Naming**: kebab-case files, camelCase functions, PascalCase classes
- **Functions**: 5 required functions (get[TableNames], get[TableName], create[TableName], update[TableName], delete[TableName])
- **Error Handling**: Wrap all operations in try-catch blocks
- **Data**: Always return `*` (all columns)
- **Soft Delete**: Use `deleted_at IS NULL` checks and `SET deleted_at = NOW()`
- **ABSOLUTE ADHERENCE**: Copy the EXACT structure from sample files - do NOT modify any patterns
- **NO CUSTOM CHANGES**: Use ONLY the patterns shown in sample files - do NOT create your own variations
- **EXACT COPY**: Follow every detail of the sample files including SQL patterns, variable naming, and query structure

## Template Structure

**CRITICAL**: You MUST copy the EXACT structure from sample files. Do NOT create simplified versions.

```javascript
// path: @/lib/service/{tableName}-service.js
import { neonDB } from "@/lib/db/neon-db";
import { parseSearchParams } from "@/lib/util/query-util";

// Database initialization
const sql = neonDB();

// READ operations
export async function get{TableNames}(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

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

export async function get{TableName}(id) {
  try {
    return await sql`
      SELECT {alias}.*
      FROM {tableName} {alias}
      WHERE {alias}.deleted_at IS NULL AND {alias}.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operations
export async function create{TableName}(data) {
  try {
    const { field1, field2, field3 } = data;
    return await sql`
      INSERT INTO {tableName} (field1, field2, field3)
      VALUES (${field1}, ${field2}, ${field3})
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operations
export async function update{TableName}(id, data) {
  try {
    const { field1, field2, field3 } = data;
    return await sql`
      UPDATE {tableName}
      SET field1 = ${field1}, field2 = ${field2}, field3 = ${field3}
      WHERE deleted_at IS NULL AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operations
export async function delete{TableName}(id) {
  try {
    return await sql`
      UPDATE {tableName}
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}
```

## Implementation Guidelines

1. **MANDATORY SAMPLE READING**: Read and understand EVERY LINE of the sample files before coding
2. **EXACT COPY REQUIREMENT**: Copy the complete structure from sample files - do NOT simplify or modify
3. **Table Alias**: Use first letter of table name (e.g., `o` for `options`)
4. **Function Names**: Plural for lists (`getOptions`), singular for CRUD (`getOption`, `createOption`)
5. **SQL Patterns**:
   - **getList**: Use template literals with `sql.query(sqlText, sqlValue)` pattern EXACTLY as in sample
   - **getSingle/CRUD**: Use tagged template literals `sql\`...\`` EXACTLY as in sample
6. **parseSearchParams**: Use EXACT pattern from sample: `parseSearchParams(searchParams, ignoredSearchColumns)`
7. **Query Structure**: MUST include `COUNT(*) OVER() AS total` for list queries
8. **Variable Naming**: Use snake_case for database fields directly (do NOT convert to camelCase)
9. **Error Handling**: `throw new Error(error.message)` in all catch blocks
10. **Return Pattern**: Always include `RETURNING *` for INSERT/UPDATE operations

## CRITICAL SAMPLE ADHERENCE

### getList Function MUST:

- Use `const ignoredSearchColumns = [];` exactly as shown
- Use `const { whereClause, orderByClause, limitClause, queryValues } = parseSearchParams(searchParams, ignoredSearchColumns);` exactly as shown
- Use `const sqlValue = [...queryValues];` exactly as shown
- Use template literal pattern with `sql.query(sqlText, sqlValue)` exactly as shown
- Include `COUNT(*) OVER() AS total` in SELECT clause
- Use `${whereClause}`, `${orderByClause || "ORDER BY {alias}.created_at"}`, `${limitClause}` exactly as shown

### getSingle Function MUST:

- Use tagged template literal pattern `sql\`...\`` exactly as shown
- Use `WHERE {alias}.deleted_at IS NULL AND {alias}.id = ${id};` exactly as shown

### CREATE/UPDATE Functions MUST:

- Use snake_case for database field names in destructuring (NOT camelCase)
- Use tagged template literal pattern exactly as shown
- Include `RETURNING *;` at the end

### DELETE Function MUST:

- Use soft delete pattern with `SET deleted_at = NOW()` exactly as shown
- Include `RETURNING *;` at the end

## Validation Checklist

- ✅ **MANDATORY SAMPLE READING**: Completely reviewed backend-service-sample.js
- ✅ **File location**: `src/lib/service/{tableName}-service.js`
- ✅ **File naming**: kebab-case convention
- ✅ **Functions**: All 5 required functions implemented
- ✅ **Naming**: camelCase functions, proper plural/singular usage
- ✅ **Error handling**: try-catch blocks in all functions
- ✅ **Soft delete**: `deleted_at IS NULL` checks implemented
- ✅ **EXACT SQL PATTERNS**: getList uses `sql.query()`, others use tagged templates
- ✅ **parseSearchParams**: Uses exact sample pattern with `ignoredSearchColumns`
- ✅ **COUNT(\*) OVER()**: Included in list query for pagination
- ✅ **Variable naming**: snake_case for database fields (NOT camelCase)
- ✅ **Query structure**: Follows exact sample patterns without modifications

## Response Format

### Task Completion Summary

**File Generated**: `src/lib/service/{tableName}-service.js`
**Functions**: ✅ get{TableNames}, get{TableName}, create{TableName}, update{TableName}, delete{TableName}
**Sample Adherence**: ✅ EXACT copy of sample patterns - no modifications made
**Validation**: ✅ All requirements met exactly as specified in sample
**Next Steps**: Service ready for API route integration
