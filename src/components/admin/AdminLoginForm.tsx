"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import apiRequest from "@/lib/apiRequest";
import showToast from "@/lib/showToast";

const AdminLoginForm = () => {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    const data = new FormData(event.currentTarget);
    try {
      await apiRequest("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: data.get("token") }),
      });
      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setError((error as Error).message);
      showToast((error as Error).message, true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="card contact-form" onSubmit={handleSubmit}>
      <label htmlFor="admin-token">Admin token</label>
      <input
        id="admin-token"
        type="password"
        name="token"
        required
        maxLength={256}
        autoComplete="current-password"
        placeholder="Enter your private admin token"
      />
      <button className="button primary" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
      <p className="form-status" role="alert">
        {error}
      </p>
      <small className="muted">This area is for the portfolio owner.</small>
    </form>
  );
};

export default AdminLoginForm;
