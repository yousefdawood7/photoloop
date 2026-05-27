"use client";

import TogglePassword from "@/features/auth/components/auth-fields/toggle-password";
import { Field, FieldError, FieldLabel } from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { cn } from "@repo/ui/lib/utils";
import { useId, useState, ViewTransition } from "react";
import { Controller, useFormContext } from "react-hook-form";

type FormFieldProps = {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  isSingleField?: boolean;
};

export default function FormField({
  type = "text",
  label,
  name,
  placeholder,
  isSingleField = false,
}: FormFieldProps) {
  const id = useId();
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  function handlePasswordToggle() {
    setIsPasswordShown(!isPasswordShown);
  }
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          <div className="relative">
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id={id}
              name={name || label.toLowerCase()}
              type={
                type === "password"
                  ? isPasswordShown
                    ? "text"
                    : "password"
                  : type
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
          <div
            className={cn(
              "transition-opacity",
              !isSingleField && "min-h-8",
              fieldState.invalid ? "opacity-100" : "opacity-0",
            )}
          >
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </div>
        </Field>
      )}
    />
  );
}
