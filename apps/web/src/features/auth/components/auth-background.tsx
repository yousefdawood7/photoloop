import Silk from "@repo/ui/components/Silk";
import AuthMessage from "@/features/auth/components/auth-message";

export default function AuthBackground() {
  return (
    <div className="relative w-full max-w-[450px] xl:max-w-[700px] hidden mq-w-800:[display:initial]">
      <AuthMessage />

      <Silk
        speed={5}
        scale={0.8}
        color="#363636"
        noiseIntensity={0}
        rotation={6.02}
      />
    </div>
  );
}
