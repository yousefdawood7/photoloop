import { ViewTransition } from "react";
import FormFields from "@/features/auth/components/auth-fields/form-fields";
import AuthHeader from "@/features/auth/components/auth-header";
import AuthMethods from "@/features/auth/components/auth-methods/auth-methods";
import AuthSeparator from "@/features/auth/components/auth-separator";
import Link from "next/link";

type AuthFormsProps = {
  isRegister?: boolean;
};

export default function AuthForms({ isRegister = false }: AuthFormsProps) {
  return (
    <div className="flex flex-col items-center w-full py-5 px-4">
      <AuthHeader />
      <ViewTransition
        name="auth-form"
        default="none"
        enter="auth-enter"
        exit="auth-exit"
      >
        <aside className="my-auto flex flex-col gap-5 relative w-full max-w-[600px]">
          <div className=" space-y-2.5 w-full">
            <ViewTransition name="auth-title">
              {isRegister ? (
                <h2 className="text-3xl">Create an account</h2>
              ) : (
                <h2 className="text-3xl">Welcome back</h2>
              )}
            </ViewTransition>
            <ViewTransition name="auth-subtitle">
              <p className="text-muted-foreground">
                {isRegister
                  ? "Sign up to create your account"
                  : "Sign in to your account to continue your journey with Photoloop"}
              </p>
            </ViewTransition>
          </div>
          <AuthMethods />
          <AuthSeparator />
          <FormFields isRegister={isRegister} />
        </aside>

        <footer>
          <p>
            <span className="text-muted-foreground">Powered By</span>{" "}
            <Link
              href="https://yousefdawood.me"
              target="_blank"
              className="underline underline-offset-4 hover:text-primary/90 transition-colors"
            >
              Yousef Dawood
            </Link>
          </p>
        </footer>
      </ViewTransition>
    </div>
  );
}
