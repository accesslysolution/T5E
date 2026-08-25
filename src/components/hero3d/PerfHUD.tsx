'use client';

import React, { useState, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { TOWER_CONFIG } from './config';

export function PerfHUD() {
  const gl = useThree((state) => state.gl);
  const [stats, setStats] = useState({ calls: 0, triangles: 0, fps: 0 });

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useFrame(() => {
    frameCountRef.current += 1;
    const interval = TOWER_CONFIG.PERF_HUD.updateIntervalFrames;

    if (frameCountRef.current >= interval) {
      const now = performance.now();
      const deltaSec = (now - lastTimeRef.current) / 1000;
      const measuredFps = Math.round(frameCountRef.current / deltaSec);

      setStats({
        calls: gl.info.render.calls,
        triangles: gl.info.render.triangles,
        fps: measuredFps,
      });

      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }
  });

  return (
    <Html
      fullscreen
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          padding: '12px 16px',
          backgroundColor: TOWER_CONFIG.PERF_HUD.bgColor,
          border: `1px solid ${TOWER_CONFIG.PERF_HUD.borderColor}`,
          borderRadius: '8px',
          color: TOWER_CONFIG.PERF_HUD.textColor,
          fontFamily: 'monospace',
          fontSize: '12px',
          lineHeight: '1.6',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div style={{ fontWeight: 'bold', borderBottom: `1px solid ${TOWER_CONFIG.PERF_HUD.borderColor}`, paddingBottom: '4px', marginBottom: '6px' }}>
          T5E WEBGL METRICS (PASS 1)
        </div>
        <div>Draw Calls: <strong>{stats.calls}</strong></div>
        <div>Triangles: <strong>{stats.triangles.toLocaleString()}</strong></div>
        <div>Frame Rate: <strong>{stats.fps} FPS</strong></div>
      </div>
    </Html>
  );
}