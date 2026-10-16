import { MongoClient } from "mongodb";
import "server-only";
let client: Promise<MongoClient> | undefined;
export class ServiceError extends Error {
  constructor(
    message: string,
    public status = 503,
  ) {
    super(message);
  }
}
export async function db() {
  const uri = process.env.MONGODB_URI;
  if (!uri)
    throw new ServiceError(
      "This feature is not connected yet. Please use LinkedIn to get in touch.",
    );
  if (!client)
    client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 })
      .connect()
      .catch((e) => {
        client = undefined;
        throw e;
      });
  return (await client).db(process.env.MONGODB_DB || "farhad_portfolio");
}
let indexes: Promise<void> | undefined;
export async function database() {
  const d = await db();
  if (!indexes)
    indexes = Promise.all([
      d.collection("limits").createIndex({ key: 1 }, { unique: true }),
      d.collection("views").createIndex({ path: 1 }, { unique: true }),
      d
        .collection("limits")
        .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
      d
        .collection("events")
        .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
      d.collection("events").createIndex({ key: 1 }, { unique: true }),
    ])
      .then(() => {})
      .catch((e) => {
        indexes = undefined;
        throw e;
      });
  await indexes;
  return d;
}
