import AuthHeader from "@/features/auth/components/auth-header";
import AuthMethods from "@/features/auth/components/auth-methods/auth-methods";

export default function AuthForms() {
  return (
    <div className="flex flex-col items-center w-full">
      <AuthHeader />

      <aside className="my-auto flex flex-col gap-5">
        <div className=" space-y-2.5">
          <h2 className="text-3xl">Welcome back</h2>
          <p className="text-muted-foreground">
            Sign in to your account to continue your journey with Databuddy
          </p>
        </div>
        <AuthMethods />
      </aside>
    </div>
  );
}
