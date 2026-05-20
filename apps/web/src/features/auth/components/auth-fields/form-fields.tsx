import FormField from "@/features/auth/components/auth-fields/form-field";
import { Button } from "@repo/ui/components/button";
import { Field, FieldGroup } from "@repo/ui/components/ui/field";
import Form from "next/dist/client/app-dir/form";
import Link from "next/link";

type FormFieldsProps = {
  isRegister?: boolean;
};

export default function FormFields({ isRegister = false }: FormFieldsProps) {
  const confirmPasswordFields = (
    <div className="flex justify-between items-center gap-10">
      <FormField
        label="Password"
        type="password"
        placeholder="Enter your password"
      />
      <FormField
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
      />
    </div>
  );

  return (
    <form>
      <FieldGroup>
        <FormField
          label="Full Name"
          type="text"
          placeholder="Enter your name"
        />
        <FormField label="Email" type="email" placeholder="Enter your email" />

        {isRegister ? (
          confirmPasswordFields
        ) : (
          <FormField
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
  );
}
