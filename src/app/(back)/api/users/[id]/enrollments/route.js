// path: @/app/(back)/api/users/[id]/enrollments/route.js

import {
  getEnrollmentsByUser,
  createEnrollmentsByUser,
  deleteEnrollmentsByUser,
} from "@/lib/service/enrollments-service";
import { getClassFee } from "@/lib/service/classes-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(request, context) {
  try {
    const { id: userId } = await context.params;
    if (!userId) {
      return buildApiResponse(400, false, "Thiếu ID người dùng.");
    }

    const { searchParams } = new URL(request.url);
    const result = await getEnrollmentsByUser(userId, searchParams);
    return buildApiResponse(200, true, "Lấy danh sách lớp thành công", {
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

    const { classIds, enrollmentTypeId } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!enrollmentTypeId || !Array.isArray(classIds) || classIds.length === 0)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    // Fetch class fees for each class ID
    const classData = await Promise.all(
      classIds.map(async (classId) => {
        // Only fetch class fee if enrollmentTypeId is 26
        let classFee = 0;
        if (enrollmentTypeId == 26) {
          const classFeeResult = await getClassFee(classId);
          classFee = classFeeResult?.[0]?.class_fee || 0;
        }
        return {
          classId,
          classFee,
        };
      })
    );

    const result = await createEnrollmentsByUser(
      userId,
      classData,
      enrollmentTypeId
    );

    if (!result || !result.length)
      return buildApiResponse(404, false, "Không thể thêm đăng ký.");

    return buildApiResponse(201, true, "Thêm đăng ký thành công", {
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

    const { classIds, enrollmentTypeId } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!enrollmentTypeId || !Array.isArray(classIds) || classIds.length === 0)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const result = await deleteEnrollmentsByUser(
      userId,
      classIds,
      enrollmentTypeId
    );

    if (!result || !result.length)
      return buildApiResponse(404, false, "Không tìm thấy đăng ký để xóa");

    return buildApiResponse(200, true, "Xóa đăng ký thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
