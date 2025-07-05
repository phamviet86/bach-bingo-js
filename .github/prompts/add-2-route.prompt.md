# Generate API Routes from SQL Table

## Instructions

Generate complete API route files from SQL table structure following established patterns.

## Reference Examples

Review these files before generating code:

- **SQL Input**: [`.github/prompts/examples/table-structure-sample.sql`](./examples/table-structure-sample.sql)
- **Main Route Output**: [`.github/prompts/examples/backend-api-main-sample.js`](./examples/backend-api-main-sample.js)
- **Detail Route Output**: [`.github/prompts/examples/backend-api-detail-sample.js`](./examples/backend-api-detail-sample.js)

## Requirements

- **File Location**: Save in `src/app/(back)/api/`
- **File Naming**: Create 2 route files per table following kebab-case convention
  - `{tableName}/route.js` - for GET all records and POST create
  - `{tableName}/[id]/route.js` - for GET by id, PUT update, DELETE record
- **Coding Style**: Follow camelCase for variables/functions, PascalCase for classes, kebab-case for file names
- **Error Handling**: Wrap all operations in try-catch blocks with proper error responses
- **Modern Patterns**: Use ES6+ features, async/await, and consistent code structure
- **Strict Adherence**: Follow the exact template structure provided - do not modify or create additional patterns
- **No Custom Changes**: Use only the specified HTTP methods and response patterns shown in the template

## Template Structure

```javascript
// path: @/app/(back)/api/{tableName}/route.js
import { get{TableNames}, create{TableName} } from "@/lib/service/{tableName}-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(request) { /* pagination, search, filtering */ }
export async function POST(request) { /* record creation */ }
```

```javascript
// path: @/app/(back)/api/{tableName}/[id]/route.js
import { get{TableName}, update{TableName}, delete{TableName} } from "@/lib/service/{tableName}-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(_, context) { /* single record retrieval */ }
export async function PUT(request, context) { /* record update */ }
export async function DELETE(_, context) { /* soft delete */ }
```

## Implementation Guidelines

1. **File Structure**: Create two separate route files for complete CRUD operations
2. **Service Integration**: Import and use corresponding service functions from `{tableName}-service.js`
3. **Error Handling**: Consistent try-catch with proper HTTP status codes and Vietnamese error messages
4. **Data Validation**: Validate required fields based on NOT NULL constraints in SQL
5. **Response Format**: Use `buildApiResponse` utility for consistent API responses
6. **Field Handling**:
   - Required fields: Extract without default values
   - Optional fields: Extract with `= null` default values
   - System fields: Exclude `id`, `created_at`, `updated_at`, `deleted_at`
7. **Vietnamese Messages**: Use Vietnamese table name from SQL comment for user-friendly messages
8. **HTTP Methods**:
   - GET: 200 for success, 404 for not found
   - POST: 201 for creation success, 400 for validation errors
   - PUT: 200 for update success, 404 for not found
   - DELETE: 200 for deletion success, 404 for not found

## Validation Checklist

- ✅ File location: `src/app/(back)/api/{tableName}/route.js` and `src/app/(back)/api/{tableName}/[id]/route.js`
- ✅ File naming: kebab-case convention
- ✅ Functions: All 5 HTTP methods (GET list, POST, GET by id, PUT, DELETE)
- ✅ Error handling: try-catch blocks in all functions
- ✅ Templates: Follow exact import and structure patterns
- ✅ Validation: Required field validation based on SQL NOT NULL constraints

## Response Format

### Task Completion Summary

**Files Generated**:

- `src/app/(back)/api/{tableName}/route.js`
- `src/app/(back)/api/{tableName}/[id]/route.js`

**Functions**: ✅ GET list, POST, GET by id, PUT, DELETE
**Validation**: ✅ All requirements met
**Next Steps**: API routes ready for use at specified endpoints
