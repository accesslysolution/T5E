'use client';

import dynamic from 'next/dynamic';

// SSR disabled to guarantee WebGL window context readiness for Pass 3
const HeroScene = dynamic(() => import('@/components/hero3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-[#0D140E] flex items-center justify-center text-[#C9A84C] font-mono text-sm tracking-widest">
      LOADING T5E 3D SCENE...
    </div>
  ),
});

export default function Hero3DPreviewPage() {
  return (
    <main className="w-full h-screen overflow-hidden bg-black">
      <HeroScene />
    </main>
  );
}