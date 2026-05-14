import AuthBackground from "@/features/auth/components/auth-background";
import { Button } from "@repo/ui/components/button";
import { Separator } from "@repo/ui/components/separator";

export default function Page() {
  return (
    <section className="flex justify-between border border-r-2 min-h-svh">
      <AuthBackground />
      <Separator orientation="vertical" />
      <div className="basis-1/2">Hi</div>
    </section>
  );
}
