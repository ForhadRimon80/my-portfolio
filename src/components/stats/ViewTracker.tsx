"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ViewTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
    }).catch(() => {});
  }, [pathname]);

  return null;
};

export default ViewTracker;
