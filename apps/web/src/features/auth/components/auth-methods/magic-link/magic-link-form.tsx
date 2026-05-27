import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "@/features/auth/components/auth-fields/form-field";
import { magicLinkSchema } from "@/lib/schemas";

type MagicLinkFormProps = {
  children: React.ReactNode;
  className?: string;
};

export default function MagicLinkForm({
  children,
  className,
}: MagicLinkFormProps) {
  const form = useForm<z.infer<typeof magicLinkSchema>>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof magicLinkSchema>) {
    console.log(data);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}
