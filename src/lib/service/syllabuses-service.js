// path: @/lib/service/syllabuses-service.js

import { neonDB } from "@/lib/db/neon-db";
import { parseSearchParams } from "@/lib/util/query-util";

// Initialize database client
const sql = neonDB();

// READ operations
export async function getSyllabuses(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT s.*, COUNT(*) OVER() AS total
      FROM syllabuses s
      WHERE s.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY s.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getSyllabus(id) {
  try {
    return await sql`
      SELECT s.*
      FROM syllabuses s
      WHERE s.deleted_at IS NULL
        AND s.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operation
export async function createSyllabus(data) {
  try {
    const { syllabus_name, syllabus_status_id } = data;

    return await sql`
      INSERT INTO syllabuses (
        syllabus_name, syllabus_status_id
      ) VALUES (
        ${syllabus_name}, ${syllabus_status_id}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operation
export async function updateSyllabus(id, data) {
  try {
    const { syllabus_name, syllabus_status_id } = data;

    return await sql`
      UPDATE syllabuses
      SET
        syllabus_name = ${syllabus_name},
        syllabus_status_id = ${syllabus_status_id}
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operation
export async function deleteSyllabus(id) {
  try {
    return await sql`
      UPDATE syllabuses
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}
