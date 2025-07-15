// path: @/lib/util/render-util.js

import { geekblue, cyan, green } from "@ant-design/colors";
import { Tag, Badge, Space, Typography } from "antd";
import {
  SolutionOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export function renderTextArea(text) {
  return (
    <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {text}
    </div>
  );
}

export function renderEnum(
  enumData,
  key,
  label = null,
  variant = "badge",
  props = {}
) {
  // Early return if no key provided (enumData is required too)
  if (!key) {
    return null;
  }

  // Validate enumData
  if (!enumData || typeof enumData !== "object") {
    return label || key || null;
  }

  // Get enum item data or use fallback
  const enumItem = enumData[key] || {};
  const { text = "", status, color } = enumItem;

  // Determine display text with priority: label > enum text > key
  const displayText = label || text || key;

  // Get color for component
  const componentColor = status || color || "default";
  const componentStatus = status || "default";

  // Return Tag or Badge based on variant
  if (variant === "tag") {
    return (
      <Tag {...props} color={componentColor}>
        {displayText}
      </Tag>
    );
  }

  // Default to Badge
  return (
    <Badge
      {...props}
      color={componentColor}
      status={componentStatus}
      text={displayText}
    />
  );
}

export function renderEnrollmentType(_, record) {
  const typeId = record.enrollment_type_id;
  console.log("renderEnrollmentType", typeId, record);

  const enrollmentTypes = {
    24: {
      text: "Giáo viên",
      icon: <SolutionOutlined style={{ color: geekblue.primary }} />,
      color: geekblue.primary,
    },
    25: {
      text: "Trợ giảng",
      icon: <UserOutlined style={{ color: cyan.primary }} />,
      color: cyan.primary,
    },
    26: {
      text: "Học viên",
      icon: <TeamOutlined style={{ color: green.primary }} />,
      color: green.primary,
    },
  };

  const enrollmentType = enrollmentTypes[typeId];

  if (!enrollmentType) {
    return typeId; // Return the typeId if not found
  }

  return (
    <Space>
      {enrollmentType.icon}
      <Typography.Text style={{ color: enrollmentType.color }}>
        {enrollmentType.text}
      </Typography.Text>
    </Space>
  );
}
