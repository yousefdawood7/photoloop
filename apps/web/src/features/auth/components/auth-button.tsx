import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";

type AuthButtonProps = {
  children?: React.ReactNode;
  disabled?: boolean;
};

export default function AuthButton({
  children,
  disabled = false,
  onClick,
}: AuthButtonProps & React.ComponentProps<"button">) {
  return (
    <Button disabled={disabled} type="submit" onClick={onClick}>
      {disabled && <Spinner />}
      {children}
    </Button>
  );
}
