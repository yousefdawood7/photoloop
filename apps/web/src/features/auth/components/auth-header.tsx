import Image from "next/image";
import darkLogo from "public/logomark-dark.png";

export default function AuthHeader() {
  return (
    <div className="flex items-center justify-center p-4 gap-2.5 w-full">
      <Image src={darkLogo} alt="Photoloop Logo" className="h-10 w-10" />
      <h1 className="text-xl font-semibold">Photoloop</h1>
    </div>
  );
}
