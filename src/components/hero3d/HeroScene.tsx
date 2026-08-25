'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei';

import { TOWER_CONFIG } from './config';
import { Tower } from './Tower';
import { PerfHUD } from './PerfHUD';
import { TowerMaterialsProvider } from './TowerMaterialsContext';

const IS_DEV = process.env.NODE_ENV === 'development';

export default function HeroScene() {
  return (
    <div className="w-full h-screen bg-[#0D140E] overflow-hidden">
      <Canvas
        dpr={TOWER_CONFIG.RENDER.dpr}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          toneMapping: TOWER_CONFIG.RENDER.toneMapping,
          toneMappingExposure: TOWER_CONFIG.RENDER.exposure,
        }}
        camera={{
          position: [...TOWER_CONFIG.CAMERA.position],
          fov: TOWER_CONFIG.CAMERA.fov,
          near: 0.1,
          far: 200,
        }}
      >
        {IS_DEV && <PerfHUD />}
        {IS_DEV && <OrbitControls target={[...TOWER_CONFIG.CAMERA.target]} />}

        <directionalLight
          position={[...TOWER_CONFIG.LIGHTS.keyLight.position]}
          intensity={TOWER_CONFIG.LIGHTS.keyLight.intensity}
          color={TOWER_CONFIG.LIGHTS.keyLight.color}
        />

        <directionalLight
          position={[...TOWER_CONFIG.LIGHTS.goldRimLight.position]}
          intensity={TOWER_CONFIG.LIGHTS.goldRimLight.intensity}
          color={TOWER_CONFIG.LIGHTS.goldRimLight.color}
        />

        <Suspense fallback={null}>
          <Environment
            preset="dawn"
            environmentIntensity={TOWER_CONFIG.LIGHTS.environmentIntensity}
          />

          <TowerMaterialsProvider>
            <Tower />
          </TowerMaterialsProvider>

          <ContactShadows
            position={[0, 0.01, 0]}
            opacity={0.7}
            scale={70}
            blur={2.0}
            far={15}
            resolution={1024}
            color="#08100A"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}