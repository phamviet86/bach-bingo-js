// path: @/app/(back)/api/users/[id]/route.js

import {
  getUser,
  updateUser,
  deleteUser,
  getUserByEmail,
} from "@/lib/service/users-service";
import { buildApiResponse } from "@/lib/util/api-util";

export async function GET(_, context) {
  try {
    const { id } = await context.params;
    if (!id) {
      return buildApiResponse(400, false, "Thiếu ID người dùng.");
    }

    const result = await getUser(id);
    if (!result || !result.length) {
      return buildApiResponse(404, false, "Không tìm thấy người dùng.");
    }

    return buildApiResponse(200, true, "Lấy thông tin người dùng thành công.", {
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
      return buildApiResponse(400, false, "Thiếu ID người dùng.");
    }

    const {
      user_name,
      user_status_id,
      user_email,
      user_phone = null,
      user_parent_phone = null,
      user_avatar = null,
      user_desc = null,
      user_notes = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints)
    if (!user_name || !user_status_id || !user_email) {
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");
    }

    // check if user changes email, it must not duplicate with another user's email
    const existingUser = await getUserByEmail(user_email);
    if (existingUser && existingUser.length > 0 && existingUser[0].id !== id) {
      return buildApiResponse(409, false, "Email đã tồn tại trong hệ thống");
    }

    const data = {
      user_name,
      user_status_id,
      user_email,
      user_phone,
      user_parent_phone,
      user_avatar,
      user_desc,
      user_notes,
    };

    const result = await updateUser(id, data);
    if (!result || !result.length) {
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy người dùng hoặc đã bị xóa."
      );
    }

    return buildApiResponse(200, true, "Cập nhật người dùng thành công.", {
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
      return buildApiResponse(400, false, "Thiếu ID người dùng.");
    }

    const result = await deleteUser(id);
    if (!result || !result.length) {
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy người dùng hoặc đã bị xóa."
      );
    }

    return buildApiResponse(200, true, "Xóa người dùng thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
