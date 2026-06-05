"use client";

import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup } from "@repo/ui/components/ui/field";
import { z } from "zod";
import AuthButton from "@/features/auth/components/auth-button";
import FormField from "@/features/auth/components/auth-fields/form-field";
import useAuthSign from "@/features/auth/hooks/useAuthSign";
import { loginSchema, registerSchema } from "@/lib/schemas";

type FormFieldsProps = {
  isRegister?: boolean;
};

export default function FormFields({ isRegister = false }: FormFieldsProps) {
  const authSchema = isRegister ? registerSchema : loginSchema;
  const { handleSubmit, isPending } = useAuthSign({ isRegister });

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
  });

  const confirmPasswordFields = (
    <div className="flex justify-between items-center gap-2 flex-col mq-w-925:flex-row mq-w-925:gap-5">
      <FormField
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
      />
      <FormField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
      />
    </div>
  );

  function onSubmit(data: z.infer<typeof authSchema>) {
    console.log(data);
    handleSubmit(data);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-3">
          {isRegister && (
            <FormField
              name="name"
              label="Full Name"
              type="text"
              placeholder="Enter your name"
              disabled={isPending}
            />
          )}
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            disabled={isPending}
          />

          {isRegister ? (
            confirmPasswordFields
          ) : (
            <FormField
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              disabled={isPending}
            />
          )}

          <Field>
            {isRegister ? (
              <AuthButton disabled={isPending}>Sign up</AuthButton>
            ) : (
              <AuthButton disabled={isPending}>Sign in</AuthButton>
            )}
          </Field>

          <footer className="flex justify-between items-center flex-col mq-w-925:flex-row">
            {isRegister ? (
              <p>
                <span className="text-muted-foreground">
                  Already have an account?
                </span>{" "}
                <Link href="/login">Sign in</Link>
              </p>
            ) : (
              <p>
                <span className="text-muted-foreground">
                  Don&apos;t have an account?
                </span>{" "}
                <Link href="/register">Sign up</Link>
              </p>
            )}
            <p>Forgot password?</p>
          </footer>
        </FieldGroup>
      </form>
    </FormProvider>
  );
}
