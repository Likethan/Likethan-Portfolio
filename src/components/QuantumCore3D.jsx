import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Rotate3d, Zap, Shield, Flame } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

export default function QuantumCore3D() {
  const mountRef = useRef(null);
  const [mode, setMode] = useState('CRIMSON_PULSE');
  const [rotationSpeed, setRotationSpeed] = useState(1);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Inner Core: Glowing Octahedron
    const coreGeo = new THREE.OctahedronGeometry(1.0, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x09090d,
      emissive: 0xff143d,
      emissiveIntensity: 0.65,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Outer Wireframe Cage: Icosahedron
    const cageGeo = new THREE.IcosahedronGeometry(1.4, 0);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xff143d,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    scene.add(cageMesh);

    // Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(1.75, 0.025, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(1.95, 0.02, 16, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x9d00ff, transparent: true, opacity: 0.45 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 2.5;
    scene.add(ring2);

    // Interactive Drag to Spin
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
      cyberAudio.playHapticClick();
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      dragVelocity.x = deltaX * 0.015;
      dragVelocity.y = deltaY * 0.015;
      coreMesh.rotation.y += dragVelocity.x;
      coreMesh.rotation.x += dragVelocity.y;
      cageMesh.rotation.y -= dragVelocity.x;
      cageMesh.rotation.x -= dragVelocity.y;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      if (isDragging) {
        cyberAudio.playLaser();
      }
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      const mult = rotationSpeed;

      if (!isDragging) {
        coreMesh.rotation.x += 0.008 * mult;
        coreMesh.rotation.y += 0.012 * mult;
        cageMesh.rotation.x -= 0.005 * mult;
        cageMesh.rotation.y -= 0.009 * mult;
      }

      ring1.rotation.x = time * 0.4 * mult;
      ring1.rotation.y = time * 0.6 * mult;
      ring2.rotation.y = -time * 0.5 * mult;
      ring2.rotation.z = time * 0.3 * mult;

      // Pulse breathing
      const pulse = Math.sin(time * 3.0) * 0.08 + 1.0;
      coreMesh.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      coreGeo.dispose();
      coreMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [rotationSpeed]);

  const triggerOverclock = () => {
    cyberAudio.playWarpDrive(true);
    setRotationSpeed(3.5);
    setMode('HYPER_OVERCLOCK');
    setTimeout(() => {
      setRotationSpeed(1);
      setMode('CRIMSON_PULSE');
    }, 4000);
  };

  return (
    <div className="glass-panel p-4 rounded-3xl border border-white/15 bg-[#090b14]/90 shadow-2xl relative overflow-hidden flex flex-col items-center">
      {/* Badge Header */}
      <div className="w-full flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono-code">
        <div className="flex items-center gap-1.5 text-[#ff143d] font-bold">
          <Zap className="w-3.5 h-3.5 animate-pulse" />
          <span>QUANTUM TESSERACT</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ff143d]/15 text-[#ff143d] font-bold border border-[#ff143d]/30">
          {mode}
        </span>
      </div>

      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] cursor-grab active:cursor-grabbing relative"
        title="Click & drag to rotate the quantum core in 3D!"
      />

      {/* Interactive Quick Buttons */}
      <div className="w-full flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono-code">
        <span className="text-[10px] text-slate-400">DRAG TO ROTATE 3D</span>
        <button
          onClick={triggerOverclock}
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#ff143d] to-[#ff3b5c] text-white text-[11px] font-bold hover:shadow-[0_0_15px_rgba(255,20,61,0.5)] transition-all hover:scale-105"
        >
          <Flame className="w-3 h-3" />
          <span>Overclock</span>
        </button>
      </div>
    </div>
  );
}
