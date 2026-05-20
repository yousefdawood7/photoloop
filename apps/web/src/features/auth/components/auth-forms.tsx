import FormFields from "@/features/auth/components/auth-fields/form-fields";
import AuthHeader from "@/features/auth/components/auth-header";
import AuthMethods from "@/features/auth/components/auth-methods/auth-methods";
import AuthSeparator from "@/features/auth/components/auth-separator";
import Link from "next/link";

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
        <FormFields />
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
    </div>
  );
}
