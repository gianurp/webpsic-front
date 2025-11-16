import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
if (!uri) {
  console.warn("MONGODB_URI is not set. Set it in your environment variables.");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise!;

export async function getDb() {
  const client = await clientPromise;
  // If a DB name isn't specified in the URI, you can provide one via env DB_NAME
  const dbNameFromEnv = process.env.DB_NAME;
  return dbNameFromEnv ? client.db(dbNameFromEnv) : client.db();
}


