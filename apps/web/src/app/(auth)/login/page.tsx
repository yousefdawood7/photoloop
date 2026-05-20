import AuthForms from "@/features/auth/components/auth-forms";
import { ViewTransition } from "react";

export default function Page() {
  return (
    <ViewTransition
      name="auth-form"
      default="none"
      enter="auth-enter"
      exit="auth-exit"
    >
      <AuthForms />
    </ViewTransition>
  );
}
