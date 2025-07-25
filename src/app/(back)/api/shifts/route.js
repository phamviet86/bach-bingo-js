// path: @/app/(back)/api/shifts/route.js

import { getShifts, createShift } from "@/lib/service/shifts-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getShifts(searchParams);
    return buildApiResponse(200, true, "Lấy danh sách ca học thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function POST(request) {
  try {
    const {
      shift_name,
      shift_start_time,
      shift_end_time,
      shift_status_id,
      shift_desc = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL in SQL)
    if (
      !shift_name ||
      !shift_start_time ||
      !shift_end_time ||
      !shift_status_id
    ) {
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");
    }

    const data = {
      shift_name,
      shift_start_time,
      shift_end_time,
      shift_status_id,
      shift_desc,
    };

    const result = await createShift(data);

    if (!result || !result.length) {
      return buildApiResponse(500, false, "Không thể thực hiện thao tác.");
    }

    return buildApiResponse(201, true, "Tạo ca học thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
