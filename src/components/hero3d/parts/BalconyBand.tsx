'use client';

import React, { useMemo, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { TOWER_CONFIG } from '../config';
import { useTowerMaterials } from '../TowerMaterialsContext';

export function BalconyBand() {
  const { materials, unitBoxGeometry } = useTowerMaterials();

  const slabRef = useRef<THREE.InstancedMesh>(null);
  const railFrontRef = useRef<THREE.InstancedMesh>(null);
  const railSideRef = useRef<THREE.InstancedMesh>(null);

  const floors = TOWER_CONFIG.FLOORS;
  const floorH = TOWER_CONFIG.FLOOR_HEIGHT;
  const baseElev = TOWER_CONFIG.TYPICAL_FLOOR_BASE;

  const bWidth = TOWER_CONFIG.BALCONY_WIDTH;
  const bDepth = TOWER_CONFIG.BALCONY_DEPTH;
  const slabThick = TOWER_CONFIG.BALCONY_SLAB_THICKNESS;
  const rHeight = TOWER_CONFIG.BALCONY_RAILING_HEIGHT;

  const { slabMatrices, railFrontMatrices, railSideMatrices } = useMemo(() => {
    const sMats: THREE.Matrix4[] = [];
    const rfMats: THREE.Matrix4[] = [];
    const rsMats: THREE.Matrix4[] = [];

    const halfZ = TOWER_CONFIG.FOOTPRINT.z / 2;
    const positionsX = [-TOWER_CONFIG.FOOTPRINT.x / 4, TOWER_CONFIG.FOOTPRINT.x / 4];

    for (let f = 0; f < floors; f++) {
      const y = baseElev + f * floorH;

      positionsX.forEach((x) => {
        // --- Front Balconies (+Z) ---
        const mSlabF = new THREE.Matrix4();
        mSlabF.compose(
          new THREE.Vector3(x, y + slabThick / 2, halfZ + bDepth / 2),
          new THREE.Quaternion(),
          new THREE.Vector3(bWidth, slabThick, bDepth)
        );
        sMats.push(mSlabF);

        // Front Panel
        const mRfF = new THREE.Matrix4();
        mRfF.compose(
          new THREE.Vector3(x, y + slabThick + rHeight / 2, halfZ + bDepth - 0.025),
          new THREE.Quaternion(),
          new THREE.Vector3(bWidth, rHeight, 0.05)
        );
        rfMats.push(mRfF);

        // Left Side Panel
        const mRsFL = new THREE.Matrix4();
        mRsFL.compose(
          new THREE.Vector3(x - bWidth / 2 + 0.025, y + slabThick + rHeight / 2, halfZ + bDepth / 2),
          new THREE.Quaternion(),
          new THREE.Vector3(0.05, rHeight, bDepth)
        );
        rsMats.push(mRsFL);

        // Right Side Panel
        const mRsFR = new THREE.Matrix4();
        mRsFR.compose(
          new THREE.Vector3(x + bWidth / 2 - 0.025, y + slabThick + rHeight / 2, halfZ + bDepth / 2),
          new THREE.Quaternion(),
          new THREE.Vector3(0.05, rHeight, bDepth)
        );
        rsMats.push(mRsFR);

        // --- Back Balconies (-Z) ---
        const mSlabB = new THREE.Matrix4();
        mSlabB.compose(
          new THREE.Vector3(x, y + slabThick / 2, -halfZ - bDepth / 2),
          new THREE.Quaternion(),
          new THREE.Vector3(bWidth, slabThick, bDepth)
        );
        sMats.push(mSlabB);

        // Front Panel
        const mRfB = new THREE.Matrix4();
        mRfB.compose(
          new THREE.Vector3(x, y + slabThick + rHeight / 2, -halfZ - bDepth + 0.025),
          new THREE.Quaternion(),
          new THREE.Vector3(bWidth, rHeight, 0.05)
        );
        rfMats.push(mRfB);

        // Left Side Panel
        const mRsBL = new THREE.Matrix4();
        mRsBL.compose(
          new THREE.Vector3(x - bWidth / 2 + 0.025, y + slabThick + rHeight / 2, -halfZ - bDepth / 2),
          new THREE.Quaternion(),
          new THREE.Vector3(0.05, rHeight, bDepth)
        );
        rsMats.push(mRsBL);

        // Right Side Panel
        const mRsBR = new THREE.Matrix4();
        mRsBR.compose(
          new THREE.Vector3(x + bWidth / 2 - 0.025, y + slabThick + rHeight / 2, -halfZ - bDepth / 2),
          new THREE.Quaternion(),
          new THREE.Vector3(0.05, rHeight, bDepth)
        );
        rsMats.push(mRsBR);
      });
    }

    return {
      slabMatrices: sMats,
      railFrontMatrices: rfMats,
      railSideMatrices: rsMats,
    };
  }, [floors, floorH, baseElev, bWidth, bDepth, slabThick, rHeight]);

  useLayoutEffect(() => {
    if (!slabRef.current || !railFrontRef.current || !railSideRef.current) return;

    slabMatrices.forEach((mat, i) => slabRef.current?.setMatrixAt(i, mat));
    railFrontMatrices.forEach((mat, i) => railFrontRef.current?.setMatrixAt(i, mat));
    railSideMatrices.forEach((mat, i) => railSideRef.current?.setMatrixAt(i, mat));

    slabRef.current.instanceMatrix.needsUpdate = true;
    railFrontRef.current.instanceMatrix.needsUpdate = true;
    railSideRef.current.instanceMatrix.needsUpdate = true;
  }, [slabMatrices, railFrontMatrices, railSideMatrices]);

  return (
    <group>
      <instancedMesh
        ref={slabRef}
        args={[unitBoxGeometry, materials.wallOffWhite, slabMatrices.length]}
      />
      <instancedMesh
        ref={railFrontRef}
        args={[unitBoxGeometry, materials.railingBronze, railFrontMatrices.length]}
      />
      <instancedMesh
        ref={railSideRef}
        args={[unitBoxGeometry, materials.railingBronze, railSideMatrices.length]}
      />
    </group>
  );
}