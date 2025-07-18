// path: @/app/(back)/api/users/[id]/waiting-enrollments/route.js

import {
  createWaitingEnrollmentsByUser,
  deleteWaitingEnrollmentsByUser,
} from "@/lib/service/enrollments-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function POST(request, context) {
  try {
    const { id: userId } = await context.params;
    if (!userId) {
      return buildApiResponse(400, false, "Thiếu ID người dùng.");
    }

    const { moduleIds, enrollmentTypeId } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (
      !enrollmentTypeId ||
      !Array.isArray(moduleIds) ||
      moduleIds.length === 0
    )
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const result = await createWaitingEnrollmentsByUser(
      userId,
      moduleIds,
      enrollmentTypeId
    );

    if (!result || !result.length)
      return buildApiResponse(404, false, "Không thể thêm vào danh sách chờ.");

    return buildApiResponse(201, true, "Thêm vào danh sách chờ thành công", {
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

    const { moduleIds, enrollmentTypeId } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (
      !enrollmentTypeId ||
      !Array.isArray(moduleIds) ||
      moduleIds.length === 0
    )
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const result = await deleteWaitingEnrollmentsByUser(
      userId,
      moduleIds,
      enrollmentTypeId
    );

    if (!result || !result.length)
      return buildApiResponse(404, false, "Không tìm thấy đăng ký chờ.");

    return buildApiResponse(200, true, "Xóa đăng ký chờ thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
