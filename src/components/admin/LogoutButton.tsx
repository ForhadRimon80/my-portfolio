"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import apiRequest from "@/lib/apiRequest";
import showToast from "@/lib/showToast";

const LogoutButton = () => {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const handleLogout = async () => {
    setBusy(true);
    try {
      await apiRequest("/api/admin/logout", { method: "POST" });
      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      showToast((error as Error).message, true);
    } finally {
      setBusy(false);
    }
  };
  return (
    <button className="button mb-6" onClick={handleLogout} disabled={busy}>
      {busy ? "Signing out…" : "Sign out"}
    </button>
  );
};

export default LogoutButton;
