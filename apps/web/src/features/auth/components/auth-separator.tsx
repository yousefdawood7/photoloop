import { Separator } from "@repo/ui/components/separator";

export default function AuthSeparator() {
  return (
    <div className="text-muted-foreground text-sm flex items-center gap-2.5 justify-center w-full">
      <Separator className="shrink" />
      <span>OR</span>
      <Separator className="shrink" />
    </div>
  );
}
