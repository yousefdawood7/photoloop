import { useState, useTransition } from "react";
import { toast } from "@repo/ui/lib/sonner";
import { AuthMethodsType } from "@/features/auth/types";
import { authClient } from "@/lib/auth-client";
import { env } from "@/lib/env";

type UseAuthProviderType = {
  methodName: AuthMethodsType;
  methodTitle: string;
  setSignIn?: (isSignIn: boolean) => void;
};

export default function useAuthProvider({
  methodName,
  methodTitle,
  setSignIn,
}: UseAuthProviderType) {
  /*
  the null part is just for the initial state
  where we don't know if there is an error or not,
  after the first attempt it will be either true or false
  */
  const [isError, setIsError] = useState<boolean | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchOptions = {
    onSuccess() {
      setSignIn?.(true);
      setIsError(false);
    },

    onError() {
      setIsError(true);
      toast.error(`Failed to sign in with ${methodTitle}`);
    },
  };

  function handleSignin(email?: string) {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    startTransition(async () => {
      if (methodName === "magic-link") {
        const { error } = await authClient.signIn.magicLink({
          email,
          callbackURL: `${env.NEXT_PUBLIC_APP_URL}/`,
          fetchOptions: {
            ...fetchOptions,

            onSuccess() {
              setSignIn?.(true);
              setIsError(false);
              toast.success(`Magic link sent to ${email}`);
            },
          },
        });

        if (error) {
          startTransition(() => {
            setIsError(true);
            return;
          });
        }
        setIsError(false);
        return;
      }

      authClient.signIn.social({
        provider: methodName,
        callbackURL: `${env.NEXT_PUBLIC_APP_URL}/`,
        fetchOptions,
      });
    });
  }

  return { isPending, isError, handleSignin };
}
