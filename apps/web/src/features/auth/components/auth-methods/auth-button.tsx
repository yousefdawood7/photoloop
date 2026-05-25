import type { AuthButtonType } from "@/features/auth/types";
import { authClient } from "@/lib/auth-client";
import { env } from "@/lib/env";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";
import { toast } from "@repo/ui/lib/sonner";
import { cn } from "@repo/ui/lib/utils";
import { useTransition } from "react";

type AuthButtonProps = {
  isSignIn: boolean;
  setSignIn: (isSignIn: boolean) => void;
} & AuthButtonType;

export default function AuthButton({
  methodName,
  methodTitle,
  authLogo,
  isSpan,
  isSignIn,
  setSignIn,
}: AuthButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleSignin() {
    startTransition(() => {
      authClient.signIn.social({
        provider: methodName,
        callbackURL: `${env.NEXT_PUBLIC_APP_URL}/`,

        fetchOptions: {
          onSuccess() {
            setSignIn(true);
          },

          onError() {
            toast.error(`Failed to sign in with ${methodTitle}`);
          },
        },
      });
    });
  }

  return (
    <Button
      variant={"outline"}
      disabled={isSignIn || isPending}
      className={cn("py-5", isSpan && "col-span-2")}
      onClick={handleSignin}
    >
      {isPending ? <Spinner /> : authLogo}
      <span>Sign in with {methodTitle}</span>
    </Button>
  );
}
