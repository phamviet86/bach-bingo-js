"use client";

import Link from "next/link";
import { Result, AntButton } from "@/component/common";

export default function NotFound() {
  return (
    <Result
      status="404"
      title="Không tìm thấy trang"
      subTitle="Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ."
      extra={
        <Link href="/app">
          <AntButton type="primary" label="Quay về trang chủ" />
        </Link>
      }
    />
  );
}
