"use client";
import { toast } from "@heroui/react";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
export default function showToast(message: string, error = false) {
  const options = {
    description: message,
    indicator: error ? <FaCircleXmark /> : <FaCircleCheck />,
  };
  if (error)
    toast.danger(
      <strong style={{ color: "#dc2626" }}>Something went wrong</strong>,
      options,
    );
  else toast.success(<strong>All done</strong>, options);
}
