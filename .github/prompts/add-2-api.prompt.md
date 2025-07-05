# Hướng dẫn tạo API Routes cho GitHub Copilot

## Mô tả
Tạo các file route API cho Next.js dựa trên cấu trúc bảng SQL đã cho.

## Yêu cầu đầu vào
- File SQL chứa cấu trúc bảng (ví dụ: `options.sql`)
- Tên bảng từ comment đầu tiên trong file SQL (ví dụ: `-- table: tuỳ chọn`)

## Quy tắc tạo code

### 1. Cấu trúc file
Tạo 2 file route:
- `@/app/api/[tableName]/route.js` - cho GET all và POST
- `@/app/api/[tableName]/[id]/route.js` - cho GET by id, PUT, DELETE

### 2. Quy tắc đặt tên
- Sử dụng tên bảng tiếng Anh làm đường dẫn API (ví dụ: `options`)
- Giữ nguyên tên cột như trong SQL, không chuyển đổi sang camelCase
- Sử dụng tên bảng tiếng Việt trong thông báo (từ comment SQL)

### 3. Service functions
Giả định đã có các hàm service:
- `get[TableName]s(searchParams)` - lấy danh sách
- `get[TableName](id)` - lấy theo ID  
- `create[TableName](data)` - tạo mới
- `update[TableName](id, data)` - cập nhật
- `delete[TableName](id)` - xóa (soft delete)

### 4. Xử lý dữ liệu
- Các cột NOT NULL trong SQL là bắt buộc
- Các cột có DEFAULT hoặc có thể NULL sẽ có giá trị mặc định `= null`
- Loại bỏ các cột hệ thống: `id`, `created_at`, `updated_at`, `deleted_at`

## Template code

### File: `@/app/api/[tableName]/route.js`

```javascript
// route: /api/[tableName]/route.js

import { get[TableName]s, create[TableName] } from "@/lib/service/[tableName]-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await get[TableName]s(searchParams);
    return buildApiResponse(200, true, "Lấy danh sách [Vietnamese table name] thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function POST(request) {
  try {
    const {
      [column1],
      [column2],
      [column3] = null,
      [column4] = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (![required_column1] || ![required_column2])
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const data = {
      [column1],
      [column2], 
      [column3],
      [column4],
    };

    const result = await create[TableName](data);

    if (!result || !result.length)
      return buildApiResponse(500, false, "Không thể thực hiện thao tác.");

    return buildApiResponse(201, true, "Tạo [Vietnamese table name] thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
```

### File: `@/app/api/[tableName]/[id]/route.js`

```javascript
// path: @/app/(back)/api/[tableName]/[id]/route.js

import {
  get[TableName],
  update[TableName],
  delete[TableName],
} from "@/lib/service/[tableName]-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID [Vietnamese table name].");

    const result = await get[TableName](id);
    if (!result || !result.length)
      return buildApiResponse(404, false, "Không tìm thấy [Vietnamese table name].");

    return buildApiResponse(200, true, "Lấy thông tin [Vietnamese table name] thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID [Vietnamese table name].");

    const {
      [column1],
      [column2],
      [column3] = null,
      [column4] = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (![required_column1] || ![required_column2])
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const data = {
      [column1],
      [column2],
      [column3], 
      [column4],
    };

    const result = await update[TableName](id, data);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy [Vietnamese table name] hoặc [Vietnamese table name] đã bị xóa."
      );

    return buildApiResponse(200, true, "Cập nhật [Vietnamese table name] thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID [Vietnamese table name].");

    const result = await delete[TableName](id);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy [Vietnamese table name] hoặc [Vietnamese table name] đã bị xóa."
      );

    return buildApiResponse(200, true, "Xóa [Vietnamese table name] thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
```

## Ví dụ cụ thể

### Input: `options.sql`
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
```

### Output:
- `@/app/api/options/route.js` - GET all options, POST create option
- `@/app/api/options/[id]/route.js` - GET option by id, PUT update option, DELETE option

### Phân tích:
- Table name: `options`
- Vietnamese name: `tuỳ chọn` 
- Required fields: `option_table`, `option_column`, `option_label`
- Optional fields: `option_color`, `option_group` (có DEFAULT NULL)
- Service functions: `getOptions`, `getOption`, `createOption`, `updateOption`, `deleteOption`

## Lưu ý
- Luôn sử dụng soft delete với `deleted_at`
- Kiểm tra các trường bắt buộc dựa trên constraint NOT NULL
- Sử dụng thông báo tiếng Việt phù hợp với tên bảng
- Import đúng service functions từ `@/lib/service/[tableName]-service`
- Sử dụng `buildApiResponse` để tạo response thống nhất
