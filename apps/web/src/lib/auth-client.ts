import {
  emailOTPClient,
  lastLoginMethodClient,
  magicLinkClient,
  oneTapClient,
  twoFactorClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "@/lib/env";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,

  plugins: [
    twoFactorClient(),
    magicLinkClient(),
    lastLoginMethodClient(),
    emailOTPClient(),
    oneTapClient({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,

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
