// path: @/component/config/selection-config.js

export const COLOR_ENUM = {
  default: {
    text: "Default",
    status: "default",
    color: "#595959",
    bgColor: "#f0f0f0",
  },
  processing: {
    text: "Processing",
    status: "processing",
    color: "#1677ff",
    bgColor: "#e6f4ff",
  },
  success: {
    text: "Success",
    status: "success",
    color: "#52c41a",
    bgColor: "#f6ffed",
  },
  error: {
    text: "Error",
    status: "error",
    color: "#ff4d4f",
    bgColor: "#fff2f0",
  },
  warning: {
    text: "Warning",
    status: "warning",
    color: "#faad14",
    bgColor: "#fffbe6",
  },
  magenta: {
    text: "Magenta",
    color: "magenta",
    bgColor: "#fff0f6",
  },
  red: {
    text: "Red",
    color: "red",
    bgColor: "#fff1f0",
  },
  volcano: {
    text: "Volcano",
    color: "volcano",
    bgColor: "#fff2e8",
  },
  orange: {
    text: "Orange",
    color: "orange",
    bgColor: "#fff7e6",
  },
  gold: {
    text: "Gold",
    color: "gold",
    bgColor: "#fffbe6",
  },
  lime: {
    text: "Lime",
    color: "lime",
    bgColor: "#fcffe6",
  },
  green: {
    text: "Green",
    color: "green",
    bgColor: "#f6ffed",
  },
  cyan: {
    text: "Cyan",
    color: "cyan",
    bgColor: "#e6fffb",
  },
  blue: {
    text: "Blue",
    color: "blue",
    bgColor: "#e6f4ff",
  },
  geekblue: {
    text: "Geekblue",
    color: "geekblue",
    bgColor: "#f0f5ff",
  },
  purple: {
    text: "Purple",
    color: "purple",
    bgColor: "#f9f0ff",
  },
  pink: {
    text: "Pink",
    color: "pink",
    bgColor: "#fff0f6",
  },
  gray: {
    text: "Gray",
    color: "gray",
    bgColor: "#fafafa",
  },
};

export const RESOURCE_METHOD_ENUM = {
  GET: { text: "GET", color: "green" },
  POST: { text: "POST", color: "blue" },
  PUT: { text: "PUT", color: "orange" },
  DELETE: { text: "DELETE", color: "red" },
  PATCH: { text: "PATCH", color: "purple" },
};

export const ENROLLMENT_STATUS_ENUM = {
  "Nhập sai ngày": { text: "Nhập sai ngày", status: "error" },
  "Chờ xếp lớp": { text: "Chờ xếp lớp", status: "warning" },
  "Thiếu ngày": { text: "Thiếu ngày", status: "error" },
  "Đã xếp lớp": { text: "Đã xếp lớp", status: "success" },
  "Đang học": { text: "Đang học", status: "processing" },
  "Đang dạy": { text: "Đang dạy", status: "processing" },
  "Đã kết thúc": { text: "Đã kết thúc", status: "default" },
};
