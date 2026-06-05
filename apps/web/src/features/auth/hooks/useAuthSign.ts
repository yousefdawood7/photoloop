import { useTransition } from "react";
import { toast } from "@repo/ui/lib/sonner";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { loginSchema, registerSchema } from "@/lib/schemas";

type UseAuthSignType = {
  isRegister?: boolean;
};

export default function useAuthSign({ isRegister }: UseAuthSignType) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(
    data: z.infer<
      typeof isRegister extends true
        ? typeof registerSchema
        : typeof loginSchema
    >,
  ) {
    startTransition(async () => {
      if (isRegister) {
        await authClient.signUp.email({
          name: data.name!,
          email: data.email,
          password: data.password,
          callbackURL: `http://localhost:3000/`,
          fetchOptions: {
            onSuccess() {
              toast.success("Email verification sent. Please check your inbox");
            },

            onError() {
              toast.error("Failed to register with email and password");
            },
          },
        });
        return;
      }
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: `http://localhost:3000/`,
        fetchOptions: {
          onSuccess() {
            toast.success("Signed in successfully");
          },
          onError() {
            toast.error("Failed to sign in with email and password");
          },
        },
      });
    });
  }

  return {
    handleSubmit,
    isPending,
  };
}
