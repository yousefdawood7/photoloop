import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { DialogFooter } from "@repo/ui/components/dialog";
import { Spinner } from "@repo/ui/components/spinner";
import { z } from "better-auth";
import useAuthProvider from "@/features/auth/hooks/useAuthProvider";
import { forgetPasswordEmailSchema } from "@/lib/schemas";

type ForgetPasswordEmailFormProps = {
  children: React.ReactNode;
  className: string;
};

export default function ForgetPasswordEmailForm({
  children,
  className,
}: ForgetPasswordEmailFormProps) {
  const { isPending, isError, handleSignin } = useAuthProvider({
    methodName: "forget-password",
    methodTitle: "Forget Password",
  });

  const { ...form } = useForm<z.infer<typeof forgetPasswordEmailSchema>>({
    resolver: zodResolver(forgetPasswordEmailSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(data: z.infer<typeof forgetPasswordEmailSchema>) {
    handleSignin(undefined, data.email);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className || ""}>
        {children}
        <DialogFooter className="sm:justify-start">
          {/* !isError is Just to ensure that forget password link send successfully we shouldn't send it again */}

          <Button type="submit" disabled={isPending || isError === false}>
            {isPending ? (
              <>
                <Spinner />
                <span>Sending Reset Link</span>
              </>
            ) : (
              <span> Send Reset Link</span>
            )}
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
}
