import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";

type AuthButtonProps = {
  title: string;
  className?: string;
  authLogo: React.ReactElement;
  signInMethod?: "github" | "google" | "facebook" | "magic-link";
};

export default function AuthButton({
  title,
  className,
  authLogo,
  signInMethod,
}: AuthButtonProps) {
  return (
    <Button variant={"outline"} className={cn("py-5", className)}>
      {authLogo}
      {title}
    </Button>
  );
}
