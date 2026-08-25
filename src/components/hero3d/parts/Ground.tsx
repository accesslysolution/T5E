'use client';

import React from 'react';
import { TOWER_CONFIG } from '../config';
import { useTowerMaterials } from '../TowerMaterialsContext';

export function Ground() {
  const { materials } = useTowerMaterials();

  const compoundOffset = TOWER_CONFIG.COMPOUND_WALL.offset;
  const footprintX = TOWER_CONFIG.FOOTPRINT.x + compoundOffset * 2 + 16;
  const footprintZ = TOWER_CONFIG.FOOTPRINT.z + compoundOffset * 2 + 16;

  const apronX = TOWER_CONFIG.FOOTPRINT.x + TOWER_CONFIG.APRON_WIDTH * 2;
  const apronZ = TOWER_CONFIG.FOOTPRINT.z + TOWER_CONFIG.APRON_WIDTH * 2;

  return (
    <group position={[0, 0, 0]}>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        material={materials.groundDarkGreen}
      >
        <planeGeometry args={[footprintX * 2, footprintZ * 2]} />
      </mesh>

      <mesh
        position={[0, TOWER_CONFIG.PLINTH_HEIGHT * 0.1, 0]}
        material={materials.pavedApron}
      >
        <boxGeometry args={[apronX, TOWER_CONFIG.PLINTH_HEIGHT * 0.2, apronZ]} />
      </mesh>

      <mesh
        position={[0, TOWER_CONFIG.PLINTH_HEIGHT / 2, 0]}
        material={materials.wallOffWhite}
      >
        <boxGeometry
          args={[
            TOWER_CONFIG.FOOTPRINT.x + 1.2,
            TOWER_CONFIG.PLINTH_HEIGHT,
            TOWER_CONFIG.FOOTPRINT.z + 1.2,
          ]}
        />
      </mesh>
    </group>
  );
}