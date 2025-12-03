'use client';

export default function CalmBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <div className="absolute inset-x-0 top-0 h-28 sm:h-32 bg-gradient-to-b from-[#e8e0f0] via-[#f5f3f8] to-transparent" />
      <div className="absolute top-[-10%] left-[-10%] w-[35vw] h-[35vw] bg-[#a8d5ba] rounded-full blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-[10%] right-[-15%] w-[40vw] h-[40vw] bg-[#c4a8d5] rounded-full blur-3xl opacity-20 animate-blob" style={{ animationDelay: '6s' }}></div>
      <div className="absolute bottom-[-15%] left-[20%] w-[45vw] h-[45vw] bg-[#e8e0f0] rounded-full blur-3xl opacity-30 animate-blob" style={{ animationDelay: '10s' }}></div>
    </div>
  );
}


