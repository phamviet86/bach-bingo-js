# Template code for API detail

## Template

```javascript
// path: @/app/(back)/api/{table-name}/[id]/route.js

import {
  get{TableNameSingular},
  update{TableNameSingular},
  delete{TableNameSingular},
} from "@/lib/service/{table-name}-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(_, context) {
  try {
    const { id } = await context.params;
    if (!id) {
      return buildApiResponse(400, false, "Thiếu ID {vnTableNameSingular}.");
    }

    const result = await get{TableNameSingular}(id);
    if (!result || !result.length) {
      return buildApiResponse(404, false, "Không tìm thấy {vnTableNameSingular}.");
    }

    return buildApiResponse(
      200,
      true,
      "Lấy thông tin {vnTableNameSingular} thành công.",
      { data: result }
    );
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    if (!id) {
      return buildApiResponse(400, false, "Thiếu ID {vnTableNameSingular}.");
    }

    const {
      {field1},
      {field2},
      {optional1} = null,
      {optional2} = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints)
    if (!{field1} || !{field2}) {
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");
    }

    const data = {
      {field1},
      {field2},
      {optional1},
      {optional2},
    };

    const result = await update{TableNameSingular}(id, data);
    if (!result || !result.length) {
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy {vnTableNameSingular} hoặc đã bị xóa."
      );
    }

    return buildApiResponse(
      200,
      true,
      "Cập nhật {vnTableNameSingular} thành công.",
      { data: result }
    );
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(_, context) {
  try {
    const { id } = await context.params;
    if (!id) {
      return buildApiResponse(400, false, "Thiếu ID {vnTableNameSingular}.");
    }

    const result = await delete{TableNameSingular}(id);
    if (!result || !result.length) {
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy {vnTableNameSingular} hoặc đã bị xóa."
      );
    }

    return buildApiResponse(
      200,
      true,
      "Xóa {vnTableNameSingular} thành công.",
      { data: result }
    );
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
```

## Template placeholders

- {table-name}: kebab-case table (e.g. options, rooms)
- {TableNameSingular}: PascalCase singular (e.g. Option, Room)
- {vnTableNameSingular}: Vietnamese singular label (e.g. tùy chọn, phòng học)
- {field1}, {field2}: required JSON fields (NOT NULL columns)
- {optional1}, {optional2}: optional JSON fields (nullable columns)
