"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@repo/ui/lib/sonner";
import { authClient } from "@/lib/auth-client";

export default function OneTap() {
  const router = useRouter();

  useEffect(() => {
    authClient.oneTap({
      fetchOptions: {
        onSuccess() {
          router.replace("/");
          toast.success("You signed in successfully");
        },

        onError() {
          toast.error("Failed to sign with goole one tap");
        },
      },
    });
  }, [router]);

  return null;
}
