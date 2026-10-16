import { z } from "zod";
export const emailSchema = z
  .string()
  .trim()
  .email()
  .max(254)
  .transform((v) => v.toLowerCase());
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(60),
  email: emailSchema,
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(0).optional(),
});
export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
}
