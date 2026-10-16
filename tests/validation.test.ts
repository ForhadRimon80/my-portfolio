import test from "node:test";
import assert from "node:assert/strict";
import {
  emailSchema,
  contactSchema,
  escapeHtml,
} from "../src/lib/validation.ts";

test("normalizes email addresses", () => {
  assert.equal(emailSchema.parse("  USER@example.com "), "user@example.com");
});
test("validates contact input", () => {
  assert.equal(
    contactSchema.safeParse({
      name: "Alice",
      email: "invalid",
      message: "Hello from a visitor",
    }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({
      name: "Alice",
      email: "a@example.com",
      message: "Hello from a visitor",
      website: "bot",
    }).success,
    false,
  );
});
test("escapes email HTML", () => {
  assert.equal(
    escapeHtml('<img src="x">&'),
    "&lt;img src=&quot;x&quot;&gt;&amp;",
  );
});
