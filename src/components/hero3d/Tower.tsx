'use client';

import React from 'react';
import { Ground } from './parts/Ground';
import { CompoundWall } from './parts/CompoundWall';
import { Podium } from './parts/Podium';
import { TowerMass } from './parts/TowerMass';
import { FloorPlate } from './parts/FloorPlate';
import { WindowGrid } from './parts/WindowGrid';
import { BalconyBand } from './parts/BalconyBand';
import { ElevationFins } from './parts/ElevationFins';
import { ServiceLedges } from './parts/ServiceLedges';
import { Terrace } from './parts/Terrace';
import { Crown } from './parts/Crown';

export function Tower() {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Plot & Boundary */}
      <Ground />
      <CompoundWall />

      {/* 2. Podium Stilt Level */}
      <Podium />

      {/* 3. Solid Tower Core */}
      <TowerMass />

      {/* 4. Typical Floor Assemblies */}
      <FloorPlate />
      <WindowGrid />
      <BalconyBand />
      <ElevationFins />
      <ServiceLedges />

      {/* 5. Terrace & Crown */}
      <Terrace />
      <Crown />
    </group>
  );
}