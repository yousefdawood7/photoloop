import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@repo/ui/components/dialog";
import { z } from "better-auth";
import AuthButton from "@/features/auth/components/auth-button";
import useAuthProvider from "@/features/auth/hooks/useAuthProvider";
import { forgetPasswordEmailSchema } from "@/lib/schemas";

type ForgetPasswordEmailFormProps = {
  children: React.ReactNode;
};

export default function ForgetPasswordEmailForm({
  children,
}: ForgetPasswordEmailFormProps) {
  const { isPending, isError, handleSignin } = useAuthProvider({
    methodName: "forget-password",
    methodTitle: "Forget Password",
  });

  const { ...form } = useForm<z.infer<typeof forgetPasswordEmailSchema>>({
    resolver: zodResolver(forgetPasswordEmailSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof forgetPasswordEmailSchema>) {
    handleSignin(undefined, data.email);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {children}
        <DialogFooter className="sm:justify-start">
          {/* !isError is Just to ensure that forget password link send successfully we shouldn't send it again */}
          <AuthButton type="submit" disabled={isPending || isError === false}>
            Send Reset Link
          </AuthButton>
        </DialogFooter>
      </form>
    </FormProvider>
  );
}
