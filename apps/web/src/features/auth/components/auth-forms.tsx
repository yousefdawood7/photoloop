import AuthHeader from "@/features/auth/components/auth-header";

export default function AuthForms() {
  return (
    <div className="flex flex-col items-center w-full">
      <AuthHeader />

      <div className="my-auto space-y-2.5">
        <h2 className="text-3xl">Welcome back</h2>
        <p className="text-muted-foreground">
          Sign in to your account to continue your journey with Databuddy
        </p>
      </div>
    </div>
  );
}
