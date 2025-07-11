// path: @/app/(back)/api/users/[id]/user-roles/route.js

import {
  getUserRolesByUser,
  createUserRolesByUser,
  deleteUserRolesByUser,
} from "@/lib/service/user-roles-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(request, context) {
  try {
    const { id: userId } = await context.params;
    if (!userId) {
      return buildApiResponse(400, false, "Thiếu ID phân quyền.");
    }

    const { searchParams } = new URL(request.url);
    const result = await getUserRolesByUser(userId, searchParams);
    return buildApiResponse(200, true, "Lấy danh sách phân quyền thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function POST(request, context) {
  try {
    const { id: userId } = await context.params;
    if (!userId) {
      return buildApiResponse(400, false, "Thiếu ID người dùng.");
    }

    const { roleIds } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!userId || !Array.isArray(roleIds) || roleIds.length === 0)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const result = await createUserRolesByUser(userId, roleIds);

    if (!result || !result.length)
      return buildApiResponse(404, false, "Không thể thêm quyền.");

    return buildApiResponse(201, true, "Thêm quyền thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(request, context) {
  try {
    const { id: userId } = await context.params;
    if (!userId) {
      return buildApiResponse(400, false, "Thiếu ID người dùng.");
    }

    const { roleIds } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!userId || !Array.isArray(roleIds) || roleIds.length === 0)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const result = await deleteUserRolesByUser(userId, roleIds);

    if (!result || !result.length)
      return buildApiResponse(404, false, "Không tìm thấy phân quyền để xóa");

    return buildApiResponse(200, true, "Xóa phân quyền thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
