import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/assets/logo-v2.png"
      alt="Yoga logo"
      width={36}
      height={36}
      className={className}
    />
  );
}