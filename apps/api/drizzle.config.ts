import { defineConfig } from 'drizzle-kit';

import 'dotenv/config';
import { env } from './src/common/utils/env';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default defineConfig({
  out: './drizzle',
  schema: './src/common/db/schemas/auth-schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
