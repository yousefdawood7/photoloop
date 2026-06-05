import { useTransition } from "react";
import { Field } from "@repo/ui/components/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@repo/ui/components/input-otp";
import { authClient } from "@/lib/auth-client";

export default function OtpField() {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await authClient.emailOtp.verifyEmail({
        email: "user@example.com", // required
        otp: "123456", // required
      });
    });
  }

  return (
    <Field onSubmit={handleSubmit}>
      <InputOTP
        maxLength={6}
        id="otp-verification"
        required
        containerClassName="justify-center"
        disabled={isPending}
        onSubmit={handleSubmit}
      >
        <InputOTPGroup
          className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl"
          aria-disabled={isPending}
        >
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator className="mx-2" />
        <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </Field>
  );
}
