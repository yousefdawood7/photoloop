import { drizzle } from 'drizzle-orm/node-postgres';
import { reset } from 'drizzle-seed';

import 'dotenv/config';
import { schema } from '../db/schemas';

async function main() {
  console.log(process.env.DATABASE_URL);
  const db = drizzle(process.env.DATABASE_URL!);

  await reset(db, schema);
  console.log('Database truncated successfully 🔥');
}

void main();
