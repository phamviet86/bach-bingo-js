"use client";

import Link from "next/link";
import { Result, AntButton } from "@/component/common";

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Không tìm thấy trang này."
      extra={
        <Link href="/app">
          <AntButton type="primary" label="Quay về trang chủ" />
        </Link>
      }
    />
  );
}
