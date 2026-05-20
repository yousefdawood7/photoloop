"use client";

import TogglePassword from "@/features/auth/components/auth-fields/toggle-password";
import { Field, FieldLabel } from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { useId, useState } from "react";

type FormFieldProps = {
  label: string;
  type?: string;
  name?: string;
  placeholder?: string;
};

export default function FormField({
  type = "text",
  label,
  name,
  placeholder,
}: FormFieldProps) {
  const id = useId();
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  function handlePasswordToggle() {
    setIsPasswordShown(!isPasswordShown);
  }

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <Input
          id={id}
          name={name || label.toLowerCase()}
          type={
            type === "password" ? (isPasswordShown ? "text" : "password") : type
          }
          placeholder={placeholder || ""}
        />
        {type === "password" && (
          <TogglePassword
            isPasswordShown={isPasswordShown}
            handlePasswordToggle={handlePasswordToggle}
          />
        )}
      </div>
    </Field>
  );
}
