import { Separator } from "@repo/ui/components/separator";
import AuthBackground from "@/features/auth/components/auth-background";
import AuthHeader from "@/features/auth/components/auth-header";
import OneTap from "@/features/auth/components/auth-methods/one-tap";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <section className="flex flex-1 p-5 min-h-svh">
      <div className="flex flex-1 bg-secondary rounded-md border overflow-hidden">
        <AuthBackground />
        <Separator orientation="vertical" />
        <div className="flex flex-col items-center w-full py-5 px-4 gap-3">
          <AuthHeader />
          {children}
        </div>
        <OneTap />
      </div>
    </section>
  );
}
