import test from "node:test";
import assert from "node:assert/strict";
import {
  createSession,
  validSession,
  secureMatch,
} from "../src/lib/sessionToken.ts";
const secret = "a-test-only-secret-with-at-least-32-characters";
test("accepts a signed unexpired session", () => {
  assert.equal(validSession(createSession(secret), secret), true);
});
test("rejects tampering, another secret, short secrets and malformed values", () => {
  const session = createSession(secret);
  assert.equal(validSession(session + "x", secret), false);
  assert.equal(
    validSession(session, "different-secret-with-more-than-32-characters"),
    false,
  );
  assert.equal(validSession(session, "short"), false);
  assert.equal(validSession("invalid", secret), false);
});
test("rejects expired sessions", () => {
  assert.equal(
    validSession(createSession(secret, Date.now() - 1000), secret),
    false,
  );
});
test("matches credentials exactly", () => {
  assert.equal(secureMatch("abc", "abc"), true);
  assert.equal(secureMatch("abc", "abcd"), false);
});
