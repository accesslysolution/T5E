'use client';

import React, { useMemo, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { TOWER_CONFIG } from '../config';
import { useTowerMaterials } from '../TowerMaterialsContext';

export function FloorPlate() {
  const { materials, unitBoxGeometry } = useTowerMaterials();

  const slabRef = useRef<THREE.InstancedMesh>(null);
  const trimRef = useRef<THREE.InstancedMesh>(null);

  const floors = TOWER_CONFIG.FLOORS;
  const floorH = TOWER_CONFIG.FLOOR_HEIGHT;
  const baseElev = TOWER_CONFIG.TYPICAL_FLOOR_BASE;

  const { slabMatrices, trimMatrices } = useMemo(() => {
    const sMats: THREE.Matrix4[] = [];
    const tMats: THREE.Matrix4[] = [];

    const slabThick = TOWER_CONFIG.SLAB_THICKNESS;
    const trimH = TOWER_CONFIG.SLAB_TRIM_HEIGHT;
    const trimOH = TOWER_CONFIG.SLAB_TRIM_OVERHANG;

    for (let f = 0; f < floors; f++) {
      const y = baseElev + f * floorH;

      const mS = new THREE.Matrix4();
      mS.compose(
        new THREE.Vector3(0, y, 0),
        new THREE.Quaternion(),
        new THREE.Vector3(TOWER_CONFIG.FOOTPRINT.x, slabThick, TOWER_CONFIG.FOOTPRINT.z)
      );
      sMats.push(mS);

      const mT = new THREE.Matrix4();
      mT.compose(
        new THREE.Vector3(0, y - trimH / 2, 0),
        new THREE.Quaternion(),
        new THREE.Vector3(
          TOWER_CONFIG.FOOTPRINT.x + trimOH,
          trimH,
          TOWER_CONFIG.FOOTPRINT.z + trimOH
        )
      );
      tMats.push(mT);
    }

    return { slabMatrices: sMats, trimMatrices: tMats };
  }, [floors, floorH, baseElev]);

  useLayoutEffect(() => {
    if (!slabRef.current || !trimRef.current) return;

    slabMatrices.forEach((mat, i) => slabRef.current?.setMatrixAt(i, mat));
    trimMatrices.forEach((mat, i) => trimRef.current?.setMatrixAt(i, mat));

    slabRef.current.instanceMatrix.needsUpdate = true;
    trimRef.current.instanceMatrix.needsUpdate = true;
  }, [slabMatrices, trimMatrices]);

  return (
    <group>
      <instancedMesh
        ref={slabRef}
        args={[unitBoxGeometry, materials.wallOffWhite, floors]}
      />
      <instancedMesh
        ref={trimRef}
        args={[unitBoxGeometry, materials.structureGold, floors]}
      />
    </group>
  );
}