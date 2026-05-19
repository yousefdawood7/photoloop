"use client";

import { Button } from "@repo/ui/components/button";
import { Field, FieldLabel } from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { useId, useState } from "react";
import { LucideEye, LucideEyeOff } from "@repo/ui/components/icons";

type FormFieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
};

export default function FormField({
  type = "text",
  label,
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
          name={id}
          type={
            type === "password" ? (isPasswordShown ? "text" : "password") : type
          }
          placeholder={placeholder || ""}
        />
        {type === "password" && (
          <Button
            size={"icon-xs"}
            variant={"ghost"}
            className="absolute top-0 right-0 h-full active:translate-none!"
            type="button"
            onClick={handlePasswordToggle}
          >
            {isPasswordShown ? <LucideEyeOff /> : <LucideEye />}
          </Button>
        )}
      </div>
    </Field>
  );
}
