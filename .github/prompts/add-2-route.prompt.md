# Generate API Routes from SQL Table

## Instructions

Generate complete API route files from SQL table structure following established patterns.

## Reference Examples

**MANDATORY**: Review these files COMPLETELY before generating any code:

- **SQL Input**: [`.github/prompts/examples/table-structure-sample.sql`](./examples/table-structure-sample.sql)
- **Main Route Output**: [`.github/prompts/examples/backend-api-main-sample.js`](./examples/backend-api-main-sample.js)
- **Detail Route Output**: [`.github/prompts/examples/backend-api-detail-sample.js`](./examples/backend-api-detail-sample.js)

## Critical Requirements

- **File Location**: Save in `src/app/(back)/api/`
- **File Naming**: Create 2 route files per table following kebab-case convention
  - `{tableName}/route.js` - for GET all records and POST create
  - `{tableName}/[id]/route.js` - for GET by id, PUT update, DELETE record
- **Coding Style**: Follow camelCase for variables/functions, PascalCase for classes, kebab-case for file names
- **Error Handling**: Wrap all operations in try-catch blocks with proper error responses
- **Modern Patterns**: Use ES6+ features, async/await, and consistent code structure
- **ABSOLUTE ADHERENCE**: Copy the EXACT structure from sample files - do NOT modify any patterns
- **NO CUSTOM CHANGES**: Use ONLY the patterns shown in sample files - do NOT create your own variations
- **EXACT COPY**: Follow every detail of the sample files including imports, error handling, and response patterns

## Template Structure

**CRITICAL**: You MUST copy the EXACT structure from sample files. Do NOT create simplified versions.

### Main Route Template (COPY EXACTLY from backend-api-main-sample.js)

```javascript
// path: @/app/(back)/api/{tableName}/route.js
import { get{TableNames}, create{TableName} } from "@/lib/service/{tableName}-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await get{TableNames}(searchParams);
    return buildApiResponse(200, true, "Lấy danh sách {vietnameseName} thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function POST(request) {
  try {
    const {
      field1,
      field2,
      field3,
      field4 = null,
      field5 = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!field1 || !field2 || !field3)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const data = {
      field1,
      field2,
      field3,
      field4,
      field5,
    };

    const result = await create{TableName}(data);

    if (!result || !result.length)
      return buildApiResponse(500, false, "Không thể thực hiện thao tác.");

    return buildApiResponse(201, true, "Tạo {vietnameseName} thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
```

### Detail Route Template (COPY EXACTLY from backend-api-detail-sample.js)

```javascript
// path: @/app/(back)/api/{tableName}/[id]/route.js
import {
  get{TableName},
  update{TableName},
  delete{TableName},
} from "@/lib/service/{tableName}-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID {vietnameseName}.");

    const result = await get{TableName}(id);
    if (!result || !result.length)
      return buildApiResponse(404, false, "Không tìm thấy {vietnameseName}.");

    return buildApiResponse(200, true, "Lấy thông tin {vietnameseName} thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID {vietnameseName}.");

    const {
      field1,
      field2,
      field3,
      field4 = null,
      field5 = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!field1 || !field2 || !field3)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const data = {
      field1,
      field2,
      field3,
      field4,
      field5,
    };

    const result = await update{TableName}(id, data);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy {vietnameseName} hoặc {vietnameseName} đã bị xóa."
      );

    return buildApiResponse(200, true, "Cập nhật {vietnameseName} thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID {vietnameseName}.");

    const result = await delete{TableName}(id);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy {vietnameseName} hoặc {vietnameseName} đã bị xóa."
      );

    return buildApiResponse(200, true, "Xóa {vietnameseName} thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
```

## Implementation Guidelines

