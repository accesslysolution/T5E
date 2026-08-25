'use client';

import React from 'react';
import { TOWER_CONFIG } from '../config';
import { useTowerMaterials } from '../TowerMaterialsContext';

export function TowerMass() {
  const { materials } = useTowerMaterials();

  const totalFloorsHeight = TOWER_CONFIG.FLOORS * TOWER_CONFIG.FLOOR_HEIGHT;
  const massY = TOWER_CONFIG.TYPICAL_FLOOR_BASE + totalFloorsHeight / 2;

  const massX = TOWER_CONFIG.FOOTPRINT.x - TOWER_CONFIG.MASS_INSET * 2;
  const massZ = TOWER_CONFIG.FOOTPRINT.z - TOWER_CONFIG.MASS_INSET * 2;

  return (
    <mesh position={[0, massY, 0]} material={materials.wallOffWhite}>
      <boxGeometry args={[massX, totalFloorsHeight, massZ]} />
    </mesh>
  );
}