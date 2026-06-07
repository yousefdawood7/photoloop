import { toast } from "@repo/ui/lib/sonner";
import type { ErrorContext } from "better-auth/react";
import { INVALID_CODES } from "@/lib/constants";

type CustomAuthError = {
  error: ErrorContext;
  errorCode: (typeof INVALID_CODES)[keyof typeof INVALID_CODES];
  toastMsg: string;
};

export const customAuthError = function ({
  error,
  errorCode,
  toastMsg,
}: CustomAuthError) {
  // prettier-ignore
  if (error.error?.code && error.error.code === errorCode) {
    toast.error(toastMsg);
    return true
  }

  return false;
};
