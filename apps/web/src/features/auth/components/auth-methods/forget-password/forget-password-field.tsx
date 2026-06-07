import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import FormField from "@/features/auth/components/auth-fields/form-field";

export default function ForgetPassword() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="cursor-pointer">Forget password</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
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
      </DialogContent>
    </Dialog>
  );
}
