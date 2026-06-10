import Image from "next/image";

export default function AuthLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white">
      <div className="flex w-full max-w-[320px] flex-col items-center gap-6 px-6 text-center">
        <Image
          src="/images/logo.png"
          alt="Logo Winall Tech"
          width={58}
          height={58}
          className="rounded-full bg-white p-1"
          priority
        />

        <div className="space-y-2">
          <p className="font-noteSansJp text-lg font-semibold">Winall Tech</p>
          <p className="text-xs text-white/45">Chargement de l&apos;espace securise...</p>
        </div>

        <div className="h-[2px] w-28 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-loading bg-white" />
        </div>
      </div>
    </div>
  );
}
