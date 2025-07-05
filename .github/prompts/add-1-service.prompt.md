# Generate Service File from SQL Table

## Instructions

Generate a complete service file from SQL table structure following established patterns.

## Reference Examples

Review these files before generating code:

- **SQL Input**: [`.github/prompts/examples/table-structure-sample.sql`](./examples/table-structure-sample.sql)
- **Service Output**: [`.github/prompts/examples/backend-service-sample.js`](./examples/backend-service-sample.js)

## Requirements

- **File Location**: `src/lib/service/{tableName}-service.js`
- **Naming**: kebab-case files, camelCase functions, PascalCase classes
- **Functions**: 5 required functions (get[TableNames], get[TableName], create[TableName], update[TableName], delete[TableName])
- **Error Handling**: Wrap all operations in try-catch blocks
- **Data**: Always return `*` (all columns)
- **Soft Delete**: Use `deleted_at IS NULL` checks and `SET deleted_at = NOW()`

## Template Structure

```javascript
// path: @/lib/service/{tableName}-service.js
import { neonDB } from "@/lib/db/neon-db";
import { parseSearchParams } from "@/lib/util/query-util";

// Database initialization
const sql = neonDB();

// READ operations
export async function get{TableNames}(searchParams) { /* pagination, search, filtering */ }
export async function get{TableName}(id) { /* single record retrieval */ }

// CREATE operations
export async function create{TableName}(data) { /* record creation */ }

// UPDATE operations
export async function update{TableName}(id, data) { /* record update */ }

// DELETE operations
export async function delete{TableName}(id) { /* soft delete */ }
```

## Implementation Guidelines

1. **Table Alias**: Use first letter of table name (e.g., `o` for `options`)
2. **Function Names**: Plural for lists (`getOptions`), singular for CRUD (`getOption`, `createOption`)
3. **SQL Patterns**: Template literals for complex queries, tagged templates for simple queries
4. **Destructuring**: Extract fields from `data` parameter in create/update functions
5. **Error Handling**: `throw new Error(error.message)` in all catch blocks
6. **Return**: Always include `RETURNING *` for INSERT/UPDATE operations

## Validation Checklist

- ✅ File location: `src/lib/service/{tableName}-service.js`
- ✅ File naming: kebab-case convention
- ✅ Functions: All 5 required functions implemented
- ✅ Naming: camelCase functions, proper plural/singular usage
- ✅ Error handling: try-catch blocks in all functions
- ✅ Soft delete: `deleted_at IS NULL` checks implemented
- ✅ Templates: Follow exact import and structure patterns

## Response Format

### Task Completion Summary

**File Generated**: `src/lib/service/{tableName}-service.js`
**Functions**: ✅ get{TableNames}, get{TableName}, create{TableName}, update{TableName}, delete{TableName}
**Validation**: ✅ All requirements met
**Next Steps**: Service ready for API route integration
