"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Field } from "@repo/ui/components/field";
import { LucideMailQuestionMark } from "@repo/ui/components/icons";
import Placeholder from "@repo/ui/components/placeholder";
import { toast } from "@repo/ui/lib/sonner";
import AuthButton from "@/features/auth/components/auth-button";
import OtpField from "@/features/auth/components/auth-fields/otp-field";
import useHasMounted from "@/hooks/useHasMounted";
import { authClient } from "@/lib/auth-client";
import { INVALID_CODES } from "@/lib/constants";

export default function VerifyFields() {
  const hasMounted = useHasMounted();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState("");
  const router = useRouter();

  function handleOtpVerfication(otp: string) {
    startTransition(async () => {
      await authClient.emailOtp.verifyEmail({
        email: signedInUserEmail,
        otp,

        fetchOptions: {
          onSuccess() {
            toast.success("Email verified successfully");
            sessionStorage.removeItem("signedInUserEmail");
            router.replace("/");
          },

          onError(error) {
            if (
              error.error.code &&
              error.error.code === INVALID_CODES.TOO_MANY_ATTEMPTS
            ) {
              toast.error("Too many attempts. Please try again later");
              return;
            }
            toast.error("Invalid verification code. Please try again.");
          },
        },
      });
    });
  }

  if (!hasMounted) {
    return null;
  }

  const signedInUserEmail = sessionStorage.getItem("signedInUserEmail") || "";

  if (!signedInUserEmail) {
    return (
      <Placeholder
        title="No email found"
        description="We couldn't find an email address to send the verification code to. Please go back and enter your email address"
        icon={LucideMailQuestionMark}
      />
    );
  }

  return (
    <Card className="max-w-[550px] w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Verify your login
        </CardTitle>
        <CardDescription className="text-center">
          Enter the verification code we sent to your email address:{" "}
          <span className="font-medium">{signedInUserEmail}</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OtpField value={value} setValue={setValue} isPending={isPending} />
      </CardContent>
      <CardFooter>
        <Field>
          <AuthButton
            disabled={isPending}
            onClick={() => handleOtpVerfication(value)}
          >
            Verify
          </AuthButton>
        </Field>
      </CardFooter>
    </Card>
  );
}
