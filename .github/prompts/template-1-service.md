# Template code for service

## Template

```javascript
// path: @/lib/service/{table-name}-service.js

import { neonDB } from "@/lib/db/neon-db";
import { parseSearchParams } from "@/lib/util/query-util";

// Initialize database client
const sql = neonDB();

// READ operations
export async function get{TableNamePlural}(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const {
      whereClause,
      orderByClause,
      limitClause,
      queryValues,
    } = parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT {alias}.*, COUNT(*) OVER() AS total
      FROM {tableName} {alias}
      WHERE {alias}.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY {alias}.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function get{TableNameSingular}(id) {
  try {
    return await sql`
      SELECT {alias}.*
      FROM {tableName} {alias}
      WHERE {alias}.deleted_at IS NULL
        AND {alias}.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operation
export async function create{TableNameSingular}(data) {
  try {
    const {
      {column1},
      {column2},
      /* …other fields… */
    } = data;

    return await sql`
      INSERT INTO {tableName} (
        {column1}, {column2} /*, …other fields… */
      ) VALUES (
        ${column1}, ${column2} /*, ${otherField}… */
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operation
export async function update{TableNameSingular}(id, data) {
  try {
    const {
      {column1},
      {column2},
      /* …other fields… */
    } = data;

    return await sql`
      UPDATE {tableName}
      SET
        {column1} = ${column1},
        {column2} = ${column2}
        /*, …otherField = ${otherField}… */
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operation
export async function delete{TableNameSingular}(id) {
  try {
    return await sql`
      UPDATE {tableName}
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}
```

## Template placeholders

- {table-name}: kebab-case table name (e.g. options, rooms)
- {TableNamePlural}: PascalCase plural form (e.g. Options, Rooms)
- {TableNameSingular}: PascalCase singular form (e.g. Option, Room)
- {alias}: a short alias for the table (e.g. o for options, r for rooms)
- {column1}, {column2}, …: actual column names from your table schema
- other fields: repeat the pattern for all remaining columns
