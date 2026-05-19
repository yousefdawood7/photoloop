import AuthHeader from "@/features/auth/components/auth-header";
import AuthMethods from "@/features/auth/components/auth-methods/auth-methods";
import AuthSeparator from "@/features/auth/components/auth-separator";

export default function AuthForms() {
  return (
    <div className="flex flex-col items-center w-full py-10 px-4">
      <AuthHeader />

      <aside className="my-auto flex flex-col gap-5 relative">
        <div className=" space-y-2.5">
          <h2 className="text-3xl">Welcome back</h2>
          <p className="text-muted-foreground">
            Sign in to your account to continue your journey with Photoloop
          </p>
        </div>
        <AuthMethods />
        <AuthSeparator />
      </aside>
    </div>
  );
}
