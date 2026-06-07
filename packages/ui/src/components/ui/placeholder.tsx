import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

type PlaceholderProps = {
  title: string;
  description: string;
};

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <Card className="max-w-[550px] w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">No email found</CardTitle>
        <CardDescription className="text-center">
          We couldn&apos;t find an email address to send the verification code
          to. Please go back and enter your email address.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
