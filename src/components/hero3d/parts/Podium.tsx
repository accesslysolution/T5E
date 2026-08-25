'use client';

import React, { useMemo, useLayoutEffect, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { TOWER_CONFIG } from '../config';
import { useTowerMaterials } from '../TowerMaterialsContext';

export function Podium() {
  const { materials, unitBoxGeometry } = useTowerMaterials();

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const columnGeom = useMemo(() => new THREE.CylinderGeometry(1, 1, 1, 16), []);

  const stiltH = TOWER_CONFIG.STILT_HEIGHT;
  const radius = TOWER_CONFIG.PODIUM_COLUMN.radius;
  const startY = TOWER_CONFIG.PLINTH_HEIGHT + stiltH / 2;

  const transforms = useMemo(() => {
    const matrices: THREE.Matrix4[] = [];
    const countX = TOWER_CONFIG.PODIUM_COLUMN.countX;
    const countZ = TOWER_CONFIG.PODIUM_COLUMN.countZ;

    const spanInset = TOWER_CONFIG.PODIUM_COLUMN.spanInset;
    const spanX = TOWER_CONFIG.FOOTPRINT.x - spanInset;
    const spanZ = TOWER_CONFIG.FOOTPRINT.z - spanInset;

    for (let i = 0; i < countX; i++) {
      for (let j = 0; j < countZ; j++) {
        const x = -spanX / 2 + (spanX / (countX - 1)) * i;
        const z = -spanZ / 2 + (spanZ / (countZ - 1)) * j;

        const m = new THREE.Matrix4();
        m.compose(
          new THREE.Vector3(x, startY, z),
          new THREE.Quaternion(),
          new THREE.Vector3(radius, stiltH, radius)
        );
        matrices.push(m);
      }
    }
    return matrices;
  }, [stiltH, radius, startY]);

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    transforms.forEach((mat, idx) => {
      meshRef.current?.setMatrixAt(idx, mat);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [transforms]);

  useEffect(() => {
    return () => {
      columnGeom.dispose();
    };
  }, [columnGeom]);

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[columnGeom, materials.wallOffWhite, transforms.length]}
      />
      <mesh
        position={[
          0,
          TOWER_CONFIG.PLINTH_HEIGHT + stiltH + TOWER_CONFIG.PODIUM_SLAB_THICKNESS / 2,
          0,
        ]}
        material={materials.slabEdge}
      >
        <boxGeometry
          args={[
            TOWER_CONFIG.FOOTPRINT.x + 0.6,
            TOWER_CONFIG.PODIUM_SLAB_THICKNESS,
            TOWER_CONFIG.FOOTPRINT.z + 0.6,
          ]}
        />
      </mesh>
    </group>
  );
}