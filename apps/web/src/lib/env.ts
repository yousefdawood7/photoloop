import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    BETTER_AUTH_URL: z.url(),
    GOOGLE_CLIENT_ID: z.string().min(10).max(100),
  },

  experimental__runtimeEnv: {},
});
