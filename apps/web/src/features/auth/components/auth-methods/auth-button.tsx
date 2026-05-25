"use client";

import type { AuthButtonType } from "@/features/auth/types";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <Button variant={"outline"} className={cn("py-5", isSpan && "col-span-2")}>
      {authLogo}
      <span>Sign in with {methodTitle}</span>
    </Button>
  );
}
