'use client';

import React, { useMemo, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { TOWER_CONFIG } from '../config';
import { useTowerMaterials } from '../TowerMaterialsContext';

export function Crown() {
  const { materials, unitBoxGeometry } = useTowerMaterials();

  const finMeshRef = useRef<THREE.InstancedMesh>(null);

  const roofElev = TOWER_CONFIG.ROOF_ELEVATION;
  const crownH = TOWER_CONFIG.CROWN_HEIGHT;
  const corniceH = TOWER_CONFIG.CROWN_CORNICE_HEIGHT;
  const crownY = roofElev + TOWER_CONFIG.PARAPET_HEIGHT + crownH / 2;

  const finCount = TOWER_CONFIG.CROWN_FIN_COUNT;
  const overhang = TOWER_CONFIG.CROWN_OVERHANG;

  const transforms = useMemo(() => {
    const matrices: THREE.Matrix4[] = [];
    const spanX = TOWER_CONFIG.FOOTPRINT.x + 0.4;
    const spanZ = TOWER_CONFIG.FOOTPRINT.z + 0.4;

    const halfX = TOWER_CONFIG.FOOTPRINT.x / 2 + 0.2;
    const halfZ = TOWER_CONFIG.FOOTPRINT.z / 2 + 0.2;

    // Front & Back Facades
    for (let i = 0; i < finCount; i++) {
      const x = -spanX / 2 + (spanX / (finCount - 1)) * i;

      // Front (+Z)
      const mF = new THREE.Matrix4();
      mF.compose(
        new THREE.Vector3(x, crownY, halfZ),
        new THREE.Quaternion(),
        new THREE.Vector3(0.2, crownH, 0.3)
      );
      matrices.push(mF);

      // Back (-Z)
      const mB = new THREE.Matrix4();
      mB.compose(
        new THREE.Vector3(x, crownY, -halfZ),
        new THREE.Quaternion(),
        new THREE.Vector3(0.2, crownH, 0.3)
      );
      matrices.push(mB);
    }

    // Left & Right Facades
    for (let i = 0; i < finCount; i++) {
      const z = -spanZ / 2 + (spanZ / (finCount - 1)) * i;

      // Right (+X)
      const mR = new THREE.Matrix4();
      mR.compose(
        new THREE.Vector3(halfX, crownY, z),
        new THREE.Quaternion(),
        new THREE.Vector3(0.3, crownH, 0.2)
      );
      matrices.push(mR);

      // Left (-X)
      const mL = new THREE.Matrix4();
      mL.compose(
        new THREE.Vector3(-halfX, crownY, z),
        new THREE.Quaternion(),
        new THREE.Vector3(0.3, crownH, 0.2)
      );
      matrices.push(mL);
    }

    return matrices;
  }, [crownY, crownH, finCount]);

  useLayoutEffect(() => {
    if (!finMeshRef.current) return;
    transforms.forEach((mat, idx) => finMeshRef.current?.setMatrixAt(idx, mat));
    finMeshRef.current.instanceMatrix.needsUpdate = true;
  }, [transforms]);

  return (
    <group>
      <mesh
        position={[0, crownY + crownH / 2 + corniceH / 2, 0]}
        material={materials.structureGold}
      >
        <boxGeometry
          args={[
            TOWER_CONFIG.FOOTPRINT.x + overhang,
            corniceH,
            TOWER_CONFIG.FOOTPRINT.z + overhang,
          ]}
        />
      </mesh>

      <instancedMesh
        ref={finMeshRef}
        args={[unitBoxGeometry, materials.structureGold, transforms.length]}
      />
    </group>
  );
}