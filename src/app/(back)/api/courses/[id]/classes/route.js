// path: @/app/(back)/api/courses/[id]/classes/route.js

import {
  createClassesByCourse,
  deleteClassesByCourse,
} from "@/lib/service/classes-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function POST(request, context) {
  try {
    const { id: courseId } = await context.params;
    if (!courseId) {
      return buildApiResponse(400, false, "Thiếu ID khóa học.");
    }

    const { moduleIds } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!courseId || !Array.isArray(moduleIds) || moduleIds.length === 0)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const result = await createClassesByCourse(courseId, moduleIds);

    if (!result || !result.length)
      return buildApiResponse(404, false, "Không thể thêm lớp học.");

    return buildApiResponse(201, true, "Thêm lớp học thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(request, context) {
  try {
    const { id: courseId } = await context.params;
    if (!courseId) {
      return buildApiResponse(400, false, "Thiếu ID khóa học.");
    }

    const { moduleIds } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!courseId || !Array.isArray(moduleIds) || moduleIds.length === 0)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const result = await deleteClassesByCourse(courseId, moduleIds);

    if (!result || !result.length)
      return buildApiResponse(404, false, "Không tìm thấy lớp học để xóa");

    return buildApiResponse(200, true, "Xóa lớp học thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
