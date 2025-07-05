# Generate API Routes from SQL Table

## Instructions

Generate complete API route files from a given SQL table structure following modern coding practices and established patterns for Next.js App Router.

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

## API Routes to Include

1. **GET /api/{tableName}** - Get paginated list with search/filter support
2. **POST /api/{tableName}** - Create new record
3. **GET /api/{tableName}/[id]** - Get single record by ID
4. **PUT /api/{tableName}/[id]** - Update existing record
5. **DELETE /api/{tableName}/[id]** - Soft delete record

## Template Structure

```javascript
// path: @/app/(back)/api/{tableName}/route.js
import { get{TableNames}, create{TableName} } from "@/lib/service/{tableName}-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(request) {
  // Implementation for getting paginated list
}

export async function POST(request) {
  // Implementation for creating new record
}
```

```javascript
// path: @/app/(back)/api/{tableName}/[id]/route.js
import { get{TableName}, update{TableName}, delete{TableName} } from "@/lib/service/{tableName}-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(_, context) {
  // Implementation for getting single record
}

export async function PUT(request, context) {
  // Implementation for updating record
}

export async function DELETE(_, context) {
  // Implementation for soft deleting record
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

## Sample Output (Generated API Route Files)

### File: `@/app/(back)/api/options/route.js`

```javascript
// path: @/app/(back)/api/options/route.js

import { getOptions, createOption } from "@/lib/service/options-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getOptions(searchParams);
    return buildApiResponse(200, true, "Lấy danh sách tùy chọn thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function POST(request) {
  try {
    const {
      option_table,
      option_column,
      option_label,
      option_color = null,
      option_group = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!option_table || !option_column || !option_label)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const data = {
      option_table,
      option_column,
      option_label,
      option_color,
      option_group,
    };

    const result = await createOption(data);

    if (!result || !result.length)
      return buildApiResponse(500, false, "Không thể thực hiện thao tác.");

    return buildApiResponse(201, true, "Tạo tùy chọn thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
```

### File: `@/app/(back)/api/options/[id]/route.js`

```javascript
// path: @/app/(back)/api/options/[id]/route.js

import {
  getOption,
  updateOption,
  deleteOption,
} from "@/lib/service/options-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID tùy chọn.");

    const result = await getOption(id);
    if (!result || !result.length)
      return buildApiResponse(404, false, "Không tìm thấy tùy chọn.");

    return buildApiResponse(200, true, "Lấy thông tin tùy chọn thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID tùy chọn.");

    const {
      option_table,
      option_column,
      option_label,
      option_color = null,
      option_group = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!option_table || !option_column || !option_label)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const data = {
      option_table,
      option_column,
      option_label,
      option_color,
      option_group,
    };

    const result = await updateOption(id, data);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy tùy chọn hoặc tùy chọn đã bị xóa."
      );

    return buildApiResponse(200, true, "Cập nhật tùy chọn thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID tùy chọn.");

    const result = await deleteOption(id);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy tùy chọn hoặc tùy chọn đã bị xóa."
      );

    return buildApiResponse(200, true, "Xóa tùy chọn thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
```

## Key Implementation Notes

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

## Validation Process

After generating the API route files, perform these validation checks:

1. **File Structure Compliance**:

   - ✅ Files saved in correct locations: `src/app/(back)/api/{tableName}/route.js` and `src/app/(back)/api/{tableName}/[id]/route.js`
   - ✅ File names follow kebab-case convention
   - ✅ Contains exactly 5 HTTP methods (GET list, POST, GET by id, PUT, DELETE)

2. **Code Standards Validation**:

   - ✅ All functions use proper error handling with try-catch blocks
   - ✅ All operations use `buildApiResponse` for consistent responses
   - ✅ Required field validation based on SQL NOT NULL constraints
   - ✅ Proper HTTP status codes for each operation

3. **Template Adherence Check**:
   - ✅ Imports match template exactly
   - ✅ Function signatures match Next.js App Router patterns
   - ✅ Error handling follows template structure
   - ✅ Vietnamese messages use correct table name from SQL comment

## Response Format

After generating the API route files, provide a summary response in this format:

### Task Completion Summary

**Files Generated**:

- `src/app/(back)/api/{tableName}/route.js`
- `src/app/(back)/api/{tableName}/[id]/route.js`

**API Endpoints Implemented**:

- ✅ `GET /api/{tableName}` - Paginated list with search/filter
- ✅ `POST /api/{tableName}` - Create new record
- ✅ `GET /api/{tableName}/[id]` - Single record retrieval
- ✅ `PUT /api/{tableName}/[id]` - Record update
- ✅ `DELETE /api/{tableName}/[id]` - Soft delete operation

**Validation Results**:

- ✅ File structure compliant
- ✅ HTTP methods implemented correctly
- ✅ Template adherence verified
- ✅ All requirements met

**Next Steps**: The API route files are ready for use and will automatically be available at the specified endpoints when the Next.js application is running.
