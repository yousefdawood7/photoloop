"use client";

import { useEffect } from "react";
import { toast } from "@repo/ui/lib/sonner";
import { authClient } from "@/lib/auth-client";

export default function OneTap() {
  useEffect(() => {
    authClient.oneTap({
      fetchOptions: {
        onSuccess() {
          toast.success("You signed in successfully");
        },

        onError() {
          toast.error("Failed to sign with goole one tap");
        },
      },
    });
  }, []);

  return null;
}
