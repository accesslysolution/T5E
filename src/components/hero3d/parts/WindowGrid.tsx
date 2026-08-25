'use client';

import React, { useMemo, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { TOWER_CONFIG } from '../config';
import { useTowerMaterials } from '../TowerMaterialsContext';

export function WindowGrid() {
  const { materials, unitBoxGeometry } = useTowerMaterials();

  const glassRef = useRef<THREE.InstancedMesh>(null);
  const chajjaRef = useRef<THREE.InstancedMesh>(null);
  const frameRef = useRef<THREE.InstancedMesh>(null);

  const floors = TOWER_CONFIG.FLOORS;
  const floorH = TOWER_CONFIG.FLOOR_HEIGHT;
  const baseElev = TOWER_CONFIG.TYPICAL_FLOOR_BASE;
  const bays = TOWER_CONFIG.BAYS_PER_FACE;

  const { glassMatrices, chajjaMatrices, frameMatrices } = useMemo(() => {
    const gMats: THREE.Matrix4[] = [];
    const cMats: THREE.Matrix4[] = [];
    const fMats: THREE.Matrix4[] = [];

    const winW = TOWER_CONFIG.WINDOW.width;
    const winH = TOWER_CONFIG.WINDOW.height;
    const fThick = TOWER_CONFIG.WINDOW.frameThickness;
    const fDepth = TOWER_CONFIG.WINDOW.frameDepth;

    const chajjaD = TOWER_CONFIG.CHAJJA_DEPTH;
    const chajjaT = TOWER_CONFIG.CHAJJA_THICKNESS;
    const chajjaOH = TOWER_CONFIG.CHAJJA_SIDE_OVERHANG;

    const bandInset = TOWER_CONFIG.WINDOW_BAND_INSET;
    const spanX = TOWER_CONFIG.FOOTPRINT.x - bandInset;
    const spanZ = TOWER_CONFIG.FOOTPRINT.z - bandInset;

    const massInset = TOWER_CONFIG.MASS_INSET;
    const reveal = TOWER_CONFIG.WINDOW_REVEAL;
    const recessDepth = massInset + reveal;

    const pushWindowAssemblies = (
      x: number,
      y: number,
      z: number,
      isTransposed: boolean,
      sign: number
    ) => {
      // 1. Recessed Glass Panel
      const mG = new THREE.Matrix4();
      mG.compose(
        new THREE.Vector3(x, y, z),
        new THREE.Quaternion(),
        isTransposed
          ? new THREE.Vector3(0.05, winH, winW)
          : new THREE.Vector3(winW, winH, 0.05)
      );
      gMats.push(mG);

      // 2. Window Surround Frame
      const mFr = new THREE.Matrix4();
      mFr.compose(
        new THREE.Vector3(x, y, z),
        new THREE.Quaternion(),
        isTransposed
          ? new THREE.Vector3(fDepth, winH + fThick * 2, winW + fThick * 2)
          : new THREE.Vector3(winW + fThick * 2, winH + fThick * 2, fDepth)
      );
      fMats.push(mFr);

      // 3. Weather Chajja Slab
      const mC = new THREE.Matrix4();
      const chajjaOffsetZ = isTransposed ? 0 : sign * (chajjaD / 2);
      const chajjaOffsetX = isTransposed ? sign * (chajjaD / 2) : 0;
      mC.compose(
        new THREE.Vector3(x + chajjaOffsetX, y + winH / 2 + chajjaT / 2, z + chajjaOffsetZ),
        new THREE.Quaternion(),
        isTransposed
          ? new THREE.Vector3(chajjaD, chajjaT, winW + chajjaOH)
          : new THREE.Vector3(winW + chajjaOH, chajjaT, chajjaD)
      );
      cMats.push(mC);
    };

    for (let f = 0; f < floors; f++) {
      const y = baseElev + f * floorH + floorH / 2;

      // Front & Back Facades
      for (let b = 0; b < bays; b++) {
        const x = -spanX / 2 + (spanX / (bays - 1)) * b;

        // Front Face (+Z)
        const zFront = TOWER_CONFIG.FOOTPRINT.z / 2 - recessDepth;
        pushWindowAssemblies(x, y, zFront, false, 1);

        // Back Face (-Z)
        const zBack = -TOWER_CONFIG.FOOTPRINT.z / 2 + recessDepth;
        pushWindowAssemblies(x, y, zBack, false, -1);
      }

      // Left & Right Facades
      for (let b = 0; b < bays; b++) {
        const z = -spanZ / 2 + (spanZ / (bays - 1)) * b;

        // Right Face (+X)
        const xRight = TOWER_CONFIG.FOOTPRINT.x / 2 - recessDepth;
        pushWindowAssemblies(xRight, y, z, true, 1);

        // Left Face (-X)
        const xLeft = -TOWER_CONFIG.FOOTPRINT.x / 2 + recessDepth;
        pushWindowAssemblies(xLeft, y, z, true, -1);
      }
    }

    return { glassMatrices: gMats, chajjaMatrices: cMats, frameMatrices: fMats };
  }, [floors, floorH, baseElev, bays]);

  useLayoutEffect(() => {
    if (!glassRef.current || !chajjaRef.current || !frameRef.current) return;

    glassMatrices.forEach((mat, i) => glassRef.current?.setMatrixAt(i, mat));
    chajjaMatrices.forEach((mat, i) => chajjaRef.current?.setMatrixAt(i, mat));
    frameMatrices.forEach((mat, i) => frameRef.current?.setMatrixAt(i, mat));

    glassRef.current.instanceMatrix.needsUpdate = true;
    chajjaRef.current.instanceMatrix.needsUpdate = true;
    frameRef.current.instanceMatrix.needsUpdate = true;
  }, [glassMatrices, chajjaMatrices, frameMatrices]);

  return (
    <group>
      <instancedMesh
        ref={glassRef}
        args={[unitBoxGeometry, materials.glassGreen, glassMatrices.length]}
      />
      <instancedMesh
        ref={frameRef}
        args={[unitBoxGeometry, materials.structureGold, frameMatrices.length]}
      />
      <instancedMesh
        ref={chajjaRef}
        args={[unitBoxGeometry, materials.wallOffWhite, chajjaMatrices.length]}
      />
    </group>
  );
}