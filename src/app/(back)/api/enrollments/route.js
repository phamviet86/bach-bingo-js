// path: @/app/(back)/api/enrollments/route.js

import {
  getEnrollments,
  createEnrollment,
} from "@/lib/service/enrollments-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getEnrollments(searchParams);
    return buildApiResponse(200, true, "Lấy danh sách đăng ký thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function POST(request) {
  try {
    const {
      user_id,
      enrollment_type_id,
      module_id = null,
      class_id = null,
      enrollment_payment_type_id = null,
      enrollment_payment_amount = null,
      enrollment_payment_discount = null,
      enrollment_start_date = null,
      enrollment_end_date = null,
      enrollment_discount_notes = null,
      enrollment_desc = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL in SQL)
    if (!user_id || !enrollment_type_id) {
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");
    }

    // Validate date range if both dates are provided
    if (enrollment_start_date && enrollment_end_date) {
      const startDate = new Date(enrollment_start_date);
      const endDate = new Date(enrollment_end_date);

      if (startDate > endDate) {
        return buildApiResponse(
          400,
          false,
          "Ngày bắt đầu không được lớn hơn ngày kết thúc."
        );
      }
    }

    const data = {
      user_id,
      enrollment_type_id,
      module_id,
      class_id,
      enrollment_payment_type_id,
      enrollment_payment_amount,
      enrollment_payment_discount,
      enrollment_start_date,
      enrollment_end_date,
      enrollment_discount_notes,
      enrollment_desc,
    };

    const result = await createEnrollment(data);

    if (!result || !result.length) {
      return buildApiResponse(500, false, "Không thể thực hiện thao tác.");
    }

    return buildApiResponse(201, true, "Tạo đăng ký thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
