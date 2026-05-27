import MagicLinkForm from "@/features/auth/components/auth-methods/magic-link-form";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";

type MagicLinkFieldProps = {
  button: React.ReactElement;
};

export default function MagicLinkField({ button }: MagicLinkFieldProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in with Magic Link</DialogTitle>
          <DialogDescription>
            Enter your email address and we'll send you a magic link to sign in
            to your account.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <MagicLinkForm />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Sign in</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
