import useAuthProvider from "@/features/auth/hooks/useAuthProvider";
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
  const { isPending, handleSignin } = useAuthProvider({
    methodName,
    methodTitle,
    setSignIn,
  });

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
