import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";

type AuthButtonProps = {
  children?: React.ReactNode;
  disabled?: boolean;
};

export default function AuthButton({
  children,
  disabled = false,
}: AuthButtonProps) {
  return (
    <Button disabled={disabled} type="submit">
      {disabled && <Spinner />}
      {children}
    </Button>
  );
}
