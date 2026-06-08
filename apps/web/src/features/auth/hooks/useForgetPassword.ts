import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@repo/ui/lib/sonner";
import { authClient } from "@/lib/auth-client";

export default function useForgetPassword() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleResetPassword(token: string, password: string) {
    startTransition(async () => {
      await authClient.resetPassword({
        newPassword: password,
        token, // required

        fetchOptions: {
          onSuccess() {
            router.replace("/login");
            toast.success("Password reset successfully");
          },
          onError() {
            toast.error("Failed to reset password");
          },
        },
      });
    });
  }

  return { isPending, handleResetPassword };
}
