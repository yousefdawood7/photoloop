"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function OneTap() {
  useEffect(() => {
    authClient.oneTap();
  }, []);

  return null;
}
