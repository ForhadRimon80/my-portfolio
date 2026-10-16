import { failure } from "@/lib/api";
import { database } from "@/lib/db";
import { body, ipHash, originCheck } from "@/lib/security";
import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { z } from "zod";
export async function POST(req: Request) {
  try {
    originCheck(req);
    const { path } = z
      .object({
        path: z
          .string()
          .regex(/^\/[a-z0-9\-/]*$/)
          .max(160),
      })
      .parse(await body(req));
    const d = await database();
    const day = new Date().toISOString().slice(0, 10);
    const key = createHash("sha256")
      .update(path + day + ipHash(req))
      .digest("hex");
    try {
      await d.collection("events").insertOne({
        key,
        path,
        day,
        expiresAt: new Date(Date.now() + 90 * 86400000),
      });
      await d
        .collection("views")
        .updateOne({ path }, { $inc: { count: 1 } }, { upsert: true });
    } catch (e) {
      if (!(e instanceof Error && "code" in e && e.code === 11000)) throw e;
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return failure(e);
  }
}
