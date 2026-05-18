import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";

type AuthButtonProps = {
  title: string;
  className?: string;
  authLogo: React.ReactElement;
};

export default function AuthButton({
  title,
  className,
  authLogo,
}: AuthButtonProps) {
  return (
    <Button variant={"outline"} className={cn("py-5", className)}>
      {authLogo}
      {title}
    </Button>
  );
}
