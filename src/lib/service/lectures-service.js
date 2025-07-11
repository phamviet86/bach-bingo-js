// path: @/lib/service/lectures-service.js

import { neonDB } from "@/lib/db/neon-db";
import { parseSearchParams } from "@/lib/util/query-util";

// Initialize database client
const sql = neonDB();

// READ operations
export async function getLectures(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT l.*, COUNT(*) OVER() AS total
      FROM lectures l
      WHERE l.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY l.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getLecture(id) {
  try {
    return await sql`
      SELECT l.*
      FROM lectures l
      WHERE l.deleted_at IS NULL
        AND l.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operation
export async function createLecture(data) {
  try {
    const {
      module_id,
      lecture_name,
      lecture_status_id,
      lecture_no,
      lecture_desc,
    } = data;

    return await sql`
      INSERT INTO lectures (
        module_id, lecture_name, lecture_status_id, lecture_no, lecture_desc
      ) VALUES (
        ${module_id}, ${lecture_name}, ${lecture_status_id}, ${lecture_no}, ${lecture_desc}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operation
export async function updateLecture(id, data) {
  try {
    const {
      module_id,
      lecture_name,
      lecture_status_id,
      lecture_no,
      lecture_desc,
    } = data;

    return await sql`
      UPDATE lectures
      SET
        module_id = ${module_id},
        lecture_name = ${lecture_name},
        lecture_status_id = ${lecture_status_id},
        lecture_no = ${lecture_no},
        lecture_desc = ${lecture_desc}
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operation
export async function deleteLecture(id) {
  try {
    return await sql`
      UPDATE lectures
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}
