"use client";

import Link from "next/link";
import { Result, AntButton } from "@/component/common";

export default function Forbidden() {
  return (
    <Result
      status="403"
      title="Không có quyền truy cập"
      subTitle="Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn cần thêm quyền."
      extra={
        <Link href="/app">
          <AntButton type="primary" label="Quay về trang chủ" />
        </Link>
      }
    />
  );
}
