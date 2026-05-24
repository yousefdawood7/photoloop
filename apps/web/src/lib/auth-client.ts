import { env } from "@/lib/env";
import { oneTapClient, twoFactorClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.BETTER_AUTH_URL,

  plugins: [
    twoFactorClient(),
    oneTapClient({
      clientId: env.GOOGLE_CLIENT_ID,

      autoSelect: false,
      cancelOnTapOutside: true,
      context: "signin",

      promptOptions: {
        baseDelay: 1000,
        maxAttempts: 5,
      },
    }),
  ],
});
