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

  function handleSignin(name?: string, email?: string) {
    if (!email && methodName === "magic-link") {
      toast.error("Email is required for magic link sign in");
      return;
    }

    startTransition(async () => {
      if (methodName === "magic-link") {
        const { error } = await authClient.signIn.magicLink({
          // will only be used during the sign up process, if the user is signing in for the first time (won't be passed to email template)
          ...(name && { name }),
          email: email!,
          callbackURL: `${env.NEXT_PUBLIC_APP_URL}/`,

          metadata: {
            name: name || "", // will be used in the email template
          },
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
          });
          return;
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
