// path: @/app/(back)/api/user-roles/route.js

import { getUserRoles, createUserRole } from "@/lib/service/user-roles-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getUserRoles(searchParams);
    return buildApiResponse(200, true, "Lấy danh sách phân quyền thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function POST(request) {
  try {
    const { user_id, role_id } = await request.json();

    // Validate required fields (based on NOT NULL in SQL)
    if (!user_id || !role_id) {
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");
    }

    const data = {
      user_id,
      role_id,
    };

    const result = await createUserRole(data);

    if (!result || !result.length) {
      return buildApiResponse(500, false, "Không thể thực hiện thao tác.");
    }

    return buildApiResponse(201, true, "Tạo phân quyền thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
