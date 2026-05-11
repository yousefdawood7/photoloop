import { defineConfig } from 'drizzle-kit';

import 'dotenv/config';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default defineConfig({
  out: './drizzle',
  schema: './src/common/db/schemas/auth-schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
