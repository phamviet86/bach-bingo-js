# Template code for main route

## Template

```javascript
// path: @/app/(back)/api/{table-name}/route.js

import {
  get{TableNamePlural},
  create{TableNameSingular}
} from "@/lib/service/{table-name}-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await get{TableNamePlural}(searchParams);
    return buildApiResponse(
      200,
      true,
      "Lấy danh sách {vnTableNamePlural} thành công",
      { data: result }
    );
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function POST(request) {
  try {
    const {
      {field1},
      {field2},
      {optional1} = null,
      {optional2} = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL in SQL)
    if (!{field1} || !{field2}) {
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");
    }

    const data = {
      {field1},
      {field2},
      {optional1},
      {optional2},
    };

    const result = await create{TableNameSingular}(data);

    if (!result || !result.length) {
      return buildApiResponse(500, false, "Không thể thực hiện thao tác.");
    }

    return buildApiResponse(
      201,
      true,
      "Tạo {vnTableNameSingular} thành công.",
      { data: result }
    );
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
```

## Template placeholders

- {table-name}: kebab-case table name (e.g. options, rooms)
- {TableNamePlural}: PascalCase plural form (e.g. Options, Rooms)
- {TableNameSingular}: PascalCase singular form (e.g. Option, Room)
- {vnTableNamePlural} / {vnTableNameSingular}: Vietnamese labels for plural/singular (e.g. “tùy chọn” / “tùy chọn”)
- {field1}, {field2}: required JSON fields (based on your table’s NOT NULL columns)
- {optional1}, {optional2}: optional JSON fields (those with defaults or that allow NULL)
