// path: @/component/common/button.js

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button as AntButton } from "antd";
import { useNavigate } from "@/component/hook";
import { convertToUpperCase } from "@/lib/util/convert-util";

// Components
export function Button({ label, ...props }) {
  const uppercaseLabel = label ? convertToUpperCase(label) : null;

  return <AntButton {...props}>{uppercaseLabel}</AntButton>;
}

export function DetailButton({ id, ...props }) {
  const pathname = usePathname();
  return (
    <Link href={`${pathname}/${id}`}>
      <Button {...props} />
    </Link>
  );
}

export function BackButton({
  label = "Quay lại",
  color = "default",
  variant = "filled",
  ...props
}) {
  const { navBack } = useNavigate();
  return (
    <Button
      {...props}
      label={label}
      color={color}
      variant={variant}
      onClick={() => navBack()}
    />
  );
}
