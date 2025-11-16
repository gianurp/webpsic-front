'use client';

export default function CalmWaves() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-28 overflow-hidden" aria-hidden>
      <svg
        className="absolute bottom-0 left-0 h-28 w-[200%] waves-track opacity-60"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,64 C240,120 480,0 720,64 C960,128 1200,64 1440,96 L1440,120 L0,120 Z"
          fill="#e8e0f0"
        />
        <path
          d="M0,80 C240,136 480,16 720,80 C960,144 1200,80 1440,112 L1440,120 L0,120 Z"
          fill="#d4c4e8"
          opacity="0.6"
        />
        <path
          d="M0,96 C240,152 480,32 720,96 C960,160 1200,96 1440,128 L1440,120 L0,120 Z"
          fill="#a8d5ba"
          opacity="0.45"
        />
      </svg>
    </div>
  );
}


