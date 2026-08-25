'use client';

import React, { createContext, useContext, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { createTowerMaterials, TowerMaterials } from './config';

interface TowerMaterialsContextValue {
  materials: TowerMaterials;
  unitBoxGeometry: THREE.BoxGeometry;
}

const TowerMaterialsContext = createContext<TowerMaterialsContextValue | null>(null);

export function TowerMaterialsProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(() => {
    return {
      materials: createTowerMaterials(),
      unitBoxGeometry: new THREE.BoxGeometry(1, 1, 1),
    };
  }, []);

  useEffect(() => {
    return () => {
      value.unitBoxGeometry.dispose();
      Object.values(value.materials).forEach((material) => material.dispose());
    };
  }, [value]);

  return (
    <TowerMaterialsContext.Provider value={value}>
      {children}
    </TowerMaterialsContext.Provider>
  );
}

export function useTowerMaterials() {
  const context = useContext(TowerMaterialsContext);
  if (!context) {
    throw new Error('useTowerMaterials must be used within a TowerMaterialsProvider');
  }
  return context;
}