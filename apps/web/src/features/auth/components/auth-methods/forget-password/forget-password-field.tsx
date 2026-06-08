import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import FormField from "@/features/auth/components/auth-fields/form-field";
import ForgetPasswordEmailForm from "@/features/auth/components/auth-methods/forget-password/forget-password-email-form";

export default function ForgetPassword() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-normal">Forgot your password?</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <ForgetPasswordEmailForm className="space-y-2">
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogDescription>
              Enter the email address associated with your account. We&apos;ll
              send you a secure link to verify your request and create a new
              password.
            </DialogDescription>
          </DialogHeader>
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            isSingleField
          />
        </ForgetPasswordEmailForm>
      </DialogContent>
    </Dialog>
  );
}
