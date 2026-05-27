import { Separator } from "@repo/ui/components/separator";
import AuthBackground from "@/features/auth/components/auth-background";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <section className="flex flex-1 p-5 min-h-svh">
      <div className="flex flex-1 bg-secondary rounded-md border overflow-hidden">
        <AuthBackground />
        <Separator orientation="vertical" />

        {children}
      </div>
    </section>
  );
}
