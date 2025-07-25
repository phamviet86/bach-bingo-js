// path: @/app/(back)/api/classes/[id]/enrollments/route.js

import {
  createEnrollmentsByClass,
  deleteEnrollmentsByClass,
  addWaitingEnrollmentsByClass,
  setWaitingEnrollmentsByClass,
} from "@/lib/service/enrollments-service";
import { getClassFee } from "@/lib/service/classes-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function POST(request, context) {
  try {
    const { id: classId } = await context.params;
    if (!classId) {
      return buildApiResponse(400, false, "Thiếu ID lớp học.");
    }

    const { userIds, enrollmentTypeId } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!enrollmentTypeId || !Array.isArray(userIds) || userIds.length === 0)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    // get class fee for the class
    let classFee = 0;
    if (enrollmentTypeId == 26) {
      const classFeeResult = await getClassFee(classId);
      classFee = classFeeResult?.[0]?.class_fee || 0;
    }

    const result = await createEnrollmentsByClass(
      classId,
      userIds,
      enrollmentTypeId,
      classFee
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
    const { id: classId } = await context.params;
    if (!classId) {
      return buildApiResponse(400, false, "Thiếu ID lớp học.");
    }

    const { userIds, enrollmentTypeId } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!enrollmentTypeId || !Array.isArray(userIds) || userIds.length === 0)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const result = await deleteEnrollmentsByClass(
      classId,
      userIds,
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

export async function PUT(request, context) {
  try {
    const { id: classId } = await context.params;
    if (!classId) {
      return buildApiResponse(400, false, "Thiếu ID lớp học.");
    }

    const { enrollmentIds } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!Array.isArray(enrollmentIds) || enrollmentIds.length === 0)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    // get class fee for the class
    const classFeeResult = await getClassFee(classId);
    const classFee = classFeeResult?.[0]?.class_fee || 0;

    const result = await addWaitingEnrollmentsByClass(
      classId,
      enrollmentIds,
      classFee
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

export async function PATCH(request, context) {
  try {
    const { id: classId } = await context.params;
    if (!classId) {
      return buildApiResponse(400, false, "Thiếu ID lớp học.");
    }

    const { enrollmentIds } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!Array.isArray(enrollmentIds) || enrollmentIds.length === 0)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const result = await setWaitingEnrollmentsByClass(classId, enrollmentIds);

    if (!result || !result.length)
      return buildApiResponse(404, false, "Không thể xóa đăng ký.");

    return buildApiResponse(200, true, "Xóa đăng ký thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
