// path: @/lib/service/courses-service.js

import { neonDB } from "@/lib/db/neon-db";
import { parseSearchParams } from "@/lib/util/query-util";

// Initialize database client
const sql = neonDB();

// READ operations
export async function getCourses(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT c.*, COUNT(*) OVER() AS total
      FROM courses c
      WHERE c.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY c.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCourse(id) {
  try {
    return await sql`
      SELECT c.*
      FROM courses c
      WHERE c.deleted_at IS NULL
        AND c.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operation
export async function createCourse(data) {
  try {
    const { course_name, course_code } = data;

    return await sql`
      INSERT INTO courses (
        course_name, course_code
      ) VALUES (
        ${course_name}, ${course_code}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operation
export async function updateCourse(id, data) {
  try {
    const { course_name, course_code } = data;

    return await sql`
      UPDATE courses
      SET
        course_name = ${course_name},
        course_code = ${course_code}
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operation
export async function deleteCourse(id) {
  try {
    return await sql`
      UPDATE courses
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}
