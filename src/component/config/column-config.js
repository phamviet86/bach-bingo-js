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
  { key: "role_names", hidden: true },
];

export const USER_ROLES_COLUMN = [
  { key: "role_name" }, // breakline
  { key: "role_path" }, // breakline
];

export const SYLLABUSES_COLUMN = [
  { key: "syllabus_name" },
  { key: "syllabus_status_id" },
];

export const MODULES_COLUMN = [
  { key: "module_name" },
  { key: "module_status_id" },
  { key: "module_desc", responsive: ["md"] },
];

export const LECTURES_COLUMN = [
  { key: "module_id" },
  { key: "lecture_no", responsive: ["md"] },
  { key: "displayLecture", hideInDescriptions: true },
  { key: "lecture_name", hidden: true },
  { key: "lecture_status_id", hidden: true },
  { key: "lecture_desc", responsive: ["lg"] },
];

export const COURSES_COLUMN = [
  { key: "course_name" }, // breakline
  { key: "course_code" }, // breakline
];

export const CLASSES_COLUMN = [
  { key: "displayClass", hideInDescriptions: true },
  { key: "course_name", hidden: true },
  { key: "module_name", hidden: true },
  { key: "syllabus_name", hidden: true },
  { key: "class_status_id" },
  { key: "class_start_date", responsive: ["md"] },
  { key: "class_end_date", responsive: ["md"] },
  { key: "class_fee", responsive: ["lg"] },
  { key: "class_total_fee", responsive: ["lg"] },
];

export const COURSE_CLASSES_COLUMN = [
  { key: "displayModule", hideInDescriptions: true },
  { key: "course_name", hidden: true },
  { key: "module_name", hidden: true },
  { key: "syllabus_name", hidden: true },
  { key: "class_status_id" },
  { key: "class_start_date", responsive: ["md"] },
  { key: "class_end_date", responsive: ["md"] },
  { key: "class_fee", responsive: ["lg"] },
  { key: "class_total_fee", responsive: ["lg"] },
];

export const CLASS_ENROLLMENTS_COLUMN = [
  { key: "displayUser", hideInDescriptions: true },
  { key: "enrollment_type_id", hidden: true },
  { key: "user_name", hidden: true },
  { key: "enrollment_status_id" },
  { key: "enrollment_start_date", responsive: ["lg"] },
  { key: "enrollment_end_date", responsive: ["lg"] },
  { key: "enrollment_payment_type_id", responsive: ["xl"] },
  { key: "enrollment_payment_amount", responsive: ["xl"] },
  { key: "enrollment_payment_discount", responsive: ["xl"] },
  { key: "enrollment_discount_notes", hidden: true },
  { key: "enrollment_desc", hidden: true },
];

export const USER_ENROLLMENTS_COLUMN = [
  { key: "displayClass", hideInDescriptions: true },
  { key: "enrollment_type_id", hidden: true },
  { key: "course_name", hidden: true },
  { key: "module_name", hidden: true },
  { key: "enrollment_status_id" },
  { key: "enrollment_start_date", responsive: ["lg"] },
  { key: "enrollment_end_date", responsive: ["lg"] },
  { key: "enrollment_payment_type_id", responsive: ["xl"] },
  { key: "enrollment_payment_amount", responsive: ["xl"] },
  { key: "enrollment_payment_discount", responsive: ["xl"] },
  { key: "enrollment_discount_notes", hidden: true },
  { key: "enrollment_desc", hidden: true },
];
