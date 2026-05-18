import AuthButton from "@/features/auth/components/auth-methods/auth-button";
import { GithubDark } from "@repo/ui/components/svgs/githubDark";
import { Google } from "@repo/ui/components/svgs/google";
import { LucideMail } from "@repo/ui/components/icons";

export default function AuthMethods() {
  return (
    <article className="grid grid-cols-2 gap-5">
      <AuthButton title="Sign in with Github" authLogo={<GithubDark />} />
      <AuthButton title="Sign in with Google" authLogo={<Google />} />
      <AuthButton
        title="Sign in with Magic Link"
        authLogo={<LucideMail />}
        className="col-span-2"
      />
    </article>
  );
}
