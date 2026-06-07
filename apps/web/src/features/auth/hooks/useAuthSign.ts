import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@repo/ui/lib/sonner";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { loginSchema, registerSchema } from "@/lib/schemas";

type UseAuthSignType = {
  isRegister?: boolean;
};

export default function useAuthSign({ isRegister }: UseAuthSignType) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(
    data: z.infer<typeof registerSchema> | z.infer<typeof loginSchema>,
  ) {
    startTransition(async () => {
      if (isRegister) {
        await authClient.signUp.email({
          name: data.name!,
          email: data.email,
          password: data.password,
          // calbackURL: `${env.NEXT_PUBLIC_APP_URL}/auth/verify-email`,

          fetchOptions: {
            onSuccess() {
              router.push("/verify-email");
              sessionStorage.setItem("signedInUserEmail", data.email);
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
        //  callbackURL: `${env.NEXT_PUBLIC_APP_URL}/`,
        fetchOptions: {
          onSuccess() {
            router.replace("/");
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
