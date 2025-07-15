// path: @/component/config/column-config.js

// options
export const OPTIONS_COLUMN = [
  { key: "id", responsive: ["md"] },
  { key: "option_table", responsive: ["lg"] },
  { key: "option_column" },
  { key: "displayLabel", hideInDescriptions: true },
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
  { key: "room_desc", responsive: ["md"] },
];

export const SHIFTS_COLUMN = [
  { key: "shift_name" },
  { key: "shift_status_id" },
  { key: "shift_start_time", responsive: ["md"] },
  { key: "shift_end_time", responsive: ["md"] },
  { key: "shift_desc", responsive: ["lg"] },
];

export const USERS_COLUMN = [
  { key: "displayAvatar", hideInDescriptions: true },
  { key: "displayUser", hideInDescriptions: true },
  { key: "user_name", hidden: true },
  { key: "user_desc", hidden: true },
  { key: "user_status_id", responsive: ["sm"] },
  { key: "user_email", responsive: ["lg"] },
  { key: "user_phone", responsive: ["md"] },
  { key: "user_parent_phone", hidden: true },
  { key: "user_notes", responsive: ["xl"] },
];
