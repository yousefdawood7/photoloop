"use client";

import { registerSchema } from "@/app/lib/schemas";
import FormField from "@/features/auth/components/auth-fields/form-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { Field, FieldGroup } from "@repo/ui/components/ui/field";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

type FormFieldsProps = {
  isRegister?: boolean;
};

export default function FormFields({ isRegister = false }: FormFieldsProps) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const confirmPasswordFields = (
    <div className="flex justify-between items-center gap-10">
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

  function onSubmit(data: z.infer<typeof registerSchema>) {
    console.log(data);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FormField
            name="name"
            label="Full Name"
            type="text"
            placeholder="Enter your name"
          />
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          {isRegister ? (
            confirmPasswordFields
          ) : (
            <FormField
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
          )}

          <Field>
            {isRegister ? <Button>Sign up</Button> : <Button>Sign in</Button>}
          </Field>

          <footer className="flex justify-between items-center">
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
                  Don't have an account?
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
