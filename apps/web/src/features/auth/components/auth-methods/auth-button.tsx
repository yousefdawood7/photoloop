import MagicLinkField from "@/features/auth/components/auth-methods/magic-link/magic-link-field";
import useAuthProvider from "@/features/auth/hooks/useAuthProvider";
import type { AuthButtonType } from "@/features/auth/types";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Spinner } from "@repo/ui/components/spinner";
import { cn } from "@repo/ui/lib/utils";

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

  const buttonProps = {
    variant: "outline" as const,
    disabled: isSignIn || isPending,
    className: cn(
      "py-5",
      isSpan &&
        "col-span-1 mq-w-416:col-span-2 mq-w-800:col-span-1 mq-w-860:col-span-2 ",
    ),
  };

  if (methodName === "magic-link")
    return (
      <MagicLinkField
        button={
          <Button {...buttonProps}>
            {isPending ? <Spinner /> : authLogo}
            <span>Sign in with {methodTitle}</span>
          </Button>
        }
      />
    );

  return (
    <Button {...buttonProps} onClick={handleSignin}>
      {isPending ? <Spinner /> : authLogo}
      <span>Sign in with {methodTitle}</span>
    </Button>
  );
}
