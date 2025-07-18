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
        s.syllabus_name,
        wm.module_name AS waiting_module_name,
        ws.syllabus_name AS waiting_syllabus_name
      FROM enrollments_view e
      LEFT JOIN users u ON e.user_id = u.id
      LEFT JOIN classes c ON e.class_id = c.id
      LEFT JOIN courses co ON c.course_id = co.id
      LEFT JOIN modules m ON c.module_id = m.id
      LEFT JOIN syllabuses s ON m.syllabus_id = s.id
      LEFT JOIN modules wm ON e.module_id = wm.id
      LEFT JOIN syllabuses ws ON wm.syllabus_id = ws.id
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
        s.syllabus_name,
        wm.module_name AS waiting_module_name,
        ws.syllabus_name AS waiting_syllabus_name
      FROM enrollments_view e
      LEFT JOIN users u ON e.user_id = u.id
      LEFT JOIN classes c ON e.class_id = c.id
      LEFT JOIN courses co ON c.course_id = co.id
      LEFT JOIN modules m ON c.module_id = m.id
      LEFT JOIN syllabuses s ON m.syllabus_id = s.id
      LEFT JOIN modules wm ON e.module_id = wm.id
      LEFT JOIN syllabuses ws ON wm.syllabus_id = ws.id
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

// Create multiple enrollments by classId, enrollmentTypeId and userIds
export async function createEnrollmentsByClass(
  classId,
  userIds,
  enrollmentTypeId,
  classFee
) {
  try {
    const queryValues = [];
    const valuePlaceholders = userIds
      .map((userId, index) => {
        queryValues.push(userId, classId, enrollmentTypeId, classFee);
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

// Add classId to multiple enrollments by enrollmentIds and classFee
export async function addWaitingEnrollmentsByClass(
  classId,
  enrollmentIds,
  classFee
) {
  // check input
  if (!classId || !Array.isArray(enrollmentIds) || enrollmentIds.length === 0) {
    throw new Error("Invalid input");
  }

  try {
    const placeholders = enrollmentIds
      .map((_, index) => `$${index + 3}`)
      .join(", ");
    const queryText = `
      UPDATE enrollments
      SET class_id = $1,
          enrollment_payment_amount = $2
      WHERE deleted_at IS NULL
        AND id IN (${placeholders})
      RETURNING *;
    `;
    const queryValues = [classId, classFee, ...enrollmentIds];
    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}

// remove classId from multiple enrollments by classId and enrollmentIds
export async function setWaitingEnrollmentsByClass(classId, enrollmentIds) {
  try {
    const placeholders = enrollmentIds
      .map((_, index) => `$${index + 2}`)
      .join(", ");
    const queryText = `
      UPDATE enrollments
      SET class_id = NULL,
          enrollment_payment_amount = 0
      WHERE deleted_at IS NULL
        AND class_id = $1 
        AND id IN (${placeholders}) 
      RETURNING *;
    `;
    const queryValues = [classId, ...enrollmentIds];
    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}

// Create multiple enrollments by userId, enrollmentTypeId and classData
export async function createEnrollmentsByUser(
  userId,
  classData,
  enrollmentTypeId
) {
  try {
    const queryValues = [];
    const valuePlaceholders = classData
      .map((classItem, index) => {
        queryValues.push(
          userId,
          classItem.classId,
          enrollmentTypeId,
          classItem.classFee
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

// Create multiple waiting enrollments by userId, enrollmentTypeId and moduleIds
export async function createWaitingEnrollmentsByUser(
  userId,
  moduleIds,
  enrollmentTypeId
) {
  try {
    const queryValues = [];
    const valuePlaceholders = moduleIds
      .map((moduleId, index) => {
        queryValues.push(userId, moduleId, enrollmentTypeId);
        return `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`;
      })
      .join(", ");

    const queryText = `
      INSERT INTO enrollments (user_id, module_id, enrollment_type_id)
      VALUES ${valuePlaceholders}
      RETURNING *;
    `;

    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}

// Soft-delete multiple waiting enrollments by userId, enrollmentTypeId, and moduleIds
export async function deleteWaitingEnrollmentsByUser(
  userId,
  moduleIds,
  enrollmentTypeId
) {
  try {
    const placeholders = moduleIds
      .map((_, index) => `$${index + 3}`)
      .join(", ");
    const queryText = `
      UPDATE enrollments
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND user_id = $1
        AND enrollment_type_id = $2
        AND module_id IN (${placeholders})
      RETURNING *;
    `;
    const queryValues = [userId, enrollmentTypeId, ...moduleIds];
    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}
