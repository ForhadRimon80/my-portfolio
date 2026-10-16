import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ServiceError } from "./db";
export function failure(error: unknown) {
  if (error instanceof ZodError)
    return NextResponse.json(
      { error: error.issues[0]?.message || "Check your input." },
      { status: 400 },
    );
  if (error instanceof ServiceError)
    return NextResponse.json(
      { error: error.message },
      { status: error.status },
    );
  console.error(
    "Portfolio service request failed",
    error instanceof Error ? error.name : "UnknownError",
  );
  return NextResponse.json(
    {
      error: "The service is temporarily unavailable. Please try again later.",
    },
    { status: 503 },
  );
}
