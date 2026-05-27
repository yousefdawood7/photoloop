import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  return (
    <Dialog>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <MagicLinkForm className="space-y-2">
          <DialogHeader>
            <DialogTitle>Sign in with Magic Link</DialogTitle>
            <DialogDescription>
              Enter your name and email address and we&apos;ll send you a magic
              link to sign in to your account.
            </DialogDescription>
          </DialogHeader>
          {pathname === "/register" && (
            <FormField
              name="name"
              label="Name"
              type="text"
              placeholder="Enter your name"
              isSingleField
            />
          )}
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
