// path: @/lib/service/enrollments-service.js

import { neonDB } from "@/lib/db/neon-db";
import { parseSearchParams } from "@/lib/util/query-util";

// Initialize database client
const sql = neonDB();

// READ operations
export async function getEnrollments(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT e.*, COUNT(*) OVER() AS total,
        u.user_name, u.user_avatar,
        co.course_name,
        m.module_name,
        s.syllabus_name
      FROM enrollments_view e
      LEFT JOIN users u ON e.user_id = u.id
      LEFT JOIN classes c ON e.class_id = c.id
      LEFT JOIN courses co ON c.course_id = co.id
      LEFT JOIN modules m ON c.module_id = m.id
      LEFT JOIN syllabuses s ON m.syllabus_id = s.id
      WHERE e.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY e.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getEnrollment(id) {
  try {
    return await sql`
      SELECT e.*, COUNT(*) OVER() AS total,
        u.user_name, u.user_avatar,
        co.course_name,
        m.module_name,
        s.syllabus_name
      FROM enrollments_view e
      LEFT JOIN users u ON e.user_id = u.id
      LEFT JOIN classes c ON e.class_id = c.id
      LEFT JOIN courses co ON c.course_id = co.id
      LEFT JOIN modules m ON c.module_id = m.id
      LEFT JOIN syllabuses s ON m.syllabus_id = s.id
      WHERE e.deleted_at IS NULL
        AND e.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operation
export async function createEnrollment(data) {
  try {
    const {
      user_id,
      module_id,
      class_id,
      enrollment_type_id,
      enrollment_payment_type_id,
      enrollment_payment_amount,
      enrollment_payment_discount,
      enrollment_start_date,
      enrollment_end_date,
      enrollment_discount_notes,
      enrollment_desc,
    } = data;

    return await sql`
      INSERT INTO enrollments (
        user_id, module_id, class_id, enrollment_type_id, enrollment_payment_type_id, enrollment_payment_amount, enrollment_payment_discount, enrollment_start_date, enrollment_end_date, enrollment_discount_notes, enrollment_desc
      ) VALUES (
        ${user_id}, ${module_id}, ${class_id}, ${enrollment_type_id}, ${enrollment_payment_type_id}, ${enrollment_payment_amount}, ${enrollment_payment_discount}, ${enrollment_start_date}, ${enrollment_end_date}, ${enrollment_discount_notes}, ${enrollment_desc}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operation
export async function updateEnrollment(id, data) {
  try {
    const {
      user_id,
      module_id,
      class_id,
      enrollment_type_id,
      enrollment_payment_type_id,
      enrollment_payment_amount,
      enrollment_payment_discount,
      enrollment_start_date,
      enrollment_end_date,
      enrollment_discount_notes,
      enrollment_desc,
    } = data;

    return await sql`
      UPDATE enrollments
      SET
        user_id = ${user_id},
        module_id = ${module_id},
        class_id = ${class_id},
        enrollment_type_id = ${enrollment_type_id},
        enrollment_payment_type_id = ${enrollment_payment_type_id},
        enrollment_payment_amount = ${enrollment_payment_amount},
        enrollment_payment_discount = ${enrollment_payment_discount},
        enrollment_start_date = ${enrollment_start_date},
        enrollment_end_date = ${enrollment_end_date},
        enrollment_discount_notes = ${enrollment_discount_notes},
        enrollment_desc = ${enrollment_desc}
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operation
export async function deleteEnrollment(id) {
  try {
    return await sql`
      UPDATE enrollments
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get enrollments by class ID
export async function getEnrollmentsByClass(classId, searchParams) {
  try {
    const ignoredSearchColumns = ["class_id"];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [classId, ...queryValues];
    const sqlText = `
      SELECT e.*, COUNT(*) OVER() AS total,
        u.user_name, u.user_avatar,
        co.course_name,
        m.module_name,
        s.syllabus_name
      FROM enrollments_view e
      LEFT JOIN users u ON e.user_id = u.id
      LEFT JOIN classes c ON e.class_id = c.id
      LEFT JOIN courses co ON c.course_id = co.id
      LEFT JOIN modules m ON c.module_id = m.id
      LEFT JOIN syllabuses s ON m.syllabus_id = s.id
      WHERE e.deleted_at IS NULL
        AND e.class_id = $1
      ${whereClause}
      ${orderByClause || "ORDER BY e.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

// Create multiple enrollments by classId, enrollmentTypeId, enrollmentPaymentAmount and userIds
export async function createEnrollmentsByClass(
  classId,
  userIds,
  enrollmentTypeId,
  enrollmentPaymentAmount = 0
) {
  try {
    const queryValues = [];
    const valuePlaceholders = userIds
      .map((userId, index) => {
        queryValues.push(
          userId,
          classId,
          enrollmentTypeId,
          enrollmentPaymentAmount
        );
        return `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${
          index * 4 + 4
        })`;
      })
      .join(", ");

    const queryText = `
      INSERT INTO enrollments (user_id, class_id, enrollment_type_id, enrollment_payment_amount)
      VALUES ${valuePlaceholders}
      RETURNING *;
    `;

    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}

// Soft-delete multiple enrollments by classId, enrollmentTypeId, and userIds
export async function deleteEnrollmentsByClass(
  classId,
  userIds,
  enrollmentTypeId
) {
  try {
    const placeholders = userIds.map((_, index) => `$${index + 3}`).join(", ");
    const queryText = `
      UPDATE enrollments
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND class_id = $1
        AND enrollment_type_id = $2
        AND user_id IN (${placeholders})
      RETURNING *;
    `;
    const queryValues = [classId, enrollmentTypeId, ...userIds];
    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get enrollments by user ID
export async function getEnrollmentsByUser(userId, searchParams) {
  try {
    const ignoredSearchColumns = ["user_id"];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [userId, ...queryValues];
    const sqlText = `
      SELECT e.*, COUNT(*) OVER() AS total,
        u.user_name, u.user_avatar,
        co.course_name,
        m.module_name,
        s.syllabus_name
      FROM enrollments_view e
      LEFT JOIN users u ON e.user_id = u.id
      LEFT JOIN classes c ON e.class_id = c.id
      LEFT JOIN courses co ON c.course_id = co.id
      LEFT JOIN modules m ON c.module_id = m.id
      LEFT JOIN syllabuses s ON m.syllabus_id = s.id
      WHERE e.deleted_at IS NULL
        AND e.user_id = $1
      ${whereClause}
      ${orderByClause || "ORDER BY e.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

// Create multiple enrollments by userId, enrollmentTypeId, enrollmentPaymentAmount and classIds
export async function createEnrollmentsByUser(
  userId,
  classIds,
  enrollmentTypeId,
  enrollmentPaymentAmount = 0
) {
  try {
    const queryValues = [];
    const valuePlaceholders = classIds
      .map((classId, index) => {
        queryValues.push(
          userId,
          classId,
          enrollmentTypeId,
          enrollmentPaymentAmount
        );
        return `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${
          index * 4 + 4
        })`;
      })
      .join(", ");

    const queryText = `
      INSERT INTO enrollments (user_id, class_id, enrollment_type_id, enrollment_payment_amount)
      VALUES ${valuePlaceholders}
      RETURNING *;
    `;

    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}
// Soft-delete multiple enrollments by userId, enrollmentTypeId, and classIds
export async function deleteEnrollmentsByUser(
  userId,
  classIds,
  enrollmentTypeId
) {
  try {
    const placeholders = classIds.map((_, index) => `$${index + 3}`).join(", ");
    const queryText = `
      UPDATE enrollments
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND user_id = $1
        AND enrollment_type_id = $2
        AND class_id IN (${placeholders})
      RETURNING *;
    `;
    const queryValues = [userId, enrollmentTypeId, ...classIds];
    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}