1. **MANDATORY SAMPLE READING**: Read and understand EVERY LINE of the sample files before coding
2. **EXACT COPY REQUIREMENT**: Copy the complete structure from sample files - do NOT simplify or modify
3. **File Structure**: Create two separate route files for complete CRUD operations
4. **Service Integration**: Import and use corresponding service functions from `{tableName}-service.js`
5. **Error Handling**: Use EXACT error handling patterns from samples with proper HTTP status codes
6. **Data Validation**: Validate required fields based on NOT NULL constraints in SQL
7. **Response Format**: Use `buildApiResponse` utility EXACTLY as shown in samples
8. **Field Handling**:
   - Required fields: Extract without default values (e.g., `field1, field2, field3`)
   - Optional fields: Extract with `= null` default values (e.g., `field4 = null, field5 = null`)
   - System fields: Exclude `id`, `created_at`, `updated_at`, `deleted_at`
9. **Vietnamese Messages**: Use Vietnamese table name from SQL comment for user-friendly messages
10. **HTTP Methods**: Follow EXACT patterns from samples:
    - GET: 200 for success, 404 for not found
    - POST: 201 for creation success, 400 for validation errors
    - PUT: 200 for update success, 404 for not found
    - DELETE: 200 for deletion success, 404 for not found

## CRITICAL SAMPLE ADHERENCE

### Main Route File MUST:

- Use `const { searchParams } = new URL(request.url);` exactly as shown
- Use `return buildApiResponse(200, true, "Lấy danh sách {vietnameseName} thành công", { data: result });` pattern
- Use `if (!field1 || !field2 || !field3) return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");` validation pattern
- Use `if (!result || !result.length) return buildApiResponse(500, false, "Không thể thực hiện thao tác.");` check pattern
- Use `return buildApiResponse(201, true, "Tạo {vietnameseName} thành công.", { data: result });` success pattern

### Detail Route File MUST:

- Use `const { id } = await context.params;` exactly as shown
- Use `if (!id) return buildApiResponse(400, false, "Thiếu ID {vietnameseName}.");` validation pattern
- Use `if (!result || !result.length) return buildApiResponse(404, false, "Không tìm thấy {vietnameseName}.");` check pattern
- Use exact error messages with Vietnamese table name placeholders
- Use exact success messages with Vietnamese table name placeholders
- Follow exact parameter naming: `(_, context)` for GET and DELETE, `(request, context)` for PUT

### Variable Naming MUST:

- Use snake_case for database field names in destructuring (NOT camelCase)
- Use exact Vietnamese messages with consistent formatting
- Use exact import patterns and service function names

## Validation Checklist

- ✅ **MANDATORY SAMPLE READING**: Completely reviewed backend-api-main-sample.js and backend-api-detail-sample.js
- ✅ **File location**: `src/app/(back)/api/{tableName}/route.js` and `src/app/(back)/api/{tableName}/[id]/route.js`
- ✅ **File naming**: kebab-case convention
- ✅ **Functions**: All 5 HTTP methods (GET list, POST, GET by id, PUT, DELETE)
- ✅ **Error handling**: try-catch blocks in all functions
- ✅ **EXACT PATTERNS**: Main route uses exact GET/POST patterns, detail route uses exact GET/PUT/DELETE patterns
- ✅ **Response format**: Uses `buildApiResponse` exactly as shown in samples
- ✅ **Vietnamese messages**: Uses exact Vietnamese message patterns with table name placeholders
- ✅ **Validation**: Required field validation based on SQL NOT NULL constraints
- ✅ **Parameter handling**: Uses exact parameter destructuring patterns
- ✅ **Variable naming**: snake_case for database fields (NOT camelCase)

## Response Format

### Task Completion Summary

**Files Generated**:

- `src/app/(back)/api/{tableName}/route.js`
- `src/app/(back)/api/{tableName}/[id]/route.js`

**Functions**: ✅ GET list, POST, GET by id, PUT, DELETE
**Sample Adherence**: ✅ EXACT copy of sample patterns - no modifications made
**Validation**: ✅ All requirements met exactly as specified in samples
**Next Steps**: API routes ready for use at specified endpoints
