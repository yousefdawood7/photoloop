import FormField from "@/features/auth/components/auth-fields/form-field";
import { Button } from "@repo/ui/components/button";
import { Field, FieldGroup } from "@repo/ui/components/ui/field";

export default function FormFields() {
  return (
    <form>
      <FieldGroup>
        <FormField label="Email" type="email" placeholder="Enter your email" />
        <FormField
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

        <Field>
          <Button>Sigin in</Button>
        </Field>

        <footer className="flex justify-between items-center">
          {/* TODO */}
          <p>Don't have an account? Sign up</p>
          <p>Forgot password?</p>
        </footer>
      </FieldGroup>
    </form>
  );
}
