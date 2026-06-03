import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    PORT: z.coerce.number().default(3001),
    APP_STAGE: z.enum(['dev', 'prod']),
    FRONTEND_URL: z.url(),

    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(32).max(128),
    RESEND_API_KEY: z.string().min(32).max(128),

    GOOGLE_CLIENT_ID: z.string().min(10).max(100),
    GOOGLE_CLIENT_SECRET: z.string().min(32).max(128),

    GITHUB_CLIENT_ID: z.string().min(10).max(100),
    GITHUB_CLIENT_SECRET: z.string().min(32).max(128),

    FACEBOOK_CLIENT_ID: z.string().min(10).max(100),
    FACEBOOK_CLIENT_SECRET: z.string().min(32).max(128),

    DYMO_KEY: z.string().min(32).max(128),
  },

  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
});
