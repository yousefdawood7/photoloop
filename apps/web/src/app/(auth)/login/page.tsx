import AuthBackground from "@/features/auth/components/auth-background";
import AuthForms from "@/features/auth/components/auth-forms";
import { Separator } from "@repo/ui/components/separator";

export default function Page() {
  return (
    <section className="flex flex-1 p-5 min-h-svh">
      <div className="flex flex-1 bg-secondary rounded-md border overflow-hidden">
        <AuthBackground />
        <Separator orientation="vertical" />
        <AuthForms />
      </div>
    </section>
  );
}
