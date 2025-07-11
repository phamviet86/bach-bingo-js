// path: @/app/(back)/api/shifts/[id]/route.js

import {
  getShift,
  updateShift,
  deleteShift,
} from "@/lib/service/shifts-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(_, context) {
  try {
    const { id } = await context.params;
    if (!id) {
      return buildApiResponse(400, false, "Thiếu ID ca học.");
    }

    const result = await getShift(id);
    if (!result || !result.length) {
      return buildApiResponse(404, false, "Không tìm thấy ca học.");
    }

    return buildApiResponse(200, true, "Lấy thông tin ca học thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    if (!id) {
      return buildApiResponse(400, false, "Thiếu ID ca học.");
    }

    const {
      shift_name,
      shift_start_time,
      shift_end_time,
      shift_status_id,
      shift_desc = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints)
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

    const result = await updateShift(id, data);
    if (!result || !result.length) {
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy ca học hoặc đã bị xóa."
      );
    }

    return buildApiResponse(200, true, "Cập nhật ca học thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(_, context) {
  try {
    const { id } = await context.params;
    if (!id) {
      return buildApiResponse(400, false, "Thiếu ID ca học.");
    }

    const result = await deleteShift(id);
    if (!result || !result.length) {
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy ca học hoặc đã bị xóa."
      );
    }

    return buildApiResponse(200, true, "Xóa ca học thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
