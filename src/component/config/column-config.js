// path: @/component/config/column-config.js

// options
export const OPTIONS_COLUMN = [
  { key: "id", responsive: ["md"] },
  { key: "option_table", responsive: ["lg"] },
  { key: "option_column" },
  { key: "displayLabel" },
  { key: "option_label", hidden: true },
  { key: "option_color", hidden: true },
  { key: "option_group", responsive: ["xl"] },
];

export const ROLES_COLUMN = [
  { key: "role_name" },
  { key: "role_status_id" },
  { key: "role_path", responsive: ["md"] },
];

export const ROOMS_COLUMN = [
  { key: "room_name" },
  { key: "room_status_id" },
  { key: "room_desc", search: false, responsive: ["md"] },
];

export const SHIFTS_COLUMN = [
  { key: "shift_name" },
  { key: "shift_status_id" },
  { key: "shift_start_time", responsive: ["md"] },
  { key: "shift_end_time", responsive: ["md"] },
  { key: "shift_desc", search: false, responsive: ["lg"] },
];
