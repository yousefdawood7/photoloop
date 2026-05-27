import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { DialogFooter } from "@repo/ui/components/dialog";
import { Spinner } from "@repo/ui/components/spinner";
import { z } from "zod";
import useAuthProvider from "@/features/auth/hooks/useAuthProvider";
import { magicLinkSchema } from "@/lib/schemas";

type MagicLinkFormProps = {
  children: React.ReactNode;
  className?: string;
};

export default function MagicLinkForm({
  children,
  className,
}: MagicLinkFormProps) {
  const { isPending, isError, handleSignin } = useAuthProvider({
    methodName: "magic-link",
    methodTitle: "Magic Link",
  });

  const form = useForm<z.infer<typeof magicLinkSchema>>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof magicLinkSchema>) {
    handleSignin(data.email);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
        <DialogFooter className="sm:justify-start">
          {/* !isError is Just to ensure that magic link send successfully we shouldn't send it again */}
          <Button type="submit" disabled={isPending || isError === false}>
            {isPending ? (
              <>
                <Spinner />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign in</span>
            )}
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
}
