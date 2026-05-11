import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    PORT: z.coerce.number().default(3001),
    APP_STAGE: z.enum(['dev', 'prod']),
    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(32).max(128),
  },

  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
});
