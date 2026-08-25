'use client';

import React, { useMemo, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { TOWER_CONFIG } from '../config';
import { useTowerMaterials } from '../TowerMaterialsContext';

export function ServiceLedges() {
  const { materials, unitBoxGeometry } = useTowerMaterials();

  const meshRef = useRef<THREE.InstancedMesh>(null);

  const floors = TOWER_CONFIG.FLOORS;
  const floorH = TOWER_CONFIG.FLOOR_HEIGHT;
  const baseElev = TOWER_CONFIG.TYPICAL_FLOOR_BASE;

  const ledgeW = TOWER_CONFIG.AC_LEDGE.width;
  const ledgeH = TOWER_CONFIG.AC_LEDGE.height;
  const ledgeD = TOWER_CONFIG.AC_LEDGE.depth;
  const countPerSide = TOWER_CONFIG.AC_LEDGE.countPerSide;

  const transforms = useMemo(() => {
    const matrices: THREE.Matrix4[] = [];

    const spanZ = TOWER_CONFIG.FOOTPRINT.z - 4.0;
    const halfX = TOWER_CONFIG.FOOTPRINT.x / 2 + ledgeD / 2;

    for (let f = 0; f < floors; f++) {
      const y = baseElev + f * floorH + 0.8;

      for (let i = 0; i < countPerSide; i++) {
        const z = -spanZ / 2 + (spanZ / (countPerSide - 1)) * i;

        // Right Side (+X)
        const mR = new THREE.Matrix4();
        mR.compose(
          new THREE.Vector3(halfX, y, z),
          new THREE.Quaternion(),
          new THREE.Vector3(ledgeD, ledgeH, ledgeW)
        );
        matrices.push(mR);

        // Left Side (-X)
        const mL = new THREE.Matrix4();
        mL.compose(
          new THREE.Vector3(-halfX, y, z),
          new THREE.Quaternion(),
          new THREE.Vector3(ledgeD, ledgeH, ledgeW)
        );
        matrices.push(mL);
      }
    }

    return matrices;
  }, [floors, floorH, baseElev, ledgeW, ledgeH, ledgeD, countPerSide]);

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    transforms.forEach((mat, i) => meshRef.current?.setMatrixAt(i, mat));
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [transforms]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[unitBoxGeometry, materials.wallOffWhite, transforms.length]}
    />
  );
}