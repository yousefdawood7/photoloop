import FormField from "@/features/auth/components/auth-fields/form-field";
import { FieldGroup } from "@repo/ui/components/ui/field";

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
      </FieldGroup>
    </form>
  );
}
