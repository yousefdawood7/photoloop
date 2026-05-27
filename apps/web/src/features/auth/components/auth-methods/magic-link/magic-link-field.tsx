import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import FormField from "@/features/auth/components/auth-fields/form-field";
import MagicLinkForm from "@/features/auth/components/auth-methods/magic-link/magic-link-form";

type MagicLinkFieldProps = {
  button: React.ReactElement;
};

export default function MagicLinkField({ button }: MagicLinkFieldProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <MagicLinkForm className="space-y-4">
          <DialogHeader>
            <DialogTitle>Sign in with Magic Link</DialogTitle>
            <DialogDescription>
              Enter your email address and we&apos;ll send you a magic link to
              sign in to your account.
            </DialogDescription>
          </DialogHeader>
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            isSingleField
          />
        </MagicLinkForm>
      </DialogContent>
    </Dialog>
  );
}
