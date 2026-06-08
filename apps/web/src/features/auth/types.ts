export type AuthMethodsType =
  | "github"
  | "google"
  | "facebook"
  | "magic-link"
  | "forget-password";

export type AuthButtonType = {
  methodName: AuthMethodsType;
  methodTitle: string;
  authLogo: React.ReactElement;
  isSpan?: boolean; // for ui grid
};
