'use client';

import React, { useMemo, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { TOWER_CONFIG } from '../config';
import { useTowerMaterials } from '../TowerMaterialsContext';

export function ElevationFins() {
  const { materials, unitBoxGeometry } = useTowerMaterials();

  const meshRef = useRef<THREE.InstancedMesh>(null);

  const totalHeight = TOWER_CONFIG.FLOORS * TOWER_CONFIG.FLOOR_HEIGHT + TOWER_CONFIG.ELEVATION_FIN_OVERSHOOT;
  const startY = TOWER_CONFIG.TYPICAL_FLOOR_BASE + totalHeight / 2;

  const finW = TOWER_CONFIG.ELEVATION_FIN_WIDTH;
  const finD = TOWER_CONFIG.ELEVATION_FIN_DEPTH;
  const count = TOWER_CONFIG.ELEVATION_FIN_COUNT;

  const transforms = useMemo(() => {
    const matrices: THREE.Matrix4[] = [];

    const halfZ = TOWER_CONFIG.FOOTPRINT.z / 2 + finD / 2;
    const spanX = TOWER_CONFIG.FOOTPRINT.x - TOWER_CONFIG.ELEVATION_FIN_INSET * 2;

    for (let i = 0; i < count; i++) {
      const x = -spanX / 2 + (spanX / (count - 1)) * i;

      // Front Elevation (+Z)
      const mF = new THREE.Matrix4();
      mF.compose(
        new THREE.Vector3(x, startY, halfZ),
        new THREE.Quaternion(),
        new THREE.Vector3(finW, totalHeight, finD)
      );
      matrices.push(mF);

      // Rear Elevation (-Z)
      const mB = new THREE.Matrix4();
      mB.compose(
        new THREE.Vector3(x, startY, -halfZ),
        new THREE.Quaternion(),
        new THREE.Vector3(finW, totalHeight, finD)
      );
      matrices.push(mB);
    }

    return matrices;
  }, [totalHeight, startY, finW, finD, count]);

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    transforms.forEach((mat, idx) => {
      meshRef.current?.setMatrixAt(idx, mat);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [transforms]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[unitBoxGeometry, materials.structureGold, transforms.length]}
    />
  );
}