import { Badge } from "@repo/ui/components/badge";

type LastLoginBadgeProps = {
  className?: string;
  title?: string;
};

export default function LastLoginBadge({
  title,
  className,
}: LastLoginBadgeProps) {
  return <Badge className={className || ""}>{title || "Last used"}</Badge>;
}
