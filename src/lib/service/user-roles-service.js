// path: @/lib/service/user-roles-service.js

import { neonDB } from "@/lib/db/neon-db";
import { parseSearchParams } from "@/lib/util/query-util";

// Initialize database client
const sql = neonDB();

// READ operations
export async function getUserRoles(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT ur.*, COUNT(*) OVER() AS total,
        r.role_name, r.role_status_id, r.role_path
      FROM user_roles ur
      LEFT JOIN roles r ON ur.role_id = r.id
      WHERE ur.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY ur.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserRole(id) {
  try {
    return await sql`
      SELECT ur.*
      FROM user_roles ur
      WHERE ur.deleted_at IS NULL
        AND ur.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operation
export async function createUserRole(data) {
  try {
    const { user_id, role_id } = data;

    return await sql`
      INSERT INTO user_roles (
        user_id, role_id
      ) VALUES (
        ${user_id}, ${role_id}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operation
export async function updateUserRole(id, data) {
  try {
    const { user_id, role_id } = data;

    return await sql`
      UPDATE user_roles
      SET
        user_id = ${user_id},
        role_id = ${role_id}
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operation
export async function deleteUserRole(id) {
  try {
    return await sql`
      UPDATE user_roles
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get user roles by user ID
export async function getUserRolesByUser(userId, searchParams) {
  try {
    const ignoredSearchColumns = ["user_id"];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [userId, ...queryValues];
    const sqlText = `
      SELECT ur.*, COUNT(*) OVER() AS total,
        r.role_name, r.role_status_id, r.role_path
      FROM user_roles ur
      LEFT JOIN roles r ON ur.role_id = r.id
      WHERE ur.deleted_at IS NULL
        AND ur.user_id = $1
      ${whereClause}
      ${orderByClause || "ORDER BY ur.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

// Create multiple user roles by user ID and role IDs
export async function createUserRolesByUser(userId, roleIds) {
  try {
    const queryValues = [];
    const valuePlaceholders = roleIds
      .map((roleId, index) => {
        queryValues.push(userId, roleId);
        return `($${index * 2 + 1}, $${index * 2 + 2})`;
      })
      .join(", ");

    const queryText = `
      INSERT INTO user_roles (user_id, role_id)
      VALUES ${valuePlaceholders}
      RETURNING *;
    `;

    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}

// Soft-delete multiple user roles by user ID and role IDs
export async function deleteUserRolesByUser(userId, roleIds) {
  try {
    const placeholders = roleIds.map((_, index) => `$${index + 2}`).join(", ");

    const queryText = `
      UPDATE user_roles
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL 
        AND user_id = $1 
        AND role_id IN (${placeholders})
      RETURNING *;
    `;

    const queryValues = [userId, ...roleIds];
    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}
