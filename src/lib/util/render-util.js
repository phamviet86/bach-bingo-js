// path: @/lib/util/render-util.js

import { Tag, Badge, Space, Typography } from "antd";
import { presetPrimaryColors } from "@ant-design/colors";
import { COLOR_ENUM } from "@/component/config/enum-config";

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
  variant = "bagde",
  props = {}
) {
  // Early return if no key or enumData
  if (!key || !enumData || typeof enumData !== "object") {
    return label || key || null;
  }

  const enumItem = enumData[key] || {};
  const { text = "", color } = enumItem;
  const displayText = label || text || key;

  // Get processed color and status
  const componentColor = color ? COLOR_ENUM[color]?.color || color : undefined;

  const renderProps = {
    ...props,
    ...(componentColor && { color: componentColor }),
  };

  // Render component based on variant
  switch (variant) {
    case "tag":
      return <Tag {...renderProps}>{displayText}</Tag>;

    case "text":
      return (
        <Typography.Text
          style={{
            color: componentColor
              ? presetPrimaryColors[componentColor]
              : undefined,
          }}
        >
          {displayText}
        </Typography.Text>
      );

    default:
      return <Badge {...renderProps} text={displayText} />;
  }
}

export function renderEnrollmentType(_, record) {
  return (
    <Space>
      <Typography.Text>{record.enrollment_type_id}</Typography.Text>
    </Space>
  );
}
