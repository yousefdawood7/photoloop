"use client";

import { ViewTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup } from "@repo/ui/components/field";
import { LucideKeyRound } from "@repo/ui/components/icons";
import Placeholder from "@repo/ui/components/placeholder";
import { z } from "better-auth";
import AuthButton from "@/features/auth/components/auth-button";
import FormField from "@/features/auth/components/auth-fields/form-field";
import useForgetPassword from "@/features/auth/hooks/useForgetPassword";
import useHasMounted from "@/hooks/useHasMounted";
import { forgetPasswordSchema } from "@/lib/schemas";

export default function ForgetPasswordForm() {
  const hasMounted = useHasMounted();
  const { isPending, handleResetPassword } = useForgetPassword();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { ...form } = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  function onSubmit(data: z.infer<typeof forgetPasswordSchema>) {
    handleResetPassword(token!, data.password);
  }

  // prettier-ignore
  if(!hasMounted)
    return null

  if (!token)
    return (
      <Placeholder
        title="Invalid reset link"
        description="This password reset link is missing or invalid. Please request a new password reset link and try again."
        icon={LucideKeyRound}
      />
    );

  return (
    <ViewTransition
      name="auth-form"
      default="none"
      enter="auth-enter"
      exit="auth-exit"
    >
      <aside className="my-auto flex flex-col gap-5 relative w-full max-w-[600px]">
        <ViewTransition name="auth-title">
          <h2 className="text-3xl">Reset your password</h2>
        </ViewTransition>
        <ViewTransition name="auth-subtitle">
          <p className="text-muted-foreground">
            Set a new password to get back to capturing and sharing moments with
            Photoloop.
          </p>
        </ViewTransition>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-2" aria-disabled={isPending}>
              <FormField
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                disabled={isPending}
              />
              <FormField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                disabled={isPending}
              />

              <Field>
                <AuthButton disabled={isPending}>
                  Reset your password
                </AuthButton>
              </Field>
            </FieldGroup>
          </form>
        </FormProvider>
      </aside>
    </ViewTransition>
  );
}
