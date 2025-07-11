"use client";

import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Result, AntButton, AppSpin } from "@/component/common";

export default function NotFound() {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // If current path starts with /app/ and is not already /app/not-found, redirect
    if (pathname.startsWith("/app/") && pathname !== "/app/not-found") {
      redirect("/app/not-found");
    } else {
      // Path is ready to display (either /app/not-found or non-app path)
      setIsReady(true);
    }
  }, [pathname]);

  // Show loading while determining navigation
  if (!isReady) return <AppSpin />;

  // Display 404 page for valid paths
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
