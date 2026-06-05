"use client";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Field } from "@repo/ui/components/field";
import OtpField from "@/features/auth/components/auth-fields/otp-field";
import useHasMounted from "@/hooks/useHasMounted";

export default function VerifyFields() {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  const signedInUserEmail = sessionStorage.getItem("signedInUserEmail") || "";

  if (!signedInUserEmail) {
    return (
      <Card className="max-w-[550px] w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">No email found</CardTitle>
          <CardDescription className="text-center">
            We couldn&apos;t find an email address to send the verification code
            to. Please go back and enter your email address.
          </CardDescription>
        </CardHeader>
      </Card>
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
        <OtpField />
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" className="w-full">
            Verify
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
