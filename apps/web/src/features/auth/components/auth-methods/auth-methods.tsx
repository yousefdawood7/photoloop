"use client";

import AuthButton from "@/features/auth/components/auth-methods/auth-button";
import { GithubDark } from "@repo/ui/components/svgs/githubDark";
import { Google } from "@repo/ui/components/svgs/google";
import { FacebookIcon as Facebook } from "@repo/ui/components/svgs/facebookIcon";
import { LucideMail } from "@repo/ui/components/icons";
import React, { useState } from "react";
import type { AuthButtonType, AuthMethodsType } from "@/features/auth/types";

const authButtons: AuthButtonType[] = [
  {
    methodTitle: "Github",
    methodName: "github",
    authLogo: <GithubDark />,
  },
  {
    methodTitle: "Google",
    methodName: "google",
    authLogo: <Google />,
  },
  {
    methodTitle: "Facebook",
    methodName: "facebook",
    authLogo: <Facebook />,
    isSpan: true,
  },
  {
    methodTitle: "Magic Link",
    methodName: "magic-link",
    authLogo: <LucideMail />,
    isSpan: true,
  },
];

export default function AuthMethods() {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);

  return (
    <article className="grid grid-cols-1 mq-w-416:grid-cols-2 mq-w-800:grid-cols-1 mq-w-860:grid-cols-2 gap-5">
      {authButtons.map((button) => (
        <AuthButton
          {...button}
          key={button.methodName}
          isSignIn={isSignIn}
          setSignIn={setIsSignIn}
        />
      ))}
    </article>
  );
}
