import * as THREE from 'three';

/**
 * COLOR MANAGEMENT & SRGB CONVERSION NOTE:
 * Three.js (r155+) uses automatic linear color management.
 * All hex strings supplied to `new THREE.Color("#HEX")` or passed directly to R3F JSX
 * materials are automatically parsed as sRGB and converted to linear working space.
 * Do NOT pre-convert hex tokens using .convertSRGBToLinear() manually.
 */

// 1. Primitive Architectural Constants
const FLOORS = 14;
const FLOOR_HEIGHT = 3.15;
const PLINTH_HEIGHT = 0.6;
const STILT_HEIGHT = 4.5;
const PODIUM_SLAB_THICKNESS = 0.5;
const PARAPET_HEIGHT = 1.2;
const CROWN_HEIGHT = 3.5;
const CROWN_CORNICE_HEIGHT = 0.6;

// 2. Derived Vertical Height Constants
const TYPICAL_FLOOR_BASE = PLINTH_HEIGHT + STILT_HEIGHT + PODIUM_SLAB_THICKNESS;
const ROOF_ELEVATION = TYPICAL_FLOOR_BASE + FLOORS * FLOOR_HEIGHT;
const TOTAL_HEIGHT = ROOF_ELEVATION + PARAPET_HEIGHT + CROWN_HEIGHT + CROWN_CORNICE_HEIGHT;

export const TOWER_CONFIG = {
  // Architectural Dimensions
  FLOORS,
  FLOOR_HEIGHT,
  PLINTH_HEIGHT,
  STILT_HEIGHT,
  PODIUM_SLAB_THICKNESS,
  TYPICAL_FLOOR_BASE,
  ROOF_ELEVATION,
  TOTAL_HEIGHT,
  FOOTPRINT: { x: 22, z: 16 },
  APRON_WIDTH: 2.5,
  BAYS_PER_FACE: 4,

  // Detailing Elements
  MASS_INSET: 0.12,
  WINDOW_REVEAL: 0.18,
  WINDOW: { width: 2.2, height: 1.8, frameThickness: 0.08, frameDepth: 0.1 },
  WINDOW_BAND_INSET: 3.0,
  CHAJJA_DEPTH: 0.45,
  CHAJJA_THICKNESS: 0.08,
  CHAJJA_SIDE_OVERHANG: 0.4,
  BALCONY_WIDTH: 4.5,
  BALCONY_DEPTH: 1.8,
  BALCONY_SLAB_THICKNESS: 0.2,
  BALCONY_RAILING_HEIGHT: 1.1,
  ELEVATION_FIN_WIDTH: 0.3,
  ELEVATION_FIN_DEPTH: 0.4,
  ELEVATION_FIN_COUNT: 4,
  ELEVATION_FIN_INSET: 1.2,
  ELEVATION_FIN_OVERSHOOT: 2.0,
  PARAPET_HEIGHT,
  PARAPET_THICKNESS: 0.3,
  AC_LEDGE: { width: 1.2, height: 0.1, depth: 0.8, countPerSide: 4 },
  
  // Floor Plate Tokens
  SLAB_THICKNESS: 0.2,
  SLAB_TRIM_HEIGHT: 0.1,
  SLAB_TRIM_OVERHANG: 0.15,

  // Roof Structure
  MUMTY: { width: 5.0, height: 2.8, depth: 6.0, offset: [-3, -1] as const },
  WATER_TANK: { width: 4.0, height: 2.2, depth: 4.0, offset: [3, 0] as const },
  CROWN_HEIGHT,
  CROWN_CORNICE_HEIGHT,
  CROWN_FIN_COUNT: 12,
  CROWN_OVERHANG: 0.8,

  // Boundary & Grounds
  COMPOUND_WALL: {
    height: 2.2,
    thickness: 0.3,
    offset: 6.5,
    copingHeight: 0.12,
    copingOverhang: 0.1,
  },
  GATE: { width: 6.0, height: 2.5, pillarWidth: 0.8, pillarDepth: 0.8 },
  PODIUM_COLUMN: { countX: 4, countZ: 3, radius: 0.45, spanInset: 2.5 },

  // Preview & HUD Tokens
  PREVIEW_LOADING_COLOR: '#C9A84C',
  PREVIEW_BG_COLOR: '#0D140E',
  PERF_HUD: {
    updateIntervalFrames: 30,
    textColor: '#C9A84C',
    bgColor: 'rgba(12, 20, 14, 0.85)',
    borderColor: 'rgba(201, 168, 76, 0.3)',
  },

  // Render & Color Management
  RENDER: {
    dpr: [1, 1.75] as [number, number],
    exposure: 1.1,
    toneMapping: THREE.ACESFilmicToneMapping,
  },

  // Camera & Lighting
  CAMERA: {
    position: [34, 8, 46] as const,
    target: [0, 30, 0] as const,
    fov: 40,
  },
  LIGHTS: {
    environmentIntensity: 0.9,
    keyLight: {
      position: [40, 35, 20] as const,
      color: '#FFF4E0',
      intensity: 1.2,
    },
    goldRimLight: {
      position: [-30, 25, -25] as const,
      color: '#C9A84C',
      intensity: 0.4,
    },
  },
} as const;

export function createTowerMaterials() {
  return {
    structureGold: new THREE.MeshStandardMaterial({
      color: '#C9A84C',
      metalness: 0.75,
      roughness: 0.3,
    }),
    wallOffWhite: new THREE.MeshStandardMaterial({
      color: '#EDE8DE',
      metalness: 0.0,
      roughness: 0.8,
    }),
    glassGreen: new THREE.MeshPhysicalMaterial({
      color: '#1A382B',
      transmission: 0.6,
      opacity: 1.0,
      transparent: false,
      roughness: 0.05,
      ior: 1.5,
      thickness: 0.4,
    }),
    railingBronze: new THREE.MeshStandardMaterial({
      color: '#2A2017',
      metalness: 0.65,
      roughness: 0.35,
    }),
    groundDarkGreen: new THREE.MeshStandardMaterial({
      color: '#18261A',
      metalness: 0.02,
      roughness: 0.98,
    }),
    slabEdge: new THREE.MeshStandardMaterial({
      color: '#D1C2A5',
      metalness: 0.2,
      roughness: 0.6,
    }),
    pavedApron: new THREE.MeshStandardMaterial({
      color: '#283329',
      metalness: 0.1,
      roughness: 0.75,
    }),
  };
}

export type TowerMaterials = ReturnType<typeof createTowerMaterials>;