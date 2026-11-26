import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { cyberAudio } from '../utils/cyberAudio';

/**
 * Supercharged Antigravity WebGL Canvas:
 * - 2,500 weightless iridescent particles with explosive click shockwaves
 * - Hyperdrive warp speed trails and light-speed ascension
 * - Interactive obsidian crystals with crimson Fresnel rim that can be clicked & grabbed
 * - Dynamic shockwave rings expanding through 3D vacuum
 * - Spring damping physics (stiffness: 120, damping: 14)
 */
export default function AntigravityCanvas({ className = '', hyperdrive = false }) {
  const mountRef = useRef(null);
  const [hudText, setHudText] = useState('CLICK ANYWHERE TO DISRUPT GRAVITY');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090d, 0.035);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- Physics & Interaction State ---
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      vx: 0,
      vy: 0,
      lastX: 0,
      lastY: 0,
      speed: 0,
      worldPos: new THREE.Vector3(0, 0, 0),
      isDown: false,
    };

    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2(-999, -999);

    // Active Shockwaves Queue
    const shockwaves = [];

    // Dragged crystal
    let draggedCrystal = null;

    // --- Pointer Events ---
    const onPointerMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseNorm.set(mouse.targetX, mouse.targetY);

      const dx = mouse.targetX - mouse.lastX;
      const dy = mouse.targetY - mouse.lastY;
      mouse.vx = dx * 60;
      mouse.vy = dy * 60;
      mouse.speed = Math.sqrt(dx * dx + dy * dy) * 60;
      mouse.lastX = mouse.targetX;
      mouse.lastY = mouse.targetY;

      raycaster.setFromCamera(mouseNorm, camera);
      raycaster.ray.intersectPlane(planeZ, mouse.worldPos);
    };

    const onPointerDown = (e) => {
      // Don't trigger if clicked on an interactive UI button
      if (e.target.closest('button, a, input, textarea, .interactive')) return;

      mouse.isDown = true;
      raycaster.setFromCamera(mouseNorm, camera);

      // Check if clicked a crystal
      const crystalMeshes = crystals.map((c) => c.mesh);
      const intersects = raycaster.intersectObjects(crystalMeshes);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        draggedCrystal = crystals.find((c) => c.mesh === hitMesh);
        cyberAudio.playLaser();
        return;
      }

      // Trigger massive 3D Shockwave
      cyberAudio.playShockwave();
      shockwaves.push({
        center: mouse.worldPos.clone(),
        radius: 0.1,
        maxRadius: 18.0,
        speed: 16.0,
        strength: 2.4,
        life: 1.0,
      });

      // Visual Shockwave Ring in 3D
      const ringGeo = new THREE.RingGeometry(0.1, 0.45, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xff143d,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(mouse.worldPos);
      ringMesh.lookAt(camera.position);
      scene.add(ringMesh);

      shockwaveVisuals.push({
        mesh: ringMesh,
        scale: 1,
        opacity: 0.85,
      });
    };

    const onPointerUp = () => {
      mouse.isDown = false;
      if (draggedCrystal) {
        // Fling with mouse velocity
        draggedCrystal.velocity.set(mouse.vx * 0.15, mouse.vy * 0.15, (Math.random() - 0.5) * 0.2);
        draggedCrystal = null;
        cyberAudio.playLaser();
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    const shockwaveVisuals = [];

    // --- 1. 2,500 PARTICLES WITH SHOCKWAVE PHYSICS ---
    const PARTICLE_COUNT = 2500;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const scales = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);

    const colorCrimson = new THREE.Color(0xff143d);
    const colorCyan = new THREE.Color(0x00f5ff);
    const colorViolet = new THREE.Color(0x9d00ff);
    const colorGold = new THREE.Color(0xffd700);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 36;
      positions[idx + 1] = (Math.random() - 0.5) * 26;
      positions[idx + 2] = (Math.random() - 0.5) * 18 - 2;

      velocities[idx] = (Math.random() - 0.5) * 0.015;
      velocities[idx + 1] = Math.random() * 0.03 + 0.012; // upward ascension
      velocities[idx + 2] = (Math.random() - 0.5) * 0.015;

      const rand = Math.random();
      const pColor = new THREE.Color();
      if (rand < 0.5) {
        pColor.lerpColors(colorCrimson, colorViolet, Math.random());
      } else if (rand < 0.8) {
        pColor.lerpColors(colorCyan, colorCrimson, Math.random() * 0.4);
      } else {
        pColor.lerpColors(colorGold, colorCrimson, Math.random() * 0.3);
      }

      colors[idx] = pColor.r;
      colors[idx + 1] = pColor.g;
      colors[idx + 2] = pColor.b;

      scales[i] = Math.random() * 2.2 + 0.8;
      phases[i] = Math.random() * Math.PI * 2;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const particleShaderMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.75) },
        uHyperdrive: { value: 0.0 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uHyperdrive;
        attribute float scale;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          float pulse = sin(uTime * 2.0 + position.x * 0.4 + position.y * 0.4) * 0.3 + 0.7;
          vAlpha = smoothstep(-20.0, -2.0, position.z) * pulse * (1.0 + uHyperdrive * 0.8);

          // In hyperdrive, stretch particles into light streaks
          float sizeMultiplier = scale * (28.0 / -mvPosition.z) * uPixelRatio;
          gl_PointSize = sizeMultiplier * (1.0 + uHyperdrive * 1.5);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uHyperdrive;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;

          float intensity = pow(1.0 - (dist * 2.0), 1.6);
          vec3 glowColor = vColor * (1.5 + uHyperdrive * 1.2);
          gl_FragColor = vec4(glowColor, intensity * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const particleSystem = new THREE.Points(particleGeo, particleShaderMat);
    scene.add(particleSystem);

    // --- 2. 16 INTERACTIVE OBSIDIAN CRYSTALS WITH CRIMSON FRESNEL RIM ---
    const crystalShaderMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uBaseColor: { value: new THREE.Color(0x09090d) },
        uRimColor: { value: new THREE.Color(0xff143d) },
        uSecondaryRim: { value: new THREE.Color(0x9d00ff) },
        uFresnelPower: { value: 1.8 },
        uHyperdrive: { value: 0.0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vWorldPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uBaseColor;
        uniform vec3 uRimColor;
        uniform vec3 uSecondaryRim;
        uniform float uFresnelPower;
        uniform float uHyperdrive;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vWorldPosition;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);

          float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), uFresnelPower);
          float rimMix = sin(vWorldPosition.y * 0.9 + vWorldPosition.x * 0.6) * 0.5 + 0.5;
          vec3 rimFinal = mix(uRimColor, uSecondaryRim, rimMix) * (1.8 + uHyperdrive * 1.5);

          vec3 finalColor = uBaseColor + (rimFinal * fresnel);
          gl_FragColor = vec4(finalColor, 0.96);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const crystals = [];
    const crystalGeos = [
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.IcosahedronGeometry(1.0, 0),
      new THREE.DodecahedronGeometry(0.9, 0),
      new THREE.TetrahedronGeometry(1.1, 0),
    ];

    for (let i = 0; i < 16; i++) {
      const geo = crystalGeos[i % crystalGeos.length];
      const mesh = new THREE.Mesh(geo, crystalShaderMat.clone());

      const startX = (Math.random() - 0.5) * 24;
      const startY = (Math.random() - 0.5) * 18;
      const startZ = (Math.random() - 0.5) * 10 - 1;

      mesh.position.set(startX, startY, startZ);
      const scale = Math.random() * 0.55 + 0.35;
      mesh.scale.set(scale, scale, scale);

      crystals.push({
        mesh,
        basePos: new THREE.Vector3(startX, startY, startZ),
        currentPos: new THREE.Vector3(startX, startY, startZ),
        velocity: new THREE.Vector3(0, 0, 0),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        floatSpeed: Math.random() * 0.016 + 0.008,
        phase: Math.random() * Math.PI * 2,
      });

      scene.add(mesh);
    }

    // --- Resize Handler ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      particleShaderMat.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 1.75);
    };

    window.addEventListener('resize', onResize);

    // --- Physics & Render Loop ---
    const clock = new THREE.Clock();
    let frameId;
    let hyperVal = 0.0;

    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const time = clock.getElapsedTime();

      // Smooth Hyperdrive Transition
      const targetHyper = hyperdrive ? 1.0 : 0.0;
      hyperVal += (targetHyper - hyperVal) * 0.08;
      particleShaderMat.uniforms.uHyperdrive.value = hyperVal;

      // Mouse Lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 1.0 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      particleShaderMat.uniforms.uTime.value = time;

      // Update Active Shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += sw.speed * dt;
        sw.life = 1.0 - sw.radius / sw.maxRadius;
        if (sw.life <= 0) {
          shockwaves.splice(s, 1);
        }
      }

      // Update Shockwave Visual Rings
      for (let v = shockwaveVisuals.length - 1; v >= 0; v--) {
        const ring = shockwaveVisuals[v];
        ring.scale += 28.0 * dt;
        ring.mesh.scale.set(ring.scale, ring.scale, 1);
        ring.opacity *= 0.94;
        ring.mesh.material.opacity = ring.opacity;
        if (ring.opacity <= 0.01) {
          scene.remove(ring.mesh);
          ring.mesh.geometry.dispose();
          ring.mesh.material.dispose();
          shockwaveVisuals.splice(v, 1);
        }
      }

      // 1. UPDATE 2,500 PARTICLES
      const posAttr = particleGeo.attributes.position;
      const posArray = posAttr.array;
      const speedMult = 1.0 + hyperVal * 4.5;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        let px = posArray[idx];
        let py = posArray[idx + 1];
        let pz = posArray[idx + 2];

        // Antigravity Lift
        py += velocities[idx + 1] * speedMult;

        // Brownian turbulence
        const ph = phases[i];
        px += Math.sin(time * 1.2 + ph + py * 0.3) * 0.015 * (1.0 + hyperVal * 2.0);
        pz += Math.cos(time * 0.9 + ph + px * 0.3) * 0.012;

        // Boundary Reset
        if (py > 14.0) {
          py = -14.0;
          px = (Math.random() - 0.5) * 36;
          pz = (Math.random() - 0.5) * 18 - 2;
        }

        // Mouse Proximity Repulsion
        const dx = px - mouse.worldPos.x;
        const dy = py - mouse.worldPos.y;
        const dz = pz - mouse.worldPos.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < 18.0) {
          const dist = Math.sqrt(distSq) || 0.001;
          const force = (1.0 - dist / 4.25) * (1.0 + mouse.speed * 0.5);
          px += (dx / dist) * force * 0.45;
          py += (dy / dist) * force * 0.45 + force * 0.25;
          pz += (dz / dist) * force * 0.3;
        }

        // Apply Active Shockwaves to Particles
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const swDx = px - sw.center.x;
          const swDy = py - sw.center.y;
          const swDz = pz - sw.center.z;
          const swDist = Math.sqrt(swDx * swDx + swDy * swDy + swDz * swDz);
          const waveDelta = Math.abs(swDist - sw.radius);

          if (waveDelta < 2.0) {
            const waveForce = (1.0 - waveDelta / 2.0) * sw.strength * sw.life;
            px += (swDx / (swDist || 1)) * waveForce * 0.8;
            py += (swDy / (swDist || 1)) * waveForce * 0.8;
            pz += (swDz / (swDist || 1)) * waveForce * 0.8;
          }
        }

        posArray[idx] = px;
        posArray[idx + 1] = py;
        posArray[idx + 2] = pz;
      }

      posAttr.needsUpdate = true;

      // 2. UPDATE OBSIDIAN CRYSTALS WITH SPRING PHYSICS (Stiffness: 120, Damping: 14)
      for (let i = 0; i < crystals.length; i++) {
        const c = crystals[i];
        const mesh = c.mesh;

        // If dragged by user
        if (draggedCrystal === c) {
          c.currentPos.lerp(mouse.worldPos, 0.2);
          mesh.position.copy(c.currentPos);
          mesh.rotation.x += 0.08;
          mesh.rotation.y += 0.08;
          continue;
        }

        c.basePos.y += c.floatSpeed * speedMult;
        if (c.basePos.y > 11.5) {
          c.basePos.y = -11.5;
          c.basePos.x = (Math.random() - 0.5) * 24;
        }

        const targetPos = new THREE.Vector3(
          c.basePos.x + Math.sin(time * 0.8 + c.phase) * 0.4,
          c.basePos.y + Math.sin(time * 1.5 + c.phase) * 0.5,
          c.basePos.z
        );

        // Repel from mouse
        const toMouse = new THREE.Vector3().subVectors(c.currentPos, mouse.worldPos);
        const mouseDist = toMouse.length();
        if (mouseDist < 4.8) {
          const repelForce = (1.0 - mouseDist / 4.8) * 3.2;
          toMouse.normalize().multiplyScalar(repelForce);
          targetPos.add(toMouse);
          targetPos.y += repelForce * 0.6;
        }

        // Apply shockwave impact to crystals
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const toSw = new THREE.Vector3().subVectors(c.currentPos, sw.center);
          const swDist = toSw.length();
          if (Math.abs(swDist - sw.radius) < 2.5) {
            const swImpact = sw.strength * sw.life * 2.0;
            toSw.normalize().multiplyScalar(swImpact);
            c.velocity.add(toSw);
          }
        }

        // Spring integration (stiffness 120, damping 14)
        const displacement = new THREE.Vector3().subVectors(targetPos, c.currentPos);
        const springForce = displacement.multiplyScalar(120 * dt * 0.045);
        c.velocity.add(springForce);
        c.velocity.multiplyScalar(Math.max(0, 1 - 14 * dt * 0.35));
        c.currentPos.add(c.velocity);

        mesh.position.copy(c.currentPos);

        mesh.rotation.x += c.rotSpeed.x * (1.0 + hyperVal * 3.0) + c.velocity.y * 0.06;
        mesh.rotation.y += c.rotSpeed.y * (1.0 + hyperVal * 3.0) + c.velocity.x * 0.06;
        mesh.rotation.z += c.rotSpeed.z;

        mesh.material.uniforms.uTime.value = time;
        mesh.material.uniforms.uHyperdrive.value = hyperVal;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);

      particleGeo.dispose();
      particleShaderMat.dispose();
      crystalGeos.forEach((g) => g.dispose());
      crystalShaderMat.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [hyperdrive]);

  return (
    <div
      ref={mountRef}
      className={`fixed inset-0 pointer-events-auto z-0 overflow-hidden cursor-crosshair ${className}`}
      title="Click anywhere to trigger antigravity shockwave! Drag floating crystals to fling them!"
    />
  );
}
