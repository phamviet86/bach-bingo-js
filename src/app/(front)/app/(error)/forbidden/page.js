"use client";

import Link from "next/link";
import { Result, AntButton } from "@/component/common";

export default function Forbidden() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Bạn không có quyền truy cập trang này."
      extra={
        <Link href="/app">
          <AntButton type="primary" label="Quay về trang chủ" />
        </Link>
      }
    />
  );
}
