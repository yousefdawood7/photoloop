import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "better-auth";
import { forgetPasswordEmailSchema } from "@/lib/schemas";

type ForgetPasswordEmailFormProps = {
  children: React.ReactNode;
};

export default function ForgetPasswordEmailForm({
  children,
}: ForgetPasswordEmailFormProps) {
  const { ...form } = useForm<z.infer<typeof forgetPasswordEmailSchema>>({
    resolver: zodResolver(forgetPasswordEmailSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof forgetPasswordEmailSchema>) {
    handleSignin(data.name, data.email);
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}></form>
    </FormProvider>
  );
}
