import { AuthMethodsType } from "@/features/auth/types";
import { authClient } from "@/lib/auth-client";
import { env } from "@/lib/env";
import { toast } from "@repo/ui/lib/sonner";
import { useTransition } from "react";

type UseAuthProviderType = {
  methodName: AuthMethodsType;
  methodTitle: string;
  setSignIn: (isSignIn: boolean) => void;
};

export default function useAuthProvider({
  methodName,
  methodTitle,
  setSignIn,
}: UseAuthProviderType) {
  const [isPending, startTransition] = useTransition();

  const fetchOptions = {
    onSuccess() {
      setSignIn(true);
    },

    onError() {
      toast.error(`Failed to sign in with ${methodTitle}`);
    },
  };

  function handleSignin() {
    startTransition(() => {
      if (methodName === "magic-link") {
        authClient.signIn.magicLink({
          email: "",
          callbackURL: `${env.NEXT_PUBLIC_APP_URL}/`,
          fetchOptions,
        });
        return;
      }

      authClient.signIn.social({
        provider: methodName,
        callbackURL: `${env.NEXT_PUBLIC_APP_URL}/`,
        fetchOptions,
      });
    });
  }

  return { isPending, handleSignin };
}
