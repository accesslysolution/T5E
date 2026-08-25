'use client';

import React, { useMemo, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { TOWER_CONFIG } from '../config';
import { useTowerMaterials } from '../TowerMaterialsContext';

export function CompoundWall() {
  const { materials, unitBoxGeometry } = useTowerMaterials();

  const wallRef = useRef<THREE.InstancedMesh>(null);
  const copingRef = useRef<THREE.InstancedMesh>(null);
  const pillarRef = useRef<THREE.InstancedMesh>(null);

  const offset = TOWER_CONFIG.COMPOUND_WALL.offset;
  const wallH = TOWER_CONFIG.COMPOUND_WALL.height;
  const wallT = TOWER_CONFIG.COMPOUND_WALL.thickness;
  const copingH = TOWER_CONFIG.COMPOUND_WALL.copingHeight;
  const copingO = TOWER_CONFIG.COMPOUND_WALL.copingOverhang;

  const halfX = TOWER_CONFIG.FOOTPRINT.x / 2 + offset;
  const halfZ = TOWER_CONFIG.FOOTPRINT.z / 2 + offset;
  const gateW = TOWER_CONFIG.GATE.width;
  const pillarW = TOWER_CONFIG.GATE.pillarWidth;

  const { wallMatrices, copingMatrices, pillarMatrices } = useMemo(() => {
    const wMats: THREE.Matrix4[] = [];
    const cMats: THREE.Matrix4[] = [];
    const pMats: THREE.Matrix4[] = [];

    const baseElev = TOWER_CONFIG.PLINTH_HEIGHT;

    const addWallSegment = (
      px: number,
      py: number,
      pz: number,
      sx: number,
      sy: number,
      sz: number
    ) => {
      const mW = new THREE.Matrix4();
      mW.compose(
        new THREE.Vector3(px, py, pz),
        new THREE.Quaternion(),
        new THREE.Vector3(sx, sy, sz)
      );
      wMats.push(mW);

      const mC = new THREE.Matrix4();
      const capSx = sx > sz ? sx + copingO : sx + copingO;
      const capSz = sz > sx ? sz + copingO : sz + copingO;
      mC.compose(
        new THREE.Vector3(px, py + sy / 2 + copingH / 2, pz),
        new THREE.Quaternion(),
        new THREE.Vector3(capSx, copingH, capSz)
      );
      cMats.push(mC);
    };

    addWallSegment(0, baseElev + wallH / 2, -halfZ, halfX * 2, wallH, wallT);
    addWallSegment(halfX, baseElev + wallH / 2, 0, wallT, wallH, halfZ * 2);
    addWallSegment(-halfX, baseElev + wallH / 2, 0, wallT, wallH, halfZ * 2);

    const frontSegW = (halfX * 2 - gateW) / 2;
    addWallSegment(-halfX + frontSegW / 2, baseElev + wallH / 2, halfZ, frontSegW, wallH, wallT);
    addWallSegment(halfX - frontSegW / 2, baseElev + wallH / 2, halfZ, frontSegW, wallH, wallT);

    const pillarH = wallH + 0.4;
    [-gateW / 2, gateW / 2].forEach((xPos) => {
      const mP = new THREE.Matrix4();
      mP.compose(
        new THREE.Vector3(xPos, baseElev + pillarH / 2, halfZ),
        new THREE.Quaternion(),
        new THREE.Vector3(pillarW, pillarH, pillarW)
      );
      pMats.push(mP);
    });

    return { wallMatrices: wMats, copingMatrices: cMats, pillarMatrices: pMats };
  }, [halfX, halfZ, wallH, wallT, copingH, copingO, gateW, pillarW]);

  useLayoutEffect(() => {
    if (!wallRef.current || !copingRef.current || !pillarRef.current) return;

    wallMatrices.forEach((mat, i) => wallRef.current?.setMatrixAt(i, mat));
    copingMatrices.forEach((mat, i) => copingRef.current?.setMatrixAt(i, mat));
    pillarMatrices.forEach((mat, i) => pillarRef.current?.setMatrixAt(i, mat));

    wallRef.current.instanceMatrix.needsUpdate = true;
    copingRef.current.instanceMatrix.needsUpdate = true;
    pillarRef.current.instanceMatrix.needsUpdate = true;
  }, [wallMatrices, copingMatrices, pillarMatrices]);

  return (
    <group>
      <instancedMesh
        ref={wallRef}
        args={[unitBoxGeometry, materials.wallOffWhite, wallMatrices.length]}
      />
      <instancedMesh
        ref={copingRef}
        args={[unitBoxGeometry, materials.structureGold, copingMatrices.length]}
      />
      <instancedMesh
        ref={pillarRef}
        args={[unitBoxGeometry, materials.wallOffWhite, pillarMatrices.length]}
      />
      <mesh
        position={[
          0,
          TOWER_CONFIG.GATE.height / 2 + TOWER_CONFIG.PLINTH_HEIGHT,
          halfZ,
        ]}
        material={materials.railingBronze}
      >
        <boxGeometry args={[gateW - 0.2, TOWER_CONFIG.GATE.height, wallT * 0.5]} />
      </mesh>
    </group>
  );
}