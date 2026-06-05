import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";
import { cn } from "@repo/ui/lib/utils";
import MagicLinkField from "@/features/auth/components/auth-methods/magic-link/magic-link-field";
import LastLoginBadge from "@/features/auth/components/last-login-badge";
import useAuthProvider from "@/features/auth/hooks/useAuthProvider";
import type { AuthButtonType } from "@/features/auth/types";
import useHasMounted from "@/hooks/useHasMounted";
import { authClient } from "@/lib/auth-client";

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
  const lastMethod = authClient.getLastUsedLoginMethod();
  const hasMounted = useHasMounted();

  const { isPending, handleSignin } = useAuthProvider({
    methodName,
    methodTitle,
    setSignIn,
  });

  const className = cn(
    isSpan &&
      "col-span-1 mq-w-416:col-span-2 mq-w-800:col-span-1 mq-w-860:col-span-2 ",
  );

  const buttonProps = {
    variant: "outline" as const,
    disabled: isSignIn || isPending,
  };

  if (methodName === "magic-link")
    return (
      <MagicLinkField
        button={
          <div className={`relative ${className}`}>
            {lastMethod === methodName && hasMounted && (
              <LastLoginBadge className="absolute top-0 right-0 -translate-y-1/2 " />
            )}
            <Button {...buttonProps} className="w-full py-5">
              {isPending ? <Spinner /> : authLogo}
              <span>Sign in with {methodTitle}</span>
            </Button>
          </div>
        }
      />
    );

  return (
    <div className={`relative ${className}`}>
      {lastMethod === methodName && hasMounted && (
        <LastLoginBadge className="absolute top-0 right-0 -translate-y-1/2 " />
      )}
      <Button
        {...buttonProps}
        className="w-full py-5"
        onClick={() => handleSignin()}
      >
        {isPending ? <Spinner /> : authLogo}
        <span>Sign in with {methodTitle}</span>
      </Button>
    </div>
  );
}
