'use client';

import React, { useMemo, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { TOWER_CONFIG } from '../config';
import { useTowerMaterials } from '../TowerMaterialsContext';

export function Terrace() {
  const { materials, unitBoxGeometry } = useTowerMaterials();

  const parapetRef = useRef<THREE.InstancedMesh>(null);

  const roofElev = TOWER_CONFIG.ROOF_ELEVATION;
  const parapetH = TOWER_CONFIG.PARAPET_HEIGHT;
  const parapetT = TOWER_CONFIG.PARAPET_THICKNESS;

  const mumty = TOWER_CONFIG.MUMTY;
  const tank = TOWER_CONFIG.WATER_TANK;

  const halfX = TOWER_CONFIG.FOOTPRINT.x / 2;
  const halfZ = TOWER_CONFIG.FOOTPRINT.z / 2;

  const parapetMatrices = useMemo(() => {
    const matrices: THREE.Matrix4[] = [];

    // North (Back) Segment
    const mN = new THREE.Matrix4();
    mN.compose(
      new THREE.Vector3(0, roofElev + parapetH / 2, -halfZ + parapetT / 2),
      new THREE.Quaternion(),
      new THREE.Vector3(TOWER_CONFIG.FOOTPRINT.x, parapetH, parapetT)
    );
    matrices.push(mN);

    // South (Front) Segment
    const mS = new THREE.Matrix4();
    mS.compose(
      new THREE.Vector3(0, roofElev + parapetH / 2, halfZ - parapetT / 2),
      new THREE.Quaternion(),
      new THREE.Vector3(TOWER_CONFIG.FOOTPRINT.x, parapetH, parapetT)
    );
    matrices.push(mS);

    // West (Left) Segment
    const mW = new THREE.Matrix4();
    mW.compose(
      new THREE.Vector3(-halfX + parapetT / 2, roofElev + parapetH / 2, 0),
      new THREE.Quaternion(),
      new THREE.Vector3(parapetT, parapetH, TOWER_CONFIG.FOOTPRINT.z - parapetT * 2)
    );
    matrices.push(mW);

    // East (Right) Segment
    const mE = new THREE.Matrix4();
    mE.compose(
      new THREE.Vector3(halfX - parapetT / 2, roofElev + parapetH / 2, 0),
      new THREE.Quaternion(),
      new THREE.Vector3(parapetT, parapetH, TOWER_CONFIG.FOOTPRINT.z - parapetT * 2)
    );
    matrices.push(mE);

    return matrices;
  }, [roofElev, parapetH, parapetT, halfX, halfZ]);

  useLayoutEffect(() => {
    if (!parapetRef.current) return;
    parapetMatrices.forEach((mat, i) => parapetRef.current?.setMatrixAt(i, mat));
    parapetRef.current.instanceMatrix.needsUpdate = true;
  }, [parapetMatrices]);

  return (
    <group>
      <instancedMesh
        ref={parapetRef}
        args={[unitBoxGeometry, materials.wallOffWhite, parapetMatrices.length]}
      />

      <mesh
        position={[mumty.offset[0], roofElev + mumty.height / 2, mumty.offset[1]]}
        material={materials.wallOffWhite}
      >
        <boxGeometry args={[mumty.width, mumty.height, mumty.depth]} />
      </mesh>

      <mesh
        position={[tank.offset[0], roofElev + tank.height / 2 + 0.5, tank.offset[1]]}
        material={materials.structureGold}
      >
        <boxGeometry args={[tank.width, tank.height, tank.depth]} />
      </mesh>
    </group>
  );
}