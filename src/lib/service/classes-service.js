// path: @/lib/service/classes-service.js

import { neonDB } from "@/lib/db/neon-db";
import { parseSearchParams } from "@/lib/util/query-util";

// Initialize database client
const sql = neonDB();

// READ operations
export async function getClasses(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT c.*, COUNT(*) OVER() AS total,
        co.course_name, co.course_code,
        m.module_name,
        s.syllabus_name
      FROM classes_view c
      LEFT JOIN courses co ON c.course_id = co.id
      LEFT JOIN modules m ON c.module_id = m.id
      LEFT JOIN syllabuses s ON m.syllabus_id = s.id
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

export async function getClass(id) {
  try {
    return await sql`
      SELECT c.*, COUNT(*) OVER() AS total,
        co.course_name, co.course_code,
        m.module_name,
        s.syllabus_name
      FROM classes_view c
      LEFT JOIN courses co ON c.course_id = co.id
      LEFT JOIN modules m ON c.module_id = m.id
      LEFT JOIN syllabuses s ON m.syllabus_id = s.id
      WHERE c.deleted_at IS NULL
        AND c.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operation
export async function createClass(data) {
  try {
    const {
      course_id,
      module_id,
      class_start_date,
      class_end_date,
      class_fee,
      class_total_fee,
    } = data;

    return await sql`
      INSERT INTO classes (
        course_id, module_id, class_start_date, class_end_date, class_fee, class_total_fee
      ) VALUES (
        ${course_id}, ${module_id}, ${class_start_date}, ${class_end_date}, ${class_fee}, ${class_total_fee}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operation
export async function updateClass(id, data) {
  try {
    const {
      course_id,
      module_id,
      class_start_date,
      class_end_date,
      class_fee,
      class_total_fee,
    } = data;

    return await sql`
      UPDATE classes
      SET
        course_id = ${course_id},
        module_id = ${module_id},
        class_start_date = ${class_start_date},
        class_end_date = ${class_end_date},
        class_fee = ${class_fee},
        class_total_fee = ${class_total_fee}
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operation
export async function deleteClass(id) {
  try {
    return await sql`
      UPDATE classes
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get classes by course ID
export async function getClassesByCourse(courseId, searchParams) {
  try {
    const ignoredSearchColumns = ["course_id"];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [courseId, ...queryValues];
    const sqlText = `
      SELECT c.*, COUNT(*) OVER() AS total,
        co.course_name, co.course_code,
        m.module_name,
        s.syllabus_name
      FROM classes_view c
      LEFT JOIN courses co ON c.course_id = co.id
      LEFT JOIN modules m ON c.module_id = m.id
      LEFT JOIN syllabuses s ON m.syllabus_id = s.id
      WHERE c.deleted_at IS NULL
        AND c.course_id = $1
      ${whereClause}
      ${orderByClause || "ORDER BY c.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

// create multiple classes by course ID and module IDs
export async function createClassesByCourse(courseId, moduleIds) {
  try {
    const queryValues = [];
    const valuePlaceholders = moduleIds
      .map((moduleId, index) => {
        queryValues.push(courseId, moduleId);
        return `($${index * 2 + 1}, $${index * 2 + 2})`;
      })
      .join(", ");

    const queryText = `
      INSERT INTO classes (course_id, module_id)
      VALUES ${valuePlaceholders}
      RETURNING *;
    `;

    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}

// Soft-delete multiple classes by course ID and module IDs
export async function deleteClassesByCourse(courseId, moduleIds) {
  try {
    const placeholders = moduleIds
      .map((_, index) => `$${index + 2}`)
      .join(", ");

    const queryText = `
      UPDATE classes
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND course_id = $1
        AND module_id IN (${placeholders})
      RETURNING *;
    `;

    const queryValues = [courseId, ...moduleIds];
    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get class fee by class ID
export async function getClassFee(id) {
  try {
    return await sql`
      SELECT c.*, COUNT(*) OVER() AS total
      FROM classes c
      WHERE c.deleted_at IS NULL
        AND c.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}
